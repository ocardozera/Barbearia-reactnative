import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../components/MyImageButton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreenTipoServico = ({ navigation }) => {
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_tipo_servico'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_tipo_servico', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_tipo_servico(tipo_servico_id INTEGER PRIMARY KEY AUTOINCREMENT, nome_servico VARCHAR(99), preco_servico VARCHAR(6))',
                            []
                        );
                    }
                }
            );
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <MyImageButton
                            title="Registrar Tipo de Servico"
                            btnColor='#2992C4'
                            btnIcon="user-plus"
                            customClick={() => navigation.navigate('RegisterTipoServico')}
                        />

                        <MyImageButton
                            title="Atualizar Tipo de Servico"
                            btnColor='#A45BB9'
                            btnIcon="user-circle"
                            customClick={() => navigation.navigate('UpdateTipoServico')}
                        />

                        <MyImageButton
                            title="Visualizar Tipos de Servicos"
                            btnColor='#F9AD29'
                            btnIcon="user"
                            customClick={() => navigation.navigate('ViewTipoServico')}
                        />
                        <MyImageButton
                            title="Visualizar Todos Tipo Servico"
                            btnColor='#384F62'
                            btnIcon="users"
                            customClick={() => navigation.navigate('ViewAllTiposServicos')}
                        />
                        <MyImageButton
                            title="Excluir Tipo de Servico"
                            btnColor='#D1503A'
                            btnIcon="user-times"
                            customClick={() => navigation.navigate('DeleteTipoServico')}
                        />
                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
};

export default HomeScreenTipoServico;