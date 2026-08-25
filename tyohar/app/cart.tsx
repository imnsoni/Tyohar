import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { formatInr } from '@/lib/catalog';
import { useStore } from '@/lib/store';

export default function CartScreen() {
  const { cart, cartTotal, removeFromCart } = useStore();
  const router = useRouter();

  if (!cart.length) {
    return (
      <Screen style={styles.empty}>
        <Title>Cart is empty</Title>
        <Muted style={{ textAlign: 'center', marginVertical: 12 }}>
          Add a puja, bhet, or home pickup to continue.
        </Muted>
        <PrimaryButton label="Browse sevas" onPress={() => router.push('/(tabs)/sevas')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        {cart.map((line) => (
          <View key={line.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{line.title}</Text>
              <Text style={styles.amt}>{formatInr(line.price)}</Text>
            </View>
            <Muted>{line.templeName}</Muted>
            {line.pickup ? (
              <Muted>
                Pickup: {line.pickup.slot} · {line.pickup.items.join(', ')}
              </Muted>
            ) : null}
            {line.addons.map((a) => (
              <Muted key={a.id}>
                + {a.label} {formatInr(a.price)}
              </Muted>
            ))}
            <Pressable onPress={() => removeFromCart(line.id)}>
              <Text style={styles.remove}>Remove</Text>
            </Pressable>
          </View>
        ))}
        <View style={styles.total}>
          <Text style={styles.title}>Seva total</Text>
          <Text style={styles.amt}>{formatInr(cartTotal)}</Text>
        </View>
        <PrimaryButton label="Continue to sankalp" icon="arrow-forward" onPress={() => router.push('/checkout')} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  content: { padding: spacing.md, gap: 12, paddingBottom: 40 },
  card: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 4,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  title: { fontWeight: '800', color: palette.ink, flex: 1 },
  amt: { fontWeight: '800', color: palette.maroon },
  remove: { color: palette.saffron, fontWeight: '700', marginTop: 6 },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: palette.goldSoft,
    borderRadius: radius.md,
  },
});
