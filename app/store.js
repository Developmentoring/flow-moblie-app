import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import sessionReducer from '../features/login/sessionSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionReducer
  }
})