const secondInMilliseconds = 1000;

let currentGroup = '';
let currentTimers = [];

function createTimers(bossList, id){
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
            <button id="${boss.id}-button" onclick='startTimer(${JSON.stringify(boss)})'>
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

function startTimer(boss) {
    // Handles the different ways a timer can start.

    if (hasCurrentTimerData(boss.id)) {
        stopCurrentTimer(boss.id);
        Analytic_TimerResetted(boss.id);
    }
    else {
        if (boss.groupId == '' || currentGroup !== boss.groupId)
        {
            stopCurrentTimers();
        }

        Analytic_TimerStarted(boss.id);
    }

    // Set the current data.
    currentGroup = boss.groupId;

    let timerData = {
        intervalId: null,
        totalSeconds: (boss.minutes * 60) + boss.seconds,
        secondsElapsed: 0,
        boss: boss,
        startDate: Date.now()
    };

    // Update the boss button.
    document.getElementById(`${timerData.boss.id}-button`).classList.add('selected');
    document.getElementById(timerData.boss.id).innerText = formatTime(Math.floor(timerData.totalSeconds - 1));

    // Interval code.
    (function(timerData) {
        timerData.intervalId = setInterval(() => {
            timerData.secondsElapsed = (Date.now() - timerData.startDate) / secondInMilliseconds;
            let remainingSeconds = timerData.totalSeconds - timerData.secondsElapsed;

            document.getElementById(timerData.boss.id).innerText = formatTime(Math.floor(timerData.totalSeconds - timerData.secondsElapsed));
            refreshTitle();

            // Sound alarm when the system shows 00:00
            if (remainingSeconds <= 1 && remainingSeconds > 0) {
                document.getElementById('alarm-' + timerData.boss.id).play();
            }

            // Reset when it reaches real 0
            if (remainingSeconds <= 0) {
                stopCurrentTimer(timerData.boss.id);

                if (timerData.boss.autoRestart) {
                    Analytic_TimerRestarted(timerData.boss.id);
                    startTimer(timerData.boss);
                }

                refreshTitle();
            }

            setCurrentTimerData(timerData.boss.id, timerData);
        }, secondInMilliseconds);

        // Add to the current timers array.
        currentTimers.push({
            id: timerData.boss.id,
            timerData: timerData
        });
        refreshTitle();
    })(timerData);
}

function hasCurrentTimerData(id) {
    return currentTimers.some(timer => timer.id === id);
}

function getCurrentTimerData(id)
{
    currentTimers.forEach(timer => {
        if (timer.id === id) {
            return timer.timerData;
        }
    });

    return null;
}

function setCurrentTimerData(id, timerData)
{
    currentTimers.forEach(timer => {
        if (timer.id === id) {
            timer.timerData = timerData;
        }
    });
}

function forceStopTimers() {
    currentTimers.forEach(timer => {
        Analytic_ForcedStopTimer(timer.timerData.boss.id);
    });

    stopCurrentTimers();
}

function stopCurrentTimer(id) {
    const index = currentTimers.findIndex(timer => timer.id === id);

    if (index !== -1) {
        stopTimerInternal(currentTimers[index].timerData);
        currentTimers.splice(index, 1);
    }

    refreshTitle();
}

function stopCurrentTimers() {
    currentTimers.forEach(timer => {
        stopTimerInternal(timer.timerData);
    });

    currentTimers = [];

    refreshTitle();
}

function stopTimerInternal(timerData)
{
    clearInterval(timerData.intervalId);
    document.getElementById(timerData.boss.id).innerText = formatTime(timerData.totalSeconds);
    document.getElementById(`${timerData.boss.id}-button`).classList.remove('selected');
}

function formatTime(seconds) {
    let remainingMinutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function refreshTitle()
{
    if (currentTimers.length === 1){
        let timerData = currentTimers[0].timerData;
        document.title = `${formatTime(timerData.totalSeconds - timerData.secondsElapsed)} - ${timerData.boss.displayName}`;
    }
    else if (currentTimers.length > 1){
        let nextTimerData;

        currentTimers.forEach(timer => {
            let timerData = timer.timerData;

            if (nextTimerData === undefined) {
                nextTimerData = timerData;
            }

            if (timerData.totalSeconds - timerData.secondsElapsed < nextTimerData.totalSeconds - nextTimerData.secondsElapsed) {
                nextTimerData = timerData;
            }
        });

        document.title = `${formatTime(nextTimerData.totalSeconds - nextTimerData.secondsElapsed)} - ${nextTimerData.boss.groupDisplayName}`;
    }
    else {
        document.title = `Tibia Bosses Timers`;
    }
}

function handleExternalLinkClick(event) {
    event.stopPropagation();
}