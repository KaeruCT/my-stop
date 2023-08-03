const STOP_ID = 900110012; // https://v6.bvg.transport.rest/locations?poi=false&addresses=false&query=storkower

/**
 * See https://v6.bvg.transport.rest/
 */
export async function getDepartures() {
    const result = await fetch(`https://v6.bvg.transport.rest/stops/${STOP_ID}/departures?results=10&pretty=false`);
    const json = await result.json();
    const payload = json;

    return payload;
}