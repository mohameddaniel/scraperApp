import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, Image, Animated } from 'react-native';
import { getToken } from './utils/const';
import { RootStackParamList} from '../home/router/rootType';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const randomPosition = (max: number) => Math.random() * max;

const StartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [position1] = useState({ x: new Animated.Value(randomPosition(width - 60)), y: new Animated.Value(randomPosition(height - 60)) });
  const [position2] = useState({ x: new Animated.Value(randomPosition(width - 60)), y: new Animated.Value(randomPosition(height - 60)) });
  const [position3] = useState({ x: new Animated.Value(randomPosition(width - 60)), y: new Animated.Value(randomPosition(height - 60)) });

  useEffect(() => {
    const verify = async () => {
      const role = await getToken('role');
      if (role) {
        if (role === 'admin') navigation.navigate('auth');
        else if (role === 'client') navigation.navigate('home');
      } else {
        navigation.navigate('welcome');
      }
    };

    setTimeout(() => {
      verify();
    }, 3000);
  }, []);

  useEffect(() => {

    const animatePosition = (position: { x: any, y: any }) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(position.x, {
            toValue: randomPosition(width - 60),  
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(position.x, {
            toValue: randomPosition(width - 60),
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(position.y, {
            toValue: randomPosition(height - 60), 
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(position.y, {
            toValue: randomPosition(height - 60),
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animatePosition(position1);
    animatePosition(position2);
    animatePosition(position3);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#7dd3fc'} />
      <Animated.View
        style={[styles.imageContainer, {
          transform: [
            { translateX: position1.x },
            { translateY: position1.y },
          ],
        }]}>
        <Image
          style={styles.image}
          source={require('./../../asset/welcome/amazon.png')}
        />
      </Animated.View>
      <Animated.View
        style={[styles.imageContainer, {
          transform: [
            { translateX: position2.x },
            { translateY: position2.y },
          ],
        }]}>
        <Image
          style={styles.image}
          source={require('./../../asset/welcome/electroplanet.png')}
        />
      </Animated.View>
      <Animated.View
        style={[styles.imageContainer, {
          transform: [
            { translateX: position3.x },
            { translateY: position3.y },
          ],
        }]}>
        <Image
          style={styles.image}
          source={require('./../../asset/welcome/marjan.png')}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  imageContainer: {
    position: 'absolute',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4da9ff',
    resizeMode: 'contain',
  },
});

export default StartScreen;
