import { formatAvailableLine } from "./format";
import { d } from "./lib";
import { KEYS, get, set } from "./storage";

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

export function filterDepartures(departures) {
  let listOfLines = [... new Set(departures.map(ride => ride.line.productName).sort())];

  if (listOfLines.length === 1) {
    d("#available-lines").className = "hidden";
    return departures;
  }

  const storedLines = get(KEYS.lines);
  if (!storedLines) {
    set(KEYS.lines, listOfLines);
  }

  lines.innerHTML = listOfLines.map(line => formatAvailableLine(line)).join("");
  const lineList = Array.from(document.getElementsByName("lines"));
  const selectedLines = lineList.filter(e => e.checked);
  const checkedLines = selectedLines.map(e => e.dataset.line);

  return departures.filter(ride => checkedLines.includes(ride.line.productName));
}
