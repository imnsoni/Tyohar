import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip, Muted, Screen } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { temples } from '@/lib/catalog';

export default function TemplesScreen() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [state, setState] = useState('All');
  const states = ['All', ...Array.from(new Set(temples.map((t) => t.state)))];

  const list = useMemo(
    () =>
      temples.filter((t) => {
        const hit =
          t.name.toLowerCase().includes(q.toLowerCase()) ||
          t.city.toLowerCase().includes(q.toLowerCase()) ||
          t.deity.toLowerCase().includes(q.toLowerCase());
        const st = state === 'All' || t.state === state;
        return hit && st;
      }),
    [q, state]
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          placeholder="Search temple, city, or deity"
          placeholderTextColor={palette.muted}
          value={q}
          onChangeText={setQ}
          style={styles.search}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {states.map((s) => (
            <Chip key={s} label={s} active={s === state} onPress={() => setState(s)} />
          ))}
        </ScrollView>
        {list.map((t) => (
          <Pressable key={t.id} style={styles.card} onPress={() => router.push(`/temple/${t.id}`)}>
            <Image source={{ uri: t.image }} style={styles.img} />
            <View style={styles.body}>
              <Text style={styles.name}>{t.name}</Text>
              <Muted>
                {t.city}, {t.state}
              </Muted>
              <Muted>{t.famousFor}</Muted>
              {t.pickupAvailable ? (
                <Text style={styles.pickup}>Pickup of your offering available</Text>
              ) : (
                <Muted>Temple-side seva only</Muted>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: 40, gap: 12 },
  search: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.ink,
    fontSize: 16,
  },
  chips: { gap: 8, paddingBottom: 4 },
  card: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border,
  },
  img: { width: '100%', height: 140, backgroundColor: palette.creamDark },
  body: { padding: 12, gap: 4 },
  name: { fontWeight: '800', fontSize: 17, color: palette.ink },
  pickup: { color: palette.success, fontWeight: '700', fontSize: 12, marginTop: 4 },
});
