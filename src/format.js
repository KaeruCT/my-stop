import busIcon from "../icon/bus.svg";
import sbahnIcon from "../icon/sbahn.svg";

export function formatTime(isoDate) {
    const date = new Date(isoDate);
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(t => String(t).padStart(2, "0")).join(":");
}

export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(t => String(t).padStart(2, "0")).join(".");
  
    return `${datePart} ${formatTime(isoDate)}`;
}

export function formatWaitTime(departure) {
    const timeDelta = Math.max((new Date(departure) - new Date()) / 1000, 0);

    if (timeDelta < 60) {
        return '00:00';
    } else if (timeDelta < 3600) {
        return `${Math.floor(timeDelta / 60).toString().padStart(2, '0')}:${Math.floor(timeDelta % 60).toString().padStart(2, '0')}`;
    } else {
        const deltaHours = Math.floor(timeDelta / 3600);
        const deltaMinutes = Math.floor((timeDelta % 3600) / 60);
        return `${deltaHours.toString().padStart(2, '0')}:${deltaMinutes.toString().padStart(2, '0')}:${Math.floor(timeDelta % 60).toString().padStart(2, '0')}`;
    }
}

function img(src, alt) {
    return `<img src="${src}" alt="${alt}"" />`;
}

export function formatIcon(val) {
    if (val === "bus") {
        return img(busIcon, "Bus");
    }
    if (val === "suburban") {
        return img(sbahnIcon, "S-Bahn");
    }
    return val;
}