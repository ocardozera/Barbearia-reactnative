import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_funcionario'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_funcionario', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_funcionario(funcionario_id INTEGER PRIMARY KEY AUTOINCREMENT, funcionario_nome VARCHAR(99), funcionario_telefone INT(11))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Funcionário"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Atualizar Funcionário"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Visualizar Funcionário"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Excluir Funcionário1"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;