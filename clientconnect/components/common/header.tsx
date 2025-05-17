import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = true }) => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            router.replace('/register'); // navigate to login screen
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Back"
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        accessibilityLabel="Logout"
      >
        <Icon name="log-out-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
