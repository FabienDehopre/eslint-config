import { existsSync } from 'node:fs'
import { join } from 'node:path'

const API = {
  path: join('src','lib'),
  exists: existsSync('.')
}

export { API }
