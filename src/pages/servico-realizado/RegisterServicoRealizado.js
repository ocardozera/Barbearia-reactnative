import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Picker, StyleSheet
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();


const listaTipoServico = [];

const buscaFuncionarios = () => {
    if (listaFuncionarios.length == 0) {
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
    }
};

const buscaTipoServico = () => {
    if (listaTipoServico.length == 0) {
        useEffect(() => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_tipo_servico',
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            listaTipoServico.push(results.rows.item(i));
                    }
                );
            });
        }, []);
    }
};

const RegisterServicoRealizado = ({navigation}) => {
    // buscaFuncionarios();
    // buscaTipoServico();

    let [nomeFuncionario, setFuncionario] = useState('');
    let [nomeCliente, setNomeCliente] = useState('');
    let [nomeServico, setNomeServico] = useState('');
    let [precoServico, setPrecoServico] = useState('')
    //
    let [selectedValueFuncionario, setSelectedValueFuncionario] = useState('TESTE');
    // let [selectedValueTipoServico, setSelectedValueTipoServico] = useState('');


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
                            {cancelable: false}
                        );
                    } else alert('Erro ao tentar Registrar o Serviço Realizado!!!');
                }
            );
        });
    };

    let [listaFuncionarios, setListaFuncionarios] = useState([]);



        useEffect(() => {
            async function fetchMyAPI() {
                db.transaction((tx) => {
                    tx.executeSql(
                        'SELECT * FROM table_funcionario',
                        [],
                        (tx, results) => {
                            setListaFuncionarios(Array.from(results.rows));
                        }
                    );
                });
            }

            fetchMyAPI()
        }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>

                    <ScrollView keyboardShouldPersistTaps="handled">

                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between'}}>

                            <Mytextinput
                                placeholder="Nome do Funcionário"
                                onChangeText={
                                    (nomeFuncionario) => setFuncionario(nomeFuncionario)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Nome do Cliente"
                                onChangeText={
                                    (nomeCliente) => setNomeCliente(nomeCliente)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Nome do Serviço"
                                onChangeText={
                                    (nomeServico) => setNomeServico(nomeServico)
                                }
                                style={{padding: 10}}
                            />
                            <Mytextinput
                                placeholder="Valor do serviço"
                                onChangeText={
                                    (precoServico) => setPrecoServico(precoServico)
                                }
                                maxLength={11}
                                keyboardType="numeric"
                                style={{padding: 10}}
                            />

                            <Picker
                                style={styles.button}
                                multiple={false}
                                selectedValue={selectedValueFuncionario}
                                onValueChange={(itemValue, itemIndex) => setSelectedValueFuncionario(itemValue)}>{
                                listaFuncionarios.map((v) => (
                                    <Picker.Item label={v.funcionario_nome} value={v.funcionario_id} key={v.funcionario_id} />
                                    )
                                )
                            }
                            </Picker>

                            {/*<Picker*/}
                            {/*    style={styles.button}*/}
                            {/*    selectedValue={listaFuncionarios}*/}
                            {/*    onValueChange={(itemValue, itemIndex) => setSelectedValueTipoServico(itemValue)}>{*/}
                            {/*    listaTipoServico.map((v) => {*/}
                            {/*        return <Picker.Item label={v.nome_servico} value={v.tipo_servico_id}/>*/}
                            {/*    })*/}
                            {/*}*/}
                            {/*</Picker>*/}

                            <Mybutton title="Salvar" customClick={register_user}/>

                        </KeyboardAvoidingView>
                    </ScrollView>

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#00AD98',
        borderWidth: 1,
        right: 35,
    },
});

export default RegisterServicoRealizado;