import "./styles/base.css";
import "./styles/yellow.css";
import "./styles/blue.css";
import { getDepartures, getStop, filterDepartures } from "./api.js";
import { parse } from "./tmpl";
import { formatTime, formatDate, formatIcon, formatWaitTime } from "./format";
import { d, setStyleVariant } from "./lib.js";
import { KEYS, set } from "./storage.js";

const REFRESH_INTERVAL = 10_1000;

const DEPARTURE_TMPL = `
<tr>
  <td class="line-column">{formatIcon(line.product)}{line.name}</td>
  <td class="destination-column">{destination.name}</td> 
  <td class="departure-column">{formatTime(when)}</td>
  <td class="wait-column">{formatWaitTime(when)}</td>
</tr>
`;

function setupLineFilters() {
  const lineList = Array.from(document.getElementsByName("lines"));

  lineList.forEach(el => el.addEventListener("change", () => {
    const selectedLines = lineList.filter(e => e.checked);
    const checkedLines = selectedLines.map(e => e.dataset.line);
    set(KEYS.lines, checkedLines);
    init();
  }));
}

export async function init() {
  const depTitle = d("#dep-title");
  const depContainer = d("#dep-container");
  const lastUpdated = d("#last-updated");
  const footer = d("#footer");
  const status = d("#status");
  const lines = d("#lines");
  const ctx = { formatTime, formatIcon, formatWaitTime };
  const stopSearch = document.location.hash || "Storkower";
  let timeout;

  async function refresh(stop) {
    // TODO: realtimeDataUpdatedAt sometimes goes back in time (upstream caching issue?)
    const { departures, realtimeDataUpdatedAt } = await getDepartures(stop.id);
    depTitle.innerText = stop.name;
    document.title = stop.name + " Departures";
    const filteredDepartures = filterDepartures(departures);
    setupLineFilters();
    depContainer.innerHTML = filteredDepartures.map(dep => parse(DEPARTURE_TMPL, dep, ctx)).join("");
    lastUpdated.innerText = formatDate(new Date().getTime());
    footer.style.visibility = "visible";
    setStyleVariant();
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => refresh(stop), REFRESH_INTERVAL);
  }

  const stop = await getStop(stopSearch);
  if (!stop) {
    status.innerText = "Stop not found!";
    status.className = "error";
  }

  refresh(stop);
}

init();