import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip, GhostButton, Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { pickupItems, pickupSlots, templeById, temples } from '@/lib/catalog';
import { useStore } from '@/lib/store';

const PICKUP_FEE = 149;

export default function PickupScreen() {
  const { templeId } = useLocalSearchParams<{ templeId?: string }>();
  const router = useRouter();
  const { profile, addToCart } = useStore();
  const [selectedTemple, setSelectedTemple] = useState(templeId ?? 'kashi');
  const [items, setItems] = useState<string[]>([]);
  const [slot, setSlot] = useState(pickupSlots[0]);
  const [address, setAddress] = useState(profile.address);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city);
  const [notes, setNotes] = useState('');

  const temple = templeById(selectedTemple);
  const pickupTemples = useMemo(() => temples.filter((t) => t.pickupAvailable), []);

  const toggle = (label: string) =>
    setItems((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  const canSubmit = temple && items.length && address.trim() && phone.trim();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>We collect, we offer</Title>
        <Muted>
          Tell us what to pick up from your home. Tyohar takes it to the temple, offers it with your
          sankalp, and shares a photo.
        </Muted>

        <Text style={styles.h}>Temple</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {pickupTemples.map((t) => (
            <Chip
              key={t.id}
              label={t.city}
              active={t.id === selectedTemple}
              onPress={() => setSelectedTemple(t.id)}
            />
          ))}
        </ScrollView>
        {temple ? <Muted>{temple.name}</Muted> : null}

        <Text style={styles.h}>What should we collect?</Text>
        <View style={styles.wrap}>
          {pickupItems.map((p) => (
            <Chip key={p} label={p} active={items.includes(p)} onPress={() => toggle(p)} />
          ))}
        </View>

        <Text style={styles.h}>Pickup window</Text>
        {pickupSlots.map((s) => (
          <GhostButton key={s} label={`${slot === s ? '✓ ' : ''}${s}`} onPress={() => setSlot(s)} />
        ))}

        <Text style={styles.h}>Pickup address</Text>
        <TextInput
          style={styles.input}
          placeholder="House / street"
          placeholderTextColor={palette.muted}
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor={palette.muted}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor={palette.muted}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Note for the rider (gate code, preferred time…)"
          placeholderTextColor={palette.muted}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <Muted>Pickup fee {`₹${PICKUP_FEE}`} covers rider, packing, and temple submission photo.</Muted>
        <PrimaryButton
          label={`Add pickup · ₹${PICKUP_FEE}`}
          icon="bicycle"
          disabled={!canSubmit}
          onPress={() => {
            if (!temple) return;
            addToCart({
              kind: 'pickup',
              title: `Home pickup for ${temple.name}`,
              templeId: temple.id,
              templeName: temple.name,
              price: PICKUP_FEE,
              notes,
              addons: [],
              pickup: { address, city, phone, slot, items },
            });
            router.push('/cart');
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: 10, paddingBottom: 40 },
  h: { marginTop: 8, fontWeight: '800', color: palette.maroon },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
});
