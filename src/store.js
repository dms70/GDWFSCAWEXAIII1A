import { configureStore,createSlice,createAsyncThunk} from '@reduxjs/toolkit'



const addStashs = createAsyncThunk(
    'posts/new',
    async (payload) => {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json' 
        }
      })
      const data = await response.json()
      return data
    }
  )

  export const addStashs = createAsyncThunk(
    'stashs/addNewstashs',
    // The payload creator receives the partial `{title, content, user}` object
    async dataToPost => {
      // We send the initial data to the fake API server
      const response = axios.post('http://localhost/api/stashs', dataToPost)
      // The response includes the complete post object, including unique ID
      return response.post
    }
  )
  


  axios.post('http://localhost/api/stashs', dataToPost)
  .then(console.log)
  .then(response => setPostValue(JSON.stringify(response)))
  .catch(error => console.log(error));


const stashsSlice = createSlice({
    name: 'country',
    initialState: {
      stashsinput: [
        {codename: '',
        adress: '',
        country: '',
        typem: ''
        }
    ]
    },
    reducers: {
        addStashs(state, action){
          return {
            ...state,
            stashsinput: [...state.stashsinput, action.payload]
          }
        },
        getStashs: state => ({
          ...state,        
        })
      }
})


const store = configureStore({
    reducer: StashsReducer
  })


export const { addStashs, getStashs } = stashsSlice.actions

export default store;