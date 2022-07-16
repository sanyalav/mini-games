/*---------------Treasure------------------*/

var win_sound, click_sound, music_sound, map_source;
var choice = 1, map = 1;

choose_map();

function play_music() {
    choice++;
    if (choice % 2 == 0) {
        music_sound = new Audio("./sound/music.ogg");
        music_sound.play();
        music_sound.loop = true;
        document.getElementById("music").innerHTML = "Music Off";
    } else {
        music_sound.pause();
        document.getElementById("music").innerHTML = "Music On";
    }
    
}

function choose_map() {
    if (map == 1) {
        map_source = "./img/1.png";
    } else if (map == 2) {
        map_source = "./img/2.png";
    } else if (map == 3) {
        map_source = "./img/3.png";
    } else if (map == 4) {
        map_source = "./img/4.png";
    } else if (map == 5) {
        map_source = "./img/5.png";
    }
    document.getElementById("map").src = map_source;
}

// Get random number from 0 to 400:
var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
};

// Check distance between mouse click and treasure:
var getDistance = function(event, target) {
    var diffX = event.offsetX - target.x;
    var diffY = event.offsetY - target.y;
    // Distance counted by Piphaghor's Theorem:
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

// Get answer how far you are to the treasure:
var getDistanceHint = function(distance) {
    if (distance < 10) {
        return "Boiling Hot!";
    } else if (distance < 20) {
        return "Very Hot!";
    } else if (distance < 40) {
        return "Hot!";
    } else if (distance < 80) {
        return "Warm!";
    } else if (distance < 160) {
        return "Cool!";
    } else if (distance < 240) {
        return "Cold!";
    } else if (distance < 320) {
        return "Very Cold!";
    } else {
        return "Freezing!"
    }
};

// Set parameters:
var width = 400;
var height = 400;
var clicks = 0;

// Get random target position:
var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

function click_map(event) {
    click_sound = new Audio("./sound/click.ogg");
    click_sound.play();
    clicks++;
    // Get distance between event and target:
    var distance = getDistance(event, target);
    // Convert distance to answer:
    var distanceHint = getDistanceHint(distance);
    // Display answer:
    document.getElementById("answer").innerHTML = distanceHint;
    // If click is very close to the target than player wins:
    if (distance < 8) {
        win_sound = new Audio("./sound/money.ogg");
        win_sound.play();
        alert("Found the treasure in " + clicks + " clicks!");
        clicks = 0;
        map++;
        if (map > 5) {
            map = 1;
        }
        // Get random target position again:
        target = {
            x: getRandomNumber(width),
            y: getRandomNumber(height)
        };
        document.getElementById("answer").innerHTML = "Click on map!"
        choose_map();
    };
};


/*-----------------Dice--------------------*/

let sum1 = 0;
let sum2 = 0;
let img1 = document.getElementById("img1").src;
let img2 = document.getElementById("img2").src;
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let width1 = 1;
let width2 = 1;
let soundWin, soundLose, soundDraw, soundVictory, soundLost;

function Roll() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").innerHTML = dice1;
    document.getElementById("dice2").innerHTML = dice2;

    if (dice1 == 1) {
        img1 = "./img/Dice-1.png";
    } else if (dice1 == 2) {
        img1 = "./img/Dice-2.png";
    } else if (dice1 == 3) {
        img1 = "./img/Dice-3.png";
    } else if (dice1 == 4) {
        img1 = "./img/Dice-4.png";
    } else if (dice1 == 5) {
        img1 = "./img/Dice-5.png";
    } else if (dice1 == 6) {
        img1 = "./img/Dice-6.png";
    }
    document.getElementById("img1").src = img1;

    if (dice2 == 1) {
        img2 = "./img/Dice-1.png";
    } else if (dice2 == 2) {
        img2 = "./img/Dice-2.png";
    } else if (dice2 == 3) {
        img2 = "./img/Dice-3.png";
    } else if (dice2 == 4) {
        img2 = "./img/Dice-4.png";
    } else if (dice2 == 5) {
        img2 = "./img/Dice-5.png";
    } else if (dice2 == 6) {
        img2 = "./img/Dice-6.png";
    }
    document.getElementById("img2").src = img2;

    if (dice1 > dice2) {
        document.getElementById("res1").innerHTML = "Win";
        document.getElementById("res2").innerHTML = "Loose";
        document.getElementById("result_field").src = "./img/won.png";
        soundWin = new Audio("./sound/won.ogg");
        soundWin.play();
        sum1 += 1;
        width1 += 10;
        bar1.style.width = width1 + "%";

        document.getElementById("sum1").innerHTML = sum1;
        if (sum1 == 10) {
            let player1 = document.getElementById("player1").value;
            soundVictory = new Audio("./sound/victory.ogg");
            soundVictory.play();
            alert(player1 + " won! " + sum1 + " : " + sum2);
            sum1 = 0;
            sum2 = 0;
            width1 = 1;
            width2 = 1;
            bar1.style.width = width1 + "%";
            bar2.style.width = width2 + "%";
            document.getElementById("sum1").innerHTML = sum1;
            document.getElementById("sum2").innerHTML = sum2;
        }
    } else if (dice1 < dice2) {
        document.getElementById("res1").innerHTML = "Loose";
        document.getElementById("res2").innerHTML = "Win";
        document.getElementById("result_field").src = "./img/lose.png";
        soundLose = new Audio("./sound/lose.ogg");
        soundLose.play();
        sum2 += 1;
        width2 += 10;
        bar2.style.width = width2 + "%";
        document.getElementById("sum2").innerHTML = sum2;
        if (sum2 == 10) {
            let player2 = document.getElementById("player2").value;
            soundLost = new Audio("./sound/lost.ogg");
            soundLost.play();
            alert(player2 + " won! " + sum1 + " : " + sum2);
            sum1 = 0;
            sum2 = 0;
            width1 = 1;
            width2 = 1;
            bar1.style.width = width1 + "%";
            bar2.style.width = width2 + "%";
            document.getElementById("sum1").innerHTML = sum1;
            document.getElementById("sum2").innerHTML = sum2;
        }
    } else {
        document.getElementById("res1").innerHTML = "Draw";
        document.getElementById("res2").innerHTML = "Draw";
        document.getElementById("result_field").src = "./img/draw.png";
        soundDraw = new Audio("./sound/draw.ogg");
        soundDraw.play();
    }
}

