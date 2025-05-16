import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import CustomerCard from './customerCard';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Inactive' | 'Lead';
  avatarUrl?: string;
};

type Props = {
  customers: Customer[];
  onCustomerPress?: (customer: Customer) => void;
};

const CustomerList: React.FC<Props> = ({ customers, onCustomerPress }) => {
  if (customers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No customers found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={customers}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <CustomerCard
          customer={item}
          onPress={() => onCustomerPress?.(item)} // send entire object
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default CustomerList;
