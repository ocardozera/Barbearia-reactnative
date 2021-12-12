import React from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../components/MyImageButton';

const HomeScreenFuncionario = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Funcionário  "
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('RegisterFuncionario')}
            />

            <MyImageButton
              title="Atualizar Funcionário  "
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('UpdateFuncionario')}
            />

            <MyImageButton
              title="Visualizar Funcionário  "
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('ViewFuncionario')}
            />
            <MyImageButton
              title="Visualizar Todos Funcionários  "
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAllFuncionarios')}
            />
            <MyImageButton
              title="Excluir Funcionário  "
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('DeleteFuncionario')}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreenFuncionario;