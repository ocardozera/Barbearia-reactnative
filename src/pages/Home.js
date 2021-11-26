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
                            btnIcon="user-plus"
                            customClick={() => navigation.navigate('HomeScreenFuncionario')}
                        />

                        <MyImageButton
                            title="Registro de Tipo de Serviço"
                            btnColor='#A45BB9'
                            btnIcon="user-circle"
                            customClick={() => navigation.navigate('HomeScreenTipoServico')}
                        />
                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
};

export default Home;