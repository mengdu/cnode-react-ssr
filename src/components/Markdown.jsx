import { createRender } from '../utils/markdown'
import 'highlight.js/styles/atom-one-dark.css'
import './Markdown.less'

const md = createRender({})

export default function Markdown (props) {
  const html = md.render(props.text)

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="markdown"></div>
  )
}
