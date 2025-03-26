import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; 

import styles from './styles';

export default function RegisterScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.registerText}>CADASTRO</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="person-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="call-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Celular"
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>CADASTRA-SE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>Já possui uma conta? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}