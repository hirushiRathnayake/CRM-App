import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const BottomNavBar = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  const navigate = (path: string) => {
    if (currentRoute !== path) {
      router.push(path);
    }
  };

  return (
    <View style={styles.container}>
         <TouchableOpacity onPress={() => navigate('/dashboard')} style={styles.iconButton}>
        <MaterialIcons
          name="dashboard"
          size={28}
          color={currentRoute === '/dashboard' ? '#007bff' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('/customerList')} style={styles.iconButton}>
        <Ionicons
          name="people"
          size={28}
          color={currentRoute === '/customerList' ? '#007bff' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('/filter')} style={styles.iconButton}>
        <MaterialIcons
          name="filter-list"
          size={28}
          color={currentRoute === '/filter' ? '#007bff' : 'gray'}
        />
      </TouchableOpacity>

      


      {/* Add more buttons as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomNavBar;
