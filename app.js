let remainingTime = 300; // 5 minutes
let oobTime = 0;
let lastHiddenTime = null;
let timer;
let currentStation = 0;
let score = 0;

const stations = [
  { question: "Identify this bird: Bald Eagle", answer: "bald eagle" },
  { question: "Identify this insect: Monarch Butterfly", answer: "monarch butterfly" },
  { question: "Identify this reptile: Green Anole", answer: "green anole" }
];

function startTest() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("app").style.display = "block";

  localStorage.setItem("remainingTime", remainingTime);
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
  let lastTick = Date.now();

  timer = setInterval(() => {
    let now = Date.now();
    let delta = Math.floor((now - lastTick) / 1000);
    lastTick = now;

    remainingTime -= delta;
    localStorage.setItem("remainingTime", remainingTime);

    updateTimerDisplay();

    if (remainingTime <= 0) finishTest();
  }, 1000);
}


function finishTest() {
  clearInterval(timer);

  document.getElementById("app").innerHTML =
    `<h2>Finished!</h2>
     <p>Score: ${score}/${stations.length}</p>
     <p>OOB Time: ${oobTime} seconds</p>`;
}


document.getElementById("startBtn").onclick = startTest;

function updateTimerDisplay() {
  let min = Math.floor(remainingTime / 60);
  let sec = remainingTime % 60;
  document.getElementById("timer").innerText =
    `Time: ${min}:${sec.toString().padStart(2, "0")}`;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    lastHiddenTime = Date.now();
  } else if (lastHiddenTime !== null) {
    const away = Math.floor((Date.now() - lastHiddenTime) / 1000);
    oobTime += away;
    lastHiddenTime = null;
  }
});
