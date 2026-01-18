import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async () => {
  const publicGalleries = join(process.cwd(), 'public', 'img', 'galleries')
  const response: Array<{ name: string; images: string[] }> = []

  try {
    const entries = await fs.readdir(publicGalleries, { withFileTypes: true })
    for (const e of entries) {
      if (e.isDirectory()) {
        const dir = join(publicGalleries, e.name)
        const files = await fs.readdir(dir)
        const images = files
          .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
          .map((f) => `/img/galleries/${e.name}/${f}`)
        if (images.length) response.push({ name: e.name, images })
      }
    }

    // If no subfolders found, try reading files directly under the root galleries folder
    if (!response.length) {
      const files = await fs.readdir(publicGalleries)
      const images = files.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).map((f) => `/img/galleries/${f}`)
      if (images.length) response.push({ name: 'default', images })
    }
  } catch (err) {
    // If folder doesn't exist, return empty array
    return []
  }

  return response
})
