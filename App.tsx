/*ROUTING*/
import 'react-native-gesture-handler';
/*CORE*/
import React from 'react';
/*LIBS*/
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
/*PAGES*/
import Home from './pages/Home';
import FirstScreen from './pages/FirstScreen';
import SecondScreen from './pages/SecondScreen';
import ThirdScreen from './pages/ThirdScreen';
import PaymentScreen from './pages/PaymentScreen';

import appboxosdk from '@appboxo/react-native-sdk';

const Stack = createStackNavigator();

export default function App() {
  appboxosdk.setConfig('352131', {
             enableMultitaskMode: true,
             sandboxMode: false,
             isDebug: true,
             showClearCache: false,
             showPermissionsPage: false
  }); // set your Appboxo client id, sandbox mode, and multitask mode
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
