#!/usr/bin/env node
/**
 * Serves the project root — the hub (index.html) and every build in sites/ —
 * exactly as the Vercel deployment does: plain static files, no rewrites.
 *
 * Zero dependencies. Supports byte ranges, which Safari needs before it will
 * play a <video> (the Teleiostec and Commnet heroes are video).
 *
 *   node scripts/serve.mjs [port] [host]     # defaults: 8080 127.0.0.1
 */
import { createServer } from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const port = Number(process.argv[2] ?? process.env.PORT ?? 8080)
const host = process.argv[3] ?? process.env.HOST ?? '127.0.0.1'

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.pdf': 'application/pdf',
}
// Source trees and local-only material are never served, same as .vercelignore.
const HIDDEN = /^\/(source|node_modules|_archive|Data|docs|\.git)(\/|$)/

const send = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end(body)
}

createServer((req, res) => {
  let path
  try {
    path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  } catch {
    return send(res, 400, 'Bad request')
  }
  if (HIDDEN.test(path)) return send(res, 404, 'Not found')

  let file = normalize(join(root, path))
  if (file !== root && !file.startsWith(root + sep)) return send(res, 403, 'Forbidden')

  let stat
  try {
    stat = statSync(file)
    if (stat.isDirectory()) {
      // /sites/x/v1 → /sites/x/v1/ so the page's relative links resolve
      if (!path.endsWith('/')) {
        res.writeHead(301, { Location: path + '/' })
        return res.end()
      }
      file = join(file, 'index.html')
      stat = statSync(file)
    }
  } catch {
    return send(res, 404, `Not found: ${path}`)
  }

  const type = TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream'
  const headers = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')

  if (range && (range[1] || range[2])) {
    const start = range[1] ? Number(range[1]) : Math.max(0, stat.size - Number(range[2]))
    const end = range[1] && range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1
    if (start > end || start >= stat.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` })
      return res.end()
    }
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 })
    if (req.method === 'HEAD') return res.end()
    return createReadStream(file, { start, end }).pipe(res)
  }

  res.writeHead(200, { ...headers, 'Content-Length': stat.size })
  if (req.method === 'HEAD') return res.end()
  createReadStream(file).pipe(res)
})
  .on('error', (e) => {
    console.error(e.code === 'EADDRINUSE' ? `Port ${port} is already in use.` : e.message)
    process.exit(1)
  })
  .listen(port, host, () => console.log(`  hub + sites  ->  http://${host}:${port}/`))
