//selecting all required elements
const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    winText = resultBox.querySelector(".win-text"),
    replayBtn = resultBox.querySelector("button");


window.onload = () => { //once window loaded

    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available span
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show playboard section
    players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //this is a global variable beacuse we've used this variable inside multiple functions
let runBot = true;

//user click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O"; //if player choose (O) then change playerSign to O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element/box
        players.classList.add("active"); //add active class in players
        // if player select O the we will change the player sign to O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element/box
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //calling the winner function
    playBoard.style.pointerEvents = "none"; //once user select then user can't select  any other box until box select
    element.style.pointerEvents = "none"; //once user select any box that box cann't be selected again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will randomly delay to select unselected box
    setTimeout(() => {
        bot(runBot); //calling the bot function
    }, randomDelayTime); //passing random delay value
}

//bot click function
function bot(runBot) {
    if (runBot) { //if runbot is true then run the following code
        playerSign = "O";
        let array = []; //creating empty array ... we will store unclicked boxes index
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //if span has no child elements
                array.push(i); //inserting unclicked or unselected boxes inside array means that span has no children
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        if (array.length > 0) { // if array length is greater than 0
            if (players.classList.contains("player")) { //if players element contains .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element/box
                players.classList.remove("active");
                //if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //calling the winner function
            allBox[randomBox].style.pointerEvents = "none"; //once bot selected any box then use cann;t select or click on that
            playBoard.style.pointerEvents = "auto";
            playerSign = "X"; //passing the X value
        }
    }
}

//Select winner
function getId(classname) {
    return document.querySelector(".box" + classname).id; //return id value
}

function checkIdSign(val1, val2, val3, sign) { //checking all id values are equal to sign (X or O) or not if yes then return true
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() { //if one of the winning combination mathch then select the winner
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) ||
        checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) ||
        checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7)) {
        console.log(playerSign + " " + "is the winnner");
        //once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => { //we will delay to show the result
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        winText.innerHTML = `Player <p>${playerSign} won the game!</p>`
    } else {
        //if match has drawn
        //first we will check all id...if all span has id and no one won the game then we will draw the match
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" &&
            getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            winText.innerHTML = "Match has been drawn!"
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}