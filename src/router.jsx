import Router from './components/router'
import Home from './pages/Home'
import Detail from './pages/Detail'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/:tab', component: Home },
        { path: '/topic/:id', component: Detail },
        { label: '404', component: NotFound }
    ]
})
