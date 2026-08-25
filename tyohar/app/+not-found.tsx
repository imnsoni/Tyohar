import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { PrimaryButton, Screen, Title } from '@/components/ui';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <Screen style={styles.container}>
      <Title>This path is not in Tyohar yet.</Title>
      <PrimaryButton label="Go home" onPress={() => router.replace('/(tabs)')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});
