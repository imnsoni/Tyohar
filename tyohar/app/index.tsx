import { Redirect } from 'expo-router';

import { LoadingBlock } from '@/components/ui';
import { useStore } from '@/lib/store';

export default function Index() {
  const { ready, onboarded } = useStore();
  if (!ready) return <LoadingBlock />;
  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding'} />;
}
