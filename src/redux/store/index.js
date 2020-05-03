import { createStore } from 'redux'
import rootReducer from '../reducers/index'

import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistCombineReducers } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['rootReducer'] // which reducer want to store

}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
// Middleware: Redux Persist Persister
const persistor = persistStore(store)

export {
  store,
  persistor,
}
// export const persistor = persistStore(store)


// import { createStore } from 'redux'
// import rootReducer from '../reducers/index'

// const store = createStore(rootReducer)

// export default store