var game = {
    playerCount: [],
    gameCount: [],
    strict: false,
    totalLevel: 20,
    level: 0,
    good: true,
    colors: ["blue", "green", "pink", "yellow"],
    color: '',
    sound: {
        blue: new Audio('sound_1.mp3'),
        green: new Audio('sound_2.mp3'),
        pink: new Audio('sound_3.mp3'),
        yellow: new Audio('sound_4.mp3'),
    },
    // count: 0,
    generateRandomColor: function (){
        this.gameCount.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        console.log("Generated color " + this.gameCount);
    },
}


// strict listener//
$("#strict").click(function(){
    if($(this).attr('data-click-state') == 1) {
        game.strict = true;
        $(this).attr('data-click-state', 0)
        $(this).text("Strict mode on").addClass("btn_strict-green")
    } 
    else {
        game.strict = false;
        $(this).attr('data-click-state', 1)
        $(this).text("Strict mode off").removeClass("btn_strict-green")
    }
    console.log("from strict listener strict mode " + game.strict);
    clearGame();
    game.level++;
    gameMove();
})


// start button listener
$("#btn-start").click(function() {
    clearGame();
    console.log("from start");
    console.log(game.gameCount);
    console.log(game.playerCount);
    console.log(game.color);
    game.level++;
    gameMove();
});

//click listener //
$(".clickMe").click(function() {
    game.color = $(this).attr("id");
    console.log("Click Color " + game.color);  
    playerMove(); 
});

// setting listener //
$(".button_sett").click(function(){
    showSetting();
})

// reset listener //
$("#reset").click(function(){
    gameReset();
})

// reset game //
function gameReset (){
    clearGame();
    gameMove();
}

// show settings //
function showSetting(){
    let modal = $('#myModal');
    let btn = $("#myBtn");
    let closeBtn = $("#myModal .close");
    modal.style.display = "block";
    // When click close button
    $(closeBtn).click(function() {
        modal.style.display = "none";
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        };
    });
}

// Show error //
function showError (){
    console.log("from showError: wrong");
    let gameCount = 0;
    let playerError = setInterval(function() {
        $(".statement").text("Wrong! Try again");
        gameCount++;
        if(gameCount == 3) {
            $(".statement").text(game.level);
            clearInterval(playerError);
            game.playerCount = [];
            gameCount = 0;
        }
    }, 300);
}

// Add temporary color class
function addTempClass (color){
    $("#" + color).addClass(color +"-hover");
    playSound(color);
    setTimeout (function() {
        $("#" + color).removeClass(color+"-hover");
    }, 400);
}

// Play sound //
function playSound(color) {
    switch(color) {
        case'blue':
            game.sound.blue.play();
            break;
        case'green':
            game.sound.green.play();
            break;
        case'pink':
            game.sound.pink.play();
            break;
        case'yellow':
            game.sound.yellow.play();
            break;
        };
}


// Player move //
function playerMove (){
    game.playerCount.push(game.color);
    console.log("from playerMove");
    console.log(game.gameCount);
    console.log(game.playerCount);
    console.log(game.color);
    addTempClass(game.color);   
    // check player count //
    checkPlayerCount();
    checkWin();
}

// check player move if correct
function checkPlayerCount () {
    for(var i = 0; i < game.playerCount.length; i++) {
        if(game.playerCount[i] != game.gameCount[i]){
            game.good = false;
            console.log("from checkPlayerCount " + game.good);
            return false;
        }
        game.good = true;
        console.log("from checkPlayerCount " + game.good);        
    }   
}

// Check if player is correct //
function checkWin () {
    if(!game.good) {
        // if strict mode//
        if(game.strict){
            console.log("from playerMove " + game.strict);
            game.gameCount = [];
            game.level = 1;
        }
        game.good = false;
        showError();
        game.playerCount = [];
        gameMove();
    }
    // check end of level
    else if (game.playerCount.length == game.gameCount.length && game.playerCount.length < game.totalLevel){
        game.level++;
        game.playerCount = [];
        game.good = true;
        gameMove();
    }
    // check for winning 
    else if (game.playerCount.length == game.totalLevel) {
        $(".statement").text("Win! High five!"); 
        setTimeout (function() {
            $(".statement").text(game.level);
        }, 1000);
        clearGame();
    }  
}

// Game move //
function gameMove(){
    console.log("from gameMove " + game.level);
    $(".statement").text(game.level);
    if(game.good){
        game.generateRandomColor();
        console.log("generated from gameMove if game.good");
    }
    if(!game.good && game.strict){
        game.generateRandomColor();
        console.log("generated from gameMove if !game.good");
    }
    var i = 0;
    var gameInterval = setInterval(function(){
        gameColor = game.gameCount[i];
        console.log(gameColor);
        addTempClass(gameColor);
        i++;
        if(i == game.gameCount.length){
            clearInterval(gameInterval);   
        }
    }, 1000);
}


// clear game //
function clearGame (){
    game.level = 0;
    game.good = true;
    game.count = 0;
    game.color ='';
    game.gameCount = [];
    game.playerCount = [];
}




