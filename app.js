let currentStation = 0;
let score = 0;
let timeLeft = 300; // 5 minutes
let timer;

const stations = [
  { question: "Identify this bird: Bald Eagle", answer: "bald eagle" },
  { question: "Identify this insect: Monarch Butterfly", answer: "monarch butterfly" },
  { question: "Identify this reptile: Green Anole", answer: "green anole" }
];

function startTest() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadStation();
  startTimer();
}

function loadStation() {
  document.getElementById("station").innerText =
    `Station ${currentStation + 1}: ` + stations[currentStation].question;
}

function submitAnswer() {
  let user = document.getElementById("answer").value.toLowerCase().trim();
  let correct = stations[currentStation].answer;

  if (user === correct) score++;

  document.getElementById("answer").value = "";

  currentStation++;

  if (currentStation < stations.length) {
    loadStation();
  } else {
    finishTest();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById("timer").innerText =
      `Time: ${min}:${sec.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) finishTest();
  }, 1000);
}

function finishTest() {
  clearInterval(timer);
  document.getElementById("app").innerHTML =
    `<h2>Finished!</h2><p>Score: ${score}/${stations.length}</p>`;
}

document.getElementById("startBtn").onclick = startTest;
