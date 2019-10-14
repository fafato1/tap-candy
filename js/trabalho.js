var candyHeart = 0;
var tempo = 1000;
var soldados = 0;
var plusCandy = 1;

var jogador = {
    forca: 0,
    vida: 0,
    vidamaxima: 100,
};

function Update(){
    setTimeout(function(){MaisCW()}, tempo);
    if(candyHeart >= 20) document.getElementById("contratar").style.visibility = "visible";
}

function MaisCW(){
    candyHeart += plusCandy;
    document.getElementById("CW").innerHTML = "Cora&#231&#245es doces: " + Math.trunc(candyHeart) + " | Cora&#231&#245es doces por segundo: " + plusCandy;
    if((jogador.vida / jogador.vidamaxima) <= 1) {
        document.getElementById("barraVida").style.width = (jogador.vida / jogador.vidamaxima)*100 + "%";
        document.getElementById("barraVida").innerHTML = "Vida: " + Math.trunc((jogador.vida / jogador.vidamaxima)*100) + "% " + jogador.vida + "/" + jogador.vidamaxima;
    jogador.vida++;
    }
    Update();
}

function Contratar(){
    if((candyHeart > 20) && (plusCandy < 100)){
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
