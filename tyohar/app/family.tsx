import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Muted, PrimaryButton, Screen, Title } from '@/components/ui';
import { palette, radius, spacing } from '@/constants/theme';
import { useStore } from '@/lib/store';

export default function FamilyScreen() {
  const { family, addFamily, removeFamily } = useStore();
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Spouse');
  const [gotra, setGotra] = useState('');

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Title>Family for sankalp</Title>
        <Muted>Names spoken by the pandit along with yours during puja or offering.</Muted>
        {family.map((m) => (
          <View key={m.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{m.name}</Text>
              <Muted>
                {m.relation}
                {m.gotra ? ` · ${m.gotra}` : ''}
              </Muted>
            </View>
            <Pressable onPress={() => removeFamily(m.id)}>
              <Text style={styles.remove}>Remove</Text>
            </Pressable>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={palette.muted}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Relation"
          placeholderTextColor={palette.muted}
          value={relation}
          onChangeText={setRelation}
        />
        <TextInput
          style={styles.input}
          placeholder="Gotra (optional)"
          placeholderTextColor={palette.muted}
          value={gotra}
          onChangeText={setGotra}
        />
        <PrimaryButton
          label="Add member"
          disabled={!name.trim()}
          onPress={() => {
            addFamily({ name: name.trim(), relation, gotra });
            setName('');
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: 10, paddingBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.ivory,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
  },
  name: { fontWeight: '800', color: palette.ink },
  remove: { color: palette.saffron, fontWeight: '700' },
  input: {
    backgroundColor: palette.ivory,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: palette.ink,
  },
});
