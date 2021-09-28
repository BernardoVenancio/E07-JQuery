$(document).ready(()=> {
    atualizaPontos();
    atualizaErros()
    $(".cards").flip({
        trigger:'manual'
    })
    $(".cards").click(function(){
        if(this.state == "unclicked"){
            $(this).flip(true)
            this.state = "clicked"
            cardPair.push(this);
            check()
            if(ligado == false && pontos != pontuacaoMaxima){
                start();
            }
        }
    })
})

//Variáveis Jogo Memória
var cards = $(".cards").get()
var firstClick = false;
var cardPair = [];
var pontos = 0;
var tentativas = 0;
const pontuacaoMaxima = 8;

//Variáveis Cronômetro
var minutos = 0;
var segundos = 0;
var t;
var ligado = false;


cards.forEach(card => {
    card.state = "unclicked"
})

function check(){
    if(cardPair.length == 2){
        if(cardPair[0].querySelector('.back>img').src == cardPair[1].querySelector('.back>img').src ){
            matched()
        }else{
            unmatched(cardPair[0],cardPair[1])
        }
    }
}

function matched(){
    cardPair[0].state = "blocked"
    cardPair[1].state = "blocked"
    cardPair = []
    pontos++;
    atualizaPontos()
    venceuJogo();
}

function unmatched(firstCard,secondCard){
    setTimeout(() => {
        $(firstCard).flip(false);
        $(secondCard).flip(false);
        firstCard.state = "unclicked"
        secondCard.state = "unclicked"
        tentativas++;
        atualizaErros();
    }, 750);
    cardPair = []

}

//Função que faz uma ação caso a carta seja virada
$(".cards").on('flip:done',function(){
    var flip = $(this).data("flip-model");
    if(flip.isFlipped){
        console.log("OK")
        
    }
    
})

//Embaralha as cartas
function embaralhar(){
    var images = $(".back>img");
    var sources = ['./Memoria/Ainz.png','./Memoria/Albedo.png','./Memoria/Aqua.png','./Memoria/Emilia.png','./Memoria/Filo.png','./Memoria/Ram.jpg','./Memoria/Raphtalia.png','./Memoria/Rem.png','./Memoria/Ainz.png','./Memoria/Albedo.png','./Memoria/Aqua.png','./Memoria/Emilia.png','./Memoria/Filo.png','./Memoria/Ram.jpg','./Memoria/Raphtalia.png','./Memoria/Rem.png']
    for( let i = sources.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i)
        var temp = sources[i]
        sources[i] = sources[j]
        sources[j] = temp
    }
    for(let i = 0; i < images.length;i++){
        images[i].src = sources[i];
    }
}

function reiniciarJogo(){
    $(".cards").flip(false)
    cards.forEach(card => {
        card.state = "unclicked"
    })
    cardPair = [];
    tentativas = 0;
    pontos = 0;
    atualizaPontos();
    atualizaErros();
    setTimeout(() => {
        embaralhar()
    }, 750);
}
$("#reiniciar").click(function(){
    reiniciarJogo();
    resetStopwatch();
})

const atualizaPontos = () =>{
    $(".pontuacao span").text(pontos);
}
const atualizaErros = () =>{
    $(".erros span").text(tentativas);
}
function venceuJogo(){
    if(pontos == 8){
        stop()
    }
}

embaralhar()
//FUNÇÕES CRONOMETRO

//LOGICA DO CRONOMETO
function startTimer(){
    if(segundos < 59){
        segundos++;
        atualizaSegundos();
    }else{
        segundos = 0;
        minutos++;
        atualizaSegundos();
    }
    if(minutos <= 59){
        atualizaMinutos();
    }else{
        stop()
    }
}

//INICIA O CRONOMETO, INDICA QUE ELE ESTÁ LIGADO E DEFINE UM INTERVALO DE 1000ms (1 SEGUNDO)
function start(){
    if(ligado == true){
        return
    }
    t = setInterval(startTimer,1000);
    ligado = true;
}

//FUNÇÃO QUE PAUSA O CRONOMETO
function stop(){
    clearInterval(t);
    ligado = false;
}

//REINICIA O CRONOMETRO E "DESLIGA" ELE , ZERANDO TAMBEM AS VARIAVEIS DE QUE CORRESPONDEM AO TEMPO, ALÉM DE
//ATUALIZAR O DOM

function resetStopwatch(){
    clearInterval(t);
    segundos = 0;
    minutos = 0;
    atualizaSegundos();
    atualizaMinutos();
    ligado = false;
}

//FUNÇÕES PARA ATUALIZAR O CRONOMETRO NO CODIGO HTML
function atualizaSegundos(){
    if(segundos <= 9){
        $("#segundos").html("0" + segundos);
    }else{
        $("#segundos").html(segundos);
    }
}
function atualizaMinutos(){
    if(minutos <= 9){
        $("#minutos").html("0" + minutos);
    }else{
        $("#minutos").html(minutos);
    }
}
//PARA O CRONOMETO CASO O JOGADOR TENHA VENCIDO