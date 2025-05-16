import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

type InputProps = {
  label?: string;
  error?: string;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  label,
  error,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor="#999"
        {...textInputProps}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  inputError: {
    borderColor: '#ff4d4d',
  },
  error: {
    marginTop: 4,
    color: '#ff4d4d',
    fontSize: 13,
  },
});

export default Input;
