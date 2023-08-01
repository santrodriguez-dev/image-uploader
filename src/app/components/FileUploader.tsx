'use client'
import { useRef, useState } from 'react'
import { CloudImage } from '../assets/Images'

interface Props {
  uploadFile: (file: File) => void
}

export const FileUploader = ({ uploadFile }: Props) => {
  const [localFile, setLocalFile] = useState<string | null>('')
  const [fileToUpload, setFileToUpload] = useState<File>()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleOpenFile = () => {
    fileInputRef.current?.click()
  }

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = function () {
      if (!fr.result) return
      setFileToUpload(file)
      setLocalFile(fr.result as string)
    }
  }

  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault()

    const files = ev.dataTransfer.files
    const file = files.item(0)

    const fr = new FileReader()
    if (!file) return
    setFileToUpload(file)
    fr.readAsDataURL(file)
    fr.onloadend = () => {
      const base64data = fr.result
      setLocalFile(base64data as string)
    }
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <h4 className="text-2xl font-bold">Upload your image</h4>
      <p className="my-4 text-lg text-gray-500 md:text-xl dark:text-gray-400">File should be Jpeg, Png,...</p>
      {
        localFile
          ? <div className="uploader-main-container__content-image">
            <img src={localFile} alt="image uploaded" className="uploader-main-container__image" />
          </div>
          : <div
            id="dropzone"
            className={`uploader-main-container__image-content ${isDragOver ? 'uploader-main-container__image-content-drag-over' : ''}`}
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragEnter={(e) => { setIsDragOver(true) } }
            onDragLeave={(e) => { setIsDragOver(false) }}
            ref={dropZoneRef}>
            <CloudImage />
            <p className="my-3 text-gray-500 dark:text-gray-400">Drag & Drop your image here</p>
          </div>
      }

      <input
        multiple={false}
        className="hidden"
        ref={fileInputRef}
        type="file"
        id="input-file"
        name="file"
        accept="image/*"
        onChange={onFileChanged} />
      {
        localFile
          ? <button
            onClick={() => {
              if (!fileToUpload) return
              uploadFile(fileToUpload)
            }}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload file</button>
          : <>
            <span className="my-4">Or</span>
            <button
              onClick={handleOpenFile}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Choose a file</button>
          </>
      }

    </>
  )
}
