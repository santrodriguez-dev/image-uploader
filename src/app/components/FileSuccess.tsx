'use client'
import { FOLDER_PATH } from '@/app/constants'
import { useRef } from 'react'

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

export function FileSuccess ({ resetState, img }: { resetState: () => void, img: string }) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const relativeFilePath = `${FOLDER_PATH}/${img}`
  const absoluteFilePath = `${DOMAIN_URL ?? ''}/${relativeFilePath}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(absoluteFilePath)
  }

  return (
    <>
      <h4 className="text-2xl font-bold mb-4">Uploaded Successfully!</h4>
      <div className="uploader-main-container__content-image">
        <img src={relativeFilePath} alt="image uploaded" className="uploader-main-container__image" />
      </div>
      <div className="uploader-main-container__input-content mt-4 mb-1">
        <input ref={inputFileRef} type="text" className="uploader-main-container__input-file" disabled value={absoluteFilePath} />
        <button onClick={handleCopyLink} className="uploader-main-container__cta-1 uploader-main-container__cta-1--copy-link">Copy Link</button>
      </div>
      <a
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mb-4"
        href={absoluteFilePath}
        target="_blank"
        rel="noreferrer">Open file</a>
      <button
        onClick={resetState}
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Upload new image</button>
    </>
  )
}
