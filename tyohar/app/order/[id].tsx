import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Body, Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { formatInr } from '@/lib/catalog';
import { useStore } from '@/lib/store';
import type { OrderStatus } from '@/lib/types';

const steps: { status: OrderStatus; label: string }[] = [
  { status: 'confirmed', label: 'Booking confirmed' },
  { status: 'pickup_scheduled', label: 'Rider assigned for pickup' },
  { status: 'offered_at_temple', label: 'Offered at temple' },
  { status: 'prasad_shipped', label: 'Prasad dispatched' },
  { status: 'completed', label: 'Completed' },
];

const rank: Record<OrderStatus, number> = {
  confirmed: 0,
  pickup_scheduled: 1,
  offered_at_temple: 2,
  prasad_shipped: 3,
  completed: 4,
};

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useStore();
  const router = useRouter();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Title>Booking not found</Title>
        <PrimaryButton label="My bookings" onPress={() => router.replace('/(tabs)/bookings')} />
      </Screen>
    );
  }

  const current = rank[order.status];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Booking {order.id}</Title>
        <Muted>{new Date(order.createdAt).toLocaleString('en-IN')}</Muted>
        <View style={styles.hero}>
          <Text style={styles.amt}>{formatInr(order.amount)}</Text>
          <Body style={{ color: palette.cream }}>
            Sankalp for {order.devoteeName}
            {order.gotra ? ` · ${order.gotra} gotra` : ''}
          </Body>
          <Muted style={{ color: palette.goldSoft, marginTop: 6 }}>{order.sankalp}</Muted>
        </View>

        {order.lines.map((line) => (
          <View key={line.id} style={styles.card}>
            <Text style={styles.line}>{line.title}</Text>
            <Muted>
              {line.templeName} · {formatInr(line.price)}
            </Muted>
            {line.pickup ? (
              <Muted>
                Collect: {line.pickup.items.join(', ')} · {line.pickup.slot}
                {'\n'}
                {line.pickup.address}, {line.pickup.city}
              </Muted>
            ) : null}
          </View>
        ))}

        <Text style={styles.h}>Journey</Text>
        {steps
          .filter((s) => order.lines.some((l) => l.kind === 'pickup') || s.status !== 'pickup_scheduled')
          .map((s) => {
            const done = rank[s.status] <= current;
            return (
              <View key={s.status} style={styles.step}>
                <View style={[styles.dot, done && styles.dotOn]} />
                <Body style={{ color: done ? palette.ink : palette.muted }}>{s.label}</Body>
              </View>
            );
          })}

        {order.wantVideo ? <Muted>Photo & video will appear here after the seva. WhatsApp share comes in a later release.</Muted> : null}
        {order.wantPrasad ? <Muted>Prasad ships to: {order.shippingAddress || 'address on profile'}</Muted> : null}

        <PrimaryButton label="Book another seva" onPress={() => router.replace('/(tabs)/sevas')} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: 10, paddingBottom: 40 },
  hero: {
    backgroundColor: palette.maroon,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  amt: { color: palette.goldSoft, fontSize: 28, fontWeight: '800' },
  card: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  line: { fontWeight: '800', color: palette.ink },
  h: { fontWeight: '800', color: palette.maroon, marginTop: 8 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.border,
  },
  dotOn: { backgroundColor: palette.success },
});
