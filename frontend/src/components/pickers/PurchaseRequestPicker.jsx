import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseRequests } from "../../slices/purchases/purchaseRequestSlice";
import { useNavigate } from "react-router-dom";

export default function PurchaseRequestPicker({ value, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((state) => state.purchaseRequest.list || []);

  useEffect(() => {
    if (!requests.length) dispatch(fetchPurchaseRequests());
  }, [dispatch, requests]);

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1 }}
      >
        <option value="">-- Select a Purchase Request --</option>
        {requests.map((r) => (
          <option key={r.id} value={r.id}>
            {`#${r.id} - ${r.title || r.description || "Request"}`}
          </option>
        ))}
      </select>

      <button type="button" onClick={() => navigate("/purchase-requests/add")}>
        +
      </button>
    </div>
  );
}