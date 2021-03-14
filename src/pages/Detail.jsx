import { useWatch } from '../utils/hook'
import request from '../utils/request'
import Markdown from '../components/Markdown'
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

function Detail (props) {
  const data = props.detail ? props.detail.data : null

  useWatch([props.match], () => {
    console.log('watch', props.match.url)
  })

  if (!data) return 'No Data !'

  return (
    <div className="page-detail">
      <Post data={data} />
      <div className="post-comment">{JSON.stringify(data.replies, null, 2)}</div>
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
