export type TAuthSetPhone = {
  phone_number: string;
};

export type TAuthSetPhoneRes = {
  message: string;
};

export type TAuthSetCode = TAuthSetPhone & {
  otp: number;
};

export type TGetFaqDataRes = {
  type: 'faq';
  id: number;
  header: string;
  description: string[];
};
