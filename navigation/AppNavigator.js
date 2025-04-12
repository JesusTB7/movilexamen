import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import UsuarioListScreen from '../screens/UsuarioListScreen';
import UsuarioDetalleScreen from '../screens/UsuarioDetalleScreen';  // Asegúrate de importar correctamente
import UsuarioFormScreen from '../screens/UsuarioFormScreen';  // Asegúrate de importar correctamente

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* Pantalla de Login: Sin encabezado */}
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Pantalla de lista de usuarios */}
        <Stack.Screen 
          name="UsuarioListScreen" 
          component={UsuarioListScreen} 
          options={{ title: 'Lista de Usuarios' }}  // Puedes personalizar el título
        />
        
        {/* Pantalla de detalles del usuario */}
        <Stack.Screen 
          name="UsuarioDetalle" 
          component={UsuarioDetalleScreen} 
          options={{ title: 'Detalle del Usuario' }}  // Personalizar título
        />
        
        {/* Pantalla de formulario de usuario */}
        <Stack.Screen 
          name="UsuarioForm" 
          component={UsuarioFormScreen} 
          options={{ title: 'Registro de Usuario' }}  // Personalizar título
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
