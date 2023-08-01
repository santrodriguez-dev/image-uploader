import fs from 'node:fs/promises'
import path from 'node:path'
import { type NextApiResponse } from 'next'
import { type NextRequest, NextResponse } from 'next/server'
import { FOLDER_PATH } from '../../constants'

const FOLDER_PATH_URL = `public/${FOLDER_PATH}`

export async function POST (req: Request, res: NextApiResponse<any>) {
  try {
    const formData = await req.formData()
    const filesToSave: Array<Promise<string | null>> = []
    formData.forEach(file => filesToSave.push(saveFile(file as File)))
    const filesCreated = await Promise.all(filesToSave)
    const files = filesCreated.filter(itemName => itemName)
    return NextResponse.json({ message: 'Files saves succesfully', files })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}

async function saveFile (file: File) {
  const buffer = await file.arrayBuffer()
  const arrayBufferView = new Uint8Array(buffer)

  return await fs.access(FOLDER_PATH_URL)
    .catch(() => {
      console.log('creating folder')
      return fs.mkdir(FOLDER_PATH_URL)
    })
    .then(() => {
      const fileUniqueName = getUniqueName(file.name)
      fs.writeFile(path.join(FOLDER_PATH_URL, fileUniqueName), arrayBufferView)
      return fileUniqueName
    })
    .catch(err => {
      console.log('Error saving files', err)
      return null
    })
}

function getUniqueName (fileName: string) {
  const extension = path.extname(fileName)
  const uniquePreffix = `${Date.now()}-${crypto.randomUUID()}`
  return `${uniquePreffix}${extension}`
}

export async function GET (req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get('name')
  if (fileName) return getFile(fileName)
  return NextResponse.json(await getListFiles(FOLDER_PATH_URL))
}

function getFile (fileName: string) {
  return NextResponse.json({ text: 'test', fileName })
}

async function getListFiles (folder: string) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(`❌ No se pudo leer el directorio ${folder}`)
    return []
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // status - información del archivo
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const size = stats.size.toString()
    const lastModified = stats.mtime.toLocaleString()

    const fileInfo = {
      isDirectory,
      size,
      lastModified,
      name: file
    }
    return fileInfo
  })

  return await Promise.all(filesPromises)
}
