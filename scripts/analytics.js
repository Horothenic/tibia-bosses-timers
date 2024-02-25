function Analytic_TimerStarted(timerId)
{
    let amplitudeEvents = [];
    if (currentTimer && currentTimer.timerId === timerId){
        amplitudeEvents.push({
            "user_id": "Generic",
            "event_type": "Timer Resetted",
            "event_properties": {
                "timer_id": timerId
            }
        });
    }

    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Started",
        "event_properties": {
            "timer_id": timerId
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function Analytic_TimerRestarted(timerId)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Restarted",
        "event_properties": {
            "timer_id": timerId
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function Analytic_ForcedStopTimer(timerId)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Forced Stop",
        "event_properties": {
            "timer_id": timerId
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function sendEventsToAmplitude(events) {
    $.ajax({
        url: 'https://api2.amplitude.com/2/httpapi',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        data: JSON.stringify({
            "api_key": "939db8a9d6769eab5bdf71544be582c2",
            "events": events
        }),
        success: function () {
            console.log("Events sent to Amplitude:", events);
        }
    });
}