// import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
// import * as Font from 'expo-font';
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
// import {store  from './src/redux/store'
import {store, persistor} from './src/redux/store'

import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './src/navigation/AppNavigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // if (!isLoadingComplete && !props.skipLoadingScreen) {
  //   return (
  //     <AppLoading
  //       startAsync={loadResourcesAsync}
  //       onError={handleLoadingError}
  //       onFinish={() => handleFinishLoading(setLoadingComplete)}
  //     />
  //   );
  // } else {
  // const per bsistor = persistStore(store)
  return (
    

    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Provider store = { store }>
        <PersistGate loading={null} persistor={persistor}>

          <AppNavigator />
        </PersistGate>
      </Provider>
    </View>
  )
  // }
}

// async function loadResourcesAsync() {
//   await Promise.all([
//     Asset.loadAsync([
//       require('./assets/images/robot-dev.png'),
//       require('./assets/images/robot-prod.png'),
//     ]),
//     Font.loadAsync({
//       // This is the font that we are using for our tab bar
//       // ...Ionicons.font,
//       // We include SpaceMono because we use it in HomeScreen.js. Feel free to
//       // remove this if you are not using it in your app
//       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//       'montserrat-regular': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
//       'montserrat-bold': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
//       'montserrat-semibold': require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
//       'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
//       'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
//     }),
//   ]);
// }

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}
