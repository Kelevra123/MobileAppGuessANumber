import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
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
        <BodyText style={styles.resultText}>
          Your phone need  {' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> try to guess number {' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
        <MainButton onPress={props.onRestart} style={styles.new}>NEW GAME</MainButton>
        <MainButton style={styles.menu} onPress={() => props.mainMenu(0)}>
          MAIN MENU
        </MainButton>
      </View>
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
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  menu: {
    backgroundColor: Colors.accent,
    marginTop: 10,
    alignItems: 'center'
  },
  new: {
    alignItems: 'center'
  }
});

export default GameOverScreen;
