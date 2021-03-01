import { renderRoutes, matchRoutes } from 'react-router-config'
import { useState, useEffect, useRef } from 'react'
import { queryStringToObject } from '../../utils'

function ssrWrapper (Component) {
  function RWrapper (props) {
    const ref = useRef(false)
    const ssrData = props.ssr[props.match.path]
    const data = { ...props, ...ssrData }
    data.hasLoadData = !!Component.loadData
    data.ssrLoaded = data.hasLoadData && props.ssr.hasOwnProperty(props.match.path)
    data.loadDataed = data.ssrLoaded
    const [injectProps, setInjectProps] = useState(data)

    useEffect(() => {
      // 路由切换时当前组件已经在服务端调用loadData
      if (!data.ssrLoaded && Component.loadData) {
        Promise.all([
          Component.loadData({
            isSSR: false,
            query: queryStringToObject(props.location.search),
            params: props.match.params,
            url: props.match.url + props.location.search
          })
        ]).then(([result]) => {
          if (result.redirect) {
            if (/^http/.test(result.redirect)) {
              location.href = result.redirect
            } else {
              props.history.push(result.redirect)
            }
          } else {
            const newProps = { ...injectProps, ...result }
            newProps.loadDataed = true

            // 避免 unmounted 还设置
            !ref.current && setInjectProps(newProps)
          }
        }).catch(err => {
          const newProps = { ...injectProps, err }
          newProps.loadDataed = true
          !ref.current && setInjectProps(newProps)
        })
      }

      return () => {
        ref.current = true
      }
    }, [])

    return <Component {...injectProps} />
  }

  RWrapper.loadData = Component.loadData
  RWrapper.$raw = Component

  return RWrapper
}

export default class Router {
  constructor ({ routes }) {
    function loop (arr) {
      return arr.map(e => {
        const route = {
          ...e,
          path: e.path,
          exact: e.exact === undefined ? true : e.exact
        }

        if (e.routes) {
          route.component = (props) => {
            const Component = ssrWrapper(e.component)
            return <Component {...props}
              view={(props) => props.route.routes
                ? renderRoutes(props.route.routes, { ssr: props.ssr })
                : null}/>
          }
          route.component.loadData = e.component.loadData
          route.exact = false
          route.routes = loop(e.routes)
        } else {
          route.component = ssrWrapper(e.component)
        }

        return route
      })
    }

    this.routes = loop(routes)
  }

  view (props) {
    return renderRoutes(this.routes, props)
  }

  match (url) {
    return matchRoutes(this.routes, url)
  }
}