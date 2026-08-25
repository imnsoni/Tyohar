import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { formatInr } from '@/lib/catalog';
import { useStore } from '@/lib/store';
import type { OrderStatus } from '@/lib/types';

const labels: Record<OrderStatus, string> = {
  confirmed: 'Confirmed · pandit assigned',
  pickup_scheduled: 'Pickup scheduled',
  offered_at_temple: 'Offered at temple',
  prasad_shipped: 'Prasad on the way',
  completed: 'Completed',
};

export default function BookingsScreen() {
  const { orders } = useStore();
  const router = useRouter();

  if (!orders.length) {
    return (
      <Screen style={styles.empty}>
        <Title>No bookings yet</Title>
        <Muted style={{ textAlign: 'center', marginVertical: 12 }}>
          Book a puja, send a bhet, or schedule a home pickup of your offering.
        </Muted>
        <PrimaryButton label="Explore sevas" onPress={() => router.push('/(tabs)/sevas')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((o) => (
          <Pressable key={o.id} style={styles.card} onPress={() => router.push(`/order/${o.id}`)}>
            <View style={styles.row}>
              <Text style={styles.id}>{o.id}</Text>
              <Text style={styles.amt}>{formatInr(o.amount)}</Text>
            </View>
            <Text style={styles.title}>{o.lines[0]?.title}</Text>
            {o.lines.length > 1 ? <Muted>+ {o.lines.length - 1} more seva</Muted> : null}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{labels[o.status]}</Text>
            </View>
            <Muted>{new Date(o.createdAt).toLocaleString('en-IN')}</Muted>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: 8 },
  content: { padding: spacing.md, gap: 12, paddingBottom: 40 },
  card: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 6,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  id: { fontWeight: '800', color: palette.maroon },
  amt: { fontWeight: '800', color: palette.ink },
  title: { fontWeight: '700', color: palette.ink, fontSize: 16 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.creamDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgeText: { color: palette.maroon, fontWeight: '700', fontSize: 12 },
});
