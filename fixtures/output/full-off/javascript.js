import path from 'node:path'

const parts = [
  'alpha',
  'beta',
  'gamma',
]

const prefix = 'item: '

const mapped = parts.map((part) => {
  return prefix + part
})

const tools = {
  basename: path.basename,
  mapped,
}

export default tools
