import Markdown from '../components/Markdown'
import Footer from '../components/Footer'
import AboutMD from '../../README.md?raw'

export default function About() {
  return (
    <div className="page-about">
      <Markdown text={AboutMD}/>

      <Footer />
    </div>
  )
}
