import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../features/login/sessionSlice'
import tasksReducer from '../features/tasks/tasksSlice'


export default configureStore({
  reducer: {
    session: sessionReducer,
    tasks: tasksReducer
  }
})