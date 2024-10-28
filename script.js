let interval;
let isWorking = true;
let isRunning = false;
let remainingTime = 25 * 60 * 1000;
const workDuration = 25 * 60 * 1000; 
const breakDuration = 5 * 60 * 1000; 
const updateInterval = 1000; 

function togglePomodoro() {
    const button = document.getElementById("pomodoroButton");
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        button.textContent = "Resume Pomodoro";
        button.classList.remove("pause");
        button.classList.add("start");
    } else {
        isRunning = true;
        button.textContent = "Pause";
        button.classList.remove("start");
        button.classList.add("pause");

        updateHeight(remainingTime);
    }
}

function updateHeight(duration) {
    const coffeeElement = document.getElementById("coffe");
    const timerElement = document.getElementById("Timer");
    let totalTime = duration; 
    remainingTime = totalTime; 
    coffeeElement.style.height = "100%";

    interval = setInterval(() => {
        remainingTime -= updateInterval;

      
        const heightPercent = (remainingTime / totalTime) * 100;
        coffeeElement.style.height = heightPercent + "%";

        
        const minutes = Math.floor(remainingTime / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (remainingTime <= 0) {
            clearInterval(interval);
            isWorking = !isWorking;

            
            if (isWorking) {
                remainingTime = workDuration; 
            } else {
                remainingTime = breakDuration; 
            }
            updateHeight(remainingTime); 
            isRunning = false; 
            const button = document.getElementById("pomodoroButton");
            button.textContent = "Start Pomodoro"; 
            button.classList.remove("pause");
            button.classList.add("start");
        }
    }, updateInterval);
}
