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
import HomeScreenServicoRealizado from "./src/pages/servico-realizado/HomeScreenServicoRealizado";
import RegisterServicoRealizado from "./src/pages/servico-realizado/RegisterServicoRealizado";
import ViewAllServicoRealizado from "./src/pages/servico-realizado/ViewAllServicoRealizado";
import ViewServicoRealizado from "./src/pages/servico-realizado/ViewServicoRealizado";
import UpdateServicoRealizado from "./src/pages/servico-realizado/UpdateServicoRealizado";
import DeleteServicoRealizado from "./src/pages/servico-realizado/DeleteServicoRealizado";
import RelatorioServicoRealizado from "./src/pages/servico-realizado/RelatorioServicoRealizado";


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
                        title: 'Registro de Funcionários',
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
                        title: 'Cadastrar Funcionário',
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
                        title: 'Atualizar Funcionário',
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
                    name="ViewFuncionario"
                    component={ViewFuncionario}
                    options={{
                        title: 'Visualizar Funcionário',
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
                    name="ViewAllFuncionarios"
                    component={ViewAllFuncionario}
                    options={{
                        title: 'Todos os Funcionários',
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
                    name="DeleteFuncionario"
                    component={DeleteFuncionario}
                    options={{
                        title: 'Excluir Funcionário',
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
                            backgroundColor: '#2992C4',
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
                            backgroundColor: '#2992C4',
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
                        title: 'Todos Tipos de Serviços',
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
                    name="DeleteTipoServico"
                    component={DeleteTipoServico}
                    options={{
                        title: 'Excluir Tipo de Serviço',
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
                    name="HomeScreenServicoRealizado"
                    component={HomeScreenServicoRealizado}
                    options={{
                        title: 'Registrar Serviço Realizado',
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
                    name="RegisterServicoRealizado"
                    component={RegisterServicoRealizado}
                    options={{
                        title: 'Cadastrar Serviço Realizado',
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
                    name="UpdateServicoRealizado"
                    component={UpdateServicoRealizado}
                    options={{
                        title: 'Atualizar Serviço Realizado',
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
                    name="ViewServicoRealizado"
                    component={ViewServicoRealizado}
                    options={{
                        title: 'Visualizar Serviço Realizado',
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
                    name="ViewAllServicoRealizado"
                    component={ViewAllServicoRealizado}
                    options={{
                        title: 'Todos Serviços Realizados',
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
                    name="DeleteServicoRealizado"
                    component={DeleteServicoRealizado}
                    options={{
                        title: 'Excluir Serviço Realizado',
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
                    name="RelatorioServicoRealizado"
                    component={RelatorioServicoRealizado}
                    options={{
                        title: 'Relatório Serviço Realizado',
                        headerStyle: {
                            backgroundColor: '#2992C4',
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