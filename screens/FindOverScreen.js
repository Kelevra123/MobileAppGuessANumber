import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const FindOverScreen = props => {

  const gameOverCondition = () => {
    if (props.roundsNumber > 0 ) {
      return (
        <BodyText style={styles.resultText}>
          Ты угадал с {' '}
          <Text style={styles.highlight}>{8 - props.roundsNumber}</Text> попыток номер {' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      )
    } else {
      return (
        <BodyText style={styles.resultText}>
            Ты не смог угадать число {' '}<Text style={styles.highlight}>{props.userNumber}</Text>. 
            Попробуй снова!
        </BodyText>
      )
      }
  }


  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        {gameOverCondition()}
      </View>

      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      <MainButton style={styles.menu} onPress={() => props.mainMenu(0)}>
          MAIN MENU
        </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  menu: {
    alignItems: 'center',
    backgroundColor: Colors.accent,
    marginTop: 10
  }
});

export default FindOverScreen;