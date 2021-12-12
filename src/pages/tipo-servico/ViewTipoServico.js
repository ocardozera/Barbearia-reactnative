import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewTipoServico = () => {
    let [inputServicoId, setInputServicoId] = useState('');
    let [servicoData, setServicoData] = useState({});

    let searchUser = () => {
        console.log(inputServicoId);
        setServicoData({});
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_tipo_servico where tipo_servico_id = ?',
                [inputServicoId],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        setServicoData(results.rows.item(0));
                    } else {
                        alert('Tipo de serviço não encontrado !');
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
                            (inputServicoId) => setInputServicoId(inputServicoId)
                        }
                        style={{ padding: 10 }}
                    />
                    <Mybutton title="Buscar Tipo de Serviço" customClick={searchUser} />
                    <View
                        style={{
                            marginLeft: 35,
                            marginRight: 35,
                            marginTop: 10
                        }}>
                        <Text>Código : {servicoData.tipo_servico_id}</Text>
                        <Text>Nome Serviço : {servicoData.nome_servico}</Text>
                        <Text>Preço do Serviço : {servicoData.preco_servico}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewTipoServico;