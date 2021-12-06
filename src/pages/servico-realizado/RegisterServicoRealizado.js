import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';
import PickerItem from "react-native-web/dist/exports/Picker/PickerItem";

const db = DatabaseConnection.getConnection();

const RegisterServicoRealizado = ({ navigation }) => {
    let [nomeFuncionario, setFuncionario] = useState('');
    let [nomeCliente, setNomeCliente] = useState('');
    let [nomeServico, setNomeServico] = useState('');
    let [precoServico, setPrecoServico] = useState('')

    let state = {
        nome: ''
    }

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

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                       <Picker
                       style={{ width: 300 }}
                       selectedValue={state.nome}
                       onValueChange={
                           (itemValor, itemIndex) => this.setState({
                               nome: itemValor
                           })
                       }
                       >
                           <PickerItem.Item label="Seleção" value=""/>
                           <PickerItem.Item label="Seleção" value=""/>
                           <PickerItem.Item label="Seleção" value=""/>
                       </Picker>

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

export default RegisterServicoRealizado;