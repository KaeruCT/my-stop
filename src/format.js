import busIcon from "../icon/bus.svg";
import sbahnIcon from "../icon/sbahn.svg";
import ubahnIcon from "../icon/ubahn.svg";
import tramIcon from "../icon/tram.png";
import regionalIcon from "../icon/regional.png";
import longDistance from "../icon/express.png";
import { KEYS, get } from "./storage";

export function formatTime(isoDate) {
    const date = new Date(isoDate);
    return [date.getHours(), date.getMinutes()].map(t => String(t).padStart(2, "0")).join(":");
}

export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(t => String(t).padStart(2, "0")).join(".");
  
    return `${datePart} ${formatTime(isoDate)}`;
}

export function formatWaitTime(departure) {
    const timeDelta = Math.max((new Date(departure) - new Date()) / 1000, 0);

    if (timeDelta < 60) {
        return "NOW";
    } else if (timeDelta < 3600) {
        return `${Math.floor(timeDelta / 60)}′`;
    } else {
        const deltaHours = Math.floor(timeDelta / 3600);
        const deltaMinutes = Math.floor((timeDelta % 3600) / 60);

        if (deltaMinutes === 0) {
            return `${deltaHours}h`;
        } else {
            return `${deltaHours}h ${deltaMinutes}min`;
        }
    }
}

function img(src, alt) {
    return `<img src="${src}" alt="${alt}" />`;
}

const icons = {
    bus: img(busIcon, "Bus"),
    suburban: img(sbahnIcon, "S-Bahn"),
    tram: img(tramIcon, "Tram"),
    subway: img(ubahnIcon, "U-Bahn"),
    regional: img(regionalIcon, "Regional Train"),
    express: img(longDistance, "Long Distance Train")
}

export function formatIcon(val) {
    return icons[val] || val;
}

export function formatAvailableLine(line) {
  const checkedLines = get(KEYS.lines);
  const isChecked = checkedLines.split(",").includes(line) ? "checked" : "";

  return `
    <li>
      <label>
        <input type="checkbox" id="line-${line}" data-line="${line}" name="lines" ${isChecked}/> ${line}
      </label>
    </li>
  `;
}
