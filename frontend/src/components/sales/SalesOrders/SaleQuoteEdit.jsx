import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import ForeignKeyPicker from './ForeignKeyPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function SaleQuoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    api.get(`/sale-quotes/${id}`)
      .then(res => setQuote(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!quote) return <p className="p-4">Loading...</p>;

  async function save(e) {
    e.preventDefault();

    const payload = {
      customer_id: quote.customer_id,
      quote_number: quote.quote_number,
      date: quote.date,
      total: Number(quote.total),
      status: quote.status,
    };

    await api.put(`/sale-quotes/${id}`, payload);
    navigate('/sale-quotes');
  }

  return (
    <div className="p-4 max-w-lg">
      <h1 className="text-xl font-bold mb-4">
        <FontAwesomeIcon icon={faEdit} /> Edit Sale Quote #{id}
      </h1>

      <form onSubmit={save} className="space-y-3">

        {/* Customer */}
        <div>
          <label className="block font-semibold"><FontAwesomeIcon icon={faUser} /> Customer</label>
          <div className="flex gap-2">
            <input className="border p-2 w-24" readOnly value={quote.customer_id} />
            <input className="border p-2 flex-1" readOnly value={quote.customer?.name || ''} />
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
          <input className="border p-2 w-full"
            value={quote.quote_number}
            onChange={e => setQuote({ ...quote, quote_number: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Date</label>
          <input type="date" className="border p-2 w-full"
            value={quote.date}
            onChange={e => setQuote({ ...quote, date: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Total</label>
          <input type="number" step="0.01" className="border p-2 w-full"
            value={quote.total}
            onChange={e => setQuote({ ...quote, total: e.target.value })} />
        </div>

        <div>
          <label className="block font-semibold">Status</label>
          <input className="border p-2 w-full"
            value={quote.status}
            onChange={e => setQuote({ ...quote, status: e.target.value })} />
        </div>

        <button className="bg-green-600 text-white px-3 py-2 rounded">Save</button>
      </form>

      {showPicker && (
        <ForeignKeyPicker
          table="customers"
          labelField="name"
          onSelect={(rec) => {
            setQuote({ ...quote, customer_id: rec.id, customer: rec });
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}