import router from './router'
import { SSRConsumer } from './context'
import Header from './components/Header'
import './App.less'

export function App(props) {
  return (
    <>
      <SSRConsumer>
        {(ctx) => {
          return (
            <div className="container">
              <Header />
              <main className="page-entry">
                {router.view({ ssr: ctx })}
              </main>
            </div>
          )
        }}
      </SSRConsumer>
    </>
  )
}
