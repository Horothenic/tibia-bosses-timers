function Analytic_TimerStarted(timerId)
{
    if (currentTimer && currentTimer.timerId === timerId){
        gtag('event', 'timer', {
            'event_category': 'Resetted Timer',
            'event_label': timerId
        });
    }

    gtag('event', 'timer', {
        'event_category': 'Started',
        'event_label': timerId
    });
}

function Analytic_TimerRestarted(timerId)
{
    gtag('event', 'timer', {
        'event_category': 'Restarted',
        'event_label': timerId
    });
}

function Analytic_ForcedStopTimer(timerId)
{
    gtag('event', 'timer', {
        'event_category': 'Forced Stop',
        'event_label': timerId
    });
}