import React, { useState, useEffect } from 'react'

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { BASE_PATH } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { saveVideo } from '../../../../redux/actions'
import { bindActionCreators } from 'redux'

interface Question {
  ID: number,
  text: string,
  Answered: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  videos: any,
}

/* AKA: Q&A screen */
function QuestionsScreen(props: Props) {
  // const [videos, setVideos] = useState([]])
  const [selected, setSelected] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const {push} = props.navigation
  const [modalVisibility, setModalVisibility] = useState(false)

  useEffect(() => {
    console.log('VIDEOS in redux: ', props.videos)

    fetch('https://38bae06e.ngrok.io/api/user/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <FlatList<Question>
        data={questions}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              if(item.Answered) {
                Alert.alert(
                  'Edit your Answer clip',
                  'If you want to change your clip, do it here!',
                  [
                    {text: 'View Answer', 
                      onPress: () => {
                        push('View', {question: props.videos[item.ID-1].questionText, uri: props.videos[item.ID-1].uri})
                      }
                    },
                    {text: 'Re-record Answer', 
                      onPress: () => {
                        Alert.alert(
                          'Are you sure you want to re-record your clip?',
                          'You\'ll lose your old clip',
                          [
                            {text: 'Re-record',
                              onPress: () => {
                                push('Record', {question: item.text, questionID: item.ID})
                              }
                            },
                            {text: 'Cancel', style: 'cancel'}
                          ]
                        )
                      }},
                    {text: 'Cancel', style: 'cancel'}
                  ]
                )
              } else {
                push('Record', {question: item.text, questionID: item.ID})
              }
              setSelected(item.ID)
            }}
            underlayColor={item.Answered ? '#A02257' : '#E8E8E8'}
            style={[styles.question, item.Answered ? styles.notSelectedAnswered : styles.notSelectedUnanswered]}
            key={item.text}>
            <Text
              style={item.Answered ? styles.titleAnswered : styles.titleUnanswered}
            >{item.text}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.text}
        extraData={selected}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

QuestionsScreen.navigationOptions = {
  title: '',
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Profile</Text>
    </View>
  ),
  headerStyle: {height: 140},   
}

const mapStateToProps = (state: any) => {
  return {
    videos: state.videos
  }
}

export default connect(mapStateToProps)(QuestionsScreen)
