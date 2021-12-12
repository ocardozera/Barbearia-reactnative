import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text, StyleSheet,
} from 'react-native';

import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';
import {TextInputMask} from "react-native-masked-text";

const db = DatabaseConnection.getConnection();

const UpdateFuncionario = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');

  let updateAllStates = (name, contact) => {
    setUserName(name);
    setUserContact(contact);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_funcionario where funcionario_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.funcionario_nome,
              res.funcionario_telefone
            );
          } else {
            alert('Funcionario não encontrado!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userContact);

    if (!inputUserId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!userName) {
      alert('Por favor informe o Nome !');
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

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_funcionario set funcionario_nome=?, funcionario_telefone=? where funcionario_id=?',
        [userName, userContact, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Funcionario atualizado com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreenFuncionario'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar o Funcionario');
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
                placeholder="Digite o Código do Funcionário"
                style={{ padding: 10 }}
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
              />
              <Mybutton
                title="Buscar Funcionario"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Digite o Nome Completo"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
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
                  value={'' + userContact}
                  onChangeText={
                    (userContact) => setUserContact(userContact)
                  }
              />
              <Mybutton
                title="Atualizar Funcionário"
                customClick={updateUser}
              />
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

export default UpdateFuncionario;