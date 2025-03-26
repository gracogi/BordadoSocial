import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import * as Animatable from 'react-native-animatable'

import {useNavigation} from '@react-navigation/native'

import styles from './styles';

export default function Welcome(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
        <ImageBackground 
          source={require('../../assets/fundo.jpg')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>BORDADO SOCIAL</Text>
                <Text style={styles.text}>Cada ponto, uma história de transformação. Venha bordar com a gente!</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
          </ImageBackground>
        </View>
    );
}