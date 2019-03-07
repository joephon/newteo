import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const publicPath = path.join(__dirname, '../public');
const uploadPath = path.join(__dirname, '../uploads');
const prefix = {
  admin: '/admin',
  client: '/client'
};
const koaBodyConfig = {
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb',
  uploadDir: uploadPath,
  multipart: true,
}

const config = {
  port: process.env.PORT || 3000,
  env: process.env,
  publicPath,
  uploadPath,
  prefix,
  koaBodyConfig,
}

export default config