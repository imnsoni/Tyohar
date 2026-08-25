import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, Muted, PriceTag, Screen } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { catalog, templeById } from '@/lib/catalog';

const kinds = [
  { id: 'all', label: 'All' },
  { id: 'puja', label: 'Puja' },
  { id: 'hawan', label: 'Hawan' },
  { id: 'offering', label: 'Bhet' },
];

export default function SevasScreen() {
  const { kind } = useLocalSearchParams<{ kind?: string }>();
  const router = useRouter();
  const [filter, setFilter] = useState(kind && kinds.some((k) => k.id === kind) ? kind : 'all');

  const list = useMemo(
    () => catalog.filter((c) => filter === 'all' || c.kind === filter),
    [filter]
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Muted>Book puja, hawan, or a small bhet. Add-ons for video and home prasad at checkout.</Muted>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {kinds.map((k) => (
            <Chip key={k.id} label={k.label} active={filter === k.id} onPress={() => setFilter(k.id)} />
          ))}
        </ScrollView>
        {list.map((item) => {
          const temple = templeById(item.templeId);
          return (
            <Pressable key={item.id} style={styles.card} onPress={() => router.push(`/puja/${item.id}`)}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={styles.body}>
                <View style={styles.row}>
                  <Chip label={item.kind} />
                  <PriceTag amount={item.price} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Muted>{item.subtitle}</Muted>
                <Muted>
                  {temple?.name} · {item.duration}
                </Muted>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: 40, gap: 12 },
  chips: { gap: 8 },
  card: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border,
  },
  img: { width: '100%', height: 150, backgroundColor: palette.creamDark },
  body: { padding: 12, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '800', fontSize: 17, color: palette.ink },
});
