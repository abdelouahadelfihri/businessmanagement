import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faUser, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function SaleQuoteList() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    api.get('/sale-quotes')
      .then(res => setQuotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Sales Quotes</h1>
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={() => navigate('/sale-quotes/add')}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Quote
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2"><FontAwesomeIcon icon={faHashtag} /> ID</th>
            <th className="border p-2"><FontAwesomeIcon icon={faUser} /> Customer</th>
            <th className="border p-2">Quote Number</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map(q => (
            <tr key={q.id}>
              <td className="border p-2">{q.id}</td>
              <td className="border p-2">{q.customer ? q.customer.name : ''}</td>
              <td className="border p-2">{q.quote_number}</td>
              <td className="border p-2">{q.total}</td>
              <td className="border p-2">{q.status}</td>
              <td className="border p-2">
                <button
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/sale-quotes/${q.id}/edit`)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}