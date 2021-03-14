import anchor from 'markdown-it-anchor'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import uslug from 'uslug'

function highlight (code, lang) {
    let html = ''
    if (lang && hljs.getLanguage(lang)) {
        try {
            html = hljs.highlight(lang, code).value
        } catch (err) {
            html = hljs.highlightAuto(code).value
        }
    } else {
        html = hljs.highlightAuto(code).value
    }

    return `<pre class="hljs${lang ? ' hljs-' + lang : ''}" data-lang="${lang}"><code>${html}</code></pre>`
}

export const createRender = function (options) {
    const md = new MarkdownIt({
        highlight,
        ...options
    })

    md.use(anchor, {
        permalink: true,
        permalinkBefore: true,
        // permalinkSymbol: '#',
        permalinkSymbol: '<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>',
        permalinkClass: 'anchor',
        slugify: s => uslug(s)
    })
    // md.use(require('markdown-it-table-of-contents'))

    return md
}
