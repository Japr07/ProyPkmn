//canvas_width = window.innerWidth * window.devicePixelRatio; 
//canvas_height = window.innerHeight * window.devicePixelRatio;
var config = {
    type: Phaser.AUTO,
    width: 720,
    height: 600,
    parent: 'juego',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    version: '0.0.5a'
};
var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('chara', 'img/chara1.png', {
        frameWidth: 48,
        frameHeight: 64
    });
    this.load.image('mapa', 'maps/mapa1.png');
}
const movimiento = 64;

function create() {
    var self = this;
    this.socket = io();
    this.otrosPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                agregarPlayer(self, players[id]);
            } else {
                agregarOtrosPlayers(self, players[id]);
            }
        });
    });
    this.socket.on('newPlayer', function (playerInfo) {
        agregarOtrosPlayers(self, playerInfo);
    });
    this.socket.on('playerMoved', function (playerInfo) {
        self.otrosPlayers.getChildren().forEach(function (otroPlayer) {
            if (playerInfo.playerId === otroPlayer.playerId) {
                otroPlayer.setPosition(playerInfo.x, playerInfo.y);
                otroPlayer.anims.play(playerInfo.animacion.direccion, playerInfo.animacion.activo);
                console.log(playerInfo.animacion.activo);

            }
        });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    const $enviarMensaje = $('#chat-enviar');
    const $mensaje = $('#chat-mensaje');
    const $chat = $('#chat');

    $enviarMensaje.submit(e => {
        e.preventDefault();
        if ($mensaje.val() !== '') {
            self.socket.emit('mensaje', $mensaje.val());
            $mensaje.val('');
        }
    });
    this.socket.on('nuevoMensaje', data => {
        console.log(data);

        $chat.html("");
        for (let i = 0; i < data.length; i++) {
            $chat.append(`TestUser: ${data[i]}<br>`);
        }
    });
    this.socket.on('disconnect', function (playerId) {
        self.otrosPlayers.getChildren().forEach(function (otroPlayer) {
            if (playerId === otroPlayer.playerId) {
                otroPlayer.destroy();
            }
        });
    });
    //mapa
    this.add.image(320, 240, 'mapa');

    //animaciones
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('chara', {
            start: 0,
            end: 3
        }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('chara', {
            start: 4,
            end: 7
        }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('chara', {
            start: 8,
            end: 11
        }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('chara', {
            start: 12,
            end: 15
        }),
        frameRate: 4,
        repeat: -1
    });
}

function agregarPlayer(self, playerInfo) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'chara');
    self.player.setTint(0xff0000);
    self.player.setCollideWorldBounds(true);
    self.player.setMaxVelocity(1);
}

function agregarOtrosPlayers(self, playerInfo) {
    const otroPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'chara');
    otroPlayer.setTint(0x0000ff);
    otroPlayer.setCollideWorldBounds(true);
    otroPlayer.playerId = playerInfo.playerId;
    self.otrosPlayers.add(otroPlayer);
}

function update() {
    if (this.player) {
        //presionar tecla
        if (this.cursors.left.isDown) {
            this.player.x -= 2;
            this.player.anims.play('left', true);
            this.player.animacion = {
                direccion: 'left',
                activo: true
            };
        } 
        if (this.cursors.right.isDown) {
            this.player.x += 2;
            this.player.animacion = {
                direccion: 'right',
                activo: true
            };
            this.player.anims.play('right', true);
        }
        if (this.cursors.up.isDown) {
            this.player.animacion = {
                direccion: 'up',
                activo: true
            };
            this.player.anims.play('up', true);
            this.player.y -= 2;
        }
        if (this.cursors.down.isDown) {
            this.player.animacion = {
                direccion: 'down',
                activo: true
            };
            this.player.anims.play('down', true);
            this.player.y += 2;
        }
        //soltar tecla
        if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
            this.player.anims.play('left', false);
            this.player.animacion = {
                direccion: 'left',
                activo: false
            };
            console.log('dd');
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
            this.player.anims.play('right', false);
            this.player.animacion = {
                direccion: 'right',
                activo: false
            };
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.up)) {
            this.player.anims.play('up', false);
            this.player.animacion = {
                direccion: 'up',
                activo: false
            };
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
            this.player.anims.play('down', false);
            this.player.animacion = {
                direccion: 'down',
                activo: false
            };
        }
        // emit player movement
        var x = this.player.x;
        var y = this.player.y;
        if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
            this.socket.emit('playerMovement', {
                x: this.player.x,
                y: this.player.y,
                animacion: this.player.animacion
            });

        }
        // save old position data
        this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y
        };
    }
}