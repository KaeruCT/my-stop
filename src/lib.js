export function d(s) {
    return document.querySelector(s);
}

export function setStyleVariant() {
    const style = (window.location.search.includes('blue') && 'blue') || "yellow";
    d('html').classList.add(style);
}
