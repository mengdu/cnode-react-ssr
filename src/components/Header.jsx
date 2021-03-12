import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import './Header.less'

export default function Header(props) {
  return (
    <header className="header">
      <div className="site">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" title="Cnode 社区" />
          {/* <h2 className="name">Cnode 社区</h2> */}
        </Link>
      </div>
      <ul className="nav">
        <li className="nav-item"><Link to="/">全部</Link></li>
        <li className="nav-item"><Link to="/topics/good">精华</Link></li>
        <li className="nav-item"><Link to="/topics/share">分享</Link></li>
        <li className="nav-item"><Link to="/topics/ask">问答</Link></li>
        <li className="nav-item"><Link to="/topics/job">招聘</Link></li>
      </ul>
    </header>
  )
}
