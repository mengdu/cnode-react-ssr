import { sleep } from "../utils"

function User (props) {
  return (
    <>
      <h1>User {+props.loaded}</h1>
      <p>{JSON.stringify(props.user)}</p>
    </>
  )
}

User.loadData = async function (ctx) {
  console.log('loadData:', ctx.isSSR, ctx.url, ctx.query, ctx.params)

  await sleep(1000)

  return {
    user: {
      id: 1,
      nickname: '张三',
      age: 18
    }
  }
}

export default User
