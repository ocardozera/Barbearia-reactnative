import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Picker,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';
import PickerItem from "react-native-web/dist/exports/Picker/PickerItem";
import Select from 'react-select';

const db = DatabaseConnection.getConnection();

const RegisterServicoRealizado = ({ navigation }) => {
    let [nomeFuncionario, setFuncionario] = useState('');
    let [nomeCliente, setNomeCliente] = useState('');
    let [nomeServico, setNomeServico] = useState('');
    let [precoServico, setPrecoServico] = useState('')

    let [selectedValue, setSelectedValue] = useState('');
    let listaFuncionarios = [];


      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_funcionario',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                listaFuncionarios.push(results.rows.item(i));
            }
          );
        });
      }, []);



    let register_user = () => {
        console.log(nomeServico, precoServico, setNomeCliente, setFuncionario);

        if (!nomeFuncionario) {
            alert('Por favor preencha o nome do Funcionario!');
            return;
        }
        if (!nomeCliente) {
            alert('Por favor preencha o nome do Cliente!');
            return;
        }
        if (!nomeServico) {
            alert('Por favor preencha o nome do Serviço!');
            return;
        }
        if (!precoServico) {
            alert('Por favor preencha o preço do serviço!');
            return;
        }
            db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_servico_realizado (funcionario_nome, cliente_nome, nome_servico, preco_servico) VALUES (?,?)',
                [nomeServico, precoServico],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Serviço Realizado Registrado com Sucesso !!!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreenServicoRealizado'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Erro ao tentar Registrar o Serviço Realizado!!!');
                }
            );
        });
    };

//      let listItemView = (item) => {
//        return (
//          <View
//            key={item.funcionario_id}
//            style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
//            <Text style={styles.textheader}>Código</Text>
//            <Text style={styles.textbottom}>{item.funcionario_id}</Text>
//
//            <Text style={styles.textheader}>Nome</Text>
//            <Text style={styles.textbottom}>{item.funcionario_nome}</Text>
//
//            <Text style={styles.textheader}>Contato</Text>
//            <Text style={styles.textbottom}>{item.funcionario_telefone}</Text>
//
//
//          </View>
//        );
//      };

//        return (
//          <SafeAreaView style={{ flex: 1 }}>
//            <View style={{ flex: 1, backgroundColor: 'white' }}>
//              <View style={{ flex: 1 }}>
//                <FlatList
//                  style={{ marginTop: 30 }}
//                  contentContainerStyle={{ paddingHorizontal: 20 }}
//                  data={flatListItems}
//                  keyExtractor={(item, index) => index.toString()}
//                  renderItem={({ item }) => listItemView(item)}
//                />
//              </View>
//            </View>
//          </SafeAreaView>
//        );

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>




                    <ScrollView keyboardShouldPersistTaps="handled">



                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between'}}>





                            <Mytextinput
                                placeholder="Entre com o Nome do Funcionário"
                                onChangeText={
                                    (nomeFuncionario) => setFuncionario(nomeFuncionario)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Entre com o Nome do Cliente"
                                onChangeText={
                                    (nomeCliente) => setNomeCliente(nomeCliente)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Entre com o Nome do Serviço"
                                onChangeText={
                                    (nomeServico) => setNomeServico(nomeServico)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Entre com o valor do serviço"
                                onChangeText={
                                    (precoServico) => setPrecoServico(precoServico)
                                }
                                maxLength={11}
                                keyboardType="numeric"
                                style={{padding: 10}}
                            />
                            <Mybutton title="Salvar" customClick={register_user}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
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

export default RegisterServicoRealizado;