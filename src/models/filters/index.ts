import { createEvent, createStore } from 'effector';

import { TCheckboxFiltersData, TSwitchFiltersData } from '~utils';

type TFilters = {
  checkboxes: TCheckboxFiltersData;
  switches: TSwitchFiltersData;
  price: { min: number; max: number };
};

export const $filtersStore = createStore<TFilters>({
  checkboxes: {
    brand: {},
    material: {},
    model: {},
    color: {},
    length: {},
    output: {},
    charging_type: {},
    connector_type: {},
  },
  switches: {
    is_new: false,
    is_hit: false,
    stock: false,
    discount: false,
  },
  price: {
    min: 0,
    max: 0,
  },
});

export const updateCheckboxes = createEvent<{
  title: keyof TCheckboxFiltersData;
  key: string;
  value: boolean;
}>();
export const updateSwitches = createEvent<{ key: keyof TSwitchFiltersData; value: boolean }>();
export const removeFilters = createEvent<{ min: number; max: number }>();
export const updatePrice = createEvent<{ min: number; max: number }>();
