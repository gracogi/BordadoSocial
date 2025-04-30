import React, { useState } from 'react'; // Importar useState!
import { openDatabase } from '../../database/setup';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function RegisterScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  async function addUsuario() {
    const db = await openDatabase();
    try {
      //await db.runAsync('INSERT INTO usuarios (login, senha, email) VALUES (?, ?, ?)',[login, senha, email]);
      //await db.runAsync(`INSERT INTO usuarios (login, senha, email) VALUES ('${login}', '${senha}','${email}')`);
      let teste = await db.runAsync('INSERT INTO usuarios (login, senha, email) VALUES (?, ?, ?)',login, senha, email);
      console.log(teste);
      console.log(typeof(login));
      console.log(senha);
      console.log(email)
      console.log('Usuário inserido com sucesso!');
      // navigation.navigate('SignIn');
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
    }
    let teste2 = await db.getAllAsync('Select * from usuarios');

    console.log(teste2);
  }

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
              onChangeText={setLogin}
              value={login}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#A0A0A0"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="call-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Celular"
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
              // Faltou associar a algum state, ou usar futuramente
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              onChangeText={setSenha}
              value={senha}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={addUsuario}>
          <Text style={styles.signUpButtonText}>CADASTRA-SE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>Já possui uma conta? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
