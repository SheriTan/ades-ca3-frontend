import React from 'react';

// Screens
import Home from './screens/home';
import ViewPost from './screens/viewpost';
import AddPost from './screens/addpost';
import Login from './screens/signin';
import Register from './screens/signup';

//  Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Icon Import
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function SignInUp () {
  return (
    <Tab.Navigator
    activeColor='#fff'
    barStyle={{backgroundColor:'#121212'}}>

      <Tab.Screen 
      name = "login_tab" 
      component = {Login}
      options = {{
        tabBarLabel: 'Sign In',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name = "login"
          color={color}
          size={20}/>
        )
      }}/>

      <Tab.Screen 
      name = "register_tab" 
      component = {Register}
      options = {{
        tabBarLabel: 'Sign Up',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name = "account-plus-outline"
          color={color}
          size={20}/>
        )
      }}/>

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInUp" screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = "SignInUp" component={SignInUp} />
        <Stack.Screen name = "ViewPost" component={ViewPost} />
        <Stack.Screen name = "AddPost" component={AddPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}