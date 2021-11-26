import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewFuncionario = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_funcionario where funcionario_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Funcionario não encontrado !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Funcionário" />
          <Mytextinput
            placeholder="Entre com o Código do Funcionário"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Funcionário" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {userData.funcionario_id}</Text>
            <Text>Nome : {userData.funcionario_nome}</Text>
            <Text>Telefone : {userData.funcionario_telefone}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewFuncionario;