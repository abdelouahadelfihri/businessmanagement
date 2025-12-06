import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from '../slices/purchases/supplierSlice';
import purchaseRequestReducer from '../slices/purchases/purchaseRequestSlice';
import purchaseReceiptReducer from '../slices/purchases/purchaseReceiptSlice';

export const store = configureStore({
  reducer: {
    suppliers: supplierReducer,
    purchaseRequest: purchaseRequestReducer,
    purchaseReceipt: purchaseReceiptReducer
  },
});