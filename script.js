const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const display = document.querySelector(".show-time");
const lapList = document.querySelector(".laps");

let timer = null;
let [seconds, minutes, hours] = [0, 0, 0];
let lastLapTime = "";

function updateDisplay(){
  const format = (num) => String(num).padStart(2, "0");
  display.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startTimer(){
  if (timer !== null) return;

  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
  }, 1000);
}

function stopTimer(){
  clearInterval(timer);
  timer = null;
}

function resetTimer(){
  stopTimer();
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  lapList.innerHTML = "";
  lastLapTime = "";
}

function addLap(){
  const currentTime = display.textContent;
  if (currentTime === "00:00:00" || currentTime === lastLapTime) return;

  lastLapTime = currentTime;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapList.children.length + 1}: ${currentTime}`;
  lapList.appendChild(lapItem);
  lapList.scrollTop = lapList.scrollHeight;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
