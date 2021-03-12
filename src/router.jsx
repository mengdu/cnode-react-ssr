import Router from './components/router'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/topics/:tab', component: Home },
        { path: '/about', component: About },
        { label: '404', component: NotFound }
    ]
})
