import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export type Opportunity = {
  id: string;
  name: string;
  status: 'New' | 'Closed Won' | 'Closed Lost';
};

type OpportunityListProps = {
  opportunities: Opportunity[];
  onEdit?: (opportunity: Opportunity) => void;
  onDelete?: (opportunity: Opportunity) => void;
};

const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunities,
  onEdit,
  onDelete,
}) => {
  const renderItem = ({ item }: { item: Opportunity }) => (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(item)}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(item)}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={opportunities}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No opportunities found.</Text>
      }
      contentContainerStyle={opportunities.length === 0 && styles.emptyContainer}
    />
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Closed Won':
      return { color: 'green' };
    case 'Closed Lost':
      return { color: 'red' };
    case 'New':
    default:
      return { color: 'blue' };
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default OpportunityList;
