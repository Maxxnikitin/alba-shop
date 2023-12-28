import {
  $orderItemsStore,
  getOrderItemsFx,
  removeOrdersItems,
  startOrderItemsRequest,
  updateOrderItemsBtnFx,
} from '.';

$orderItemsStore
  .on(startOrderItemsRequest, ({ data }) => ({
    status: 'LOADING',
    data: data ?? null,
    error: null,
  }))
  .on(removeOrdersItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(getOrderItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getOrderItemsFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(updateOrderItemsBtnFx.doneData, (prev, data) => ({
    status: 'SUCCESS',
    data: { data: [...prev.data!.data, ...data.data], meta: data.meta },
    error: null,
  }))
  .on(updateOrderItemsBtnFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }));
