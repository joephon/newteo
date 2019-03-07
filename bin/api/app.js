import Koa from 'koa'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import kcors from 'kcors'
import config from './config'
// import route from './route'

const app = new Koa()

app.use(kcors())

app.use(koaStatic(config.publicPath))
app.use(koaStatic(config.uploadPath))
app.use(koaBody(config.koaBodyConfig))

// 开始配置路由
// app.use(route.routes())

app.listen(config.port, () => console.log(`server is running on port: ${config.port}`))