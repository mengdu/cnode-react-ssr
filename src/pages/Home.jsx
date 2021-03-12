import request from '../utils/request'
import './Home.less'

function TopicItem (props) {
  const data = props.data
  return (
    <div className="topic-item">
      <div className="voters">
        <span className="score">{data.visit_count}</span>
      </div>
      <div>
        <a href={`https://cnodejs.org/topic/${data.id}`} target="_blank">{data.title}</a>
        <span className="tag">{data.tab}</span>
      </div>
      <div>
        <a href="#"><img src={data.author.avatar_url} alt="avatar" className="avatar" title={data.author.loginname}/></a>
        via <a href="#">{data.author.loginname}</a>
        <span className="created-at">{data.create_at}</span>
        <span className="reply_count">{data.reply_count}</span>评论
      </div>
    </div>
  )
}

function Home (props) {
  const topics = props.data ? props.data.data : []

  return (
    <div className="page-home">
      <ul className="topics-list">
        {topics.map((e, index) => {
          return (
            <li className="topic-item" key={index}>
              <TopicItem data={e} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Home.loadData = async function (ctx) {
  const tab = ctx.params.tab || 'all'

  const result = await request.get('/v1/topics', { params: { tab } })

  return {
    // redirect: '/user/1234', // Switch to route
    // redirect: 'https://other.com?w=123', // Redirect to site
    tab,
    data: result.data // props.data
  }
}

export default Home
