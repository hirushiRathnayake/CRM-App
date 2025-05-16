import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import { validateLogin } from '../../utils/validation';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Validate form using centralized validation function
  const validate = () => {
    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);
    return !Object.values(validationErrors).some(Boolean);
  };

  const handleLogin = () => {
    if (!validate()) return;
    dispatch(loginUser({ email, password }));
  };

  // Alert on successful login
  useEffect(() => {
    if (user) {
      Alert.alert('Login Success', `Welcome, ${user.email}`);
      // TODO: Navigate to dashboard or home screen here
    }
  }, [user]);

  // Alert on login error
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
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
});

export default Login;
