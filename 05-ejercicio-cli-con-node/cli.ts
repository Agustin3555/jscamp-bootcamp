import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const args = process.argv.slice(2)

const dir = args.find(a => !a.startsWith('-')) ?? '.'
const flags = args.filter(a => a.startsWith('-'))

const filesOnly = flags.includes('--files')
const foldersOnly = flags.includes('--folders')
const desc = flags.includes('--desc')

const hasReadPermission = process.permission?.has('fs.read', dir)

if (!hasReadPermission) {
  console.error('No tienes permiso para leer el directorio 😒')
  process.exit(1)
}

const files = await readdir(dir)

const formatBytes = (size: number) =>
  size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`

const entries = await Promise.all(
  files.map(async name => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    const isFolder = info.isDirectory()
    const size = formatBytes(info.size)

    return { name, isFolder, size }
  }),
)

entries.sort((a, b) => {
  if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
  const result = a.name.localeCompare(b.name)
  return desc ? -result : result
})

for (const entry of entries) {
  if (!filesOnly || !foldersOnly) {
    if (filesOnly && entry.isFolder) continue
    if (foldersOnly && !entry.isFolder) continue
  }

  const icon = entry.isFolder ? '📁' : '📄'
  const size = entry.isFolder ? '-' : entry.size

  console.log(`${icon} ${entry.name.padEnd(25)} ${size}`)
}