function Player1() {
    let player1 = document.getElementById("player1").value;
    document.getElementById("name1").innerHTML = player1;
}

function Player2() {
    let player2 = document.getElementById("player2").value;
    document.getElementById("name2").innerHTML = player2;
}

/*----------------------Fifteen----------------------*/

// Array with numbers from 1 to 15 and empty symbol:
let values = ["1", "2", "3", "4",
              "5", "6", "7", "8",
              "9", "10", "11", "12",
              "13", "14", "15", ""];

// Help messages:
let help_msg1 = "Hi, there! Welcome back to\n'New Fifteen Puzzle Game'!\nYou have to solve a puzzle\nto get the below numbers:\n\n\ \ 1 \ \ 2 \ \ 3 \ \ 4\n \ 5 \ \ 6 \ \ 7 \ \ 8\n \ 9 10 11 12\n13 14 15";
let help_msg2 = "If you got this situation:\n13 15 14 at the last row,\nthan try to solve puzzle\nas you can see it below:\n\n\ \ \ \ \ \ \ 1 \ \ \ 2 \ \ \ 3\n \ 4 \ \ 5 \ \ \ 6 \ \ 7\n \ 8 \ \ 9 \ 10 11\n12 13 14 15";
let msg = help_msg1;

// Start values:
let moves;
let btn = "";  // <-- temp variable
let btn1 = document.getElementById("1").value;
let btn2 = document.getElementById("2").value;
let btn3 = document.getElementById("3").value;
let btn4 = document.getElementById("4").value;
let btn5 = document.getElementById("5").value;
let btn6 = document.getElementById("6").value;
let btn7 = document.getElementById("7").value;
let btn8 = document.getElementById("8").value;
let btn9 = document.getElementById("9").value;
let btn10 = document.getElementById("10").value;
let btn11 = document.getElementById("11").value;
let btn12 = document.getElementById("12").value;
let btn13 = document.getElementById("13").value;
let btn14 = document.getElementById("14").value;
let btn15 = document.getElementById("15").value;
let btn16 = document.getElementById("16").value;

