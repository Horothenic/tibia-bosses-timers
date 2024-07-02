const secondInMilliseconds = 1000;
let currentTimer;

function createTimers(bossList, id)
{
    const container = document.getElementById(id);
    let subButtonsHeight = 37;

    bossList.forEach(boss => {
        let div = document.createElement('div');
        div.classList.add('timer');

        let subButtonOrderClass = 'subButtonFirst';
    
        let externalLink = `
            <a href="${boss.guideUrl}" target="_blank" class="subButton ${subButtonOrderClass}" title="Check guide" onclick="handleExternalLinkClick(event">
                <i class="fas fa-book"></i>
            </a>`;

        subButtonOrderClass = 'subButtonSecond';
    
        let tooltipLink = '';
        if (boss.tooltip !== '') {
            subButtonsHeight += 32;
            tooltipLink = `
            <a target="_blank" class="subButton subButtonTooltip ${subButtonOrderClass}" title="${boss.tooltip}" onclick="handleExternalLinkClick(event)">
                <i class="fas fa-star"></i>
            </a>`;
            subButtonOrderClass = 'subButtonThird';
        }
    
        let groupLink = '';
        if (boss.groupId !== '') {
            subButtonsHeight += 32;
            groupLink = `
            <a target="_blank" class="subButton subButtonGroup ${subButtonOrderClass}" title="${boss.groupDisplayName}" onclick="handleExternalLinkClick(event)">
                <i class="fas fa-users"></i>
            </a>`;
        }
    
        div.innerHTML = `
            <button id="${boss.id}-button" onclick="startTimer(${boss.minutes}, ${boss.seconds}, '${boss.id}', '${boss.displayName}')">
                ${externalLink}
                ${tooltipLink}
                ${groupLink}
                <img src="${boss.gifUrl}" alt="${boss.displayName}">
                <div class="timer-info">
                    <h3>${boss.displayName}</h3>
                    <h1 id="${boss.id}">${formatTime((boss.minutes * 60) + boss.seconds)}</h1>
                </div>
            </button>
        `;
    
        container.appendChild(div);
    });
}

function startTimer(minutes, seconds, timerId, displayName) {
    Analytic_TimerStarted(timerId);
    stopCurrentTimer();

    let timerData = {
        intervalId: null,
        totalSeconds: (minutes * 60) + seconds,
        secondsElapsed: 0,
        timerId: timerId,
        displayName: displayName
    };

    document.getElementById(`${timerData.timerId}-button`).classList.add('selected');
    document.getElementById(timerData.timerId).innerText = formatTime(Math.floor(timerData.totalSeconds - 1));

    let start = Date.now();
    timerData.intervalId = setInterval(() => {
        currentTimer.secondsElapsed = (Date.now() - start) / secondInMilliseconds;
        let remainingSeconds = timerData.totalSeconds - currentTimer.secondsElapsed;

        document.getElementById(timerData.timerId).innerText = formatTime(Math.floor(timerData.totalSeconds - timerData.secondsElapsed));
        refreshTitle();

        // Sound alarm when the system shows 00:00
        if (remainingSeconds <= 1 && remainingSeconds > 0) {
            document.getElementById('alarm').play();
        }
    
        // Reset when it reaches real 0
        if (remainingSeconds <= 0) {
            stopCurrentTimer();
            Analytic_TimerRestarted(timerId);
            startTimer(minutes, seconds, timerId, displayName);
        }
    }, secondInMilliseconds);

    currentTimer = timerData;
    refreshTitle();
}

function forceStopTimer() {
    if (currentTimer) {
        Analytic_ForcedStopTimer(currentTimer.timerId);
    }

    stopCurrentTimer();
}

function stopCurrentTimer() {
    if (currentTimer) {
        clearInterval(currentTimer.intervalId);
        document.getElementById(currentTimer.timerId).innerText = formatTime(currentTimer.totalSeconds);
        document.getElementById(`${currentTimer.timerId}-button`).classList.remove('selected');
        currentTimer = null;
    }

    refreshTitle();
}

function formatTime(seconds) {
    let remainingMinutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function refreshTitle()
{
    if (currentTimer){
        document.title = `${formatTime(currentTimer.totalSeconds - currentTimer.secondsElapsed)} - ${currentTimer.displayName}`;
    }
    else {
        document.title = `Tibia Bane Bosses Timers`;
    }
}

function handleExternalLinkClick(event) {
    event.stopPropagation();
}