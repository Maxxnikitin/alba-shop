export type TAuthSetPhone = {
  phone_number: string;
};

export type TAuthSetPhoneRes = {
  message: string;
};

export type TAuthSetCode = TAuthSetPhone & {
  otp: number;
};
