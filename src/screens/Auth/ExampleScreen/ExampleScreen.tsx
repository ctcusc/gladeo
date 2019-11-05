import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles' // ALl styling should go in these files
import { BASE_PATH } from 'react-native-dotenv'

interface State {
  isLoading: boolean,
  companies?: [
    {
      code: number,
      company: string,
    }
  ]
}
// Full Class Component 
export default class ExampleScreen extends React.Component {
  state: State = {
    isLoading: true,
    companies: undefined,
  }

  componentDidMount() {
    // Example call to backend to get company codes
    fetch(`${BASE_PATH}/api/get/company_codes`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ isLoading: false, companies: data })
      }).catch(error => {
        console.log('Error' + error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ExampleScreen</Text>
        <View>
          <Text style={styles.info}>
          Checkout AppNavigator.tsx to understand how the navigation works
          </Text>
          <Text style={styles.info}>
        2 navigation stacks
          </Text>
          <Text style={styles.info}>
        AuthNavigator = Login,Register,ExampleScreen
          </Text>
          <Text style={styles.info}>
        MainTabNavigator = HomeScreen,CreateScreen,...
          </Text>
        </View>
        <View>
          <Text style={[styles.info]}>
            Checkout ExampleScreen.tsx for a basic full class example with a call to the backend
          </Text> 
        </View>
        <View>
          <Text style={[styles.info]}>
            Our server can be found in server/server.js. Look here for an example of a /get route using express and connecting w/ Airtable
          </Text>
        </View>
      </View>
    )
  }
}


