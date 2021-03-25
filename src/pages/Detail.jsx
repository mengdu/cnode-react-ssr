import { useWatch } from '../utils/hook'
import request from '../utils/request'
import Markdown from '../components/Markdown'
import Footer from '../components/Footer'
import './Detail.less'
import dayjs from 'dayjs'

function Post (props) {
  const data = props.data

  return (
    <div className="post">
      <h1 className="post--title">{data.title}</h1>
      <div className="post--meta">
        <img src={data.author.avatar_url} alt="avatar" className="user-avatar"/>
        <span className="user-nickname">{data.author.loginname}</span>

        <span className="created-at">{dayjs(data.create_at).format('YYYY-MM-DD HH:mm:ss')}</span>
        <span className="tag">{data.tab}</span>

        <span className="visit-count">{data.visit_count}&nbsp;浏览量</span>
      </div>
      <div className="post--content">
        <Markdown text={data.content}/>
      </div>
    </div>
  )
}

function Comment (props) {
  const data = props.data
  if (data.length === 0) return null

  return (
    <div className="comment-box">
      <ul className="comment-list">
        {data.map((e, index) => {
          return <CommentItem data={e} key={index}/>
        })}
      </ul>
    </div>
  )
}

function CommentItem (props) {
  const data = props.data
  return (
    <div className="comment">
      <div className="head">
        <img src={data.author.avatar_url} alt="avatar" className="avatar"/>
        <span className="username">{data.author.loginname}</span>
        <span className="create-at">{dayjs(data.create_at).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      <Markdown text={data.content} className='content'/>
    </div>
  )
}

function Detail (props) {
  const data = props.detail ? props.detail.data : null

  useWatch([props.match], () => {
    console.log('watch', props.match.url)
  })

  if (!data) return 'No Data !'

  return (
    <div className="page-detail">
      <Post data={data} />
      <Comment data={data.replies}/>

      <Footer />
    </div>
  )
}

Detail.loadData = async ctx => {
  const result = await request.get('/topic/' + ctx.params.id, { params: { mdrender: false } })

  return {
    id: ctx.params.id,
    detail: result.data
  }
}

export default Detail
