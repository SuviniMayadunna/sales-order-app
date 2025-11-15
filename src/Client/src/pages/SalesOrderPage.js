import React, { useState, useEffect } from 'react';
import SalesOrderForm from '../components/SalesOrderForm';
import { salesOrderApi } from '../services/api';
import '../styles/SalesOrderPage.css';

function SalesOrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await salesOrderApi.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
      alert('Failed to load orders. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedOrder(null);
    setShowForm(true);
  };

  const handleRowDoubleClick = (order) => {
    setSelectedOrder(order);
    setShowForm(true);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await salesOrderApi.delete(id);
        loadOrders();
        alert('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  const handleSave = async () => {
    setShowForm(false);
    setSelectedOrder(null);
    await loadOrders();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedOrder(null);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedOrders = () => {
    if (!sortConfig.key) return orders;

    const sorted = [...orders].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'customerName') {
        aVal = a.customer?.customerName || '';
        bVal = b.customer?.customerName || '';
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '▼';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  if (showForm) {
    return (
      <SalesOrderForm
        order={selectedOrder}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  const sortedOrders = getSortedOrders();

  return (
    <div className="orders-page">
      <div className="orders-toolbar">
        <button onClick={handleAddNew} className="btn-add-new">Add New</button>
      </div>

      <div className="orders-grid-container">
        {loading ? (
          <div className="empty-state">
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found. Click "Add New" to create your first order.</p>
          </div>
        ) : (
          <table className="orders-grid">
            <thead>
              <tr>
                <th onClick={() => handleSort('invoiceNo')}>
                  <span>Invoice No {getSortIcon('invoiceNo')}</span>
                </th>
                <th onClick={() => handleSort('customerName')}>
                  <span>Customer {getSortIcon('customerName')}</span>
                </th>
                <th onClick={() => handleSort('invoiceDate')}>
                  <span>Invoice Date {getSortIcon('invoiceDate')}</span>
                </th>
                <th onClick={() => handleSort('referenceNo')}>
                  <span>Reference No {getSortIcon('referenceNo')}</span>
                </th>
                <th onClick={() => handleSort('totalExcl')}>
                  <span>Total Excl {getSortIcon('totalExcl')}</span>
                </th>
                <th onClick={() => handleSort('totalTax')}>
                  <span>Total Tax {getSortIcon('totalTax')}</span>
                </th>
                <th onClick={() => handleSort('totalIncl')}>
                  <span>Total Incl {getSortIcon('totalIncl')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <tr 
                  key={order.salesOrderId}
                  onDoubleClick={() => handleRowDoubleClick(order)}
                  title="Double-click to edit"
                >
                  <td>{order.invoiceNo}</td>
                  <td>{order.customer?.customerName || '-'}</td>
                  <td>{new Date(order.invoiceDate).toLocaleDateString()}</td>
                  <td>{order.referenceNo || '-'}</td>
                  <td className="amount">${order.totalExcl.toFixed(2)}</td>
                  <td className="amount">${order.totalTax.toFixed(2)}</td>
                  <td className="amount">${order.totalIncl.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SalesOrderPage;
