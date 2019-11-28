var candyHeart = 0;
var tempo = 1000;
var soldados = 0;
var plusCandy = 1;
var quantidadeParaCurar = 4;
var contratarValor = 10;
var lutando = false;
var inimigoataque;

var machado = false;
var faca = false;
var espada = false

var eboss = 1;
var recenteboss = false;
var estagio = 1;



var naoboss = {
    forca     : 10,
    vidamaxima: 100,
}



var jogador = {
    forca : 0,
    velAtq: 0,
    vida  : 1,
    vidamaxima: 100,
};



var ajudante1 = {
    forca : 10,
    velAtq: 1000,
    vida  : 100,
    vidamaxima: 100,
};



var ajudante2 = {
    forca : 20,
    velAtq: 1000,
    vida  : 100,
    vidamaxima: 100,
};



var inimigo = {
    forca     : 10,
    velAtq    : 1000,
    vida      : 100,
    vidamaxima: 100,
}



function Update(){
    setTimeout(function(){MaisCW()}, tempo);
    if(candyHeart >= contratarValor) document.getElementById("contratar").style.visibility = "visible";
    if(faca === true) document.getElementById("lutar").style.visibility = "visible";
    document.getElementById("barraVidainimigo").style.width = (inimigo.vida / inimigo.vidamaxima)*100 + "%";
    document.getElementById("barraVidainimigo").innerHTML = "Vida do inimigo: " + Math.trunc((inimigo.vida / inimigo.vidamaxima)*100) + "% " + inimigo.vida + "/" + inimigo.vidamaxima;
}



function MaisCW(){
    candyHeart += plusCandy;
    document.getElementById("CW").innerHTML = "Cora&#231&#245es doces: " + Math.trunc(candyHeart) + " | Cora&#231&#245es doces por segundo: " + plusCandy + " | Cora&#231&#245es doces para curar: " + quantidadeParaCurar;
    if(((jogador.vida / jogador.vidamaxima) <= 1) && (jogador.vida > 0)) {
        document.getElementById("barraVida").style.width = (jogador.vida / jogador.vidamaxima)*100 + "%";
        document.getElementById("barraVida").innerHTML = "Sua vida: " + Math.trunc((jogador.vida / jogador.vidamaxima)*100) + "% " + jogador.vida + "/" + jogador.vidamaxima;
        jogador.vida++;
    }
    else if(jogador.vida <= 0){
        document.getElementById("barraVida").style.width = 0 + "%";
        document.getElementById("barraVida").innerHTML = "Sua vida: 0  %  0/" + jogador.vidamaxima;
    }
    Update();
    Morrer();
}



function Contratar(){
    if((candyHeart > contratarValor) && (plusCandy < 500)){
        candyHeart -= Math.trunc(contratarValor);
        soldados++;
        plusCandy++;
        Math.trunc(contratarValor *= 1.2);
        document.getElementById("soldados").innerHTML = "Soldados: " + soldados;
        document.getElementById("PrecoDeContrato").innerHTML = Math.trunc(contratarValor) + " Para contratar mais um soldado";
    }
}



function Comer(){
    jogador.vidamaxima += Math.trunc(candyHeart / 20);
    //jogador.forca += Math.trunc(candyHeart / 50);
    candyHeart = 0;
}



function Curar(){
    if(((jogador.vida / jogador.vidamaxima) < 1) && (candyHeart >= quantidadeParaCurar)){
        candyHeart -= quantidadeParaCurar;
        jogador.vida = jogador.vidamaxima;
        quantidadeParaCurar *= 4;
    }
}



function Curarclicando(){
    if((jogador.vida / jogador.vidamaxima) < 1){
        jogador.vida += 5;
    }
}



function Morrer(){
    if(jogador.vida <= 0){
        clearInterval(inimigoataque);
        var lutando = false;

        jogador.vidamaxima = 100;
        jogador.forca = 0;
        jogador.vida = 50;


        var machado = false;
        var faca = false;
        var espada = false
        EsconderInimigo();
        document.getElementById("faca").innerHTML = "Comprar Faca"
        document.getElementById("espada").innerHTML = "Comprar Espada"
        document.getElementById("machado").innerHTML = "Comprar Machado"
    }
}



