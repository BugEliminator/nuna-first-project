// 랜덤한 숫자 전역변수로 미리선언
let randomNum = 0;

// 인풋
let userInput = document.querySelector("#userInput");
// 스타트버튼
let startBtn = document.querySelector("#startBtn");
// 리셋버튼
let resetBtn = document.querySelector("#resetBtn");
// 답이 나오는 곳
let resultArea = document.querySelector("#resultArea");
// 남은 기회 보이는 곳
let choiceArea = document.querySelector("#choiceArea");
// 말한 숫자 보이는 곳
let historyArr = document.querySelector("#historyArr");
// 결과 표시할 곳
let result = document.querySelector("#result");

// 최대 횟수
let maxChoice = 3;

// 남은 기회가 0이 되면 false
let gameOver = false;

// 사용자가 입력한 숫자를 보관함
let history = [];

startBtn.addEventListener("click", gameStart);
resetBtn.addEventListener("click", gameReset);
userInput.addEventListener("focus", function() {
  userInput.value = "";
});

function pickRandomNum() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  result.textContent = `정답: ${randomNum}`;
  console.log(randomNum);
}

function gameStart() {
  if (gameOver) {
    resultArea.textContent = "게임이 이미 종료되었습니다. 리셋 버튼을 눌러 게임을 다시 시작하세요.";
    return;
  }

  let userValue = parseInt(userInput.value); // 숫자로 변환

  if (userValue < 1 || userValue > 100 || isNaN(userValue)) {
    resultArea.textContent = "1부터 100까지의 숫자를 입력해주세요";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
  }

  maxChoice--;
  choiceArea.textContent = `남은 기회는 ${maxChoice}번 입니다.`;

  if (userValue > randomNum) {
    resultArea.textContent = "숫자를 내려주세요";
  } else if (userValue < randomNum) {
    resultArea.textContent = "숫자를 올려주세요";
  } else if (userValue === randomNum) {
    resultArea.textContent = "정답입니다!";
    gameOver = true;
  }

  history.push(userValue);
  updateHistory();

  if (userValue === randomNum) {
    return; // 정답을 맞췄을 때는 더 이상 진행하지 않음
  }

  if (maxChoice === 0) {
    gameOver = true;
    resultArea.textContent = "모든 기회를 사용하셨습니다. 게임이 종료되었습니다.";
  }

  if (gameOver) {
    startBtn.disabled = true;
  }
}

function updateHistory() {
  historyArr.textContent = "지금까지 말한 숫자: " + history.join(", ");
}

function gameReset() {
  userInput.value = "";
  resultArea.textContent = "1부터 100까지의 숫자 중 하나를 입력해주세요!";
  choiceArea.textContent = "남은 기회는 3번 입니다.";
  historyArr.textContent = "지금까지 말한 숫자: ";
  maxChoice = 3;
  gameOver = false;
  history = [];
  startBtn.disabled = false;
  pickRandomNum();
}

pickRandomNum();