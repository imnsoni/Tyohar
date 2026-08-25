export type ServiceKind = 'puja' | 'hawan' | 'offering' | 'pickup';

export type Temple = {
  id: string;
  name: string;
  city: string;
  state: string;
  deity: string;
  image: string;
  famousFor: string;
  pickupAvailable: boolean;
};

export type CatalogItem = {
  id: string;
  kind: Exclude<ServiceKind, 'pickup'>;
  title: string;
  hindiTitle?: string;
  subtitle: string;
  templeId: string;
  price: number;
  duration: string;
  image: string;
  tags: string[];
  includes: string[];
  popular?: boolean;
};

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  gotra: string;
};

export type CartLine = {
  id: string;
  kind: ServiceKind;
  catalogId?: string;
  title: string;
  templeId: string;
  templeName: string;
  price: number;
  notes?: string;
  addons: { id: string; label: string; price: number }[];
  pickup?: {
    address: string;
    city: string;
    phone: string;
    slot: string;
    items: string[];
  };
};

export type OrderStatus =
  | 'confirmed'
  | 'pickup_scheduled'
  | 'offered_at_temple'
  | 'prasad_shipped'
  | 'completed';

export type Order = {
  id: string;
  createdAt: string;
  amount: number;
  status: OrderStatus;
  devoteeName: string;
  gotra: string;
  sankalp: string;
  lines: CartLine[];
  wantVideo: boolean;
  wantPrasad: boolean;
  shippingAddress?: string;
};
