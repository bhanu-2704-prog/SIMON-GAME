let start = false;
let level = 0;
let highestScore = 0;

let compChoices = [];
let userChoices = [];

let highScoreBtn = document.querySelector(".highestScore");
highScoreBtn.classList.add("hide");

document.addEventListener("keypress" , () => {
    if (start == false) {
        console.log("Game started");
        start = true;
        levelUp();
    }
})

function chooseBtn() {

    let number = Math.floor(Math.random()*4)+1;
    let selectedBtn = document.querySelector(`#box${number}`);
    console.log("comp chose " + selectedBtn.getAttribute("id"));
    return selectedBtn;
}

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    },200);
}

function levelUp() {
    
    level++;
    let para = document.querySelector("p");
    para.innerText = `LEVEL ${level}`;

    let selectedBtn = chooseBtn();
    flashBtn(selectedBtn);
    compChoices.push(selectedBtn.getAttribute("id"));
    console.log(compChoices);
}

function checkWin() {
    for (let i=0 ; i<count ; i++) {
        if (userChoices[i] != compChoices[i]) {
            return false;
        } else {
            if (i == (count-1)) {
                return true;
            }
        }
    }
}

function flashError() {
    let body = document.querySelector("body");
    body.classList.add("codeRed");
    setTimeout(() => {
        body.classList.remove("codeRed");
        setTimeout(() => {
            body.classList.add("codeRed");
            setTimeout(() => {
                body.classList.remove("codeRed");
            },200);
        },200);
    },200);
}

let count = 0;

let boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        flashBtn(box);
        userChoices.push(box.getAttribute("id"));
        console.log(userChoices);
        count++;
            
        if (checkWin()) {
            if (count == level ){
                userChoices = [];
                count = 0;
                levelUp();
            }
        } else {
            let para = document.querySelector("p");
            para.innerText = `Game Over at Level ${level}\n Press any key to restart.`;

            if (level > highestScore) {
                highestScore = level;
            }
            highScoreBtn.classList.remove("hide");
            highScoreBtn.innerText = `Highest Score: ${highestScore-1}`;
            reset();
            flashError();
        }
            
    })
})

function reset() {
    start = false;
    compChoices = [];
    userChoices = [];

    console.log(compChoices);
    console.log(userChoices);
    level = 0;
    count = 0;   
}