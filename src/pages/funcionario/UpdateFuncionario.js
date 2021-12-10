import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateFuncionario = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  // let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, contact) => {
    setUserName(name);
    setUserContact(contact);
    // setUserAddress(address);
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
    if (!userContact) {
      alert('Por Favor informe o Telefone !');
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
              <Mytext text="Filtro de Funcionario" />
              <Mytextinput
                placeholder="Entre com o Código do Funcionario"
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
                placeholder="Entre com o Nome"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <Mytextinput
                placeholder="Entre com o Telefone"
                value={'' + userContact}
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={11}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton
                title="Atualizar Funcionario"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateFuncionario;