export type TAuthSetPhoneDto = {
  phone_number: string;
};

export type TAuthSetPhoneRes = {
  message: string;
};

export type TAuthSetCodeDto = TAuthSetPhoneDto & {
  otp: number;
};

export type TGetFaqDataRes = {
  type: 'faq';
  id: number;
  header: string;
  description: string[];
};

export type TGetProductRes = {
  type: string;
  id: string;
  article: string;
  name: string;
  description: string[];
  weight: number;
  category_id: number;
  characteristics: TCharacteristic[];
};

export type TCharacteristic = {
  type: string;
  id: string;
  name: string;
  product_id: string;
  is_new: boolean;
  is_hit: boolean;
  in_cart: number;
  in_favorite: boolean;
  stock: number;
  price: string;
  discount: number;
  discounted_price: string;
  color: string;
  photo: string[];
};

export type TCategory = {
  type: string;
  id: number;
  name: string;
  icon: string;
  photo: string;
  level: number;
  slug: string;
  parend_id: number | null;
};

export type TGetCategoriesRes = TCategory[];

export type TGetAboutInfoRes = {
  type: string;
  id: number;
  text: string;
};

export type TContacts = {
  type: string;
  id: number;
  address: string;
  opening_hours: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
  vk: string;
};

export type TDataContext = {
  contacts: TContacts | null;
};
