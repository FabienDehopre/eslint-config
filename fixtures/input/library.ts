import path from 'node:path'
import { existsSync } from 'node:fs'

const API = {
  path: path.join('src','lib'),
  exists: existsSync('.')
}

export { API }
