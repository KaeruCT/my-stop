import "./style.css";
import { getDepartures } from "./api.js";
import { parse } from "./tmpl";
import { formatTime, formatDate, formatIcon, formatWaitTime } from "./format";

const DEPARTURE_TMPL = `
<tr>
<td>{formatWaitTime(when)}</td>
<td>{formatTime(when)}</td>
<td>{formatIcon(line.product)}&nbsp;{line.name}</td>
<td>{destination.name}</td>
</tr>
`;

async function init() {
  const depContainer = document.querySelector("#dep-container");
  const lastUpdated = document.querySelector("#last-updated");
  const footer = document.querySelector("#footer");
  const ctx = { formatTime, formatIcon, formatWaitTime };

  async function refresh() {
    const { departures, realtimeDataUpdatedAt } = await getDepartures();
    // TODO: realtimeDataUpdatedAt sometimes goes back in time (upstream caching issue?)
    depContainer.innerHTML = departures.map(dep => parse(DEPARTURE_TMPL, dep, ctx)).join("");
    lastUpdated.innerHTML = formatDate(new Date().getTime());
    footer.style.visibility = "visible";
    setTimeout(refresh, 2000);
  }

  refresh();
}

init();