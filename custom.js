let game = {
    playerCount: [],
    gameCount: [],
    win: false,
    strict: false,
    totalLevel: 3,
    level: 0,
    colors: ["blue", "green", "pink", "yellow"],
    color: '',
    sound: {
        blue: new Audio('coin_1.wav'),
        green: new Audio('coin_4.wav'),
        pink: new Audio('coin_5.wav'),
        yellow: new Audio('coin_6.wav'),
    },
    count: 0,
    generateRandomColor: function (){
        game.gameCount.push(game.colors[Math.floor(Math.random() * game.colors.length)]);
        console.log("Generated color " + game.gameCount);
    },

};
 

$(function(){
    // Start game //
    $("#btn-start").click(function() {
        console.log('click');
        game.level++;
        startGame();
        // game.count = 0;
        // game.strict = false;
        // game.gameCount = [];
        // game.playerCount = [];
        // if(!game.gameCount.length){
        //     game.generateRandomColor();
        // };

        //click listener //
        $(".clickMe").click(function() {
            color = $(this).attr("id");
            console.log("Click Color " + color);
            game.playerCount.push(color);
            console.log(color);
            addTempClass(color);
            // check player count
            if(!checkPlayerCount()) {
                showError();
                game.playerCount = [];
            }
            // check end of level
            if(game.playerCount.length == game.gameCount.length && game.playerCount.length < game.totalLevel){
                game.level++;
                game.playerCount = [];
                startGame();
            }
            // check for winning 
            if(game.playerCount.length == game.totalLevel) {
                $(".statement").text("Win! High five!");
            }

        });
        
    });

    // Show error //
    let showError = function(){
        console.log("error");
        game.count = 0;
        let playerError = setInterval(function() {
            $(".statement").text("Wrong!");
            game.count++;
            if(game.count == 3) {
                $(".statement").text(game.level);
                clearInterval(playerError);
                game.playerCount = [];
                game.count = 0;
            }
        }, 500);
    }

    // check player move if correct
    let checkPlayerCount = function() {
        for(var i = 0; i < game.playerCount.length; i++) {
            if(game.playerCount[i] != game.gameCount[i]){
                return false;
            }
        }
        return true;
    }

    // Game sequence //
    let startGame = function(){
        console.log(game.level);
        $(".statement").text(game.level);
        game.generateRandomColor();
        let i = 0;
        let gameInterval = setInterval(function(){
            game.color = game.gameCount[i];
            console.log(game.color);
            addTempClass(game.color);
            i++;
            if(i == game.gameCount.length){
                clearInterval(gameInterval);   
            }
        }, 900);
    };

   
 

    // Add temporary color class
    let addTempClass = function(color){
        $("#" + color).addClass(color +"-hover");
        playSound(color);
        setTimeout (function() {
            $("#" + color).removeClass(color+"-hover");
        }, 400);
    };

     // Play sound //
     let playSound = function(color) {
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
      };




    // // change strict mode
    // $('#strict').click(function(){
    //     if (game.strict == false) {
    //         game.strict = true;
    //         $('#strict').html('Strict mode on').addClass('btn_strict-green');
    //         } else {
    //         game.strict = false;
    //         $('#strict').html('Strict mode off').removeClass('btn_strict-green');
    //         }
    //         console.log(game.strict);
            
    //         clearGame();

    // });


    // // trigger model setting
    //     // Get the modal
    // let modal = $('#myModal');

    //     // Get the button that opens the modal
    // let btn = $("#myBtn");

    //     // Get the <span> element that closes the modal
    // let closeBtn = $("#modal-sett .close");

    //     // When the user clicks on the button, open the modal 
    // btn.onclick = function() {
    // modal.style.display = "block";
    // };

    //     // When the user clicks on (x), close the modal
    // closeBtn.onclick = function() {
    // modal.style.display = "none";
    // };

    //     // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    // if (event.target == modal) {
    //     modal.style.display = "none";
    //     };
    // };
    

    
    // // trigger model result 
    // $('.trigger').on('click', function() {
    //     $('.modal_result_wrapper').toggleClass('open');
    //     $('.wrapper').toggleClass('blur-it');
    //     return false;
    //  });







});

