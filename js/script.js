// Create a list from deck elements

const card_deck = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"];  

//set variables

const card_values = [];
let cards_flipped = 0;
let numberOfmoves = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Make a new deck
function newBoard() {
  cards_flipped = 0;
  let output = "";
  shuffle(card_deck);
  for (let i = 0; i < card_deck.length; i++ {
    output += '<div id="tile_' + i + '" onclick="flipCard(this, \'' + card_deck[i] + '\')"></div>';
  })
  let getDeck = document.getElementsByClassName("deck");
  getDeck.innerHTML = output;
}

// Executes the newBoard function when loading the page

object.addEventListener("load", newBoard());

function flipCard(card, value) {
  if (card.innerHTML === "" && card_values.length < 2) {
    card.removeClass("card").addClass("open");
    card.innerHTML = value;
  }
}