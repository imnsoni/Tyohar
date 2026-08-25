import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { CartLine, FamilyMember, Order } from './types';

const KEYS = {
  onboarded: 'tyohar.onboarded',
  profile: 'tyohar.profile',
  family: 'tyohar.family',
  cart: 'tyohar.cart',
  orders: 'tyohar.orders',
};

export type Profile = {
  name: string;
  phone: string;
  gotra: string;
  city: string;
  address: string;
};

const defaultProfile: Profile = {
  name: '',
  phone: '',
  gotra: '',
  city: '',
  address: '',
};

type Store = {
  ready: boolean;
  onboarded: boolean;
  completeOnboarding: () => void;
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
  family: FamilyMember[];
  addFamily: (m: Omit<FamilyMember, 'id'>) => void;
  removeFamily: (id: string) => void;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  placeOrder: (input: {
    devoteeName: string;
    gotra: string;
    sankalp: string;
    wantVideo: boolean;
    wantPrasad: boolean;
    shippingAddress?: string;
  }) => Order | null;
};

const Ctx = createContext<Store | null>(null);

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfileState] = useState<Profile>(defaultProfile);
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [o, p, f, c, or] = await Promise.all([
          AsyncStorage.getItem(KEYS.onboarded),
          AsyncStorage.getItem(KEYS.profile),
          AsyncStorage.getItem(KEYS.family),
          AsyncStorage.getItem(KEYS.cart),
          AsyncStorage.getItem(KEYS.orders),
        ]);
        setOnboarded(o === '1');
        if (p) setProfileState({ ...defaultProfile, ...JSON.parse(p) });
        if (f) setFamily(JSON.parse(f));
        if (c) setCart(JSON.parse(c));
        if (or) setOrders(JSON.parse(or));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = async (key: string, value: unknown) => {
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, line) =>
          sum + line.price + line.addons.reduce((a, addon) => a + addon.price, 0),
        0
      ),
    [cart]
  );

  const value: Store = {
    ready,
    onboarded,
    completeOnboarding: () => {
      setOnboarded(true);
      persist(KEYS.onboarded, '1');
    },
    profile,
    setProfile: (p) => {
      const next = { ...profile, ...p };
      setProfileState(next);
      persist(KEYS.profile, next);
    },
    family,
    addFamily: (m) => {
      const next = [...family, { ...m, id: uid('fam') }];
      setFamily(next);
      persist(KEYS.family, next);
    },
    removeFamily: (id) => {
      const next = family.filter((x) => x.id !== id);
      setFamily(next);
      persist(KEYS.family, next);
    },
    cart,
    addToCart: (line) => {
      const next = [...cart, { ...line, id: uid('line') }];
      setCart(next);
      persist(KEYS.cart, next);
    },
    removeFromCart: (id) => {
      const next = cart.filter((x) => x.id !== id);
      setCart(next);
      persist(KEYS.cart, next);
    },
    clearCart: () => {
      setCart([]);
      persist(KEYS.cart, []);
    },
    cartTotal,
    orders,
    placeOrder: (input) => {
      if (!cart.length) return null;
      const amount = cartTotal + (input.wantVideo ? 99 : 0) + (input.wantPrasad ? 149 : 0);
      const hasPickup = cart.some((l) => l.kind === 'pickup');
      const order: Order = {
        id: `TYH${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        amount,
        status: hasPickup ? 'pickup_scheduled' : 'confirmed',
        devoteeName: input.devoteeName,
        gotra: input.gotra,
        sankalp: input.sankalp,
        lines: cart,
        wantVideo: input.wantVideo,
        wantPrasad: input.wantPrasad,
        shippingAddress: input.shippingAddress,
      };
      const next = [order, ...orders];
      setOrders(next);
      persist(KEYS.orders, next);
      setCart([]);
      persist(KEYS.cart, []);
      return order;
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
