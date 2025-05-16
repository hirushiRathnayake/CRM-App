import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Inactive' | 'Lead';
  avatarUrl?: string;
};

type Props = {
  customer: Customer;
  onPress?: () => void;
};

const statusColors: Record<Customer['status'], string> = {
  Active: '#28a745',
  Inactive: '#6c757d',
  Lead: '#ffc107',
};

const CustomerCard: React.FC<Props> = ({ customer, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{
          uri: customer.avatarUrl || 'https://via.placeholder.com/80',
        }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.contact}>{customer.email}</Text>
        {customer.phone && (
          <Text style={styles.contact}>{customer.phone}</Text>
        )}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[customer.status] },
          ]}
        >
          <Text style={styles.statusText}>{customer.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  contact: {
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default CustomerCard;
