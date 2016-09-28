guess-the-number
================

<h3>Background:</h3>
This is an exercise from <b>Day 2, Week 4 of MakerSquare</b>. We had only just begun learning JS in Week 4, so I had only about a day and a half of instruction and practice before making this app, and <b>I have chosen to leave the code as-is to document where my skills were at that time</b> and to serve as a comparison to what I can do today.

I decided to add a basic <b>keyframes animation</b> to the opening sequence, which I had just learned at an optional lecture three days prior to making this app. I also included some CSS styling- we had not at this point in the course had any formal CSS instruction, and I was using this project as an attempt to teach myself and become familiar with CSS.

<h3>Rules:</h3>
The game is simple enough: a random number 1-100 is chosen, along with three random landmine numbers. Your goal is to guess the secret number without triggering a landmine. You get as many guesses as you need, and you will be told whether your guess is too high or low. The three divs in the middle of the screen correspond to the landmine values, and will change color based on the proximity of your guess.

<h3>Version 2.0</h3>
I'm cleaning up the code with what I know now. Using closures to contain most of the game logic and commands, and using as little jQuery as is necessary. I will also be implementing bootstraps for a cleaner layout.