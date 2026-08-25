import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Body, Chip, Muted, PriceTag, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { catalog, formatInr, temples, testimonials } from '@/lib/catalog';
import { useStore } from '@/lib/store';

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useStore();
  const popular = catalog.filter((c) => c.popular);
  const greeting = profile.name ? `Namaste, ${profile.name.split(' ')[0]}` : 'Namaste';

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Title>{greeting}</Title>
        <Muted>Offer prayer at any temple in India — we collect, offer, and bring prasad home.</Muted>

        <LinearGradient
          colors={[palette.maroon, palette.saffron]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}>
          <Text style={styles.bannerKicker}>Tyohar pickup</Text>
          <Text style={styles.bannerTitle}>Send your own offering to the temple</Text>
          <Body style={{ color: palette.cream, marginTop: 6 }}>
            We collect prasad, flowers, or vastra from your doorstep and submit them with sankalp.
          </Body>
          <View style={{ marginTop: 14 }}>
            <PrimaryButton label="Schedule a pickup" icon="bicycle" onPress={() => router.push('/pickup')} />
          </View>
        </LinearGradient>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          <Quick
            icon="flame"
            label="Book puja"
            onPress={() => router.push('/(tabs)/sevas')}
          />
          <Quick icon="business" label="Temples" onPress={() => router.push('/(tabs)/temples')} />
          <Quick icon="gift" label="Bhet chadava" onPress={() => router.push({ pathname: '/(tabs)/sevas', params: { kind: 'offering' } })} />
          <Quick icon="sparkles" label="Hawan" onPress={() => router.push({ pathname: '/(tabs)/sevas', params: { kind: 'hawan' } })} />
        </ScrollView>

        <Text style={styles.section}>Popular sevas</Text>
        {popular.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/puja/${item.id}`)}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.hindiTitle ? <Muted>{item.hindiTitle}</Muted> : null}
              <Muted>{item.subtitle}</Muted>
              <View style={styles.meta}>
                <Chip label={item.kind} />
                <PriceTag amount={item.price} />
              </View>
            </View>
          </Pressable>
        ))}

        <Text style={styles.section}>Temples on Tyohar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {temples.slice(0, 8).map((t) => (
            <Pressable key={t.id} style={styles.templeCard} onPress={() => router.push(`/temple/${t.id}`)}>
              <Image source={{ uri: t.image }} style={styles.templeImg} />
              <Text style={styles.templeName} numberOfLines={1}>
                {t.name}
              </Text>
              <Muted>
                {t.city}
              </Muted>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.section}>How Tyohar works</Text>
        {[
          ['1', 'Choose temple, puja, bhet, or home pickup'],
          ['2', 'Share family names & gotra for sankalp'],
          ['3', 'Pandits offer on your behalf; we send photos'],
          ['4', 'Receive prasad at home, or we take yours to the temple'],
        ].map(([n, t]) => (
          <View key={n} style={styles.step}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{n}</Text>
            </View>
            <Body style={{ flex: 1 }}>{t}</Body>
          </View>
        ))}

        <Text style={styles.section}>Devotees on Tyohar</Text>
        {testimonials.map((t) => (
          <View key={t.name} style={styles.quote}>
            <Body>“{t.quote}”</Body>
            <Muted style={{ marginTop: 8 }}>
              {t.name} · {t.city}
            </Muted>
          </View>
        ))}
        <Muted style={{ textAlign: 'center', marginTop: spacing.md }}>
          Honest prices from {formatInr(39)} · 12 sacred temples in this first release
        </Muted>
      </ScrollView>
    </Screen>
  );
}

function Quick({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.quick}>
      <Ionicons name={icon} size={22} color={palette.maroon} />
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: 40, gap: 8 },
  banner: { borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md },
  bannerKicker: { color: palette.goldSoft, fontWeight: '800', textTransform: 'uppercase', fontSize: 12 },
  bannerTitle: { color: palette.white, fontSize: 22, fontWeight: '800', marginTop: 4 },
  row: { gap: 10, paddingVertical: 8 },
  quick: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    minWidth: 110,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 6,
  },
  quickLabel: { fontWeight: '700', color: palette.ink, fontSize: 12 },
  section: {
    marginTop: spacing.md,
    fontSize: 18,
    fontWeight: '800',
    color: palette.maroon,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: palette.border,
  },
  thumb: { width: 88, height: 88, borderRadius: radius.sm, backgroundColor: palette.creamDark },
  cardTitle: { fontWeight: '800', color: palette.ink, fontSize: 15 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  templeCard: { width: 150 },
  templeImg: { width: 150, height: 100, borderRadius: radius.md, backgroundColor: palette.creamDark },
  templeName: { fontWeight: '800', marginTop: 6, color: palette.ink },
  step: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 8 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { color: palette.white, fontWeight: '800' },
  quote: {
    backgroundColor: palette.ivory,
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: palette.gold,
  },
});
