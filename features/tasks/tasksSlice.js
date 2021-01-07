import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: []
  },
  reducers: {
    clear: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list = [];
    },
    setTasks: (state, action) => {
      state.list = action.payload
    },
    setTaskCompleted: (state, action) => {
      const { list } = state
      const { id } = action.payload

      const existingTask = list.find(task => task.id === id)

      if (existingTask) {
        existingTask.completed = "true"
      }
    },
  },
});

export const { clear, setTasks, setTaskCompleted } = tasksSlice.actions;

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

export default tasksSlice.reducer;