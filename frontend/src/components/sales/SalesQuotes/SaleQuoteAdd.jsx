import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import ForeignKeyPicker from './ForeignKeyPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function SaleQuoteAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_id: '',
    quote_number: '',
    date: '',
    total: '',
    status: '',
  });

  const [showPicker, setShowPicker] = useState(false);

  async function save(e) {
    e.preventDefault();

    const payload = {
      customer_id: form.customer_id,
      quote_number: form.quote_number,
      date: form.date,
      total: Number(form.total),
      status: form.status,
    };

    await api.post('/sale-quotes', payload);
    navigate('/sale-quotes');
  }

  return (
    <div className="p-4 max-w-lg">
      <h1 className="text-xl font-bold mb-4">
        <FontAwesomeIcon icon={faPlus} /> Add Sale Quote
      </h1>

      <form onSubmit={save} className="space-y-3">
        
        {/* Customer picker */}
        <div>
          <label className="block font-semibold"><FontAwesomeIcon icon={faUser} /> Customer</label>
          <div className="flex gap-2">
            <input className="border p-2 w-24" readOnly value={form.customer_id} />
            <button
              type="button"
              className="bg-gray-700 text-white px-3 py-2 rounded"
              onClick={() => setShowPicker(true)}
            >
              Select
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold"><FontAwesomeIcon icon={faHashtag} /> Quote Number</label>
          <input className="border p-2 w-full" value={form.quote_number}
            onChange={e => setForm({ ...form, quote_number: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Date</label>
          <input type="date" className="border p-2 w-full"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Total</label>
          <input type="number" step="0.01" className="border p-2 w-full"
            value={form.total}
            onChange={e => setForm({ ...form, total: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Status</label>
          <input className="border p-2 w-full"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })} />
        </div>

        <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded">Save</button>
      </form>

      {showPicker && (
        <ForeignKeyPicker
          table="customers"
          labelField="name"
          onSelect={(rec) => {
            setForm({ ...form, customer_id: rec.id });
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}