import path from 'node:path'

const parts = [
  'alpha',
  'beta',
  'gamma',
]

let prefix = 'item: '

const mapped = parts.map(function (part) {
  return prefix + part
})

const tools = {
  basename: path.basename,
  mapped: mapped,
}

export default tools
