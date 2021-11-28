import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreenFuncionario from './src/pages/funcionario/HomeScreenFuncionario';
import RegisterFuncionario from './src/pages/funcionario/RegisterFuncionario';
import UpdateFuncionario from './src/pages/funcionario/UpdateFuncionario';
import ViewFuncionario from './src/pages/funcionario/ViewFuncionario';
import ViewAllFuncionario from './src/pages/funcionario/ViewAllFuncionario';
import DeleteFuncionario from './src/pages/funcionario/DeleteFuncionario';
import HomeScreenTipoServico from "./src/pages/tipo-servico/HomeScreenTipoServico";
import RegisterTipoServico from "./src/pages/tipo-servico/RegisterTipoServico";
import UpdateTipoServico from "./src/pages/tipo-servico/UpdateTipoServico";
import ViewTipoServico from "./src/pages/tipo-servico/ViewTipoServico";
import ViewAllTipoServico from "./src/pages/tipo-servico/ViewAllTipoServico";
import DeleteTipoServico from "./src/pages/tipo-servico/DeleteTipoServico";
import Home from "./src/pages/Home";


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">


                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Barbearia FM',
                        headerStyle: {
                            backgroundColor: '#00AD98',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="HomeScreenFuncionario"
                    component={HomeScreenFuncionario}
                    options={{
                        title: 'Registro de Funcionarios',
                        headerStyle: {
                            backgroundColor: '#00AD98',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="RegisterFuncionario"
                    component={RegisterFuncionario}
                    options={{
                        title: 'Cadastrar Funcionario',
                        headerStyle: {
                            backgroundColor: '#2992C4',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="UpdateFuncionario"
                    component={UpdateFuncionario}
                    options={{
                        title: 'Atualizar Funcionario',
                        headerStyle: {
                            backgroundColor: '#A45BB9',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewFuncionario"
                    component={ViewFuncionario}
                    options={{
                        title: 'Visualizar Funcionario',
                        headerStyle: {
                            backgroundColor: '#F9AD29',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewAllFuncionarios"
                    component={ViewAllFuncionario}
                    options={{
                        title: 'Visualizar Todos os Funcionarios',
                        headerStyle: {
                            backgroundColor: '#384F62',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="DeleteFuncionario"
                    component={DeleteFuncionario}
                    options={{
                        title: 'Excluir Funcionario',
                        headerStyle: {
                            backgroundColor: '#D1503A',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="HomeScreenTipoServico"
                    component={HomeScreenTipoServico}
                    options={{
                        title: 'Registro de Tipo de Serviço',
                        headerStyle: {
                            backgroundColor: '#00AD98',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="RegisterTipoServico"
                    component={RegisterTipoServico}
                    options={{
                        title: 'Cadastrar Tipo Serviço',
                        headerStyle: {
                            backgroundColor: '#2992C4',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="UpdateTipoServico"
                    component={UpdateTipoServico}
                    options={{
                        title: 'Atualizar Tipo de Serviço',
                        headerStyle: {
                            backgroundColor: '#A45BB9',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewTipoServico"
                    component={ViewTipoServico}
                    options={{
                        title: 'Visualizar Tipo de Serviço',
                        headerStyle: {
                            backgroundColor: '#F9AD29',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewAllTiposServicos"
                    component={ViewAllTipoServico}
                    options={{
                        title: 'Visualizar Todos os Tipos de Serviços',
                        headerStyle: {
                            backgroundColor: '#384F62',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <Stack.Screen
                    name="DeleteTipoServico"
                    component={DeleteTipoServico}
                    options={{
                        title: 'Excluir Tipo de Serviço',
                        headerStyle: {
                            backgroundColor: '#D1503A',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;