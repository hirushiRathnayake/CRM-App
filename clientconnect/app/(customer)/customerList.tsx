
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TextInput, Text } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../../redux/store';
// import { fetchCustomers } from '../../redux/slices/customerSlice';
// import CustomerList from '../../components/customer/customerList';
// import { useRouter } from 'expo-router';

// const CustomerScreen = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const { customers, loading, error } = useSelector((state: RootState) => state.customers);
//   const [filterText, setFilterText] = useState('');

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   const filteredCustomers = customers.filter((cust) => {
//     const lowerFilter = filterText.toLowerCase();
//     return (
//       cust.name.toLowerCase().includes(lowerFilter) ||
//       cust.status.toLowerCase().includes(lowerFilter)
//     );
//   });
  

//   const handleCustomerPress = (customer: any) => {
//   router.push({
//     pathname: '/customerDetails',
//     params: { customerId: customer._id }, // ✅ Correct param name
//   });
// };


//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.filterInput}
//         placeholder="Filter by name or status"
//         value={filterText}
//         onChangeText={setFilterText}
//         autoCapitalize="none"
//       />

//       {loading && <Text style={styles.loadingText}>Loading customers...</Text>}
//       {error && <Text style={styles.errorText}>Error: {error}</Text>}

//       <CustomerList customers={filteredCustomers} onCustomerPress={handleCustomerPress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   filterInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginVertical: 20,
//     fontSize: 16,
//   },
//   errorText: {
//     textAlign: 'center',
//     marginVertical: 20,
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default CustomerScreen;
// screens/CustomerScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchCustomers } from '../../redux/slices/customerSlice';
import CustomerList from '../../components/customer/customerList';
import { useRouter } from 'expo-router';
import { setFilters } from '../../redux/slices/filterSlice';
import Header from '../../components/common/header';
import BottomNavBar from '@/components/common/bottomNavbar';

const CustomerScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { customers, loading, error } = useSelector((state: RootState) => state.customers);
  const filters = useSelector((state: RootState) => state.filters);

  // Fetch customers every time filters change
  useEffect(() => {
    dispatch(fetchCustomers(filters));
  }, [dispatch, filters]);

  // Optional: local filtering for safety
  const filteredCustomers = customers.filter((cust) => {
    const matchesStatus = filters.statusFilter === 'All' || cust.status === filters.statusFilter;
    const matchesName =
      filters.searchQuery === '' ||
      cust.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesOpportunity =
      filters.opportunityType === '' || cust.opportunityType === filters.opportunityType;

    return matchesStatus && matchesName && matchesOpportunity;
  });

  const handleCustomerPress = (customer: any) => {
    router.push({
      pathname: '/customerDetails',
      params: { customerId: customer._id },
    });
  };

  return (
    <>
    <Header title="Customers List" />
    <View style={styles.container}>
      
      <TextInput
        style={styles.filterInput}
        placeholder="Filter by name or status"
        value={filters.searchQuery}
        onChangeText={(text) => dispatch(setFilters({ ...filters, searchQuery: text }))}
        autoCapitalize="none"
      />

      {loading && <Text style={styles.loadingText}>Loading customers...</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      <CustomerList customers={filteredCustomers} onCustomerPress={handleCustomerPress} />
      
    </View>
     <BottomNavBar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  filterInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'red',
    fontSize: 16,
  },
});

export default CustomerScreen;
