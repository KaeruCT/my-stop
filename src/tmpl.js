const TMPL_REGEX = /\{([^}]+)\}/g;

export function parse(html, obj, ctx) {
    return html.trim().replace(TMPL_REGEX, (_, path) => {
        const fnName = path.substring(0, path.indexOf("("));
        const argName = path.substring(path.indexOf("(") + 1, path.indexOf(")"));
        if (fnName && argName && ctx[fnName]) {
            return ctx[fnName](val(obj, argName));
        }
        return val(obj, path);
    });
}

function val(obj, path) {
    if (Array.isArray(path)) {
        const firstPart = path.shift();
        if (path.length === 0) {
            return obj[firstPart];
        }
        return val(obj[firstPart], path);
    }
    if (path.includes(".")) {
        return val(obj, path.split("."));
    }
    return obj[path];
}