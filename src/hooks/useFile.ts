import { useReducer } from 'react'
import type { Action, State } from '@/types'

const initialState: State = {
  localFile: '',
  loading: false,
  isError: false,
  fileSuccess: false,
  imageFileServer: ''
}

function reducer (state: State, action: Action): State {
  if (action.type === 'RESET_STATE') return initialState
  if (action.type === 'SET_FILE') {
    return {
      ...state,
      loading: true,
      localFile: action.payload
    }
  }
  if (action.type === 'UPLOAD_FILE') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SET_FILE_SUCCESS') {
    return {
      ...state,
      fileSuccess: true,
      loading: false,
      imageFileServer: action.payload
    }
  }
  if (action.type === 'SET_FILE_ERROR') {
    return {
      ...state,
      loading: false,
      isError: true
    }
  }
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload
    }
  }
  return state
}
export const useFileUploader = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, fileSuccess, localFile, imageFileServer } = state

  return {
    reducer,
    loading,
    fileSuccess,
    dispatch,
    localFile,
    imageFileServer
  }
}
