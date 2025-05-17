import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/slices/filterSlice';
import Header from '../../components/common/header'; 
import BottomNavBar from '@/components/common/bottomNavbar';

const FilterScreen = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [opportunityType, setOpportunityType] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleApplyFilter = () => {
    dispatch(
      setFilters({
        searchQuery: name,
        statusFilter: status || 'All',
        opportunityType,
      })
    );
    router.push('/customerList'); 
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
        <Header title="Filter Customers" />
      

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name..."
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={status} onValueChange={(value) => setStatus(value)}>
          <Picker.Item label="Select status" value="" />
          <Picker.Item label="Lead" value="Lead" />
          <Picker.Item label="Active" value="Active" />
          <Picker.Item label="Inactive" value="Inactive" />
        </Picker>
      </View>

      

      <TouchableOpacity style={styles.button} onPress={handleApplyFilter}>
        <Icon name="filter" size={18} color="#fff" />
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    
    </ScrollView>
      <BottomNavBar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterScreen;
