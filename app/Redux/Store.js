import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice  from './Reducers/wishlistSlice'
import { persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, wishlistSlice)
const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }