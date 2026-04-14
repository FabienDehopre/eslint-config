import { join } from 'node:path'
import { existsSync } from 'node:fs'

const API = {
  path: join('src','lib'),
  exists: existsSync('.')
}

export { API }
