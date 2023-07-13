export type TAuthSetPhoneDto = {
  phone_number: string;
};

export type TAuthSetPhoneRes = {
  message: string;
};

export type TAuthResult = {
  access: string;
  refresh: string;
};

export type TAuthSetCodeDto = TAuthSetPhoneDto & {
  otp: number;
};

export type TAuthEmailDto = {
  email: string;
  password: string;
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
  position: number;
  mob_position: number;
  parend_id?: number | null;
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
  map_link: string;
};

export type TDataContext = {
  contacts: TContacts | null;
  latestSuggestedItems: TCharacteristic[];
  bestsellersSuggestedItems: TCharacteristic[];
  categories: TCategory[];
  brands: TBrand[];
  favoritesCount: number;
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
  meta: TMeta;
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

export type TUser = {
  type: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string | null;
  phone_number: string;
  city: string | null;
  order_amount: string;
  discount: number;
  date_joined: string;
  ext_id: string | null;
};

export type TLoyalties = {
  type: string;
  id: number;
  name: string;
  order_amount: number;
  percent: number;
};

export type TEditData = Record<string, string>;

export type TOrdersWithPagination = {
  meta: TMeta;
  data: TOrder[];
};

export type TOrder = {
  type: string;
  id: number;
  customer: TUser;
  amount: number;
  weight: number;
  status: 'NEW';
  content: TOrderContent[];
  history: TOrderHistory[];
  created: string;
  updated: string;
};

export type TOrderHistory = {
  type: string;
  id: number;
  actor: string;
  created: string;
  status: string;
};

export type TOrderContent = {
  type: string;
  id: number;
  characteristic: TCharacteristic;
  quantity: number;
  weight: number;
  amount: number;
  discounted_amount: number;
  final_amount: number;
};
