var level = 1;
var currentPress = level - 1;
var pattern = [];
var gameStart = 0;
var game_over = 0;
function getRandomInt() {
    return Math.floor(Math.random() * 4) + 1;
}

$('.btn').click(function (event) {
    if (gameStart) {
        btnAnimation($(this));
        playSound(this.id);
        checkUserSeq(this);
    }
    if(game_over){
        gameOver();
    }
    


})

$(document).keypress(function () {
    if (gameStart == 0) {
        game_over = 0;
        pattern.push(getRandomInt());
        showSqUser();
        gameStart = 1;
        $('#level-title').text("level " + level);
    }
    
});


function getInputInt(btnId) {
    var input = 0;
    switch (btnId) {
        case 'green':
            input = 1;
            break;
        case 'red':
            input = 2;
            break;
        case 'yellow':
            input = 3;
            break;
        case 'blue':
            input = 4;
            break;
        default:
            break;
    }
    return input;

}

function btnAnimation(btn) {
    btn.addClass('pressed');

    setTimeout(() => {
        btn.removeClass('pressed');
    }, 100);
}
function checkUserSeq(btn) {
    if (getInputInt(btn.id) == pattern[currentPress]) {
        currentPress++;
    } else {
        console.log('Wrong');
        game_over = 1;
        gameOver();
    }

    if (currentPress == level) {
        pattern.push(getRandomInt());
        $('#level-title').text("level " + ++level);
        currentPress = 0;
        showSqUser();
        console.log(pattern);
    }
}
function showSqUser() {
    var num = pattern[level - 1];

    setTimeout(() => {
        var audioPath = "";
        switch (num) {
            case 1:
                btnAnimation($('.btn.green'));
                audioPath = 'sounds/green.mp3'

                break;
            case 2:
                btnAnimation($('.btn.red'));
                audioPath = 'sounds/red.mp3';

                break;
            case 3:
                btnAnimation($('.btn.yellow'));
                audioPath = 'sounds/yellow.mp3';

                break;
            case 4:
                btnAnimation($('.btn.blue'));
                audioPath = 'sounds/blue.mp3';

                break;
        }
        var audio = new Audio(audioPath);
        audio.play();
    }, 500);
}

function gameOver() {
    game_over = 1;
    $('body').addClass('game-over');
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    pattern = [];
    level = 1;
    currentPress = 0;
    gameStart = 0;
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 250);
    $('#level-title').text("Game Over, Press Any Key to Retry");
}

function playSound(btnId){
    console.log(btnId);
    var audioPath = '';
    switch (btnId) {
        case 'green':
            audioPath = 'sounds/green.mp3'

            break;
        case 'red':
            audioPath = 'sounds/red.mp3';

            break;
        case 'yellow':
            audioPath = 'sounds/yellow.mp3';

            break;
        case 'blue':
            audioPath = 'sounds/blue.mp3';

            break;
    }
    var audio = new Audio(audioPath);
    audio.play();
}