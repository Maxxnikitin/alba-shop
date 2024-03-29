export type TAuthSetPhoneDto = {
  phone_number: string;
};

export type TAuthSetPhoneRes = {
  message: string;
};

export type TAccessRes = {
  access: string;
};

export type TAuthResult = TAccessRes & {
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
  is_hit: boolean;
  in_cart: number;
  in_favorite: boolean;
  stock: number;
  price: string;
  discount: number;
  discounted_price: string;
  color: string;
  photo: TPhotos;
};

export type TPhotos = {
  front: string;
  left?: string;
  inside?: string;
};

export type TCategory = {
  type: string;
  id: number;
  name: string;
  icon: string;
  photo: string;
  photo_2x: string;
  photo_3x: string;
  level: number;
  slug: string;
  position: number;
  mob_position: number;
  children: TCategoryChildren[];
  parend_id?: number | null;
};

export type TCategoryChildren = {
  id: number;
  name: string;
  slug: string;
  type: string;
  photo: string;
  children: TCategoryChildren[];
};

export type TCategoryChild = {
  type: string;
  id: number;
  name: string;
  photo: string;
  photo_2x: string;
  photo_3x: string;
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
  breadcrumbs: Record<string, string>;
};

export type TPagination = {
  total_items: number;
  num_pages: number;
  next: number | null;
  previous: number | null;
};

export type TCheckboxFilter = { f_id: number; f_name: string; f_quantity: number };

export type TFiltersFields = {
  brand: TCheckboxFilter[];
  color: TCheckboxFilter[];
  material: TCheckboxFilter[];
  model: TCheckboxFilter[];
  length: TCheckboxFilter[];
  output: TCheckboxFilter[];
  charging_type: TCheckboxFilter[];
  connector_type: TCheckboxFilter[];
  discount: boolean;
  stock: boolean;
  is_hit: boolean;
  is_new: boolean;
  price: {
    min: number;
    max: number;
  };
};

export type TFilters = {
  fields: TFiltersFields;
  queries: {};
};

export type TMeta = {
  pagination: TPagination;
};

export type TMetaWithFilters = TMeta & {
  filters: TFilters;
};

export type TItemsWithPagination = {
  meta: TMeta;
  data: TCharacteristic[];
};

export type TItemsWithPaginationAndFilters = {
  meta: TMetaWithFilters;
  data: TCharacteristic[];
};

export type TSortingItems = '-is_hit' | '-is_new' | 'price' | '-price';

export type TBrand = {
  type: string;
  id: number;
  name: string;
  logo: string;
  in_brand_section: boolean;
};

export type ResWithData<T> = {
  data: T;
  meta?: TMeta;
};

export type TMainSlide = {
  type: string;
  id: number;
  slide: string;
  slide_mob: string;
  main: boolean;
};

export type TUser = {
  type: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  surname: string;
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

export type TEditData = {
  email: string;
  first_name: string;
  last_name: string;
  surname: string;
  // company_name: string;
  phone_number: string;
  city: string;
  password: string;
  password2: string;
};

export type TConfirmOrderData = {
  first_name: string;
  last_name: string;
  surname: string;
  city: string;
  phone_number: string;
  email: string;
  delivery: EDeliveryType;
};

export enum EDeliveryType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

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
  status: EOrderStatus;
  content: TOrderContent[];
  history: TOrderHistory[];
  created: string;
  updated: string;
};

export enum EOrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  SENT = 'SENT',
  CANCELED = 'CANCELED',
  RECEIVED = 'RECEIVED',
}

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
  amount: string;
  discounted_amount: string;
  final_amount: string;
  final_price: string;
  is_sufficient: boolean;
};

export type TCart = {
  type: string;
  id: number;
  customer: TUser;
  created: string;
  amount: string;
  discounted_amount: string;
  final_amount: string;
  weight: number;
  content: TOrderContent[];
  is_valid: boolean;
};

export type TCartCreate = {
  characteristic_id: string;
  quantity?: number;
};

export type TLiveSearchRes = {
  meta: TLiveSearchMeta;
  data: TLiveSearchData[];
};

export type TLiveSearchMeta = {
  total_categories: number;
  total_products: number;
};

export type TLiveSearchData = {
  type: 'categories' | 'products';
  id: string | number;
  name: string;
  slug?: string;
  icon?: string;
};

export type TTotalItems = {
  total_items: number;
};

export enum ERequestStatus {
  NONE = 'none',
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
  FAIL_LENGTH = 'fail_length',
}

export enum EWordForm {
  ONE = 'one',
  FEW = 'few',
  MANY = 'many',
}

// filters

export type TFilterBlock = Record<number | string, boolean>;

export type TCheckboxFiltersData = {
  [key: string]: TFilterBlock;
};

export type TFilterItem = {
  f_id: number | string;
  f_name: string;
  f_quantity?: number;
};

export type TPriceFiltersData = {
  price: {
    min: number;
    max: number;
  };
};

export type TSwitchFiltersData = {
  [key: string]: boolean;
};

export type TFiltersBoxWithChildrenItem = {
  f_id: number | string;
  f_name: string;
};

export type TFiltersBoxWithChildrenBlock = Record<number | string, boolean>;

export type TParams = {
  id?: string | number;
  q?: string;
  queries: string[];
  fn?: (queries: string[], q?: string) => Promise<TItemsWithPagination>;
};
