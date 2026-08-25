import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Body, Chip, GhostButton, HeroImage, Muted, PriceTag, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { addons, itemById, templeById } from '@/lib/catalog';
import { useStore } from '@/lib/store';

export default function PujaDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = itemById(id);
  const temple = item ? templeById(item.templeId) : undefined;
  const { addToCart } = useStore();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  if (!item || !temple) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Title>Seva not found</Title>
      </Screen>
    );
  }

  const chosen = addons.filter((a) => selected.includes(a.id));
  const total = item.price + chosen.reduce((s, a) => s + a.price, 0);

  return (
    <Screen>
      <ScrollView>
        <HeroImage uri={item.image} height={220} />
        <View style={styles.body}>
          <View style={styles.row}>
            <Chip label={item.kind} />
            <PriceTag amount={item.price} />
          </View>
          <Title>{item.title}</Title>
          {item.hindiTitle ? <Muted>{item.hindiTitle}</Muted> : null}
          <Body style={{ marginTop: 8 }}>{item.subtitle}</Body>
          <Muted style={{ marginTop: 8 }}>
            {temple.name}, {temple.city} · {item.duration}
          </Muted>

          <Text style={styles.h}>Included</Text>
          {item.includes.map((x) => (
            <Body key={x}>• {x}</Body>
          ))}

          <Text style={styles.h}>Add-ons</Text>
          {addons.map((a) => {
            const on = selected.includes(a.id);
            return (
              <GhostButton
                key={a.id}
                label={`${on ? '✓ ' : ''}${a.label} · ₹${a.price}`}
                onPress={() =>
                  setSelected((prev) => (on ? prev.filter((x) => x !== a.id) : [...prev, a.id]))
                }
              />
            );
          })}

          <View style={{ height: 12 }} />
          <PrimaryButton
            label={`Add to cart · ₹${total}`}
            icon="bag-add"
            onPress={() => {
              addToCart({
                kind: item.kind,
                catalogId: item.id,
                title: item.title,
                templeId: temple.id,
                templeName: temple.name,
                price: item.price,
                addons: chosen,
              });
              router.push('/cart');
            }}
          />
          <View style={{ height: 8 }} />
          <GhostButton label={`View ${temple.name}`} onPress={() => router.push(`/temple/${temple.id}`)} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md, gap: 8, paddingBottom: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  h: { marginTop: spacing.md, fontWeight: '800', color: palette.maroon, fontSize: 16 },
});
