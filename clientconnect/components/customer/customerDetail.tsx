// components/customer/CustomerDetailComponent.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import Dropdown from '../common/dropdown';
import Input from '../common/input';
import Button from '../common/button';
import OpportunityList from '../oppotunity/oppotunityList';
import {
  updateCustomerStatusAPI,
  addOpportunityAPI,
  fetchCustomerByIdAPI,
} from '../../api/customerApi';

const statusOptions = ['Active', 'Inactive', 'Lead'];
const opportunityStatusOptions = ['New', 'Closed Won', 'Closed Lost'];

type CustomerDetailProps = {
  customerId: string;
};

const CustomerDetailComponent: React.FC<CustomerDetailProps> = ({ customerId }) => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [opportunityStatus, setOpportunityStatus] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomerByIdAPI(customerId);
      setCustomer(data);
      setStatus(data.status);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const handleStatusUpdate = async () => {
    try {
      const updated = await updateCustomerStatusAPI(customer.id, status);
      setCustomer(updated);
      Alert.alert('Success', 'Status updated');
    } catch (error: any) {
      Alert.alert('Failed', error.message);
    }
  };

  const handleAddOpportunity = async () => {
    if (!opportunityName || !opportunityStatus) {
      Alert.alert('Validation Error', 'Fill all opportunity fields');
      return;
    }
    try {
      setAdding(true);
      const newOpportunity = await addOpportunityAPI(customer.id, {
        name: opportunityName,
        status: opportunityStatus,
      });
      setCustomer({
        ...customer,
        opportunities: [...(customer.opportunities || []), newOpportunity],
      });
      setOpportunityName('');
      setOpportunityStatus('');
      Alert.alert('Success', 'Opportunity added');
    } catch (error: any) {
      Alert.alert('Failed', error.message);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: customer.picture }} style={styles.image} />
      <Text style={styles.name}>{customer.name}</Text>
      <Text style={styles.contact}>{customer.contact}</Text>

      <Text style={styles.section}>Change Status</Text>
      <Dropdown data={statusOptions} selectedValue={status} onValueChange={setStatus} />
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
        placeholder="Select Status"
      />
      {adding ? (
        <ActivityIndicator />
      ) : (
        <Button title="Add Opportunity" onPress={handleAddOpportunity} />
      )}
    </ScrollView>
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

export default CustomerDetailComponent;
