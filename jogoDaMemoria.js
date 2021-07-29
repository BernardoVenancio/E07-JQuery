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
        }
    })
})

//Variáveis
var cards = $(".cards").get()
var firstClick = false;
var cardPair = [];
var pontos = 0;
var tentativas = 0;

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
    embaralhar()
    $(".cards").flip(false)
    cards.forEach(card => {
        card.state = "unclicked"
    })
    cardPair = [];
    tentativas = 0;
    pontos = 0;
    atualizaPontos();
    atualizaErros();
}
$("#reiniciar").click(function(){
    reiniciarJogo()
})

const atualizaPontos = () =>{
    $(".pontuacao span").text(pontos);
}
const atualizaErros = () =>{
    $(".erros span").text(tentativas);
}
embaralhar()