import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { useRouter } from 'expo-router';

import { loginUserApi } from '../../api/loginApi';

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const validationErrors: { email?: string; password?: string } = {};
    if (!email.includes('@')) validationErrors.email = 'Invalid email';
    if (password.length < 6) validationErrors.password = 'Password too short';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    dispatch(loginStart());

    try {
      const userData = await loginUserApi({ email, password });
      dispatch(loginSuccess(userData));
    } catch (err: any) {
      dispatch(loginFailure(err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (user) {
      Alert.alert('Login Success', `Welcome to ClientConnect`);
      router.push('/dashboard');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#000',
    fontSize: 16,
  },
  registerLink: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default Login;
