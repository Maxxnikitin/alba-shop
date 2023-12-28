import { $filtersStore, removeFilters, updateCheckboxes, updatePrice, updateSwitches } from '.';

$filtersStore
  .on(updateCheckboxes, (prev, { title, key, value }) => ({
    ...prev,
    checkboxes: { ...prev.checkboxes, [title]: { ...prev.checkboxes[title], [key]: value } },
  }))
  .on(updateSwitches, (prev, { key, value }) => ({
    ...prev,
    switches: { ...prev.switches, [key]: value },
  }))
  .on(updatePrice, (prev, { min, max }) => ({
    ...prev,
    price: { min, max },
  }))
  .on(removeFilters, (_, { min, max }) => ({
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
      min: +min,
      max: +max,
    },
  }));
