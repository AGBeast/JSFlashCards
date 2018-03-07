(function(window){

    let parentFrag = document.createDocumentFragment();            
    
    
//Game
var Game = function(el, option){
    this.el = document.getElementById(el);
    this.option = option;
    //Info section

    //here a div that will contain information is created and given the id of  info_div
    this.info_div = document.createElement("div");
    this.info_div.id = "info_div";
    // Deck

    //a div is created, given the id of deck_div which is passed into the Deck constructor
    this.deck_div = document.createElement("div");
    this.deck_div.id = "deck_div";
    this.gameDeck = new Deck(this.deck_div, option);
    this.gameDeck.buildDeck();

    var shuffleBtn = document.createElement("button");
    shuffleBtn.innerHTML = "Shuffle";
    shuffleBtn.onclick = this.gameDeck.shuffle.bind(this);

    this.info_div.appendChild(shuffleBtn);
    //Discard Pile
    //RUles

    this.el.appendChild(this.info_div);
    this.el.appendChild(this.deck_div);

}

//Info Section
//Deck
var Deck = function(deck_div, option){
    this.deckData = option.data;
    this.buildDeck = function(){
        deck_div.innerHTML = "";
        for(var i = this.deckData.length - 1; i>=0; i--){
            var card = new Card();
                card.id = "card-"+ i;
                card.data = this.deckData[i];
                card.buildCard(parentFrag);
        }
        deck_div.appendChild(parentFrag);
        this.stack(deck_div);
        
    }
   
}

/*
The shuffle function implements the Fisher-Yates shuffle
algorithm.
There is an explanation on wikipedia about it
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/
Deck.prototype.shuffle = function(){
    var cardsToShuffle = this.gameDeck.deckData;
    var m = cardsToShuffle.length, t, i;
    while(m){
        i = Math.floor(Math.random() * m--);
        t = cardsToShuffle[m];
        cardsToShuffle[m] = cardsToShuffle[i];
        cardsToShuffle[i] = t;
    }
    this.gameDeck.deckData = cardsToShuffle;
    this.gameDeck.buildDeck(this.deck_div);
}

Deck.prototype.stack = function(deck_div){
    //children returns an array of the children inside the deck_div container
    var cards = deck_div.children;
    for(var i = cards.length - 1; i >=0; i--){
        cards[i].style.top = i +"px";
        cards[i].style.left = i + "px";
        cards[i].classList.add("stacked_card");
    }
}

//Discard Pile
//Rules

//Deck
//Cards
//shuffle
//stack

//Cards
var Card = function(){
    this.id = "";
    this.data = "";
    this.cardContainer              = document.createElement("div");
    this.cardContainer.className    = "card_container";
    this.cardfront                  = document.createElement("div");
    this.cardfront.className        = "card_front";
    this.cardBack                   = document.createElement("div");
    this.cardBack.className         ="card_back";

    this.buildCard = function() {
        var flipDiv     = document.createElement("div");
        var frontValDiv = document.createElement("div");
       var  backValDiv  = document.createElement("div");
        var    catDiv   = document.createElement("div");
        
            flipDiv.className       = "flip";
            frontValDiv.className   = "front_val";
            backValDiv.className    = "back_val";
            catDiv.className        = "cat_val";

            //adding data to the frontValDiv
            frontValDiv.innerHTML   = this.data.q;
            backValDiv.innerHTML    = this.data.a;
            catDiv.innerHTML        = this.data.category;

            this.cardfront.appendChild(frontValDiv);
            this.cardfront.appendChild(catDiv);
            this.cardBack.appendChild(backValDiv);
            flipDiv.appendChild(this.cardfront);
            flipDiv.appendChild(this.cardBack);

            this.cardContainer.id = this.id;
            this.cardContainer.appendChild(flipDiv);
            this.cardContainer.onclick = cardClick;
            parentFrag.appendChild(this.cardContainer);
    }

}

var counter = 0;
function cardClick(evt){
    evt.currentTarget.classList.toggle("flip_card");
    evt.currentTarget.classList.toggle("slide_over");
    evt.currentTarget.style.zIndex = counter;
    counter++;
}
//val
//suit
//flip

//DiscardPile
var DiscardPile = function(){

}
//holders
//function that will either accept or reject

window.Game = Game;
})(window);


