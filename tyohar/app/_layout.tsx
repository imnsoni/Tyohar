import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { LoadingBlock } from '@/components/ui';
import { palette } from '@/constants/theme';
import { StoreProvider, useStore } from '@/lib/store';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar style="light" />
      <Gate />
    </StoreProvider>
  );
}

function Gate() {
  const { ready } = useStore();
  if (!ready) return <LoadingBlock />;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.maroon },
        headerTintColor: palette.white,
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: palette.cream },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="puja/[id]" options={{ title: 'Book seva' }} />
      <Stack.Screen name="temple/[id]" options={{ title: 'Temple' }} />
      <Stack.Screen name="pickup" options={{ title: 'Collect offering' }} />
      <Stack.Screen name="cart" options={{ title: 'Cart' }} />
      <Stack.Screen name="checkout" options={{ title: 'Sankalp & pay' }} />
      <Stack.Screen name="order/[id]" options={{ title: 'Booking' }} />
      <Stack.Screen name="family" options={{ title: 'Family & gotra' }} />
    </Stack>
  );
}
