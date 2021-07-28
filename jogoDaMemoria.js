$(document).ready(()=> {
    var count = 0;
    $(".cards").flip({
        trigger:'manual'
    })
    $(".cards").click(function(){
        if(this.state == "unclicked"){
            $(this).flip(true)
            this.state = "clicked"
            count++;
            cardPair.push(this);
            check()
        }
    })
})

//Variáveis
var cards = $(".cards").get()
var firstClick = false;
var cardPair = []
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
    count = 0
    cardPair = []
}

function unmatched(firstCard,secondCard){
    setTimeout(() => {
        $(firstCard).flip(false);
        $(secondCard).flip(false);

    }, 800);
    cardPair[0].state = "unclicked"
    cardPair[1].state = "unclicked"
    count = 0
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

const resetar = () =>{
    $(".cards").flip();
    $(".cards").flip(false);
}
embaralhar()