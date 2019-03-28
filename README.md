Simon Game

This is a web application of the classic memory game called “Simon Game”. The web version is responsive and can be played on any devices – featuring 
-	Simple and easy-to-play design.
-	Settings button (where you can reset the game or switch to strict mode.
-	A “Strict mode” option – where no errors is allowed, and you have to restart the game.

User story:
-	Player press the game start button. 
-	Player is then shown the first button glowing –sequence where one of the buttons glow in colour and create a sound specific to that button.
-	Player proceeds to input the same sequence shown. If correct, player will be shown the next sequence (level) which includes previous sequence and an additional step. 
-	Number of levels achieved is shown in the middle of the page.
-	If player presses the wrong button and creates an error, player will see an error notification and the same sequence will be shown again until player got it right.
-	Player wins when completing 20 levels. Winning notification will be shown, and the game will be cleared and “level” shown as “0”. Player needs to click start button to start the game again.
-	Player can click “Reset” button while playing the same. Once clicked the game will be cleared and “level” shown as “0”. Player needs to click start button to start the game again. The game will restart to first random sequence of single step.

Game logic:
Initially, the game process is separately into 2 major parts: 
1.	Game sequence
2.	Player sequence
A global object called “game” is created with different properties.
I start of by starting the game sequence by using ‘Start button’. I use event listener to monitor click event on the start button.
Once event “click start” occurs, I make sure that the game is cleared and all game properties start from the beginning. 
Then the level of the same is added to “level 1” via “game.level++”, and “gameMove” function is run.

Game Sequence
Inside “gameMove” function:
First I make sure to show the game level.
Then I check that either
-	the game is clean without any errors.
-	The game is with an error and in strict mode.
Only if any of these two conditions is met, then game random sequence is generated.
The game needs to generate random sequence which is done by  game property called “generateRandomColor” function, which randomly picks out a color from “game.colors” property. Each time a random color is generated, it is pushed into “game.gameCount” array. CSS temporary class is added to the specific button of generated color via “setInterval” function until all items in “game.gameCount” array is complete in order to create the effect of glowing button while simultaneously add specific sound.

Player Sequence
The next step of the game is initiated by the player.
The game waits for click event on game buttons from the player. The color “id” of the game button that is clicked is then pass on to “game.color” property. Next, Function “playerMove” is run.

Inside “playerMove” function:
Firstly, the color id that was passed to “game.color” is pushed into “game.playerCount” array.
Then I use “addTempClass” function to execute color glow and sound activities to the button(s) that player clicked on.

Next “checkPlayerCount” function is run. In this step, “game.playerCount” array is tested against “game.gameCount” array using “for loop”.
If any of the arrays item is not equally the same, property “game.good” will be false and the “for loop” stops.
If all items are the same, the “for loop” completes both arrays, property “game.good will be true. Then “checkWin” function is run.

Inside “checkWin” function:
This function check if the player has made an error via property “game.good”.

If the player has made an error which means “game.good” is false, we have to check for strict mode status. 
-	If strict mode is on, the game sequence will be cleared so that the game starts again from single step and game level will show level 1. Then the next process is the same as below (when strict mode is off).
-	If strict mode is off, player will be shown an error notification, the player sequence will be cleared to an empty array and function “gameMove” is then run. In case of strict mode off, this will show the previous game sequence.

If the player is correct, then we have 2 conditions to check
-	If the player is correct and the game has not reached level 20, the same continues by increasing the game level, clearing “game.playerCount” array, “game.good” is true, and function “gameMove” is run to get the next game sequence.
-	If the player is correct and the game has reached level 20, winning notification will be down and the game is then cleared. Player will need to click “start” button if wishes to play again from the beginning.



Game testing:
I have strategically added “console.log” function on all major steps in order to make sure that the game has no errors and able to fix any errors that occur.

