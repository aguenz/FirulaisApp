export type PetKind = 'perro' | 'gato';
export type PetWeight = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type PetAge = 'cachorro' | 'adulto' | 'senior';

export interface PetProfile {
  kind: PetKind;
  name: string;
  weight: PetWeight;
  age: PetAge;
  breed?: string;
  allergies?: string[];
  zone?: string;
}

export type ProductCategory = 'todos' | 'antiparasitarios' | 'recipe' | 'alimentos' | 'higiene';

export interface ProductWeightVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  activeIngredient: string;
  cat: ProductCategory;
  pet: 'perro' | 'gato' | 'ambos';
  rx: boolean;
  tag: string;
  img: string;
  discount: string;
  spec?: string;
  price?: number;
  ageGroups?: PetAge[];
  weightVariants?: Partial<Record<PetWeight, ProductWeightVariant>>;
  description?: string;
}

export interface ResolvedProduct {
  id: string;
  name: string;
  brand: string;
  activeIngredient: string;
  cat: ProductCategory;
  pet: 'perro' | 'gato' | 'ambos';
  rx: boolean;
  tag: string;
  img: string;
  discount: string;
  spec: string;
  price: number;
  subscribed?: boolean;
}

export interface CartItem extends ResolvedProduct {
  qty: number;
}

export interface InsurancePlan {
  id: string;
  name: string;
  insurer: string;
  type: 'seguro' | 'servicio';
  badge?: string;
  tags: string[];
  mainHighlight: string;
  description: string;
  priceEstimate?: string;
  coverageLimit?: string;
  recommendedFor?: string;
}

export interface TaxiNeedOption {
  id: string;
  label: string;
  description: string;
  forPet: 'perro' | 'gato' | 'ambos';
  priceAddonUSD: number;
}

export interface CaracasZone {
  id: string;
  name: string;
  municipio: string;
  baseFareUSD: number;
  avgDeliveryMin: number;
  available: boolean;
}

export interface FaqItem {
  id: string;
  cat: 'farmacia' | 'seguros' | 'taxipet' | 'general';
  question: string;
  answer: string;
}

export interface CommunityStory {
  id: string;
  petName: string;
  petKind: PetKind;
  age: string;
  zone: string;
  quote: string;
  image: string;
  rotation: string;
}

export type PaletteId = 'a' | 'b' | 'c' | 'd';
