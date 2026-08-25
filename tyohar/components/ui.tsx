import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';

import { palette, radius, spacing } from '@/constants/theme';
import { formatInr } from '@/lib/catalog';

export function Screen({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[styles.screen, style]} {...rest}>
      {children}
    </View>
  );
}

export function Title({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}

export function Body({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.body, style]} {...rest}>
      {children}
    </Text>
  );
}

export function Muted({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.muted, style]} {...rest}>
      {children}
    </Text>
  );
}

export function PriceTag({ amount }: { amount: number }) {
  return (
    <View style={styles.priceTag}>
      <Text style={styles.priceText}>{formatInr(amount)}</Text>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
  icon,
}: {
  label: string;
  onPress?: PressableProps['onPress'];
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>
      <LinearGradient
        colors={[palette.saffron, palette.maroon]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryBtn}>
        {icon ? <Ionicons name={icon} size={18} color={palette.white} /> : null}
        <Text style={styles.primaryLabel}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: PressableProps['onPress'];
}) {
  return (
    <Pressable onPress={onPress} style={styles.ghostBtn}>
      <Text style={styles.ghostLabel}>{label}</Text>
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function HeroImage({ uri, height = 180 }: { uri: string; height?: number }) {
  return (
    <Image source={{ uri }} style={{ width: '100%', height, backgroundColor: palette.creamDark }} />
  );
}

export function LoadingBlock() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={palette.saffron} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.cream,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.ink,
    letterSpacing: -0.4,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: palette.ink,
  },
  muted: {
    fontSize: 13,
    color: palette.muted,
    lineHeight: 18,
  },
  priceTag: {
    backgroundColor: palette.goldSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  priceText: {
    color: palette.maroonDeep,
    fontWeight: '800',
    fontSize: 13,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.md,
  },
  primaryLabel: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 16,
  },
  ghostBtn: {
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: palette.ivory,
  },
  ghostLabel: {
    color: palette.maroon,
    fontWeight: '700',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
    backgroundColor: palette.ivory,
    borderWidth: 1,
    borderColor: palette.border,
  },
  chipActive: {
    backgroundColor: palette.maroon,
    borderColor: palette.maroon,
  },
  chipText: {
    color: palette.ink,
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: palette.white,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.cream,
  },
});
