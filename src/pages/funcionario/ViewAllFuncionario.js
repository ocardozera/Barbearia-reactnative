import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../../database/database-connection';
import database from "../../config/firabaseConfig";

const db = DatabaseConnection.getConnection();

const ViewAllFuncionario = () => {
  let [flatListItems, setFlatListItems] = useState([]);

    const [task, setTask] = useState([]);

    function deleteTask(id) {
        database.collection("Barbearia-ReactNative").doc(id).delete();
    }

    useEffect(() => {
        database.collection("Barbearia-ReactNative").onSnapshot((query) => {
            const list = [];
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setTask(list);
        });
    }, []);

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM table_funcionario',
  //       [],
  //       (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           temp.push(results.rows.item(i));
  //           console.log(temp);
  //         setFlatListItems(temp);
  //
  //
  //       }
  //     );
  //   });
  // }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.funcionario_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.funcionario_id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.funcionario_nome}</Text>

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.funcionario_telefone}</Text>


      </View>
    );
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={task}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllFuncionario;