import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import FindScreen from './screens/FindScreen';
import FindOverScreen from './screens/FindOverScreen';
import ChoseGameScreen from './screens/ChoseGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [end, setEnd] = useState(false)
  const [game, setGame] = useState(0)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setEnd(false);
  };

  const restart = () => {
    setGuessRounds();
    setUserNumber()
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  };

  const gameEndHandler = (numOfRounds, end, num) => {
    setGuessRounds(numOfRounds);
    setUserNumber(num)
    setEnd(end)
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  const ChoseGameHandler = (num) => {
    setGame(num)
    restart()
    configureNewGameHandler()
  }





  let content = <StartGameScreen onStartGame={startGameHandler} mainMenu={ChoseGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={restart}
        mainMenu={ChoseGameHandler}
      />
    );
  }

  const myContent = end ? <FindOverScreen
    roundsNumber={guessRounds}
    userNumber={userNumber}
    onRestart={configureNewGameHandler}
    mainMenu={ChoseGameHandler}
    /> : <FindScreen onGameOver={gameEndHandler} mainMenu={ChoseGameHandler}/>

  let whatGame = <ChoseGameScreen yourChoise={ChoseGameHandler}/>

  if (game === 1) {
    return whatGame = content
  } 
  if (game === 2) {
    return whatGame = myContent
  }


  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {whatGame}  
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
