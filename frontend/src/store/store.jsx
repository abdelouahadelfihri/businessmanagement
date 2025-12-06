import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from '../slices/purchases/supplierSlice';
import purchaseRequestReducer from '../slices/purchases/purchaseRequestSlice';
import purchaseReceiptReducer from '../slices/purchases/purchaseReceiptSlice';
import purchaseOrderReducer from '../slices/purchases/purchaseOrderSlice';

export const store = configureStore({
  reducer: {
    suppliers: supplierReducer,
    purchaseRequest: purchaseRequestReducer,
    purchaseReceipt: purchaseReceiptReducer,
    purchaseOrder: purchaseOrderReducer
  },
});