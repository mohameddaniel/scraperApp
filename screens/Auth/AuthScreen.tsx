import { useNavigation } from '@react-navigation/native';
import React, {useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const AuthScreen = () => {
  const navigation = useNavigation()
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [emailFocused ,setEmailFocused] = useState<boolean>(false);
  const [passwordFocused ,setPasswordFocused] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView  contentContainerStyle={styles.scrollContainer}>
        <StatusBar backgroundColor={'#7dd3fc'} />
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()} 
      >
        <Icon name="close" size={24} color="#ffffff" />
      </TouchableOpacity>
      <LottieView
       autoPlay
       loop
       style={styles.StyleLottie}
       source={require('./utils/authe.json')}/>
      <Image
        style={styles.imageStyle}
        source={require('../../asset/auth/auth.png')}
      >
        
      </Image>

      <Image
        style={styles.userImage}
        source={require('../../asset/user/avatr-image.png')}
      />

      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
          <Icon name="mail-outline" size={20} color="#7dd3fc" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={()=>setEmailFocused(true)}
            onBlur={()=>setEmailFocused(false)}
          />
        </View>

        <View style={[styles.inputContainer,passwordFocused && styles.inputFocused]}>
          <Icon name="lock-closed-outline" size={20} color="#7dd3fc" />
          <TextInput
            style={styles.input}
            placeholder="mot de passe"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!passwordVisible}
            onFocus={()=>setPasswordFocused(true)}
            onBlur={()=>setPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#7dd3fc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}> Se Connecter</Text>
        </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText}>
          Vous n'avez pas de compte ? <Text style={styles.registerLink}>Inscrivez-vous</Text>
        </Text>
     </TouchableOpacity>

      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  cancelButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#7dd3fc',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  userImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#0284c7',
  },
  formContainer: {
    marginTop: 20,
    width: '85%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 20,
  },
  loginButton: {
    backgroundColor: '#0284c7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  registerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
  },
  registerLink: {
    color: '#0284c7',
    fontWeight: 'bold',
  },
  StyleLottie:{
    position:"absolute",
    width: 80,
    height: 80,
    top:"2%",
    zIndex:11
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFocused:{
   borderColor:'#0284c7',
  }

});

export default AuthScreen;
