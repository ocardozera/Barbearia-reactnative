import React from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../components/MyImageButton';

const HomeScreenTipoServico = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <MyImageButton
                            title="Registrar Tipo de Serviço"
                            btnColor='#2992C4'
                            btnIcon="user-plus"
                            customClick={() => navigation.navigate('RegisterTipoServico')}
                        />

                        <MyImageButton
                            title="Atualizar Tipo de Serviço"
                            btnColor='#A45BB9'
                            btnIcon="user-circle"
                            customClick={() => navigation.navigate('UpdateTipoServico')}
                        />

                        <MyImageButton
                            title="Visualizar um Tipo de Serviço"
                            btnColor='#F9AD29'
                            btnIcon="user"
                            customClick={() => navigation.navigate('ViewTipoServico')}
                        />
                        <MyImageButton
                            title="Visualizar Todos os Tipos Serviços"
                            btnColor='#384F62'
                            btnIcon="users"
                            customClick={() => navigation.navigate('ViewAllTiposServicos')}
                        />
                        <MyImageButton
                            title="Excluir Tipo de Serviço"
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