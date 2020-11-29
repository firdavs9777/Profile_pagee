import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Authentication} from './src/Authentication';
import {HomeScreen} from './src/HomeScreen';
import {InputOTP} from './src/InputOTP';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authenctication">
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="InputOTP" component={InputOTP} />
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;