import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllTipoServico = () => {
    let [flatListServicos, setFlatListServicos] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_tipo_servico',
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
                key={tipoServico.funcionario_id}
                style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
                <Text style={styles.textheader}>Código</Text>
                <Text style={styles.textbottom}>{tipoServico.tipo_servico_id}</Text>

                <Text style={styles.textheader}>Nome do Serviço</Text>
                <Text style={styles.textbottom}>{tipoServico.nome_servico}</Text>

                <Text style={styles.textheader}>Preço</Text>
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

export default ViewAllTipoServico;