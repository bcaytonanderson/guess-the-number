//Creates a closure for the game- giving access only to generate, reset, and lognumbers functions so far.
var game = (function() {
  var secretNumber;
  var mine1;
  var mine2;
  var mine3;
  var mineArray = [0,0,0];

  // var mineDistance = null;
  var mineDistances = [];
  var currentGuess = null;


//Resets all styles for beginning of game, for use in resetBoard function.
  function styleReset() {
    $(".landmine").attr('class', 'landmine');
    $("#user-input, #submit-button").prop("disabled", false);
    $('.readout').fadeOut(300);
    $('#user-input').val(' ');
    $('#bottom8').delay(300).fadeIn(300).delay(500).fadeOut(300);
  };

//Generates random number between 1-100
  function generate(item) {
    return item = Math.floor(Math.random() * (1, 100) + 1);
  };

//Checks that none of the landmine numbers are the same as the landmine.
  function failsafe(array, target) {
    array.forEach(function(num) {
      if (num === target) {
        return num = generate(num);
      }
      else {
        console.log("check");
      };
    });
  };

//Generates values for mines and secret number, and creates mineArray.
  function start(failsafeCallback) {
    secretNumber = generate(secretNumber);
    mine1 = generate(mine1);
    mine2 = generate(mine2);
    mine3 = generate(mine3);
    mineArray = [mine1, mine2, mine3];
    failsafeCallback(mineArray, secretNumber);
  };

//Resets all numbers, the mine array, and takes two callbacks (which are the failsafe function and the styleReset function)
  function resetBoard(failsafeCallback, styleResetCallback) {
    secretNumber = generate(secretNumber);
    mine1 = generate(mine1);
    mine2 = generate(mine2);
    mine3 = generate(mine3);
    mineArray = [mine1, mine2, mine3];
    failsafeCallback(mineArray, secretNumber);
    styleResetCallback();
  };

//Check's the user's input against the mineArray to see which mine is closest. The distance is calculated by absolute value.
  function findMineDistances() {
    for (var i = 0; i < mineArray.length; i++) {
      mineDistances[i] = Math.abs(currentGuess - mineArray[i]);
    };
  };

//An event handler that adds classes and, thus, CSS styles the mine boxes according to their value's proximity to the currentGuess. In the switch, Cases2-4 are left blank so that they will execute the same code block as Case 5. The else case ensures that the default style is applied to a box if it is no longer within 5 of the currentGuess.
  function proximityWarning() {
    for (var i = 0; i < mineDistances.length; i++) {
      switch(mineDistances[i]) {
            case 1: $("#" + i).attr('class', 'landmine distance1');
                    break;
            case 2:
            case 3:
            case 4:
            case 5: $("#" + i).attr('class', 'landmine distance5');
                    break;
            default: $("#" + i).attr("class", "landmine");      
        };
    };    
  };

//A function for a loss scenario, using jQ to apply appropriate styles.
  function loss() {
    $("#user-input, #submit-button").prop("disabled", true);
    $(".landmine").addClass("loss");
    $(".loss").fadeIn(300);
    $('#bottom7').show(100);
  };

//A function for a win scenario.
  function win() {
      $('#submit-button').attr('disabled', 'disabled');
      $('.landmine').addClass("winText");
      $('.wintext').fadeIn(300);
      $('#bottom6').fadeIn(300);
  };

//When a guess is submitted by the user, this function checks all conditions and performs the proper response- either win or loss, or whether the guess is higher or lower than the number (the latter two of which also call the proximityWarning function).
  function submitGuess() {
    currentGuess = $("#user-input").val();
    findMineDistances();

    if (mineDistances.includes(0)) {
      loss();
    }
    else if (currentGuess > secretNumber) {
      proximityWarning();
      $('#bottom5').fadeIn(300).delay(1000).fadeOut(300);
    }
    else if (currentGuess < secretNumber) {
      proximityWarning();
      $('#bottom4').fadeIn(300).delay(1000).fadeOut(300);
    }
    else {
      win();
    }
  };

//Available methods to the game object.
  return {
    start: function() {
      start(failsafe);
    },
    reset: function() {
      resetBoard(failsafe, styleReset);
    },
    lognumbers: function() {
      return [mine1, mine2, mine3, secretNumber, mineArray];  
    },
    newGuess: function() {
      submitGuess();
    }
  };
})();


