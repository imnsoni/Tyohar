import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { GhostButton, Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { useStore } from '@/lib/store';

export default function ProfileScreen() {
  const { profile, setProfile, family, orders } = useStore();
  const router = useRouter();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Your details</Title>
        <Muted>Used for sankalp at the temple. You can change these anytime.</Muted>
        <Field label="Full name" value={profile.name} onChange={(v) => setProfile({ name: v })} />
        <Field label="Mobile" value={profile.phone} onChange={(v) => setProfile({ phone: v })} keyboard="phone-pad" />
        <Field label="Gotra" value={profile.gotra} onChange={(v) => setProfile({ gotra: v })} />
        <Field label="City" value={profile.city} onChange={(v) => setProfile({ city: v })} />
        <Field
          label="Address for pickup / prasad"
          value={profile.address}
          onChange={(v) => setProfile({ address: v })}
          multiline
        />
        <PrimaryButton label="Family members for sankalp" icon="people" onPress={() => router.push('/family')} />
        <View style={styles.stat}>
          <Text style={styles.statNum}>{orders.length}</Text>
          <Muted>bookings on this device</Muted>
          <Text style={styles.statNum}>{family.length}</Text>
          <Muted>family members saved</Muted>
        </View>
        <GhostButton label="How Tyohar works" onPress={() => router.push('/onboarding')} />
        <Muted style={{ marginTop: 8 }}>
          Payments in this build are a sandbox checkout so you can complete the full flow before Razorpay /
          UPI is connected.
        </Muted>
      </ScrollView>
    </Screen>
  );
}

function Field({
  label,
  value,
  onChange,
  keyboard,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  keyboard?: 'phone-pad' | 'default';
  multiline?: boolean;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard}
        multiline={multiline}
        placeholder={label}
        placeholderTextColor={palette.muted}
        style={[styles.input, multiline && { height: 80, textAlignVertical: 'top' }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: 12, paddingBottom: 40 },
  label: { fontWeight: '700', color: palette.maroon, marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: palette.ink,
  },
  stat: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 4,
  },
  statNum: { fontSize: 22, fontWeight: '800', color: palette.maroon, marginTop: 8 },
});
