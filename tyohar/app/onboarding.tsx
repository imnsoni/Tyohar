import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { useStore } from '@/lib/store';

const slides = [
  {
    icon: 'sparkles' as const,
    title: 'Pray from anywhere',
    body: 'Busy day, another city, or living abroad — Tyohar takes your prayer to temples across India.',
  },
  {
    icon: 'bicycle' as const,
    title: 'We collect your offering',
    body: 'Homemade prasad, coconut, vastra, or a letter of prayer. We pick it up and submit it at the temple you choose.',
  },
  {
    icon: 'flame' as const,
    title: 'Puja & hawan, live',
    body: 'Experienced pandits perform puja or hawan in your name and gotra. Get photos, video, and prasad at home.',
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const { completeOnboarding, onboarded } = useStore();
  const router = useRouter();
  const slide = slides[index];
  const last = index === slides.length - 1;

  return (
    <LinearGradient colors={[palette.maroonDeep, palette.maroon, palette.saffron]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.brand}>त्योहार · Tyohar</Text>
        <Text style={styles.tag}>India’s temple offering & puja companion</Text>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons name={slide.icon} size={42} color={palette.gold} />
          </View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotOn]} />
            ))}
          </View>
        </View>
        {last ? (
          <PrimaryButton
            label="Begin darshan"
            icon="arrow-forward"
            onPress={() => {
              completeOnboarding();
              router.replace('/(tabs)');
            }}
          />
        ) : (
          <Pressable
            style={styles.next}
            onPress={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}>
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        )}
        {onboarded ? (
          <Pressable onPress={() => router.replace('/(tabs)')} style={{ alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.nextText}>Back to home</Text>
          </Pressable>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: spacing.lg, justifyContent: 'space-between' },
  brand: {
    color: palette.goldSoft,
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing.lg,
  },
  tag: { color: palette.cream, marginTop: 6, fontSize: 15 },
  card: {
    backgroundColor: 'rgba(255,251,244,0.12)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(240,213,140,0.35)',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { color: palette.white, fontSize: 28, fontWeight: '800' },
  body: { color: palette.cream, marginTop: 10, fontSize: 16, lineHeight: 24 },
  dots: { flexDirection: 'row', gap: 8, marginTop: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.35)' },
  dotOn: { width: 22, backgroundColor: palette.gold },
  next: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  nextText: { color: palette.white, fontWeight: '800', fontSize: 16 },
});
