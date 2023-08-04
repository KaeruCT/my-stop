import "./style.css";
import { getDepartures, getStop } from "./api.js";
import { parse } from "./tmpl";
import { formatTime, formatDate, formatIcon, formatWaitTime } from "./format";

const REFRESH_INTERVAL = 10_1000;

const DEPARTURE_TMPL = `
<tr>
<td>{formatWaitTime(when)}</td>
<td>{formatTime(when)}</td>
<td>{formatIcon(line.product)}&nbsp;{line.name}</td>
<td>{destination.name}</td>
</tr>
`;

async function init() {
  const depTitle = document.querySelector("#dep-title");
  const depContainer = document.querySelector("#dep-container");
  const lastUpdated = document.querySelector("#last-updated");
  const footer = document.querySelector("#footer");
  const status = document.querySelector("#status");
  const ctx = { formatTime, formatIcon, formatWaitTime };
  const stopSearch = document.location.hash || "Storkower";

  async function refresh(stop) {
    // TODO: realtimeDataUpdatedAt sometimes goes back in time (upstream caching issue?)
    const { departures, realtimeDataUpdatedAt } = await getDepartures(stop.id);
    depTitle.innerText = stop.name;
    document.title = stop.name + " Departures";
    depContainer.innerHTML = departures.map(dep => parse(DEPARTURE_TMPL, dep, ctx)).join("");
    lastUpdated.innerText = formatDate(new Date().getTime());
    footer.style.visibility = "visible";
    setTimeout(() => refresh(stop), REFRESH_INTERVAL);
  }

  const stop = await getStop(stopSearch);
  if (!stop) {
    status.innerText = "Stop not found!";
    status.className = "error";
  }
  refresh(stop);
}

init();