import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type OpportunityStatus = 'New' | 'Closed Won' | 'Closed Lost';

type OpportunityFormProps = {
  initialName?: string;
  initialStatus?: OpportunityStatus;
  onSubmit: (data: { name: string; status: OpportunityStatus }) => void;
  submitButtonLabel?: string;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({
  initialName = '',
  initialStatus = 'New',
  onSubmit,
  submitButtonLabel = 'Save Opportunity',
}) => {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<OpportunityStatus>(initialStatus);

  // Simple validation error state
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Opportunity name is required');
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), status });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Opportunity Name</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={name}
        onChangeText={setName}
        placeholder="Enter opportunity name"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue as OpportunityStatus)}
          mode="dropdown"
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
        >
          <Picker.Item label="New" value="New" />
          <Picker.Item label="Closed Won" value="Closed Won" />
          <Picker.Item label="Closed Lost" value="Closed Lost" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title={submitButtonLabel} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#e53935',
  },
  errorText: {
    color: '#e53935',
    marginBottom: 8,
    fontSize: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  pickerIOS: {
    height: 150,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default OpportunityForm;
