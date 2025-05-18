import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { useRouter } from 'expo-router';

import { registerUserApi } from '../../api/loginApi';
import {
  registerStart,
  registerSuccess,
  registerFailure,
  clearUser,
} from '../../redux/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const backgroundImage = require('../../assets/images/background.jpg'); 

  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [registered, setRegistered] = useState(false);

  const validate = () => {
    const validationErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    if (!email.includes('@')) validationErrors.email = 'Invalid email';
    if (password.length < 6) validationErrors.password = 'Password too short';
    if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords don't match";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    dispatch(registerStart());
    try {
      const userData = await registerUserApi({ email, password });
      dispatch(registerSuccess(userData));
      setRegistered(true);
    } catch (err: any) {
      dispatch(registerFailure(err.response?.data?.message || err.message));
      setRegistered(false);
    }
  };

  useEffect(() => {
    if (user && registered) {
      Alert.alert('Registration Success', `Welcome to ClientConnect`, [
        {
          text: 'OK',
          onPress: () => {
            setRegistered(false);
            router.push('/login');
            dispatch(clearUser());
          },
        },
      ]);
    }
  }, [user, registered, dispatch, router]);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
      setRegistered(false);
    }
  }, [error]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />
        ) : (
          <Button title="Register" onPress={handleRegister} />
        )}

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // translucent background to improve readability
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
});

export default Register;
