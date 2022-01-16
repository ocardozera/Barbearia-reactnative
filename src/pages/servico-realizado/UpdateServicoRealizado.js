import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView, StyleSheet, Picker,
} from 'react-native';

import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateServicoRealizado = ({ navigation }) => {
    let [inputServicoId, setInputServicoId] = useState('');
    let [clienteNome, setClienteNome] = useState('');
    let [selectedValueFuncionario, setSelectedValueFuncionario] = useState('');
    let [selectedValueTipoServico, setSelectedValueTipoServico] = useState('');
    let [listaFuncionarios, setListaFuncionarios] = useState([]);
    let [listaTipoServico, setListaTipoServico] = useState([]);

    let updateAllStates = (name, contact, address) => {
        setClienteNome(name);
        setSelectedValueFuncionario(contact);
        setSelectedValueTipoServico(address);
    };

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

            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_tipo_servico',
                    [],
                    (tx, results) => {
                        setListaTipoServico(Array.from(results.rows));
                    }
                );
            });
        }

        fetchMyAPI()
    }, [])

    let searchUser = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT tbs.servico_realizado_id, tbs.cliente_nome,tbs.funcionario_id, tbs.tipo_servico_id FROM table_servico_realizado tbs, table_funcionario tf, table_tipo_servico tts WHERE tbs.servico_realizado_id = ? AND tbs.funcionario_id = tf.funcionario_id AND tbs.tipo_servico_id = tts.tipo_servico_id',
                [inputServicoId],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        let res = results.rows.item(0);
                        updateAllStates(
                            res.cliente_nome,
                            res.funcionario_id,
                            res.tipo_servico_id,
                        );
                    } else {
                        alert('Tipo de Servico não encontrado!');
                        updateAllStates('', '', '');
                    }
                }
            );
        });
    };
    let updateUser = () => {
        if (!inputServicoId) {
            alert('Por Favor informe o Código!');
            return;
        }
        if (!clienteNome) {
            alert('Por Favor informe um nome para Cliente!');
            return;
        }
        if (!selectedValueFuncionario) {
            alert('Por Favor informe o nome do Funcionário!');
            return;
        }
        if (!selectedValueTipoServico) {
            alert('Por Favor informe um nome/preço do Serviço!');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_servico_realizado set cliente_nome=?, funcionario_id=?, tipo_servico_id=? where tipo_servico_id=?',
                [clienteNome, selectedValueFuncionario, selectedValueTipoServico, inputServicoId],
                (tx, results) => {
                    console.log('Nome ', clienteNome);
                    console.log('id Funcionáro ', selectedValueFuncionario);
                    console.log('id Tipo ',  selectedValueTipoServico);
                    console.log('Input Servico ',  inputServicoId);
                    console.log('Rows Affected ',  results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Serviço Realizado atualizado com sucesso !!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreenTipoServico'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Erro ao atualizar o Tipo de serviço');
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
                                placeholder="Digite o Código do Serviço Realizado"
                                style={{ padding: 10 }}
                                onChangeText={
                                    (inputServicoId) => setInputServicoId(inputServicoId)
                                }
                            />
                            <Mybutton
                                title="Buscar Serviço Realizado"
                                customClick={searchUser}
                            />
                            <Mytextinput
                                placeholder="Digite o Nome do Cliente"
                                value={clienteNome}
                                style={{ padding: 10 }}
                                onChangeText={
                                    (clienteNome) => setClienteNome(clienteNome)
                                }
                            />

                            <Picker
                                style={styles.button}
                                multiple={false}
                                selectedValue={selectedValueFuncionario}
                                onValueChange={(itemValue, itemIndex) => setSelectedValueFuncionario(itemValue)}>{
                                listaFuncionarios.map((v) => (
                                        <Picker.Item label={v.funcionario_nome} value={v.funcionario_id}
                                                     key={v.funcionario_id}/>
                                    )
                                )
                            }
                            </Picker>

                            <Picker
                                style={styles.button}
                                multiple={false}
                                selectedValue={selectedValueTipoServico}
                                onValueChange={(itemValue, itemIndex) => setSelectedValueTipoServico(itemValue)}>
                                {listaTipoServico.map((v) => (
                                        <Picker.Item label={v.nome_servico + " - " + v.preco_servico} value={v.tipo_servico_id}
                                                     key={v.tipo_servico_id}/>
                                    )
                                )
                                }
                            </Picker>

                            <Mybutton
                                title="Atualizar Tipo de Serviço"
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
    button: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        borderColor: '#00AD98',
        borderWidth: 1,
        borderRadius: 20,
        right: 35,
    },
});

export default UpdateServicoRealizado;