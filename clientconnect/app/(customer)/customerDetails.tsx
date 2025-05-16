import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  addOpportunityAPI,
  fetchCustomerByIdAPI,
  updateCustomerStatusAPI,
} from '../../api/customerApi';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Dropdown from '../../components/common/dropdown';
import OpportunityList from '../../components/oppotunity/oppotunityList';

const statusOptions = ['Active', 'Inactive', 'Lead'];
const opportunityStatusOptions = ['New', 'Closed Won', 'Closed Lost'];

const CustomerDetail = () => {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [opportunityStatus, setOpportunityStatus] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomerByIdAPI(customerId!);
      setCustomer(data);
      setStatus(data.status);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load customer data.');
    } finally {
      setLoading(false);
    }
  };

// This must be added to load data when `customerId` is ready
useEffect(() => {
  if (customerId) {
    fetchCustomer();
  }
}, [customerId]);



  const handleStatusUpdate = async () => {
    try {
      const updated = await updateCustomerStatusAPI(customer.id, status);
      setCustomer(updated);
      Alert.alert('Success', 'Customer status updated');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update status');
    }
  };

  const handleAddOpportunity = async () => {
    if (!opportunityName || !opportunityStatus) {
      Alert.alert('Validation Error', 'Please enter opportunity name and select status');
      return;
    }

    try {
      setAdding(true);
      const newOpp = await addOpportunityAPI(customer.id, {
        name: opportunityName,
        status: opportunityStatus,
      });

      setCustomer({
        ...customer,
        opportunities: [...(customer.opportunities || []), newOpp],
      });

      setOpportunityName('');
      setOpportunityStatus('');
      Alert.alert('Success', 'Opportunity added successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add opportunity');
    } finally {
      setAdding(false);
    }
  };



  if (loading || !customer) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View contentContainerStyle={styles.container}>
      {customer.picture && (
        <Image source={{ uri: customer.picture }} style={styles.image} />
      )}
      <Text style={styles.name}>{customer.name}</Text>
      <Text style={styles.contact}>{customer.contact}</Text>

      <Text style={styles.section}>Change Status</Text>
      <Dropdown
        data={statusOptions}
        selectedValue={status}
        onValueChange={setStatus}
        placeholder="Select Status"
      />
      <Button title="Update Status" onPress={handleStatusUpdate} />

      <Text style={styles.section}>Opportunities</Text>
      <OpportunityList opportunities={customer.opportunities || []} />

      <Text style={styles.section}>Add New Opportunity</Text>
      <Input
        placeholder="Opportunity Name"
        value={opportunityName}
        onChangeText={setOpportunityName}
      />
      <Dropdown
        data={opportunityStatusOptions}
        selectedValue={opportunityStatus}
        onValueChange={setOpportunityStatus}
        placeholder="Select Opportunity Status"
      />
      {adding ? (
        <ActivityIndicator style={{ marginTop: 10 }} />
      ) : (
        <Button title="Add Opportunity" onPress={handleAddOpportunity} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  contact: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
  },
});

export default CustomerDetail;
