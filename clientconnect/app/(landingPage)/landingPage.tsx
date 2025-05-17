import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Star = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const translateY = useSharedValue(y);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(y - 20, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[{ position: 'absolute', left: x }, animatedStyle]}>
      <Svg height="10" width="10">
        <Circle cx="5" cy="5" r="2" fill="white" />
      </Svg>
    </Animated.View>
  );
};

const LandingScreen = () => {
  const router = useRouter();

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 1500 });

    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const delay = Math.random() * 3000;
      stars.push(<Star key={i} x={x} y={y} delay={delay} />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {generateStars()}

      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>ClientConnect</Text>
      </Animated.View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoCircle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
