import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native'
import { BASE_PATH } from 'react-native-dotenv'
import styles from './styles'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { connect } from 'react-redux'


interface Snippet {
  id: number,
  isSelected: boolean,
  orderInList: number,
  text: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  videos: Array<Record<string, any>>,
}

function SnippetSelectionScreen(props: Props) {
  const [text, setText] = useState('A great video requires at least 3 - 4 clips')
  const [snippetState, setSnippetState] = useState<Array<Snippet>>([])
  const [numSnippets, setNumSnippets] = useState(0)
  const [nextSnippetIndex, setNextSnippetIndex] = useState<number>(2)
  const {navigate, push} = props.navigation 


  useEffect(() => {
    fetch(`${BASE_PATH}/api/user/questions`)
      .then(res => res.json())
      .then(data => {
        let numAnswered = 0
        for(let i = 0; i < data.length; i++){
          if(data[i]['Answered']){
            numAnswered += 1
          }
        }
        if(numAnswered != numSnippets){
          setNumSnippets(numAnswered)
          const initialSnippetState = []
          for(let i = 0; i < data.length; i++){
            if (data[i]['Answered']) {
              const item: Snippet = {
                id: data[i]['ID'], 
                isSelected: false, 
                orderInList: 0,
                text: data[i]['text']
              }
              if (i == 0) {
                item.isSelected = true
                item.orderInList = 1
              }
              initialSnippetState.push(item)
            }
          }
          setSnippetState(initialSnippetState)  
          setNextSnippetIndex(2)
          setText('A great video requires at least 3 - 4 clips')
        } 
      })
      .catch(error => {
        console.log('Error' + error)
      })
  })

  function updateSnippetState(item: Snippet) {
    const modifiedQuestionState = snippetState
    // if question is the intro, don't let the user deselect it.
    if (item.id == 1) {
      Alert.alert(
        'Warning',
        'You must include your introduction as the first snippet',
        [
          {text: 'Okay', style: 'cancel'}
        ]
      )
    }
    // the question is selected previously, remove it from the list and update the order of other items
    else if(modifiedQuestionState[item.id-1].isSelected){
      const preOrder = item.orderInList
      for(let i = 0; i < modifiedQuestionState.length; i++){
        // move up question in list
        if(i != (item.id-1)){
          if(modifiedQuestionState[i].orderInList > preOrder){  
            modifiedQuestionState[i].orderInList = modifiedQuestionState[i].orderInList-1
          }
        } else{
          modifiedQuestionState[i].isSelected = false
          modifiedQuestionState[i].orderInList = 0
        }
        // snippet is newly selected, add to list
        setSnippetState(modifiedQuestionState)
        setNextSnippetIndex(nextSnippetIndex-1)
      }
    } 
    // newly selected question
    else{
      for(let i = 0; i < modifiedQuestionState.length; i++){
        if(i == (item.id-1)){
          modifiedQuestionState[i].isSelected = true
          modifiedQuestionState[i].orderInList = nextSnippetIndex
        }
        setSnippetState(modifiedQuestionState)
        setNextSnippetIndex(nextSnippetIndex+1)
      }
    }
  }
  
  function updateBottomText(item: Snippet){
    if(item.isSelected){
      if(nextSnippetIndex == 0){
        setText('A great video requires at least 3 - 4 clips')
      } else if(nextSnippetIndex == 1){
        setText((nextSnippetIndex) + ' snippet selected')
      } else{
        setText((nextSnippetIndex) + ' snippets selected')
      }
    } else{
      if(nextSnippetIndex == 2){
        setText('A great video requires at least 3 - 4 clips')
      } else if(nextSnippetIndex == 3){
        setText(nextSnippetIndex-2 + ' snippet selected')
      } else{
        setText(nextSnippetIndex-2 + ' snippets selected')
      }
    }
  }

  async function combineVideo() {
    // Store choose only the selected Snippets.
    const selectedVideos = []
    for (let index = 0; index < snippetState.length; index++) {
      if (snippetState[index].isSelected) {
        selectedVideos.push(snippetState[index])
      }
    }
    // Sort the Snippets according to the order the user selected them in.
    selectedVideos.sort((a, b) => a.orderInList - b.orderInList)
    // update the question states
    for(let i = 1; i < snippetState.length; i++){
      snippetState[i].isSelected = false
      snippetState[i].orderInList = 0
      setNextSnippetIndex(2)
      setText('A great video requires at least 3 - 4 clips')
    }
    push('CreatingVideo', {'videosToCombine': selectedVideos})
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.questions}>
        <FlatList<Snippet>
          data={snippetState}
          renderItem={({ item }) => (
            <View style={styles.questionAndCircle}>
              <TouchableHighlight
                underlayColor={'#A02257'}
                onPress={
                  () => {
                    updateSnippetState(item)
                    updateBottomText(item)
                  }
                }
                style={item.isSelected ? styles.questionSelected : styles.question}
              >
                <Text style={styles.titleSelected}>{item.text}</Text>
              </TouchableHighlight>
              <View style={item.isSelected ? styles.circleSelected : styles.circle}>
                <Text style={styles.circleText}> {item.orderInList} </Text>
              </View>
            </View>
          )}
          keyExtractor={(item: { text: any }) => item.text}
          extraData={null}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.createVideo}>
        <Text>{text}</Text>
        <TouchableOpacity
          onPress={ () => {
            if(nextSnippetIndex < 4) {
              Alert.alert(
                'Warning',
                'You should select at least 3 snippets before creating your video',
                [
                  {text: 'Okay', style: 'cancel'}
                ]
              )
            } else {
              combineVideo()
            }
          }}
          style={nextSnippetIndex > 4 ? styles.pinkButtonAbled : styles.pinkButton}
        >
          <Text style={styles.buttontext}>
            CREATE VIDEO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

SnippetSelectionScreen.navigationOptions = {
  title: '',
  // eslint-disable-next-line react/display-name
  headerLeft: () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Snippet Selection</Text>
    </View>
  ),
  headerStyle: {height: 140},   
}

const mapStateToProps = (state: any) => {
  return {
    videos: state
  }
}

export default connect(mapStateToProps)(SnippetSelectionScreen)