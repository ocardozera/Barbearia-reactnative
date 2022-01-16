import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewServicoRealizado = () => {
    let [inputServicoId, setInputServicoId] = useState('');
    let [servicoData, setServicoData] = useState({});

    let searchUser = () => {
        console.log(inputServicoId);
        setServicoData({});
        db.transaction((tx) => {
            tx.executeSql(
                // 'SELECT * FROM table_tipo_servico where tipo_servico_id = ?',
                'SELECT tbs.servico_realizado_id, tbs.cliente_nome, tf.funcionario_nome, tts.nome_servico, tts.preco_servico FROM table_servico_realizado tbs, table_funcionario tf, table_tipo_servico tts WHERE tbs.servico_realizado_id = ? AND tbs.funcionario_id = tf.funcionario_id AND tbs.tipo_servico_id = tts.tipo_servico_id;\n',
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
                        placeholder="Digite o Código do Serviço Realizado"
                        onChangeText={
                            (inputServicoId) => setInputServicoId(inputServicoId)
                        }
                        style={{ padding: 10 }}
                    />
                    <Mybutton title="Buscar Serviço Realizado" customClick={searchUser} />
                    <View
                        style={{
                            marginLeft: 35,
                            marginRight: 35,
                            marginTop: 10
                        }}>
                        <Text>Código : {servicoData.servico_realizado_id}</Text>
                        <Text>Nome Cliente : {servicoData.cliente_nome}</Text>
                        <Text>Nome Funcionário : {servicoData.funcionario_nome}</Text>
                        <Text>Nome Serviço : {servicoData.nome_servico}</Text>
                        <Text>Preço do Serviço : {servicoData.preco_servico}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewServicoRealizado;