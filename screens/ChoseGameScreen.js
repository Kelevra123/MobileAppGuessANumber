import  React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../components/MainButton';

const ChoseGameScreen = ({yourChoise}) => {
    return (
        <View style={styles.screen}>
            <MainButton style={styles.button} onPress={() => yourChoise(2)}>Ты угадываешь</MainButton>
            <MainButton style={styles.buttonT} onPress={() => yourChoise(1)}>Телефон угадывает</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.primary,
        height: "40%",
        justifyContent: 'center'
    },
    buttonT: {
        height: "40%",
        justifyContent: 'center'
    }
})

export default ChoseGameScreen;