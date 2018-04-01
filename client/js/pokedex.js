function Pokedex(n, nombre, descripcion, altura, peso, sexo, categoria, habilidad, tipo, debilidad, img, ps, atk, def, atksp, defsp, vel) {
    this.n = n;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.altura = altura;
    this.peso = peso;
    this.sexo = sexo;
    this.categoria = categoria;
    this.habilidad = habilidad;
    this.tipo = tipo;
    this.debilidad = debilidad;
    this.img = img;
    this.ps = ps;
    this.atk = atk;
    this.def = def;
    this.atksp = atksp;
    this.defsp = defsp;
    this.vel = vel;
}
var Bulbasaur = new Pokedex(
    "001",
    "Bulbasaur",
    "A Bulbasaur es fácil verle echándose una siesta al sol. La semilla que tiene en el lomo va creciendo cada vez más a medida que absorbe los rayos del sol.",
    0.7,
    6.9,
    ["Masculino", "Femenino"],
    "Semilla",
    "Espesura",
    ["Planta", "Veneno"],
    ["Fuego", "Volador", "Hielo", "Psíquico"],
    'img/dex/001.png',
    2,
    3,
    2,
    3,
    3,
    3);
var Ivysaur = new Pokedex(
    "002",
    "Ivysaur",
    "Este Pokémon lleva un bulbo en el lomo y, para poder con su peso, tiene unas patas y un tronco gruesos y fuertes. Si empieza a pasar más tiempo al sol, será porque el bulbo está a punto de hacerse una flor grande.",
    1.0,
    13.0,
    ["Masculino", "Femenino"],
    "Semilla",
    "Espesura",
    ["Planta", "Veneno"],
    ["Fuego", "Volador", "Hielo", "Psíquico"],
    'img/dex/002.png',
    3,
    3,
    3,
    4,
    3,
    3);
var Venusaur = new Pokedex(
    "003",
    "Venusaur",
    "Venusaur tiene una flor enorme en el lomo que, según parece, adquiere unos colores muy vivos si está bien nutrido y le da mucho el sol. El aroma delicado de la flor tiene un efecto relajante en el ánimo de las personas.",
    2.0,
    100.0,
    ["Masculino", "Femenino"],
    "Semilla",
    "Espesura",
    ["Planta", "Veneno"],
    ["Fuego", "Volador", "Hielo", "Psíquico"],
    'img/dex/002.png',
    3,
    4,
    4,
    5,
    4,
    4);
