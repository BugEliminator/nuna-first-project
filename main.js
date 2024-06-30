let computerNum = 0
let startBtn = document.querySelector("#startBtn");
let userInput = document.querySelector("#userInput");
let resultArea = document.querySelector("#resultArea");
let resetBtn = document.querySelector("#resetBtn");
let chanceArea = document.querySelector("#chanceArea")
let maxChoice = 5;
let gameOver = false;
let history = [];

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
  userInput.value = ""
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100)+ 1
  console.log(computerNum)
}


function start() {
  let userValue =  userInput.value;

  if(userValue < 1 || userValue > 100) {
    resultArea.textContent = "1부터 100까지의 숫자를 입력해주세요"
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
    return;
  }

  maxChoice --;
  chanceArea.textContent = `남은 찬스: ${maxChoice}`
  console.log("chance", maxChoice)

  if (userValue < computerNum) {
    resultArea.textContent = "Up"
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down"
  } else if (userValue == computerNum) {
    resultArea.textContent = "Right"
    gameOver = true;
  }

  history.push(userValue);

  if (maxChoice == 0) {
    gameOver = true
  }

  if (gameOver == true) {
    startBtn.disabled = true
  }

}

function reset() {
  userInput.value = ""
  resultArea.textContent = "결과 나오는 곳"
  pickRandomNum()
}



pickRandomNum();
