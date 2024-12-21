import React from 'react'
import HomeRouter from './screens/home/router/homeRouter'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
         <HomeRouter/>
      </PaperProvider>
    </NavigationContainer>
    
  )
}

export default App