import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Footer from '../components/Footer'
import { SvgCaretUp, SvgChevronLeft, SvgChevronRight } from '../components/svg-icon'
import request from '../utils/request'
import './Home.less'
import { useWatch } from '../utils/hook'
import { queryStringToObject } from '../utils'

function TopicItem (props) {
  const data = props.data
  return (
    <div className="topic-item">
      <div className="voters">
        <span><SvgCaretUp className="upvoter"/></span>
        <span className="score">{data.visit_count}</span>
      </div>
      <div className="details">
        {/* <a href={`https://cnodejs.org/topic/${data.id}`} target="_blank" className="url">{data.title}</a> */}
        <Link to={`/topic/${data.id}`} className="url">{data.title}</Link>
        <span className="tag" className="tag">{data.tab}</span>
      </div>
      <div className="meta">
        <a href="#"><img src={data.author.avatar_url} alt="avatar" className="avatar" title={data.author.loginname}/></a>
        &nbsp;via<a href="#" className="nickname">{data.author.loginname}</a>
        <span className="created-at">{dayjs(data.create_at).format("YYYY-MM-DD HH:mm:ss")}</span>
        <span className="reply_count">{data.reply_count}</span>&nbsp;评论
      </div>
    </div>
  )
}

function Home (props) {
  const query = queryStringToObject(props.location.search)
  const page = +(query.page || 1)
  const [topics, setTopics] = useState(props.data ? props.data.data : [])

  useEffect(() => {
    setTopics(props.data ? props.data.data : [])
  }, [props.data])

  useWatch([props.match], async () => {
    console.log('watch', props.match.url)
    const tab = props.match.params.tab || 'all'
    const result = await request.get('/topics', { params: { tab, page, mdrender: false } })
    setTopics(result.data.data)
  })

  return (
    <div className="page-home">
      <div className="topic-box">
        <ul className="topics-list">
          {topics.map((e, index) => {
            return (
              <li className="topic-item" key={index}>
                <TopicItem data={e} />
              </li>
            )
          })}
        </ul>
        <div className="pagination is-background">
          {page > 1 ? (
            <Link to={'?page=' + (page - 1)}><button className="page-number page-prev" title={page - 1}><SvgChevronLeft />&nbsp;Prev</button></Link>
          ) : null}
          <Link to={'?page=' + (page + 1)}>
          <button className="page-number page-next" title={page + 1}>Next&nbsp;<SvgChevronRight /></button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

Home.loadData = async function (ctx) {
  const tab = ctx.params.tab || 'all'
  const page = ctx.query.page || 1

  const result = await request.get('/topics', { params: { tab, page, mdrender: false } })

  return {
    // redirect: '/user/1234', // Switch to route
    // redirect: 'https://other.com?w=123', // Redirect to site
    tab,
    data: result.data // props.data
  }
}

export default Home
