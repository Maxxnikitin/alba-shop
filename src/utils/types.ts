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
  is_bestseller: boolean;
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
  map: string;
};

export type TDataContext = {
  contacts: TContacts | null;
  latestSuggestedItems: TCharacteristic[];
  bestsellersSuggestedItems: TCharacteristic[];
  categories: TCategory[];
  brands: TBrand[];
};

export type TPagination = {
  total_items: number;
  num_pages: number;
  next: number | null;
  previous: number | null;
};

export type TMeta = {
  pagination: TPagination;
};

export type TItemsWithPagination = {
  meta: TMeta;
  data: TCharacteristic[];
};

export type TSortingItems = 'is_hit' | 'is_new' | 'price' | '-price';

export type TBrand = {
  type: string;
  id: number;
  name: string;
  logo: string;
  in_brand_section: boolean;
};

export type ResWithData<T> = {
  data: T;
};

export type TMainSlide = {
  type: string;
  id: number;
  slide: string;
  main: boolean;
  title: string;
  text: string;
  btnText: string;
  btnLink: string;
};
