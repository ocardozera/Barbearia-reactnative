import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView, StyleSheet,
} from 'react-native';

import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';
import {TextInputMask} from "react-native-masked-text";

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
                            <Mytextinput
                                placeholder="Digite o Código do Tipo de Serviço"
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
                                placeholder="Digite o Nome do Serviço"
                                value={servicoNome}
                                style={{ padding: 10 }}
                                onChangeText={
                                    (servicoNome) => setServicoName(servicoNome)
                                }
                            />
                            <TextInputMask
                                placeholder="Valor do Serviço R$"
                                type={'money'}
                                style={styles.inputText}
                                keyboardType="numeric"
                                blurOnSubmit={false}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#00AD98"
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={servicoPreco}
                                onChangeText={
                                    (servicoPreco) => setServicoPreco(servicoPreco)
                                }
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

export default UpdateTipoServico;