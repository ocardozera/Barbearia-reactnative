import React from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../components/MyImageButton';

const HomeScreenServicoRealizado = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <MyImageButton
                            title="Registrar Serviço Realizado  "
                            btnColor='#2992C4'
                            btnIcon="user-plus"
                            customClick={() => navigation.navigate('RegisterServicoRealizado')}
                        />

                        <MyImageButton
                            title="Atualizar Serviço Realizado  "
                            btnColor='#A45BB9'
                            btnIcon="user-circle"
                            customClick={() => navigation.navigate('')}
                        />

                        <MyImageButton
                            title="Visualizar um Serviço Realizado  "
                            btnColor='#F9AD29'
                            btnIcon="user"
                            customClick={() => navigation.navigate('ViewServicoRealizado')}
                        />
                        <MyImageButton
                            title="Todos Serviços Realizados  "
                            btnColor='#384F62'
                            btnIcon="users"
                            customClick={() => navigation.navigate('ViewAllServicoRealizado')}
                        />
                        <MyImageButton
                            title="Excluir Serviço Realizado  "
                            btnColor='#D1503A'
                            btnIcon="user-times"
                            customClick={() => navigation.navigate('')}
                        />
                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
};

export default HomeScreenServicoRealizado;