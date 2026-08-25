import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { palette } from '@/constants/theme';
import { useStore } from '@/lib/store';

export default function TabLayout() {
  const { cart } = useStore();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: palette.maroon },
        headerTintColor: palette.white,
        headerTitleStyle: { fontWeight: '800' },
        tabBarActiveTintColor: palette.saffron,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: palette.ivory,
          borderTopColor: palette.border,
        },
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/cart')}
            style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="bag-handle" size={22} color={palette.white} />
            {cart.length ? (
              <View
                style={{
                  backgroundColor: palette.gold,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 4,
                }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: palette.maroonDeep }}>
                  {cart.length}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tyohar',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="temples"
        options={{
          title: 'Temples',
          tabBarIcon: ({ color, size }) => <Ionicons name="business" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sevas"
        options={{
          title: 'Sevas',
          tabBarIcon: ({ color, size }) => <Ionicons name="flower" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
