import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteServicoRealizado = ({ navigation }) => {
    let [inputServicod, setInputServicoId] = useState('');

    let deleteUser = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM table_servico_realizado where servico_realizado_id=?',
                [inputServicod],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Serviço Realizado Excluído com Sucesso !',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreenTipoServico'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Por favor entre com um código do serviço realizado que seja válido !');
                    }
                }
            );
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <Mytextinput
                        placeholder="Digite o Código do Serviço Realizado"
                        onChangeText={
                            (inputServicod) => setInputServicoId(inputServicod)
                        }
                        style={{ padding: 10 }}
                    />
                    <Mybutton title="Excluir Serviço Realizado" customClick={deleteUser} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteServicoRealizado;