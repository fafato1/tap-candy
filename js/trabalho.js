var candyHeart = 0;
var tempo = 1000;
var soldados = 0;
var plusCandy = 1;
var quantidadeParaCurar = 4;

var jogador = {
    forca : 0,
    velAtq: 0,
    vida  : 1,
    vidamaxima: 100,
};
var ajudante1 = {
    forca : 0,
    velAtq: 0,
    vida  : 1,
    vidamaxima: 100,
};
var ajudante2 = {
    forca : 0,
    velAtq: 0,
    vida  : 1,
    vidamaxima: 100,
};


var inimigo = {
    
}

function Update(){
    setTimeout(function(){MaisCW()}, tempo);
    if(candyHeart >= 20) document.getElementById("contratar").style.visibility = "visible";
}

function MaisCW(){
    candyHeart += plusCandy;
    document.getElementById("CW").innerHTML = "Cora&#231&#245es doces: " + Math.trunc(candyHeart) + " | Cora&#231&#245es doces por segundo: " + plusCandy + " | Cora&#231&#245es doces para curar: " + quantidadeParaCurar;
    if(((jogador.vida / jogador.vidamaxima) <= 1) && (jogador.vida > 0)) {
        document.getElementById("barraVida").style.width = (jogador.vida / jogador.vidamaxima)*100 + "%";
        document.getElementById("barraVida").innerHTML = "Vida: " + Math.trunc((jogador.vida / jogador.vidamaxima)*100) + "% " + jogador.vida + "/" + jogador.vidamaxima;
        jogador.vida++;
    }
    else if(jogador.vida <= 0){

    }
    Update();
}

function Contratar(){
    if((candyHeart > 20) && (plusCandy < 500)){
        candyHeart -=20
        soldados++;
        document.getElementById("soldados").innerHTML = "Soldados: " + soldados;
        plusCandy++;
    }
}

function Comer(){
    jogador.vidamaxima += Math.trunc(candyHeart / 20);
    jogador.forca += Math.trunc(candyHeart / 50);
    candyHeart = 0;
}

function Curar(){
    if((jogador.vida / jogador.vidamaxima) < 1){
        candyHeart -= quantidadeParaCurar;
        jogador.vida = jogador.vidamaxima;
        quantidadeParaCurar *= 4;
    }
}

function Morrer(){
    if(jogador.vida <= 0){

    }
    if(ajudante1.vida <= 0){

    }
    if(ajudante2.vida <= 0){
        
    }
}

function ComprarEspada(_teste) {
    switch (_teste) {
        case 1:
                if(candyHeart >= 200){
                    jogador.forca = 10;
                    jogador.velAtq = 1000
                }
            break;
        case 2:
                if(candyHeart >= 600){
                    jogador.forca = 20;
                    jogador.velAtq = 1300
                }
            break;
        case 3:
                if(candyHeart >= 900){
                    jogador.forca = 40;
                    jogador.velAtq = 900
                }
            break
        default:
            break;
    }
}
