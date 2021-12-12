import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteTipoServico = ({ navigation }) => {
    let [inputServicod, setInputServicoId] = useState('');

    let deleteUser = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  table_tipo_servico where tipo_servico_id=?',
                [inputServicod],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Tipo de Serviço Excluído com Sucesso !',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('HomeScreenTipoServico'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Por favor entre com um código do tipo de serviço válido !');
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
                        placeholder="Digite o Código do Tipo de Serviço"
                        onChangeText={
                            (inputServicod) => setInputServicoId(inputServicod)
                        }
                        style={{ padding: 10 }}
                    />
                    <Mybutton title="Excluir Tipo de Serviço" customClick={deleteUser} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteTipoServico;