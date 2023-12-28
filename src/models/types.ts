export type TStore<T> = {
  status: 'NONE' | 'LOADING' | 'SUCCESS' | 'REJECT';
  data: T | null;
  error: Error | null;
};
