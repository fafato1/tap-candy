var candyHeart = 0;
var tempo = 1000;
var soldados = 0;

var jogador = {
    forca: 0,
    vida: 0,
    vidamaxima: 100,
};

function MaisCW(){
    setTimeout(function(){Update("CW", "Cora&#231&#245es doces: " + candyHeart)}, tempo);
    if(candyHeart > 20) document.getElementById("contratar").style.visibility = "visible";
}

function Update(ID, texto){
    candyHeart++;
    document.getElementById(ID).innerHTML = texto;
    if((jogador.vida / jogador.vidamaxima) <= 1) {
        document.getElementById("barraVida").style.width = (jogador.vida / jogador.vidamaxima)*100 + "%";
        document.getElementById("barraVida").innerHTML = Math.trunc((jogador.vida / jogador.vidamaxima)*100) + "% " + jogador.vida + "/" + jogador.vidamaxima;
    jogador.vida++;
    }
    MaisCW();
}

function Contratar(){
    if(candyHeart > 20){
        candyHeart -=20
        soldados++;
        document.getElementById("soldados").innerHTML = "Soldados: " + soldados;
    }
}

function Comer(){
    jogador.vidamaxima += Math.trunc(candyHeart / 20);
    candyHeart = 0;
}
