import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllServicoRealizado = () => {
    let [flatListServicos, setFlatListServicos] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT tbs.servico_realizado_id, tbs.cliente_nome, tf.funcionario_nome, tts.nome_servico, tts.preco_servico FROM table_servico_realizado tbs, table_funcionario tf, table_tipo_servico tts WHERE tbs.funcionario_id = tf.funcionario_id AND tbs.tipo_servico_id = tts.tipo_servico_id',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setFlatListServicos(temp);
                }
            );
        });
    }, []);

        let listItemView = (tipoServico) => {
        return (
            <View
                key={tipoServico.servico_realizado_id}
                style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
                <Text style={styles.textheader}>Código</Text>
                <Text style={styles.textbottom}>{tipoServico.servico_realizado_id}</Text>

                <Text style={styles.textheader}>Nome Cliente</Text>
                <Text style={styles.textbottom}>{tipoServico.cliente_nome}</Text>

                <Text style={styles.textheader}>Nome do Funcionário</Text>
                <Text style={styles.textbottom}>{tipoServico.funcionario_nome}</Text>

                <Text style={styles.textheader}>Serviço Realizado</Text>
                <Text style={styles.textbottom}>{tipoServico.nome_servico}</Text>

                <Text style={styles.textheader}>Preço Serviço Realizdo</Text>
                <Text style={styles.textbottom}>{tipoServico.preco_servico}</Text>


            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ marginTop: 30 }}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={flatListServicos}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textheader: {
        color: '#111',
        fontSize: 12,
        fontWeight: '700',

    },
    textbottom: {
        color: '#111',
        fontSize: 18,
    },
});

export default ViewAllServicoRealizado;