import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  let tasks = undefined
  let errorObj = undefined

  await fetch('http://localhost:3000/api/tasks.json', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((json) => {
      tasks = json.tasks
    })
    .catch((error) => errorObj = error)

  return tasks
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (_task) => {
  let task = undefined
  let errorObj = undefined

  await fetch(`http://localhost:3000/api/tasks/${_task.id}.json`, {
    method: 'PUT',
    body: JSON.stringify({ id: _task.id, task: { completed: !_task.completed } }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((json) => {
      task = json
    })
    .catch((error) => { errorObj = error })

  if (errorObj) {
    throw errorObj
  } else {
    return task
  }
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    newTask: { name: '', completed: false },
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clear: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.newTask = {};
      state.list = [];
    },
    setTasks: (state, action) => {
      state.list = action.payload
    },
    updateNewTask: (state, action) => {
      state.newTask = {
        name: action.payload
      }
    },
    setTaskCompleted: (state, action) => {
      const { list } = state
      const { id } = action.payload

      const existingTask = list.find(task => task.id === id)

      if (existingTask) {
        if (existingTask.completed === "false") {
          existingTask.completed = "true"
        } else {
          existingTask.completed = "false"
        }
      }
    },
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.list = state.list.concat(action.payload)
    },
    [fetchTasks.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateTask.pending]: (state, action) => {
      state.status = 'loading'
    },
    [updateTask.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      // Update the array of tasks
      const existingTask = state.list.find(task => task.id === action.payload.id)
      existingTask.completed = action.payload.completed
    },
    [updateTask.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export const { clear, updateNewTask, setTasks, setTaskCompleted } = tasksSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTasks = state => state.tasks.list;
export const selectNewTask = state => state.newTask;

export default tasksSlice.reducer;