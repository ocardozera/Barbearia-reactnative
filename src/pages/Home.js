import React,{ useEffect }  from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import {DatabaseConnection} from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const Home = ({ navigation }) => {

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_funcionario' OR name='table_tipo_servico'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_funcionario', []);
                        txn.executeSql('DROP TABLE IF EXISTS table_tipo_servico', []);
                        txn.executeSql('DROP TABLE IF EXISTS table_servico_realizado', []);
                        // txn.executeSql(
                        //     'CREATE TABLE IF NOT EXISTS table_funcionario(funcionario_id INTEGER PRIMARY KEY AUTOINCREMENT, funcionario_nome VARCHAR(99), funcionario_telefone INT(11))',
                        //     []
                        // );
                        // txn.executeSql(
                        //     'CREATE TABLE IF NOT EXISTS table_tipo_servico(tipo_servico_id INTEGER PRIMARY KEY AUTOINCREMENT, nome_servico VARCHAR(99), preco_servico VARCHAR(6))',
                        //     []
                        // );

                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_funcionario(funcionario_id INTEGER PRIMARY KEY AUTOINCREMENT, funcionario_nome VARCHAR(99), funcionario_telefone INT(11)); CREATE TABLE IF NOT EXISTS table_tipo_servico(tipo_servico_id INTEGER PRIMARY KEY AUTOINCREMENT, nome_servico VARCHAR(99), preco_servico VARCHAR(6)); CREATE TABLE IF NOT EXISTS table_servico_realizado(servico_realizado_id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(funcionario_id) REFERENCES table_funcionario (funcionario_id), FOREIGN KEY(tipo_servico_id) REFERENCES table_tipo_servico (tipo_servico_id), funcionario_nome VARCHAR(99), cliente_nome VARCHAR(99), nome_servico VARCHAR(99),  preco_servico VARCHAR(6)) ',
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
                            title="Controle dos Funcionários  "
                            btnColor='#04abba'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenFuncionario')}
                        />

                        <MyImageButton
                            title="Controle dos Tipos de Serviços  "
                            btnColor='#06c72d'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenTipoServico')}
                        />

                        <MyImageButton
                            title="Controle dos Serviços Realizados  "
                            btnColor='#7409d9'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenServicoRealizado')}
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Home;