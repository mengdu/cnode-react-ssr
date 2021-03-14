export function sleep (t) {
    return new Promise(r => setTimeout(r, t))
}

export function queryStringToObject (query) {
    return Object.fromEntries(new URLSearchParams(query))
}

export function htmlEncode (text) {
    const tags = {
        '<': '&lt;',
        '>': '&gt;'
    }
    return text.replace(/(<|>)/g, v => tags[v])
}
