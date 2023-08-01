import { readFile } from 'node:fs/promises'
import { type NextApiResponse } from 'next'
import { type NextRequest, NextResponse } from 'next/server'
import path from 'node:path'

export function GET (req: NextRequest, res: NextApiResponse<any>) {
  const { pathname } = req.nextUrl
  const fileName = pathname.split('/').at(-1)
  if (!fileName) return

  const filesFolderPath = process.env.FILES_DIR ?? 'uploaded-files'

  return readFile(path.join(filesFolderPath, fileName), 'utf-8')
    .then(file => {
      // res.setHeader('Content-type', 'image/*')
      return NextResponse.json(file)
    })
    .catch(err => {
      console.log(err)
      return NextResponse.json({ message: 'File not found' })
    })
}