function ComprarArma(_teste) {
    switch (_teste) {
        case 1:
                if((candyHeart >= 200) && (faca == false)){
                    jogador.forca = 10;
                    jogador.velAtq = 1000
                    candyHeart -= 200;
                    faca = true;
                    document.getElementById("faca").innerHTML = "faca &#9745"
                }
                else if(faca == true){
                    alert("Voce ja comprou a faca")
                }
                else{
                    alert("Voce nao tem coracoes doces o suficiente, voce precisa de 800")
                }
            break;
        case 2:
                if((candyHeart >= 600) && (espada == false)){
                    jogador.forca = 20;
                    jogador.velAtq = 1000
                    candyHeart -= 600;
                    espada = true;
                    document.getElementById("espada").innerHTML = "espada &#9745"
                }
                else if(espada == true){
                    alert("Voce ja comprou a espada")
                }
                else{
                    alert("Voce nao tem coracoes doces o suficiente, voce precisa de 1600")
                }
            break;
        case 3:
                if(candyHeart >= 1200 && (machado == false)){
                    jogador.forca = 40;
                    jogador.velAtq = 1000;
                    candyHeart -= 1200;
                    machado = true;
                    document.getElementById("machado").innerHTML = "machado &#9745"
                }
                else if(machado == true){
                    alert("Voce ja comprou o machado")
                }
                else{
                    alert("Voce nao tem coracoes doces o suficiente, voce precisa de 3200")
                }
            break
        default:
            break;
    }
}



function InimigoAtacar(){
    inimigoataque = setInterval(function(){ jogador.vida -= inimigo.forca; InimigoMorrer()}, inimigo.velAtq);

}



function InimigoMorrer() {
    if(inimigo.vida <= 0){
        candyHeart += Math.trunc(inimigo.vidamaxima / 5);

        clearInterval(inimigoataque);
        lutando = false;
        CriarInimigo();
        EsconderInimigo();
        eboss++;
        document.getElementById("contadorRound").innerHTML = "Round: " + eboss;
    }
}



function EsconderInimigo() {
    document.getElementById("combate").style.visibility = "hidden";
    document.getElementById("barraVidainimigo").style.visibility = "hidden";
}



function CriarInimigo() {
    if(estagio <= 3){
        if(((eboss % 10 == 0) && (eboss % 30 != 0)) || (eboss == 31) || (eboss == 32) || (eboss == 34)){
            document.getElementById("boss").style.visibility = "visible";
            document.getElementById("boss").innerHTML = "SemiBoss";
            naoboss.forca = inimigo.forca
            naoboss.vidamaxima = inimigo.vidamaxima;

            Math.trunc(inimigo.vidamaxima *= 2);
            inimigo.vida = inimigo.vidamaxima;
            Math.trunc(inimigo.forca *= 1.5);


            estagio++;
        }
        else if((estagio == 4) && (eboss == 34)){
            document.getElementById("boss").innerHTML = "Boss";
            document.getElementById("boss").style.visibility = "visible";
            naoboss.forca = inimigo.forca
            naoboss.vidamaxima = inimigo.vidamaxima;

            Math.trunc(inimigo.vidamaxima *= 3);
            inimigo.vida = inimigo.vidamaxima;
            Math.trunc(inimigo.forca *= 2);
                
            
            recenteboss = true;
        }
        else if(recenteboss == true){
            document.getElementById("boss").style.visibility = "hidden";
            Math.trunc(inimigo.vidamaxima = naoboss.vidamaxima * 1.2);
            Math.trunc(inimigo.forca = naoboss.forca * 1.1);
            inimigo.vida = inimigo.vidamaxima;
            
            recenteboss = false;
        }
        else{
            document.getElementById("boss").style.visibility = "hidden";
            Math.trunc(inimigo.forca *= 1.1);
            Math.trunc(inimigo.vidamaxima *= 1.2);
            inimigo.vida = inimigo.vidamaxima;

        }

    }
}



function ClickAtaque() {
    var ataque = jogador.forca + ajudante1.forca + ajudante2.forca;
    if(lutando == true){
        inimigo.vida = inimigo.vida - (jogador.forca + ajudante1.forca + ajudante2.forca);

    }
    else if(inimigo.vida < 0){
        InimigoMorrer();
    }
}



function Lutar() {
    document.getElementById("barraVidainimigo").style.visibility = "visible";
    document.getElementById("combate").style.visibility = "visible";
    lutando = true;
    InimigoAtacar();
}
