import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { formatInr } from '@/lib/catalog';
import { useStore } from '@/lib/store';

export default function CheckoutScreen() {
  const { profile, family, cart, cartTotal, placeOrder } = useStore();
  const router = useRouter();
  const [name, setName] = useState(profile.name);
  const [gotra, setGotra] = useState(profile.gotra);
  const [sankalp, setSankalp] = useState('Health, peace, and family well-being');
  const [wantVideo, setWantVideo] = useState(true);
  const [wantPrasad, setWantPrasad] = useState(true);
  const [shipping, setShipping] = useState(profile.address);
  const [busy, setBusy] = useState(false);

  const extra = (wantVideo ? 99 : 0) + (wantPrasad ? 149 : 0);
  const total = cartTotal + extra;
  const names = [name, ...family.map((f) => f.name)].filter(Boolean).join(', ');

  const pay = () => {
    if (!name.trim()) {
      Alert.alert('Sankalp name needed', 'Please enter the devotee name for the pandit.');
      return;
    }
    if (!cart.length) {
      router.replace('/(tabs)/sevas');
      return;
    }
    setBusy(true);
    const order = placeOrder({
      devoteeName: name,
      gotra,
      sankalp,
      wantVideo,
      wantPrasad,
      shippingAddress: wantPrasad ? shipping : undefined,
    });
    setBusy(false);
    if (order) router.replace(`/order/${order.id}`);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Sankalp details</Title>
        <Muted>Pandits will speak these names at the temple. This checkout is a sandbox — no real charge.</Muted>
        <Label>Devotee name</Label>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={palette.muted} />
        <Label>Gotra</Label>
        <TextInput style={styles.input} value={gotra} onChangeText={setGotra} placeholder="Optional" placeholderTextColor={palette.muted} />
        <Label>Sankalp / wish</Label>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          value={sankalp}
          onChangeText={setSankalp}
          multiline
        />
        {family.length ? <Muted>Also in sankalp: {names}</Muted> : <Muted>Add family members from your profile if you want a joint sankalp.</Muted>}

        <View style={styles.toggle}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tLabel}>Photo + video of the seva</Text>
            <Muted>₹99 · shared in the app</Muted>
          </View>
          <Switch value={wantVideo} onValueChange={setWantVideo} trackColor={{ true: palette.saffron }} />
        </View>
        <View style={styles.toggle}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tLabel}>Prasad at home</Text>
            <Muted>₹149 · packed from the temple</Muted>
          </View>
          <Switch value={wantPrasad} onValueChange={setWantPrasad} trackColor={{ true: palette.saffron }} />
        </View>
        {wantPrasad ? (
          <TextInput
            style={styles.input}
            value={shipping}
            onChangeText={setShipping}
            placeholder="Shipping address"
            placeholderTextColor={palette.muted}
          />
        ) : null}

        <View style={styles.total}>
          <Text style={styles.tLabel}>Pay (sandbox)</Text>
          <Text style={styles.amt}>{formatInr(total)}</Text>
        </View>
        <PrimaryButton
          label={`Confirm booking · ${formatInr(total)}`}
          icon="shield-checkmark"
          disabled={busy || !cart.length}
          onPress={pay}
        />
      </ScrollView>
    </Screen>
  );
}

function Label({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: 10, paddingBottom: 40 },
  label: { fontWeight: '700', color: palette.maroon, fontSize: 13 },
  input: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: palette.ink,
    fontSize: 16,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.ivory,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
  },
  tLabel: { fontWeight: '800', color: palette.ink },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: palette.goldSoft,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  amt: { fontWeight: '800', fontSize: 20, color: palette.maroon },
});
