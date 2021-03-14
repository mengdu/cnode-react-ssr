import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import './Header.less'

export default function Header(props) {
  return (
    <header className="header">
      <div className="site">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo" title="Cnode 社区" />
          {/* <h2 className="name">Cnode 社区</h2> */}
        </NavLink>
      </div>
      <ul className="nav">
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/">全部</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/good">精华</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/share">分享</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/ask">问答</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/job">招聘</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/about">关于</NavLink></li>
        <li className="nav-item"><NavLink exact={true} activeClassName="is-active" to="/demo">Demo</NavLink></li>
        <li className="nav-item"><a href="https://github.com/mengdu/cnode-react-ssr">Source</a></li>
      </ul>
    </header>
  )
}
