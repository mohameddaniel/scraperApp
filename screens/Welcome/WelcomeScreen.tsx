import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../home/router/rootType';
import { storeToken } from '../start/utils/const';


const WelcomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRoleSelection = async (role: string) => {
    if (role === 'admin') {
      navigation.navigate('auth'); 
      await storeToken(role);
    } else {
      navigation.navigate('home');
      await storeToken(role);
    }
  };

  return (
    <ImageBackground
      source={require('../../asset/welcome/welcomeScreen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar backgroundColor={'#7dd3fc'} />
      <LottieView
        source={require('./utils/loadinng.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.roleButton, styles.adminButton]}
          onPress={() => handleRoleSelection('admin')}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, styles.clientButton]}
          onPress={() => handleRoleSelection('client')}
        >
          <Text style={styles.roleText}>Client</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
    top: '18%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '15%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roleButton: {
    width: '90%',
    top:"70%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical:6,
    elevation: 5,
  },
  adminButton: {
    backgroundColor: '#0ea5e9',
  },
  clientButton: {
    backgroundColor: '#7dd3fc',
  },
  roleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default WelcomeScreen;
