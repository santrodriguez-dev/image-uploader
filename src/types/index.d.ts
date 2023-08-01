export interface State {
  localFile: string
  loading: boolean
  isError: boolean
  fileSuccess: boolean
  imageFileServer: string
}

export type Action =
  | { type: 'UPLOAD_FILE' }
  | { type: 'SET_FILE', payload: string }
  | { type: 'SET_FILE_SUCCESS', payload: string }
  | { type: 'SET_FILE_ERROR' }
  | { type: 'RESET_STATE' }
  | { type: 'SET_LOADING', payload: boolean }
