import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import translationReducer from './Slice/commonSlices'
import pageDespReducer from './Slice/pageDescriptionSlice'
import loadCartReducer from './Slice/shareDataSlices'
import productSearchSlice from './Slice/productSearchSlice'
import checkoutslice from './Slice/checkoutSlice'

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppThunk type for dispatching actions in async thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


const store = configureStore({
    reducer: {
      lang: translationReducer,
      pageDescription:pageDespReducer,
      loadCart:loadCartReducer,
      reset:loadCartReducer,
      productSearch:productSearchSlice,
      checkout:checkoutslice
    },
    devTools: true,
  })



  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;

  export default store;