import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  addOpportunityAPI,
  fetchCustomerByIdAPI,
  updateCustomerStatusAPI,
  updateOpportunityAPI,
} from '../../api/customerApi';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Dropdown from '../../components/common/dropdown';
import OpportunityList from '../../components/oppotunity/oppotunityList';

const statusOptions = ['Active', 'Inactive', 'Lead'];
const opportunityStatusOptions = ['New', 'Closed Won', 'Closed Lost'];

const PopupModal = ({ visible, title, children, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const CustomerDetail = () => {
  const { customerId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [opportunityStatus, setOpportunityStatus] = useState('');
  const [editingOpportunityId, setEditingOpportunityId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [opportunityModalVisible, setOpportunityModalVisible] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomerByIdAPI(customerId);
      setCustomer(data);
      setStatus(data.status);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to load customer data.');
    } finally {
      setLoading(false);
    }
  };

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
      setStatusModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update status');
    }
  };

  const handleOpportunitySubmit = async () => {
    if (!opportunityName || !opportunityStatus) {
      Alert.alert('Validation Error', 'Please enter opportunity name and select status');
      return;
    }

    try {
      setAdding(true);
      let updatedOpportunities;

      if (editingOpportunityId) {
        const updatedOpp = await updateOpportunityAPI(customer.id, editingOpportunityId, {
          name: opportunityName,
          status: opportunityStatus,
        });

        updatedOpportunities = customer.opportunities.map((opp) =>
          opp.id === editingOpportunityId ? updatedOpp : opp
        );
        Alert.alert('Success', 'Opportunity updated successfully');
      } else {
        const newOpp = await addOpportunityAPI(customer.id, {
          name: opportunityName,
          status: opportunityStatus,
        });
        updatedOpportunities = [...(customer.opportunities || []), newOpp];
        Alert.alert('Success', 'Opportunity added successfully');
      }

      setCustomer({ ...customer, opportunities: updatedOpportunities });
      setOpportunityName('');
      setOpportunityStatus('');
      setEditingOpportunityId(null);
      setOpportunityModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to submit opportunity');
    } finally {
      setAdding(false);
    }
  };

  const handleEditOpportunity = (opp) => {
    setOpportunityName(opp.name);
    setOpportunityStatus(opp.status);
    setEditingOpportunityId(opp.id);
    setOpportunityModalVisible(true);
  };

  if (loading || !customer) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {customer.picture && (
            <Image source={{ uri: customer.picture }} style={styles.image} />
          )}
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.contact}>{customer.contact}</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.section}>Status: {status}</Text>
            <TouchableOpacity onPress={() => setStatusModalVisible(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.section}>Opportunities</Text>
            <TouchableOpacity onPress={() => setOpportunityModalVisible(true)}>
              <Text style={styles.editText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          <OpportunityList
            opportunities={customer.opportunities || []}
            onEdit={handleEditOpportunity}
          />

          {/* Status Modal */}
          <PopupModal
            visible={statusModalVisible}
            title="Update Status"
            onClose={() => setStatusModalVisible(false)}
          >
            <Dropdown
              label="Select Status"
              options={statusOptions}
              selectedValue={status}
              onValueChange={setStatus}
            />
            <Button title="Update" onPress={handleStatusUpdate} />
          </PopupModal>

          {/* Opportunity Modal */}
          <PopupModal
            visible={opportunityModalVisible}
            title={editingOpportunityId ? 'Edit Opportunity' : 'Add Opportunity'}
            onClose={() => {
              setOpportunityModalVisible(false);
              setOpportunityName('');
              setOpportunityStatus('');
              setEditingOpportunityId(null);
            }}
          >
            <Input
              placeholder="Opportunity Name"
              value={opportunityName}
              onChangeText={setOpportunityName}
            />
            <Dropdown
              label="Select Opportunity Status"
              options={opportunityStatusOptions}
              selectedValue={opportunityStatus}
              onValueChange={setOpportunityStatus}
            />
            <Button
              title={editingOpportunityId ? 'Update' : 'Add'}
              onPress={handleOpportunitySubmit}
            />
          </PopupModal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#f5f7fa',
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
    color: '#222',
  },
  contact: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
});

export default CustomerDetail;
