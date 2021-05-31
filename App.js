import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import {StatusBar} from 'expo-status-bar'
import Home from './screens/Home';
import NewChat from './screens/NewChat';


const Stack = createStackNavigator();
const globalScreenOptions = {
  // gestureEnabled: true,
  // gestureDirection: "horizontal",
  // gestureResponseDistance:{
  //   horizontal: 300
  // },
  // cardStyleInterpolator: ({ current, next, layouts }) => {
  //   return {
  //     cardStyle: {
  //       transform: [
  //         {
  //           translateX: current.progress.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [layouts.screen.width, 0],
  //           }),
  //         },
  //       ],
  //     },
  //     overlayStyle: {
  //       opacity: current.progress.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [0, 0.5],
  //       }),
  //     },
  //   };
  // },
  headerBackTitleVisible: true,
  headerStyle: {backgroundColor:"red"},
  headerTitleAlign:"center",
  headerTitleStyle: {color: "white"},
  headerTintColor:"#fff",
}

export default function App() {
  return (


    <NavigationContainer>
         {/* <StatusBar backgroundColor="#00000000" style="light"/> */}
      <Stack.Navigator  screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="NewChat" component={NewChat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
