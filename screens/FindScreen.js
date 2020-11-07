import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  
  import Card from '../components/Card';
  import MainButton from '../components/MainButton';
  import BodyText from '../components/BodyText';
  import DefaultStyles from '../constants/default-styles';
  import Input from '../components/Input';
  import Colors from '../constants/colors';

const FindScreen = ({onGameOver, mainMenu}) => {

    const [number, setNumber] = useState(Math.floor(Math.random() * (100 - 1) + 1))
    const [userNumber, setUserNumber] = useState()
    const [candidate, setCandidate] = useState()
    const [trys, setTrys] = useState([])
    const [end, setEnd] = useState(false)
    const [rounds, setRoudns] = useState(
      [
        {id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}, {id: '6'}, {id: '7'} 
      ]
      )

    useEffect(() => {
      if (rounds.length <= 0) {
        onGameOver(0, true, number)
      }
    }, [rounds])

    const userInputHandler = (inputText) => {
      setCandidate(inputText.replace(/[^0-9]/g, ''));   
    }

    const userResetHandler = () => {
      setCandidate()
    }

    const renderMethod = ({item}) => {
      if (item.pos) {
        return (
          <View style={styles.left}>
            <BodyText style={styles.textLeft}>{item.value}</BodyText>
            <Ionicons name="ios-arrow-forward" size={24} color="black" />
          </View>
        )
      } else {
        return (
          <View style={styles.right}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <BodyText style={styles.textRight}>{item.value}</BodyText>
          </View>
        )
      }

  }

    let confirmed

    if (!userNumber) {
      confirmed = (
        <MainButton onPress={() => mainMenu(0)} style={styles.menu}>
            MAIN MENU
        </MainButton>
      )
    } else {
      confirmed = (
        <FlatList
        keyExtractor={item => item.id}
        data={trys}
        renderItem={renderMethod}
        contentContainerStyle={styles.list}
      />
      )
    }

    const userAcceptHandler = () => {
      setUserNumber(candidate);
      const cond = candidate;
      how(cond)
    }

    const how = (userNumber) => {
      if (!userNumber) {
        return;
      }
      if (userNumber < number) {
        setTrys(prev => [...prev, {id: Date.now().toString(), value: candidate, pos: true}]);
        setCandidate();
        setRoudns(prev => [...prev.slice(0, -1)])
        Keyboard.dismiss();
      }

      if (userNumber > number) {
       setTrys([...trys, {id: Date.now().toString(), value: candidate, pos: false}]);
       setCandidate();
       setRoudns(prev => [...prev.slice(0, -1)])
       Keyboard.dismiss();
      }

      if (userNumber == number) {
        onGameOver(rounds.length, true, number)
      }
    }

    return (
    <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Введи число от 1 до 99</Text>
        <View style={styles.qwer}>
          <FlatList
            keyExtractor={item => item.id}
            data={rounds}
            renderItem={({item}) => <Ionicons name="ios-heart" size={15} color="red" />}
            contentContainerStyle={styles.hearts}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inputContainer}>
            <Input
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={userInputHandler}
                  value={candidate}
                />
          </View>
        </TouchableWithoutFeedback >
        <Card style={styles.buttonContainer}>
          <MainButton onPress={userResetHandler}>
            <Ionicons name="md-close" size={24} color="white" />
          </MainButton>
          <MainButton onPress={() => userAcceptHandler()} style={styles.greenButton}>
            <Ionicons name="md-checkmark" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {confirmed}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
      screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
      },
      listContainer: {
        flex: 1,
        width: '60%'
      },
      list: {
        // flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
      },
      listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
      },
      input: {
        width: 100,
        textAlign: 'center',
        height: 50,
        fontSize: 50,
        color: 'green',
      },
      greenButton: {
        backgroundColor: 'green'
      },
      left: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "red",
        alignSelf: 'flex-start'
      },
      right: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'blue',
        alignSelf: 'flex-end'
      },
      inputContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      textLeft: {
        fontSize: 30
      },
      textRight: {
        fontSize: 30
      },
      hearts: {
        height: 20,
        marginVertical: 10,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
      },
      bolt: {
        height: 30
      },
      qwer: {
        height: 100
      },
      menu: {
        alignItems: 'center',
        backgroundColor: Colors.accent
      }
})

export default FindScreen