//Creates a closure for the game- giving access only to generate, reset, and lognumbers functions so far.
var game = (function() {
  var secretNumber;
  var mine1;
  var mine2;
  var mine3;
  var mineArray = [];

  function generator(item) {
    return item = Math.floor(Math.random() * (1, 101) + 1);
    
  };

  function failsafe(array, target) {
    array.forEach(function(num) {
      if (num === target) {
        return num = generator(num);
      }
      else {
        console.log("check");
      };
    });
  };

  function resetBoard(callback) {
    secretNumber = generator(secretNumber);
    mine1 = generator(mine1);
    mine2 = generator(mine2);
    mine3 = generator(mine3);
    mineArray = [mine1, mine2, mine3];
    callback(mineArray, secretNumber);
  };

  return {
    generate: function() {
      generator(secretNumber);
      generator(mine1);
      generator(mine2);
      generator(mine3);
      failsafe(mineArray, secretNumber);
    },
    reset: function() {
      resetBoard(failsafe);
    },
    lognumbers: function() {
    return [mine1, mine2, mine3, secretNumber, mineArray];  
    }
  };
})();

game.generate();
game.reset();
console.log(game.lognumbers());



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