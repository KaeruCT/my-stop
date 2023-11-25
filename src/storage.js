export const KEYS = {
    lines: "lines"
};

export function set(key, data) {
    window.localStorage.setItem(key, data);
}

export function get(key) {
    return window.localStorage.getItem(key);
}
