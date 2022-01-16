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

const RegisterTipoServico = ({ navigation }) => {
    let [nomeServico, setNomeServico] = useState('');
    let [precoServico, setPrecoServico] = useState('');


    let register_user = () => {
        console.log(nomeServico, precoServico);

        if (!nomeServico) {
            alert('Por favor preencha o nome do serviço!');
            return;
        }
        if (!precoServico) {
            alert('Por favor preencha o preço do serviço');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_tipo_servico (nome_servico, preco_servico) VALUES (?,?)',
                [nomeServico, precoServico],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Tipo de Serviço Registrado com Sucesso !!!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreenTipoServico'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Erro ao tentar Registrar o Tipo de Serviço !!!');
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
                                placeholder="Nome do Serviço"
                                onChangeText={
                                    (nomeServico) => setNomeServico(nomeServico)
                                }
                                style={{ padding: 10 }}
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
                                value={precoServico}
                                onChangeText={
                                    (precoServico) => setPrecoServico(precoServico)
                                }
                            />

                            <Mybutton title="Salvar" customClick={register_user} />
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

export default RegisterTipoServico;