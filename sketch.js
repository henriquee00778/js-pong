//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 90;
let raqueteAltura = 10;

//variáveis da raquete
let xRaquete = 250;
let yRaquete = 0;

//variáveis do oponente
let xRaqueteOponente = 250;
let yRaqueteOponente = 390;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(65)){
    xRaquete -= 10;
  }
  if (keyIsDown(68)){
    xRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (yBolinha - raio < yRaquete + raqueteAltura && xBolinha + raio < xRaquete + raqueteComprimento && xBolinha - raio > xRaquete){
    velocidadeYBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeYBolinha *= -1;
    raquetada.play();
  }
}

// Singleplayer

 function movimentaRaqueteOponente(){
  velocidadeXOponente = xBolinha -xRaqueteOponente - raqueteComprimento / 2 - 30;
  xRaqueteOponente += velocidadeXOponente
}

// Multiplayer
/*
function movimentaRaqueteOponente(){
if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 10;
  }
}
*/

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 450, 26);
}

function marcaPonto(){
  if (yBolinha > 395){
    meusPontos += 1;
    ponto.play();
  }
  if (yBolinha <5){
    pontosDoOponente += 1;
    ponto.play();
  }
}