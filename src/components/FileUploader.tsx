'use client'
import { useRef } from 'react'
import { CloudImage } from '../assets/Images'

interface Props {
  setFile: (file: FileList) => void
}

export const FileUploader = ({ setFile }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleOpenFile = () => {
    fileInputRef.current?.click()
  }

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setFile(files)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const onDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // const files = e.dataTransfer.files
    // const file = files.item(0)

    // if ((fileInputRef.current == null) || (file == null)) return
    // setFile(file)
  }

  return (
    <>
      <h4 className="text-2xl font-bold">Upload your image</h4>
      <p className="my-4 text-lg text-gray-500 md:text-xl dark:text-gray-400">File should be Jpeg, Png,...</p>

      <div className="uploader-main-container__image-content" id="dropzone" onDrop={onDropImage} onDragOver={onDragOver} ref={dropZoneRef}>
        <CloudImage />
        <p className="my-3 text-gray-500 dark:text-gray-400">Drag & Drop your image here</p>
      </div>
      <span className="my-4">Or</span>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        id="avatar" name="avatar"
        accept="image/*"
        onChange={onFileChanged} />
      <button
        onClick={handleOpenFile}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Choose a file</button>
    </>
  )
}
