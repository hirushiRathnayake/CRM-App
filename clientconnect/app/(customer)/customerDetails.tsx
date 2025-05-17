import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  FlatList,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/common/header';
import BottomNavBar from '@/components/common/bottomNavbar';

const statusOptions = ['Active', 'Inactive', 'Lead'];
const opportunityStatusOptions = ['New', 'Closed Won', 'Closed Lost'];

const PopupModal = ({ visible, title, children, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
        <Button title="Close" onPress={onClose} style={styles.closeButton} />
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
  const [adding, setAdding] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [opportunityModalVisible, setOpportunityModalVisible] = useState(false);
  const [editingOpportunityId, setEditingOpportunityId] = useState<string | null>(null);

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
      const updated = await updateCustomerStatusAPI(customer._id, status);
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
        const updatedOpp = await updateOpportunityAPI(customer._id, editingOpportunityId, {
          name: opportunityName,
          status: opportunityStatus,
        });

        updatedOpportunities = customer.opportunities.map((opp) =>
          opp._id?.toString() === editingOpportunityId ? updatedOpp : opp
        );

        Alert.alert('Success', 'Opportunity updated successfully');
      } else {
        const newOpp = await addOpportunityAPI(customer._id, {
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
    setEditingOpportunityId(opp._id?.toString());
    setOpportunityModalVisible(true);
  };

  if (loading || !customer) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Render Header as a FlatList ListHeaderComponent
  const renderHeader = () => (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Icon name="user-circle" size={100} color="#666" />
      </View>
      <Text style={styles.name}>{customer.name}</Text>
      <Text style={styles.contact}>{customer.contact}</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.section}>Status</Text>
        <TouchableOpacity onPress={() => setStatusModalVisible(true)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statusValue}>{status}</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.section}>Opportunities</Text>
        <TouchableOpacity onPress={() => setOpportunityModalVisible(true)}>
          <Text style={styles.editText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header title="Customer Details" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <FlatList
            data={customer.opportunities || []}
            keyExtractor={(item) => item._id.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <OpportunityList opportunities={[item]} onEdit={handleEditOpportunity} />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            keyboardShouldPersistTaps="handled"
          />
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
              disabled={adding}
            />
          </PopupModal>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <BottomNavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1c1c1e',
  },
  contact: {
    textAlign: 'center',
    color: '#8e8e93',
    marginBottom: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  editText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 16,
    color: '#1c1c1e',
    marginBottom: 16,
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1c1c1e',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default CustomerDetail;
