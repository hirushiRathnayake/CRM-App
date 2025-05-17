// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/landingPage'); // navigate after layout is mounted
    }, 100); 

    return () => clearTimeout(timeout);
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#0a0a23' }} />;
}
