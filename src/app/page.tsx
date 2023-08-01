'use client'
import './styles/image-uploader.css'
import { Container, FileSuccess, FileUploader, Loader } from './components'
import { useFileUploader } from './hooks/useFile'
import confetti from 'canvas-confetti'
import { Toaster, toast } from 'sonner'

function App () {
  const { loading, fileSuccess, imageFileServer, dispatch } = useFileUploader()

  const setFile = (file: File) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    const formData = new FormData()
    formData.append('files', file)

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
        confetti()
        toast.success('Se ha subido el archivo correctamente!')
      })
      .catch(err => {
        toast.error('Ha ocurrido un error al subir el archivo 😞. \n Por favor intenta mas tarde')
        dispatch({ type: 'SET_FILE_ERROR' })
        console.log(err)
      })
  }

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' })
  }

  return (
    <Container>
      <Toaster richColors/>
      {!loading && !fileSuccess && <FileUploader uploadFile={setFile} />}
      {loading && <Loader />}
      {fileSuccess && <FileSuccess resetState={resetState} img={imageFileServer} />}
    </Container>
  )
}

export default App
