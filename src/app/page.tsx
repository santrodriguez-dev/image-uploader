'use client'
import '@/styles/image-uploader.css'
import { Container, FileSuccess, FileUploader, Loader } from '@/components'
import { useFileUploader } from '@/hooks/useFile'

function App () {
  const { loading, fileSuccess, imageFileServer, dispatch } = useFileUploader()

  const setFile = (files: FileList) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    const formData = new FormData()
    Array.from(files).forEach((file) => { formData.append('files', file) })

    fetch('api/file',
      {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if (res.statusText !== 'OK') throw new Error('Error uploading files')
        return res.json()
      })
      .then((data) => {
        console.log(data)
        const files = (data.files) as string[]
        const file = files.at(0)
        if (!file) throw new Error('Error getting files')
        dispatch({ type: 'SET_FILE_SUCCESS', payload: file })
      })
      .catch(err => {
        dispatch({ type: 'SET_FILE_ERROR' })
        console.log(err)
      })
  }

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' })
  }

  return (
    <Container>
      {!loading && !fileSuccess && <FileUploader setFile={setFile} />}
      {loading && <Loader />}
      {fileSuccess && <FileSuccess resetState={resetState} img={imageFileServer} />}
    </Container>
  )
}

export default App