//Once the page loads, this jQ function flashes the instructions at the bottom of the game field.
window.onload = function() {
  $('#bottom').delay(600).fadeIn(500).delay(500).fadeOut(500, function() {
    $('#bottom1').fadeIn(500).delay(500).fadeOut(500, function() {
      $('#bottom2').fadeIn(500).delay(500).fadeOut(500, function() {
        $('#bottom3').fadeIn(500).delay(500).fadeOut(500);
      });
    });
  });

  game.start();

  console.log(game.lognumbers());

  $('#user-input').click(function() {$(this).val('');});

  $("#submit-button").on("click", function(e) {
    game.newGuess();
  });

  $("#reset-button").on("click", function(e) {
    game.reset();
  })
};




//===============================================
//===============================================

//This is the legacy code for this project- done to practice jQuery events. I've left it intact for comparison.

// var secretNumber = parseInt(Math.random() * 100, 10) + 1;
// var landmine1 = parseInt(Math.random() * 100, 10) + 1;
// var landmine2 = parseInt(Math.random() * 100, 10) + 1;
// var landmine3 = parseInt(Math.random() * 100, 10) + 1;
// var landminesArray = [landmine1, landmine2, landmine3];

// var closestLandmine = null;
// var landmineDistance = null;
// var currentGuess = null;

// function generator(item) {
//   item = parseInt(Math.random() * 100, 10) + 1;
// };

// function failsafe(array) {
//   array.forEach(function(num) {
//     if (num === secretNumber) {
//       num = generator(num);
//     };
//   };
//   failsafe(array);
// };

// function findClosestLandmine() {
//   landmineDistance = 100;
//   for (var i in landminesArray) {
//     var difference = (Math.abs(currentGuess - landminesArray[i]));
//     if (difference < landmineDistance) {
//       landmineDistance = difference;
//       closestLandmine = i;
//     }
//   }
// }

// function newGuess() {
//   if (this.id == closestLandmine) {
//     switch(landmineDistance) {
//     case 1:
//       $(this).css('background-color', '#fa001b');
//       break;
//     case 2:
//     case 3:
//     case 4:
//     case 5:
//       $(this).css('background-color',  '#F4B70D');
//       break;
//     defaultkey: "value", 
//       $(this).css('background-color',  '#ddd');
//       break;
//     }
//   }
//   else {$(this).css('background-color', '#ddd');}
// }



// $('#user-input').click(function() {$(this).val(' ');});

// $('.landmine').on("new-guess", newGuess);

// $('#submit-button').on('click', function (e) {
//   currentGuess = $('#user-input').val();
//   findClosestLandmine();
//     if (landmineDistance == 0) {
//       $('#submit-button').attr('disabled', 'disabled');
//       $('.landminelabel').fadeIn(300);
//       $('#bottom7').show(100);
//       $('.landmine').css({'background-color':'#000000'});
//       $('.mines').css('background-color', '#fa001b');
//     }

//     else if (currentGuess > secretNumber) { 
//       $('.landmine').trigger('new-guess');
//       $('#bottom5').fadeIn(300).delay(1000).fadeOut(300);
//     }

//     else if (currentGuess < secretNumber) {
//       $('.landmine').trigger('new-guess'); 
//       $('#bottom4').fadeIn(300).delay(1000).fadeOut(300);
//     }
    
//     else { 
//       $('#submit-button').attr('disabled', 'disabled');
//       $('.landmine').css('background-color', 'white');
//       $('.wintext').fadeIn(300);
//       $('#bottom6').fadeIn(300);
//       } 
// });

// $('#reset-button').on('click', function (e) {
//   secretNumber = parseInt(Math.random() * 100, 10) + 1;
//   landmine1 = parseInt(Math.random() * 100, 10) + 1;
//   landmine2 = parseInt(Math.random() * 100, 10) + 1;
//   landmine3 = parseInt(Math.random() * 100, 10) + 1;
//   landminesArray = [landmine1, landmine2, landmine3];

//   $('.landminelabel').removeAttr('style');
//   $('.mines').removeAttr('style');
//   $('.landmine').removeAttr('style');
//   $('.readout').fadeOut(300);
//   $('#submit-button').removeAttr('disabled', 'disabled');
//   $('#user-input').val(' ');
//   $('#bottom8').delay(300).fadeIn(300).delay(500).fadeOut(300);
// });


// $('#bottom').delay(500).fadeIn(500).delay(500).fadeOut(500, function() {
//   $('#bottom1').fadeIn(500).delay(500).fadeOut(500, function() {
//     $('#bottom2').fadeIn(500).delay(500).fadeOut(500, function() {
//       $('#bottom3').fadeIn(500).delay(500).fadeOut(500);
//     });
//   });
// });