// Check if player wins function:
function check_win() {
    if (btn1 == "1" && btn2 == "2" && btn3 == "3" && btn4 == "4" &&
        btn5 == "5" && btn6 == "6" && btn7 == "7" && btn8 == "8" &&
        btn9 == "9" && btn10 == "10" && btn11 == "11" && btn12 == "12" &&
        btn13 == "13" && btn14 == "14" && btn15 == "15" && btn16 == "") {
            winner_sound = new Audio("./sound/win.ogg");
            winner_sound.play();
            alert("You won with " + moves + " moves!");
            btn16 = " ";

    } else if (btn1 == "" && btn2 == "1" && btn3 == "2" && btn4 == "3" &&
               btn5 == "4" && btn6 == "5" && btn7 == "6" && btn8 == "7" &&
               btn9 == "8" && btn10 == "9" && btn11 == "10" && btn12 == "11" &&
               btn13 == "12" && btn14 == "13" && btn15 == "14" && btn16 == "15") {
                    winner_sound = new Audio("./sound/win.ogg");
                    winner_sound.play();
                    alert("You won with " + moves + " moves!");
                    btn1 = " ";
                    document.getElementById("image1").src = "./img/15.png";

    } else if (btn1 == "1" && btn2 == "2" && btn3 == "3" && btn4 == "4" &&
               btn5 == "5" && btn6 == "6" && btn7 == "7" && btn8 == "8" &&
               btn9 == "9" && btn10 == "10" && btn11 == "11" && btn12 == "12" &&
               btn13 == "13" && btn14 == "15" && btn15 == "14" && btn16 == "") {
                    moves = 0;
                    msg = help_msg2;
                    help(msg);
                    document.getElementById("image1").src = "./img/16.png";
    }
}

// Help function:
function help(msg) {
    alert(msg);
}


// Start game function:
function start() {
    msg = help_msg1;
    moves = 0;
    // Shuffle numbers:
    shuffle(values);
    btn1 = values[0], btn2 = values[1], btn3 = values[2], btn4 = values[3];
    btn5 = values[4], btn6 = values[5], btn7 = values[6], btn8 = values[7];
    btn9 = values[8], btn10 = values[9], btn11 = values[10], btn12 = values[11];
    btn13 = values[12], btn14 = values[13], btn15 = values[14], btn16 = values[15];
    // View shuffled numbers on the screen:
    document.getElementById("1").value = btn1;
    document.getElementById("2").value = btn2;
    document.getElementById("3").value = btn3;
    document.getElementById("4").value = btn4;
    document.getElementById("5").value = btn5;
    document.getElementById("6").value = btn6;
    document.getElementById("7").value = btn7;
    document.getElementById("8").value = btn8;
    document.getElementById("9").value = btn9;
    document.getElementById("10").value = btn10;
    document.getElementById("11").value = btn11;
    document.getElementById("12").value = btn12;
    document.getElementById("13").value = btn13;
    document.getElementById("14").value = btn14;
    document.getElementById("15").value = btn15;
    document.getElementById("16").value = btn16;
}

// Shuffle numbers function:
function shuffle(values) {
    let currentIndex = values.length, randomIndex;
    // While there remain elements to shuffle:
    while (currentIndex != 0) {
        // Pick a remain element:
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element:
        [values[currentIndex], values[randomIndex]] = [values[randomIndex], values[currentIndex]];
    }
    return values;
}

