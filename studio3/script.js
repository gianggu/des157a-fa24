(function(){
    'use strict'
    console.log('reading JS');

    const body = document.querySelector('body');
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    const gameData = {
        dice: ['images/1star.png', 'images/2star.png', 'images/3star.png', 'images/4star.png', 'images/5star.png', 'images/6star.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function() {
        
        const startSound = new Audio('sounds/startSound.mp3');
        startSound.play();

        console.log(gameData.index);
        gameData.index = Math.round(Math.random() );
        // document.body.style.backgroundImage = "url('images/dice-bg.png')";
        body.className = "body-with-bg";
        // gameControl.style.padding = '10px';
        gameControl.style.border = 'none';
        gameControl.style.backgroundImage = 'none';
        gameControl.innerHTML = '<h2>Collect the stars!</h2>';
        gameControl.innerHTML += '<button id="roll">Start searching</button>';
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;

        document.getElementById('roll').addEventListener('click', function() {

            gameControl.style.padding = '10px';

            throwDice();
            console.log('Roll the dice!');
            setUpTurn();
            console.log('set up the turn!');
        });
    });
    
    function setUpTurn() {
        actionArea.innerHTML = '<button id="quit">Wanna Quit?</button>';

        document.getElementById('quit').addEventListener('click', function() {
            location.reload();
        });
    }

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;

        console.log(gameData.dice[gameData.roll2-1]);

        game.innerHTML += `<img src=" ${gameData.dice[gameData.roll1-1] }">
        <img src=" ${gameData.dice[gameData.roll2-1]} ">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        if (gameData.rollSum == 2) {
            const blackHoleSound = new Audio('sounds/blackHoleSound.mp3');
            blackHoleSound.play();

            game.innerHTML += '<p>Help! Two black holes! Sucking up... your stars...</p>';
            gameData.score[gameData.index] = 0 ;
            gameData.index ? (gameData.index  = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);

        }
        else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
            const blackHoleSound = new Audio('sounds/blackHoleSound.mp3');
            blackHoleSound.play();

            gameData.index ? (gameData.index  = 0) : (gameData.index = 1);
            game.innerHTML = `<p>Sorry, you caught a black hole. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            const twinkleSound = new Audio('sounds/twinkleSound.mp3');
            twinkleSound.play();
            
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function() {
                setUpTurn();
            });

            document.getElementById('pass').addEventListener('click', function() {
                gameData.index ? (gameData.index  = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h1>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h1>`;
            score.className = "center";
            actionArea.innerHTML = '<button id="quit">Start a new game?</button>';
            console.log('Action Area InnerHTML changed:', actionArea.innerHTML);

            
            gameControl.innerHTML = '';
        } 
        else {
            showCurrentScore();  
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<h1><strong>SCORE:<br> </strong> 
        ${gameData.players[0]} - ${gameData.score[0]} <br> ${gameData.players[1]} - ${gameData.score[1]}</h1>`;        
    }

})();
``