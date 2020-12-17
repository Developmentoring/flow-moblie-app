import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../features/login/sessionSlice'

export default configureStore({
  reducer: {
    session: sessionReducer
  }
})