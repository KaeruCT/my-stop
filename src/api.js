/**
 * See https://v6.bvg.transport.rest/
 */
export async function getDepartures(stopId) {
    const result = await fetch(`https://v6.bvg.transport.rest/stops/${stopId}/departures?results=10&pretty=false`);
    const response = await result.json();
    return {
        // show only departures with a valid when (when it's missing, it means it's cancelled?)
        departures: response.departures.filter(d => d.when)
    };
}

export async function getStop(stopSearch) {
    const result = await fetch(`https://v6.bvg.transport.rest/locations?poi=false&addresses=false&query=${encodeURIComponent(stopSearch)}`);
    const json = await result.json();
    return json[0];
}