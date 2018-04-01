//canvas_width = window.innerWidth * window.devicePixelRatio; 
//canvas_height = window.innerHeight * window.devicePixelRatio;
var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  autoResize: true,
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
  version: '0.0.4a'
};
var velocidad = 3;
var player;
var game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('chara', 'img/chara1.png', {frameWidth: 48,frameHeight: 64});
  this.load.image('mapa', 'maps/mapa1.png');
}

function create() {
  this.add.image(320, 240, 'mapa');
  //controles
  tecla_arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  tecla_abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  tecla_izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  tecla_derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  //jugador
  player = this.physics.add.sprite(100, 200, 'chara');
  player.setCollideWorldBounds(true);
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

function update() {
  teclado();
}

var ultpos = '';

function teclado() {
  if (tecla_arriba.isDown && !tecla_abajo.isDown && !tecla_izquierda.isDown && !tecla_derecha.isDown) {
    player.body.y -= velocidad;
    player.anims.play('up', true);
    ultpos = 'up';
    if (player.body.collideWorldBounds=true) {
      player.anims.play('up', false);
    }
  }
  if (!tecla_arriba.isDown && tecla_abajo.isDown && !tecla_izquierda.isDown && !tecla_derecha.isDown) {
    player.body.y += velocidad;
    player.anims.play('down', true);
    ultpos = 'down';
  }
  if (!tecla_arriba.isDown && !tecla_abajo.isDown && tecla_izquierda.isDown && !tecla_derecha.isDown) {
    player.body.x -= velocidad;
    player.anims.play('left', true);
    ultpos = 'left';
  }
  if (!tecla_arriba.isDown && !tecla_abajo.isDown && !tecla_izquierda.isDown && tecla_derecha.isDown) {
    player.body.x += velocidad;
    player.anims.play('right', true);
    ultpos = 'right';
  }
  if (!tecla_arriba.isDown && !tecla_abajo.isDown && !tecla_izquierda.isDown && !tecla_derecha.isDown) {
    if (ultpos === 'up') {
      player.anims.play('up', false);
    }
    if (ultpos === 'down') {
      player.anims.play('down', false);
    }
    if (ultpos === 'left') {
      player.anims.play('left', false);
    }
    if (ultpos === 'right') {
      player.anims.play('right', false);
    }
  }
};