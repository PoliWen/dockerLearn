import { resolve } from 'node:path'
import dotenv from 'dotenv'

// 简化环境配置
const envPath = resolve(process.cwd(), 'app/env', '.env.dev')
const parsedEnvVars = dotenv.configDotenv({ path: envPath })?.parsed ?? {}

// https://nitro.unjs.io/config
export default defineNitroConfig({
  preset: 'nitro-dev',
  srcDir: 'app',
  output: {
    dir: 'dist',
    serverDir: 'dist/server',
    publicDir: 'dist/public',
  },
  imports: {
    dirs: [
      'app/utils/**/*',
    ],
    dts: true,
  },
  runtimeConfig: {
    env: parsedEnvVars,
  },
})
