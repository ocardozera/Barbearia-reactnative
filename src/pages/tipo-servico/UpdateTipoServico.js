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

const UpdateTipoServico = ({ navigation }) => {
    let [inputServicoId, setInputServicoId] = useState('');
    let [servicoNome, setServicoName] = useState('');
    let [servicoPreco, setServicoPreco] = useState('');

    let updateAllStates = (name, contact, address) => {
        setServicoName(name);
        setServicoPreco(contact);
    };

        let searchUser = () => {
        console.log(inputServicoId);
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_tipo_servico where tipo_servico_id = ?',
                [inputServicoId],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        let res = results.rows.item(0);
                        updateAllStates(
                            res.nome_servico,
                            res.preco_servico,
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
        console.log(inputServicoId, servicoNome, servicoPreco);

        if (!inputServicoId) {
            alert('Por Favor informe o Código!');
            return;
        }
        if (!servicoNome) {
            alert('Por favor informe o Nome do Serviço !');
            return;
        }
        if (!servicoPreco) {
            alert('Por Favor informe o Preço do Serviço !');
            return;
        }
        // 'CREATE TABLE IF NOT EXISTS table_tipo_servico(tipo_servico_id INTEGER PRIMARY KEY AUTOINCREMENT, nome_servico VARCHAR(99), preco_servico VARCHAR(6))',


        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_tipo_servico set nome_servico=?, preco_servico=? where tipo_servico_id=?',
                [servicoNome, servicoPreco, inputServicoId],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Tipo de serviço atualizado com sucesso !!',
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
                            <Mytext text="Filtro de Tipo de Serviço" />
                            <Mytextinput
                                placeholder="Entre com o Código do Tipo de Serviço"
                                style={{ padding: 10 }}
                                onChangeText={
                                    (inputServicoId) => setInputServicoId(inputServicoId)
                                }
                            />
                            <Mybutton
                                title="Buscar Tipo de Serviço"
                                customClick={searchUser}
                            />
                            <Mytextinput
                                placeholder="Entre com o Nome do Serviço"
                                value={servicoNome}
                                style={{ padding: 10 }}
                                onChangeText={
                                    (servicoNome) => setServicoName(servicoNome)
                                }
                            />
                            <Mytextinput
                                placeholder="Entre com o Valor do serviço"
                                value={'' + servicoPreco}
                                onChangeText={
                                    (servicoPreco) => setServicoPreco(servicoPreco)
                                }
                                maxLength={11}
                                style={{ padding: 10 }}
                                keyboardType="numeric"
                            />
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

export default UpdateTipoServico;