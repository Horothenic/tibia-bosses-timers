const intervalMilliseconds = 1000;
let currentTimer;

function startTimer(minutes, seconds, timerId, displayName) {
    stopCurrentTimer();

    let totalSeconds = (minutes * 60) + seconds; 

    let timerData = {
        intervalId: null,
        remainingSeconds: totalSeconds,
        startSeconds: totalSeconds,
        timerId: timerId,
        displayName: displayName
    };

    document.getElementById(`${timerData.timerId}-button`).classList.add('selected');

    timerData.intervalId = setInterval(() => {
        timerData.remainingSeconds--;
        document.getElementById(timerData.timerId).innerText = formatTime(timerData.remainingSeconds);
        refreshTitle();
    
        if (timerData.remainingSeconds === 0) {
            stopCurrentTimer();
            document.getElementById('alarm').play();

            startTimer(minutes, seconds, timerId, displayName);
        }
    }, intervalMilliseconds);

    currentTimer = timerData;
    refreshTitle();
}

function stopCurrentTimer() {
    if (currentTimer) {
        clearInterval(currentTimer.intervalId);
        document.getElementById(currentTimer.timerId).innerText = formatTime(currentTimer.startSeconds);
        document.getElementById(`${currentTimer.timerId}-button`).classList.remove('selected');
        currentTimer = null;
    }

    refreshTitle();
}

function formatTime(seconds) {
    let remainingMinutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function refreshTitle()
{
    if (currentTimer){
        document.title = `${formatTime(currentTimer.remainingSeconds)} - ${currentTimer.displayName}`;
    }
    else {
        document.title = `Tibia Bane Bosses Timers`;
    }
}
