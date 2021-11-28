import React  from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';

const Home = ({ navigation }) => {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>

                        <MyImageButton
                            title="Registro de Funcionário"
                            btnColor='#2992C4'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenFuncionario')}
                        />

                        <MyImageButton
                            title="Registro de Tipo de Serviço"
                            btnColor='#00FA9A'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenTipoServico')}
                        />

                        <MyImageButton
                            title="Registrar Serviço Realizado"
                            btnColor='#FFD700'
                            btnIcon="check"
                            customClick={() => navigation.navigate('HomeScreenTipoServico')}
                        />
                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
};

export default Home;