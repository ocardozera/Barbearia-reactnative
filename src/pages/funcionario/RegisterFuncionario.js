import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView, StyleSheet,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';
import {TextInputMask} from "react-native-masked-text";

const db = DatabaseConnection.getConnection();

const RegisterFuncionario = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');

  let register_user = () => {
    if (!userName) {
      alert('Por favor preencha o nome !');
      return;
    }
    if (userName.length < 8) {
      alert('Nome deve ser possuír ao menos 8 dígitos!');
      return;
    }
    if (!userContact) {
      alert('Por favor preencha o telefone');
      return;
    }
    if (userContact.length < 14) {
      alert('Por favor, preencha o telefone com todos os dígitos');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_funcionario (funcionario_nome, funcionario_telefone) VALUES (?,?)',
        [userName, userContact],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Funcionario Registrado com Sucesso!!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreenFuncionario'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar o Funcionario !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>

              <Mytextinput
                placeholder="Digite o Nome Completo"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />

              <TextInputMask
                  placeholder="Telefone com Apenas Números"
                  maxLength={15}
                  keyboardType="numeric"
                  blurOnSubmit={false}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#00AD98"
                  style={styles.inputText}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  value={userContact}
                  onChangeText={
                    (userContact) => setUserContact(userContact)
                  }
              />

              <Mybutton title="Salvar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    borderColor: '#00AD98',
    borderWidth: 1,
    height: 50,
    padding: 10,
    borderRadius: 20,
  },
});

export default RegisterFuncionario;