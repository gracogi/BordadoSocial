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

export default function LoginScreen({ navigation }) { 
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Welcome')} 
      >
        <Icon name="chevron-back" size={30} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>BEM-VINDO!!</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="person-outline" size={20} color="#A0A0A0" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Usuário / E-mail"
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Não possui uma conta? Cadastra-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}