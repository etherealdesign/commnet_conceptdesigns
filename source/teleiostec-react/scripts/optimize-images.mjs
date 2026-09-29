// Writes .avif and .webp siblings next to every .jpg under public/Asset.
// Components request `<name>.avif` / `<name>.webp` through <picture>, falling
// back to the original .jpg — so every jpg must have both siblings on disk.
// Run once after adding or replacing a photo: `npm run images`.
import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('public/Asset')

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (/\.jpe?g$/i.test(e.name)) yield p
  }
}

async function fresh(src, out) {
  try { return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs } catch { return false }
}

let n = 0
for await (const src of walk(root)) {
  const base = src.replace(/\.jpe?g$/i, '')
  const jobs = []
  if (!(await fresh(src, base + '.avif'))) jobs.push(sharp(src).avif({ quality: 52, effort: 5 }).toFile(base + '.avif'))
  if (!(await fresh(src, base + '.webp'))) jobs.push(sharp(src).webp({ quality: 74 }).toFile(base + '.webp'))
  await Promise.all(jobs)
  n += jobs.length
}
console.log(`optimize-images: ${n} files written`)