// Functions for pressing all buttons:
function btn1_click() {
    if (btn2 == "") {
        btn = btn2;
        btn2 = btn1;
        btn1 = btn;
        document.getElementById("1").value = btn1;
        document.getElementById("2").value = btn2;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn5 == "") {
        btn = btn5;
        btn5 = btn1;
        btn1 = btn;
        document.getElementById("1").value = btn1;
        document.getElementById("5").value = btn5;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn2_click() {
    if (btn1 == "") {
        btn = btn1;
        btn1 = btn2;
        btn2 = btn;
        document.getElementById("1").value = btn1;
        document.getElementById("2").value = btn2;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn3 == "") {
        btn = btn3;
        btn3 = btn2;
        btn2 = btn;
        document.getElementById("2").value = btn2;
        document.getElementById("3").value = btn3;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn6 == "") {
        btn = btn6;
        btn6 = btn2;
        btn2 = btn;
        document.getElementById("2").value = btn2;
        document.getElementById("6").value = btn6;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn3_click() {
    if (btn2 == "") {
        btn = btn2;
        btn2 = btn3;
        btn3 = btn;
        document.getElementById("2").value = btn2;
        document.getElementById("3").value = btn3;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn4 == "") {
        btn = btn4;
        btn4 = btn3;
        btn3 = btn;
        document.getElementById("3").value = btn3;
        document.getElementById("4").value = btn4;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn7 == "") {
        btn = btn7;
        btn7 = btn3;
        btn3 = btn;
        document.getElementById("3").value = btn3;
        document.getElementById("7").value = btn7;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn4_click() {
    if (btn3 == "") {
        btn = btn3;
        btn3 = btn4;
        btn4 = btn;
        document.getElementById("3").value = btn3;
        document.getElementById("4").value = btn4;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn8 == "") {
        btn = btn8;
        btn8 = btn4;
        btn4 = btn;
        document.getElementById("4").value = btn4;
        document.getElementById("8").value = btn8;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn5_click() {
    if (btn1 == "") {
        btn = btn1;
        btn1 = btn5;
        btn5 = btn;
        document.getElementById("1").value = btn1;
        document.getElementById("5").value = btn5;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn6 == "") {
        btn = btn6;
        btn6 = btn5;
        btn5 = btn;
        document.getElementById("5").value = btn5;
        document.getElementById("6").value = btn6;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn9 == "") {
        btn = btn9;
        btn9 = btn5;
        btn5 = btn;
        document.getElementById("5").value = btn5;
        document.getElementById("9").value = btn9;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn6_click() {
    if (btn2 == "") {
        btn = btn2;
        btn2 = btn6;
        btn6 = btn;
        document.getElementById("2").value = btn2;
        document.getElementById("6").value = btn6;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn5 == "") {
        btn = btn5;
        btn5 = btn6;
        btn6 = btn;
        document.getElementById("5").value = btn5;
        document.getElementById("6").value = btn6;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn7 == "") {
        btn = btn7;
        btn7 = btn6;
        btn6 = btn;
        document.getElementById("6").value = btn6;
        document.getElementById("7").value = btn7;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn10 == "") {
        btn = btn10;
        btn10 = btn6;
        btn6 = btn;
        document.getElementById("6").value = btn6;
        document.getElementById("10").value = btn10;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn7_click() {
    if (btn3 == "") {
        btn = btn3;
        btn3 = btn7;
        btn7 = btn;
        document.getElementById("3").value = btn3;
        document.getElementById("7").value = btn7;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn6 == "") {
        btn = btn6;
        btn6 = btn7;
        btn7 = btn;
        document.getElementById("6").value = btn6;
        document.getElementById("7").value = btn7;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn8 == "") {
        btn = btn8;
        btn8 = btn7;
        btn7 = btn;
        document.getElementById("7").value = btn7;
        document.getElementById("8").value = btn8;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn11 == "") {
        btn = btn11;
        btn11 = btn7;
        btn7 = btn;
        document.getElementById("7").value = btn7;
        document.getElementById("11").value = btn11;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn8_click() {
    if (btn4 == "") {
        btn = btn4;
        btn4 = btn8;
        btn8 = btn;
        document.getElementById("4").value = btn4;
        document.getElementById("8").value = btn8;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn12 == "") {
        btn = btn12;
        btn12 = btn8;
        btn8 = btn;
        document.getElementById("8").value = btn8;
        document.getElementById("12").value = btn12;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn7 == "") {
        btn = btn7;
        btn7 = btn8;
        btn8 = btn;
        document.getElementById("7").value = btn7;
        document.getElementById("8").value = btn8;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn9_click() {
    if (btn5 == "") {
        btn = btn5;
        btn5 = btn9;
        btn9 = btn;
        document.getElementById("5").value = btn5;
        document.getElementById("9").value = btn9;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn10 == "") {
        btn = btn10;
        btn10 = btn9;
        btn9 = btn;
        document.getElementById("9").value = btn9;
        document.getElementById("10").value = btn10;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn13 == "") {
        btn = btn13;
        btn13 = btn9;
        btn9 = btn;
        document.getElementById("9").value = btn9;
        document.getElementById("13").value = btn13;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn10_click() {
    if (btn6 == "") {
        btn = btn6;
        btn6 = btn10;
        btn10 = btn;
        document.getElementById("6").value = btn6;
        document.getElementById("10").value = btn10;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn9 == "") {
        btn = btn9;
        btn9 = btn10;
        btn10 = btn;
        document.getElementById("9").value = btn9;
        document.getElementById("10").value = btn10;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn11 == "") {
        btn = btn11;
        btn11 = btn10;
        btn10 = btn;
        document.getElementById("10").value = btn10;
        document.getElementById("11").value = btn11;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn14 == "") {
        btn = btn14;
        btn14 = btn10;
        btn10 = btn;
        document.getElementById("10").value = btn10;
        document.getElementById("14").value = btn14;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn11_click() {
    if (btn7 == "") {
        btn = btn7;
        btn7 = btn11;
        btn11 = btn;
        document.getElementById("7").value = btn7;
        document.getElementById("11").value = btn11;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn10 == "") {
        btn = btn10;
        btn10 = btn11;
        btn11 = btn;
        document.getElementById("10").value = btn10;
        document.getElementById("11").value = btn11;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn12 == "") {
        btn = btn12;
        btn12 = btn11;
        btn11 = btn;
        document.getElementById("11").value = btn11;
        document.getElementById("12").value = btn12;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn15 == "") {
        btn = btn15;
        btn15 = btn11;
        btn11 = btn;
        document.getElementById("11").value = btn11;
        document.getElementById("15").value = btn15;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn12_click() {
    if (btn16 == "") {
        btn = btn12;
        btn12 = btn16;
        btn16 = btn;
        document.getElementById("12").value = btn12;
        document.getElementById("16").value = btn16;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn11 == "") {
        btn = btn12;
        btn12 = btn11;
        btn11 = btn;
        document.getElementById("11").value = btn11;
        document.getElementById("12").value = btn12;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn8 == "") {
        btn = btn8;
        btn8 = btn12;
        btn12 = btn;
        document.getElementById("8").value = btn8;
        document.getElementById("12").value = btn12;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn13_click() {
    if (btn9 == "") {
        btn = btn9;
        btn9 = btn13;
        btn13 = btn;
        document.getElementById("9").value = btn9;
        document.getElementById("13").value = btn13;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn14 == "") {
        btn = btn14;
        btn14 = btn13;
        btn13 = btn;
        document.getElementById("13").value = btn13;
        document.getElementById("14").value = btn14;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn14_click() {
    if (btn10 == "") {
        btn = btn10;
        btn10 = btn14;
        btn14 = btn;
        document.getElementById("10").value = btn10;
        document.getElementById("14").value = btn14;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn13 == "") {
        btn = btn13;
        btn13 = btn14;
        btn14 = btn;
        document.getElementById("13").value = btn13;
        document.getElementById("14").value = btn14;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn15 == "") {
        btn = btn15;
        btn15 = btn14;
        btn14 = btn;
        document.getElementById("14").value = btn14;
        document.getElementById("15").value = btn15;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn15_click() {
    if (btn11 == "") {
        btn = btn11;
        btn11 = btn15;
        btn15 = btn;
        document.getElementById("11").value = btn11;
        document.getElementById("15").value = btn15;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn14 == "") {
        btn = btn14;
        btn14 = btn15;
        btn15 = btn;
        document.getElementById("14").value = btn14;
        document.getElementById("15").value = btn15;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn16 == "") {
        btn = btn16;
        btn16 = btn15;
        btn15 = btn;
        document.getElementById("15").value = btn15;
        document.getElementById("16").value = btn16;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

function btn16_click() {
    if (btn12 == "") {
        btn = btn12;
        btn12 = btn16;
        btn16 = btn;
        document.getElementById("12").value = btn12;
        document.getElementById("16").value = btn16;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    } else if (btn15 == "") {
        btn = btn15;
        btn15 = btn16;
        btn16 = btn;
        document.getElementById("15").value = btn15;
        document.getElementById("16").value = btn16;
        moves++;
        click_sound = new Audio("./sound/click.ogg");
        click_sound.play();
    }
    check_win();
}

/*--------------Bulls and Cows--------------*/

var num1 = 0, num2 = 0, num3 = 0, num4 = 0, bulls = 0, cows = 0, tries = 0, count = 0;
var ran1, ran2, ran3, ran4, winner_sound, animal_sound;
var color1 = "black", color2 = "red", colorText = color1;
var col1 = ["id8_1", "id7_1", "id6_1", "id5_1", "id4_1", "id3_1", "id2_1", "id1_1"];
var col2 = ["id8_2", "id7_2", "id6_2", "id5_2", "id4_2", "id3_2", "id2_2", "id1_2"];
var col3 = ["id8_3", "id7_3", "id6_3", "id5_3", "id4_3", "id3_3", "id2_3", "id1_3"];
var col4 = ["id8_4", "id7_4", "id6_4", "id5_4", "id4_4", "id3_4", "id2_4", "id1_4"];
var col5 = ["id8_5", "id7_5", "id6_5", "id5_5", "id4_5", "id3_5", "id2_5", "id1_5"];
var col6 = ["id8_6", "id7_6", "id6_6", "id5_6", "id4_6", "id3_6", "id2_6", "id1_6"];

function randomNumbers() {
    ran1 = "" + Math.floor(Math.random() * 10);

    do {
        ran2 = "" + Math.floor(Math.random() * 10);
    } while (ran2 == ran1);
    
    do {
        ran3 = "" + Math.floor(Math.random() * 10);
    } while (ran3 == ran2 || ran3 == ran1);

    do {
        ran4 = "" + Math.floor(Math.random() * 10);
    } while (ran4 == ran3 || ran4 == ran2 || ran4 == ran1);
    // To see the random number
    //alert("" + ran1 + ran2 + ran3 + ran4);
}

randomNumbers();

function ent() {
    num1 = document.getElementById("numb1").value;
    num2 = document.getElementById("numb2").value;
    num3 = document.getElementById("numb3").value;
    num4 = document.getElementById("numb4").value;
    
    if (num1 != num2 && num1 != num3 && num1 != num4 &&
        num2 != num3 && num2 != num4 && num3 != num4) {
        
        document.getElementById("numb1").value = num1;
        document.getElementById("numb2").value = num2;
        document.getElementById("numb3").value = num3;
        document.getElementById("numb4").value = num4;

        document.getElementById(col1.slice(-1)).innerHTML = num1;
        document.getElementById(col1.slice(-1)).style.color = colorText;
        document.getElementById(col2.slice(-1)).innerHTML = num2;
        document.getElementById(col2.slice(-1)).style.color = colorText;
        document.getElementById(col3.slice(-1)).innerHTML = num3;
        document.getElementById(col3.slice(-1)).style.color = colorText;
        document.getElementById(col4.slice(-1)).innerHTML = num4;
        document.getElementById(col4.slice(-1)).style.color = colorText;
        col1.pop();
        col2.pop();
        col3.pop();
        col4.pop();
        if (col1.length == 0) {
            col1 = ["id8_1", "id7_1", "id6_1", "id5_1", "id4_1", "id3_1", "id2_1", "id1_1"];
            col2 = ["id8_2", "id7_2", "id6_2", "id5_2", "id4_2", "id3_2", "id2_2", "id1_2"];
            col3 = ["id8_3", "id7_3", "id6_3", "id5_3", "id4_3", "id3_3", "id2_3", "id1_3"];
            col4 = ["id8_4", "id7_4", "id6_4", "id5_4", "id4_4", "id3_4", "id2_4", "id1_4"];
        }
        check_values();

    } else if (num1 == 0 && num2 == 0 && num3 == 0 && num4 == 0) {
        alert("You have to find out random 4-digit number.\nAll four digits must be with different values.\nSet the digits and then press <ENT> button.\nYou will receive answer how many Bulls and\nCows do you have now.\n\nThe number of Bulls means how many digits in your code number are correct and stay in correct positions.\nThe number of Cows means how many digits in your code are correct but stay in wrong positions.");

    } else {
        alert("All numbers must be with different values! Try again");
    }
}

function check_values() {
    // Check Number of Bulls:
    if (num1 == ran1) {
        bulls += 1;
    }
    if (num2 == ran2) {
        bulls += 1;
    }
    if (num3 == ran3) {
        bulls += 1;
    }
    if (num4 == ran4) {
        bulls += 1;
    }
    // Check Number of Cows:
    if (num1 != ran1 && (num1 == ran2 || num1 == ran3 || num1 == ran4)) {
        cows += 1;
    }
    if (num2 != ran2 && (num2 == ran1 || num2 == ran3 || num2 == ran4)) {
        cows += 1;
    }
    if (num3 != ran3 && (num3 == ran1 || num3 == ran2 || num3 == ran4)) {
        cows += 1;
    }
    if (num4 != ran4 && (num4 == ran1 || num4 == ran2 || num4 == ran3)) {
        cows += 1;
    }
    document.getElementById(col5.slice(-1)).innerHTML = bulls;
    document.getElementById(col5.slice(-1)).style.color = colorText;
    document.getElementById(col6.slice(-1)).innerHTML = cows;
    document.getElementById(col6.slice(-1)).style.color = colorText;
    col5.pop();
    col6.pop();
    if (col5.length == 0) {
        col5 = ["id8_5", "id7_5", "id6_5", "id5_5", "id4_5", "id3_5", "id2_5", "id1_5"];
        col6 = ["id8_6", "id7_6", "id6_6", "id5_6", "id4_6", "id3_6", "id2_6", "id1_6"];
        count++;
            if (count % 2 == 0) {
                colorText = color1;
            } else {
                colorText = color2;
            }
    }
    tries += 1;
    if (bulls == 4) {
        winner_sound = new Audio("./sound/win.ogg");
        winner_sound.play();
        alert("You won with " + tries + " tries!");
    }
    if (bulls == 3) {
        animal_sound = new Audio("./sound/bull.ogg");
        animal_sound.play();
    } else if (bulls == 2) {
        animal_sound = new Audio("./sound/cow.ogg");
        animal_sound.play();
    } else if (bulls == 1 && cows == 3) {
        animal_sound = new Audio("./sound/horse.ogg");
        animal_sound.play();
    } else if (bulls == 1 && cows == 2) {
        animal_sound = new Audio("./sound/pig.ogg");
        animal_sound.play();
    } else if (bulls == 1 && cows == 1) {
        animal_sound = new Audio("./sound/ovechka.ogg");
        animal_sound.play();
    } else if (bulls == 1 && cows == 0) {
        animal_sound = new Audio("./sound/koza.ogg");
        animal_sound.play();
    } else if (bulls == 0 && cows == 4) {
        animal_sound = new Audio("./sound/cat.ogg");
        animal_sound.play();
    } else if (bulls == 0 && cows == 3) {
        animal_sound = new Audio("./sound/dog.ogg");
        animal_sound.play();
    } else if (bulls == 0 && cows == 2) {
        animal_sound = new Audio("./sound/petuh.ogg");
        animal_sound.play();
    } else if (bulls == 0 && cows == 1) {
        animal_sound = new Audio("./sound/chicken.ogg");
        animal_sound.play();
    } else {
        animal_sound = new Audio("./sound/push.ogg");
        animal_sound.play();
    }
    bulls = 0;
    cows = 0;
}

/*------------------R.P.S.------------------*/

var yourChoice, randomChoice;
var winSound, loseSound, drawSound;

function rock() {
    document.getElementById("your_choice").src = "./img/rock2.png";
    yourChoice = 1;
}

function paper() {
    document.getElementById("your_choice").src = "./img/paper2.png";
    yourChoice = 2;
}

function scissors() {
    document.getElementById("your_choice").src = "./img/scissors2.png";
    yourChoice = 3;
}

function Go() {
    randomChoice = Math.floor(Math.random() * 3 + 1);
    if (randomChoice == 1) {
        document.getElementById("mac_choice").src = "./img/rock.png";
    } else if (randomChoice == 2) {
        document.getElementById("mac_choice").src = "./img/paper.png";
    } else {
        document.getElementById("mac_choice").src = "./img/scissors.png";
    }
    check_result();
}

function check_result() {
    if (yourChoice == randomChoice) {
        document.getElementById("result_icon").src = "./img/draw.png";
        drawSound = new Audio("./sound/push.ogg");
        drawSound.play();
    } else if (yourChoice == 1 && randomChoice == 2) {
        document.getElementById("result_icon").src = "./img/lose.png";
        loseSound = new Audio("./sound/loose.ogg");
        loseSound.play();
    } else if (yourChoice == 1 && randomChoice == 3) {
        document.getElementById("result_icon").src = "./img/won.png";
        winSound = new Audio("./sound/win.ogg");
        winSound.play();
    } else if (yourChoice == 2 && randomChoice == 1) {
        document.getElementById("result_icon").src = "./img/won.png";
        winSound = new Audio("./sound/win.ogg");
        winSound.play();
    } else if (yourChoice == 2 && randomChoice == 3) {
        document.getElementById("result_icon").src = "./img/lose.png";
        loseSound = new Audio("./sound/loose.ogg");
        loseSound.play();
    } else if (yourChoice == 3 && randomChoice == 1) {
        document.getElementById("result_icon").src = "./img/lose.png";
        loseSound = new Audio("./sound/loose.ogg");
        loseSound.play();
    } else if (yourChoice == 3 && randomChoice == 2) {
        document.getElementById("result_icon").src = "./img/won.png";
        winSound = new Audio("./sound/win.ogg");
        winSound.play();
    }
}

/*------------------Hanoi-------------------*/

let sound_win;
let level = 1;
let level_value = "L: 1";
let list1 = [1], list2 = [], list3 = [], listCheck = [1];
let i;
let taken_number = 0, move = 0;
let min_move = 1;

function level_up() {
    taken_number = 0;
    list1 = [];
    list2 = [];
    list3 = [];
    listCheck = [];
    level += 1;
    if (level > 7) {
        level = 1;
    }
    level_value = "L: " + level;
    document.getElementById("level").value = level_value;
    for (i = level; i > 0; i--) {
        list1.push(i);
        listCheck.push(i);
    }
    document.getElementById("list1").innerHTML = list1;
    min_move = 2**level - 1;
    move = 0;
    document.getElementById("min_moves").innerHTML = "Min: " + min_move;
    document.getElementById("moves").innerHTML = "Go: " + move;
    document.getElementById("list2").innerHTML = "";
    document.getElementById("list3").innerHTML = "";
    document.getElementById("button1").style.backgroundColor = "lightgrey";
    document.getElementById("button2").style.backgroundColor = "lightgrey";
    document.getElementById("button3").style.backgroundColor = "lightgrey";
    click_sound = new Audio("./sound/click.ogg");
    click_sound.play();
}

function button1_click() {
    if (list1.length > 0 && taken_number == 0) {
        taken_number = list1.pop();
        document.getElementById("button1").style.backgroundColor = "blue";
    } else if (taken_number != 0 && (list1.slice(-1) > taken_number || list1.length == 0)) {
        list1.push(taken_number);
        reset_values();
    }
    click_sound = new Audio("./sound/click.ogg");
    click_sound.play();
}

function button2_click() {
    if (list2.length > 0 && taken_number == 0) {
        taken_number = list2.pop();
        document.getElementById("button2").style.backgroundColor = "blue";
    } else if (taken_number != 0 && (list2.slice(-1) > taken_number || list2.length == 0)) {
        list2.push(taken_number);
        reset_values();
    }
    click_sound = new Audio("./sound/click.ogg");
    click_sound.play();
    check_wins(list2);
}

function button3_click() {
    if (list3.length > 0 && taken_number == 0) {
        taken_number = list3.pop();
        document.getElementById("button3").style.backgroundColor = "blue";
    } else if (taken_number != 0 && (list3.slice(-1) > taken_number || list3.length == 0)) {
        list3.push(taken_number);
        reset_values();
    }
    click_sound = new Audio("./sound/click.ogg");
    click_sound.play();
    check_wins(list3);
}

function reset_values() {
    document.getElementById("list1").innerHTML = list1;
    document.getElementById("list2").innerHTML = list2;
    document.getElementById("list3").innerHTML = list3;
    document.getElementById("button1").style.backgroundColor = "lightgrey";
    document.getElementById("button2").style.backgroundColor = "lightgrey";
    document.getElementById("button3").style.backgroundColor = "lightgrey";
    taken_number = 0;
    move++;
    document.getElementById("moves").innerHTML = "Go: " + move;
}

function check_wins(list) {
    if (list.toString() == listCheck.toString()) {
        sound_win = new Audio("./sound/win.ogg");
        sound_win.play();
        alert("You won with " + move + " moves!");
        level_up();
    }
}

function helpMenu() {
    alert("You have to move all numbers from the\n1st list to the 2nd or to the 3rd one.\nEach move allows you to move only the\nlast number from any selected list.\nFirst select the list from where you\nlike to move the last number and then\nselect the list where you like to put\nthis number to. You can place selected\nnumber only to the empty list or to\nthe other list with numbers after a\nbigger number than your selected one.");
}

/*----------------------The End-----------------------*/