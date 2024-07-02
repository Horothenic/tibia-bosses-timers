function Analytic_TimerStarted(id)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Started",
        "event_properties": {
            "timer_id": id
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function Analytic_TimerResetted(id)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Resetted",
        "event_properties": {
            "timer_id": id
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function Analytic_TimerRestarted(id)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Restarted",
        "event_properties": {
            "timer_id": id
        }
    });

    sendEventsToAmplitude(amplitudeEvents);
}

function Analytic_ForcedStopTimer(id)
{
    let amplitudeEvents = [];
    amplitudeEvents.push({
        "user_id": "Generic",
        "event_type": "Timer Forced Stop",
        "event_properties": {
            "timer_id": id
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