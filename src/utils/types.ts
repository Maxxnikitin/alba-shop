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
  name: string;
  is_hit: boolean;
  is_new: boolean;
  has_discount: boolean;
  description: string[] | null;
  photo: string;
  category_id: number;
  min_price: string;
  in_stock: boolean;
  characteristics: TCharacteristics[];
};

export type TCharacteristics = {
  type: string;
  id: string;
  name: string;
  product_id: string;
  weight: number;
  stock: number;
  in_cart: number;
  price: string;
  discount: string;
  color: string;
  in_favourite: boolean;
  photo: string[];
};
