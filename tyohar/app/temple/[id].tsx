import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Body, GhostButton, HeroImage, Muted, PriceTag, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { itemsForTemple, templeById } from '@/lib/catalog';

export default function TempleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const temple = templeById(id);
  const router = useRouter();
  const items = temple ? itemsForTemple(temple.id) : [];

  if (!temple) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Title>Temple not found</Title>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView>
        <HeroImage uri={temple.image} height={220} />
        <View style={styles.body}>
          <Title>{temple.name}</Title>
          <Muted>
            {temple.city}, {temple.state} · {temple.deity}
          </Muted>
          <Body style={{ marginTop: 8 }}>{temple.famousFor}</Body>
          {temple.pickupAvailable ? (
            <View style={{ marginTop: 12 }}>
              <PrimaryButton
                label="Send my offering here"
                icon="bicycle"
                onPress={() => router.push({ pathname: '/pickup', params: { templeId: temple.id } })}
              />
            </View>
          ) : (
            <Muted style={{ marginTop: 8 }}>Home pickup is not available for this shrine yet.</Muted>
          )}

          <Text style={styles.h}>Sevas at this temple</Text>
          {items.length ? (
            items.map((item) => (
              <Pressable key={item.id} style={styles.card} onPress={() => router.push(`/puja/${item.id}`)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Muted>{item.subtitle}</Muted>
                </View>
                <PriceTag amount={item.price} />
              </Pressable>
            ))
          ) : (
            <Muted>More sevas for this temple are coming in the next release.</Muted>
          )}
          <GhostButton label="Browse all temples" onPress={() => router.push('/(tabs)/temples')} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md, gap: 8, paddingBottom: 40 },
  h: { marginTop: spacing.md, fontWeight: '800', color: palette.maroon, fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  cardTitle: { fontWeight: '800', color: palette.ink },
});
