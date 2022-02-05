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

const RegisterServicoRealizado = ({navigation}) => {
    let [nomeCliente, setNomeCliente] = useState('');
    let [selectedValueFuncionario, setSelectedValueFuncionario] = useState('');
    let [selectedValueTipoServico, setSelectedValueTipoServico] = useState('');

    console.log("selectedValueFuncionario" + selectedValueFuncionario);
    console.log("selectedValueTipoServico" + selectedValueTipoServico);

    let register_user = () => {

        if (!nomeCliente) {
            alert('Por favor preencha o nome do Cliente!');
            return;
        }

        if (nomeCliente.length < 4) {
            alert('Nome do Cliente possuír ao menos 5 dígitos!');
            return;
        }

        if (!selectedValueFuncionario) {
            alert('Por favor preencha o nome do Funcionário!');
            return;
        }

        if (!selectedValueTipoServico) {
            alert('Por favor preencha o nome/preço do Serviço!');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_servico_realizado (cliente_nome, funcionario_id, tipo_servico_id) VALUES (?,?,?)',
                [nomeCliente, selectedValueFuncionario, selectedValueTipoServico],
                (tx, results) => {
                    console.log("nomeCliente: " + nomeCliente);
                    console.log("selectedValueFuncionario: " + selectedValueFuncionario);
                    console.log("selectedValueTipoServico: " + selectedValueTipoServico);

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

    let [listaTipoServico, setListaTipoServico] = useState([]);



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

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>

                    <ScrollView keyboardShouldPersistTaps="handled">

                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between'}}>

                            <Mytextinput
                                placeholder="Nome do Cliente"
                                onChangeText={
                                    (nomeCliente) => setNomeCliente(nomeCliente)
                                }
                                style={{padding: 10}}
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
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        borderColor: '#00AD98',
        borderWidth: 1,
        borderRadius: 20,
        right: 35,
    },
});

export default RegisterServicoRealizado;
