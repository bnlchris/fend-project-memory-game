// Set array for set of cards

var card_deck = [
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

// Set variables

let moves_taken = 0;
let card_pairs_matched = 0;
let moves_counter = 0;

const total_moves_per_turn = 2;
const total_card_pairs = 8;
const performance_rating = "3 stars";

let hours = 1;
let minutes = 1;
let seconds = 1;
let timer_start = false;
const game_timer;

const modal_element = $('.modal');

const performance_rating_element = $('.performance_rating');
const time_taken_element = $('.time_taken');
const moves_taken_element = $('.moves_taken');

const performance_rating_string = "Performance rating: ";
const time_taken_string = "Time taken: ";
const moves_taken_string = "Moves taken: ";
    

// Event Listener for entering the game

$('.card').click(function() {
      
      if(moves_taken === 0) {
        $(this).addClass('open');
        
        first_card = $(this);
        first_card_type = $(this).find('i').attr('class');
        
        moves_taken += 1;
      }
      
      else if (moves_taken === second_move) {
        $(this).addClass('open');
        
        second_card = $(this);
        second_card_type = $(this).find('i').attr('class');
        
        //compare both cards
        if (first_card_type === second_card_type) {
          cardMatchSuccess(first_card, second_card);
          
          //is game complete?
          if (card_pairs_matched === total_card_pairs) {
            gameCompleted();
          };
        } else if (first_card_type !== second_card_type) {
          cardMatchFail(first_card, second_card);
        };
        
        moves_taken = 0;
      };
    });

// Shoot this function when we have a match

function cardMatchSuccess(first_card, second_card) {
      first_card.addClass('match');
      second_card.addClass('match');
      card_pairs_matched += 1;
      moves_counter += 1;
      moveCounter(moves_counter);
    }

// Shoot this function if cards differ

function cardMatchFail(first_card, second_card) {
      first_card.addClass('not-a-match');
      second_card.addClass('not-a-match');
      moves_counter += 1;

      flipCards(first_card, second_card);
      moveCounter(moves_counter);
    }    

// CLose cards again if there is no match

function flipCards(first_card, second_card) {
      setTimeout(function(){
            first_card.removeClass('not-a-match open');
            second_card.removeClass('not-a-match open');
      },1000);
    };   

// Keeps track of number of moves

function moveCounter(moves_counter) {
      
    if(moves_counter > 1) {
    	$('.score-panel').find('.moves').text(moves_counter);
        $('.moves_text').text("Moves");
      } else if (moves_counter === 1) {
        $('.score-panel').find('.moves').text(moves_counter);
        $('.moves_text').text("Move");
      };

      // Keeps track of the number of moves and changes the star rating accordingly    
	if (moves_counter === 10) {
	    $('#first-star').removeClass('fa-star').addClass('fa-star-o');
	        performance_rating = "2 stars";
	      } else if (moves_counter === 15) {
	        $('#second-star').removeClass('fa-star').addClass('fa-star-o');
	        performance_rating = "1 star";
	      } else if (moves_counter === 20) {
	        $('#third-star').removeClass('fa-star').addClass('fa-star-o');
	        performance_rating = "0 stars";
	      }
    };

// This function initializes the modal element when the game is over

function gameCompleted() {
      
      clearInterval(game_timer);
      timer_start = false;

      // Opens the modal
      modal_element.css('display', 'block');

      performance_rating_element.text(performance_rating_string + performance_rating);
      time_taken_element.text(time_taken_string + $('.hours').text() +
       $('.colon_one').text() +
       $('.minutes').text() +
       $('.colon_two').text() +
       $('.seconds').text());
      moves_taken_element.text(moves_taken_string + moves_counter);

      // Makes the game restart
      $('.play_again_button').click(function() {
        restartGame();
        modal_element.css('display', 'none');
      });
    };  

// Stars running when FIRST card is clicked

$('.card').click(function() {
      if (timer_start === false) {
        timer();
        timer_start = true;
      }   

function timer() {
      game_timer = setInterval(function() {

          if(seconds < 60) {
            $('.seconds').text(seconds + "s");
            seconds = seconds + 1;
          }

          else if (seconds === 60) {
            $('.minutes').css('visibility', 'visible');
            $('.colon_two').css('visibility', 'visible');
            seconds = 0;
            $('.seconds').text(seconds + "s");
            $('.minutes').text(minutes + "m");
            minutes = minutes + 1;
            seconds = seconds + 1;

            if (minutes === 60) {
              $('.hours').css('visibility', 'visible');
              $('.colon_one').css('visibility', 'visible');
              seconds = 0;
              minutes = 0;
              $('.seconds').text(seconds + "s");
              $('.minutes').text(minutes + "m");
              $('.hours').text(hours + "hr");
              hours = hours + 1;
              minutes = minutes + 1;
              seconds = seconds + 1;
              };
          };
        }, 1000);
    };

// Restart button

$('.restart').click(function() {
      restartGame();
    });

function restartGame() {
      /**
       * Game board
       */
      // Returns all cards and scores back to the default state.
      $('.card').removeClass('open match');
      moves_taken = 0;
      card_pairs_matched = 0;
      performance_rating = "3 stars";

      /** Timer */
      clearInterval(game_timer);
      seconds = 0;
      minutes = 0;
      hours = 0;
      $('.colon_one').css('visibility', 'hidden');
      $('.minutes').css('visibility', 'hidden');
      $('.colon_two').css('visibility', 'hidden');
      $('.hours').css('visibility', 'hidden');
      $('.seconds').text(seconds + "s");
      $('.minutes').text(minutes);
      $('.hours').text(hours);
      timer_start = false;

      /** Moves counter */
      moves_counter = 0;
      $('.score-panel').find('.moves').text(moves_counter);

      /** Star rating */
      $('#first-star').removeClass('fa-star-o').addClass('fa-star');
      $('#second-star').removeClass('fa-star-o').addClass('fa-star');
      $('#third-star').removeClass('fa-star-o').addClass('fa-star');

      /** Shuffles all the cards */
      shuffle(card_deck);
      var shuffled_deck = card_deck;

      // Assigns new class values to each card, which in turn changes what they show
      $('#card_1').removeClass().addClass(shuffled_deck[0]);
      $('#card_2').removeClass().addClass(shuffled_deck[1]);
      $('#card_3').removeClass().addClass(shuffled_deck[2]);
      $('#card_4').removeClass().addClass(shuffled_deck[3]);
      $('#card_5').removeClass().addClass(shuffled_deck[4]);
      $('#card_6').removeClass().addClass(shuffled_deck[5]);
      $('#card_7').removeClass().addClass(shuffled_deck[6]);
      $('#card_8').removeClass().addClass(shuffled_deck[7]);
      $('#card_9').removeClass().addClass(shuffled_deck[8]);
      $('#card_10').removeClass().addClass(shuffled_deck[9]);
      $('#card_11').removeClass().addClass(shuffled_deck[10]);
      $('#card_12').removeClass().addClass(shuffled_deck[11]);
      $('#card_13').removeClass().addClass(shuffled_deck[12]);
      $('#card_14').removeClass().addClass(shuffled_deck[13]);
      $('#card_15').removeClass().addClass(shuffled_deck[14]);
      $('#card_16').removeClass().addClass(shuffled_deck[15]);

      };

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

});
