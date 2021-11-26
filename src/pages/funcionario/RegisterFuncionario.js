import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterFuncionario = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');

  let register_user = () => {
    console.log(userName, userContact);

    if (!userName) {
      alert('Por favor preencha o nome !');
      return;
    }
    if (!userContact) {
      alert('Por favor preencha o telefone');
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
              'Funcionario Registrado com Sucesso !!!',
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
                placeholder="Entre com o Nome"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o Telefone"
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={11}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="Salvar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterFuncionario;