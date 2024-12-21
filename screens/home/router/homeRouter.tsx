import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../homeScreen'
import WelcomeScreen from '../../Welcome/WelcomeScreen'
import AuthScreen from '../../Auth/AuthScreen'
import StartScreen from '../../start/StartScreen'
import { RootStackParamList } from './rootType'

const Stack = createStackNavigator<RootStackParamList>()

const HomeRouter = ():React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName='start' screenOptions={{
        headerShown:false
    }}>
       <Stack.Screen name='home' component={HomeScreen}/>
       <Stack.Screen name='welcome' component={WelcomeScreen}/>
       <Stack.Screen name='auth' component={AuthScreen}/>
       <Stack.Screen name='start' component={StartScreen}/>
    </Stack.Navigator>
  )
}

export default HomeRouter