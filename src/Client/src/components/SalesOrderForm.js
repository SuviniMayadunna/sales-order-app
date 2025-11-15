import React, { useState, useEffect } from 'react';
import { salesOrderApi, customerApi } from '../services/api';

function SalesOrderForm({ order, onSave, onCancel }) {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNo: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    referenceNo: '',
    note: '',
    salesOrderLines: []
  });

  useEffect(() => {
    loadCustomers();
    if (order) {
      setFormData({
        ...order,
        invoiceDate: new Date(order.invoiceDate).toISOString().split('T')[0],
        salesOrderLines: order.salesOrderLines || []
      });
    }
  }, [order]);

  const loadCustomers = async () => {
    try {
      const response = await customerApi.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLine = () => {
    setFormData(prev => ({
      ...prev,
      salesOrderLines: [
        ...prev.salesOrderLines,
        {
          itemCode: '',
          description: '',
          note: '',
          quantity: 1,
          price: 0,
          tax: 10,
          exclAmount: 0,
          taxAmount: 0,
          inclAmount: 0
        }
      ]
    }));
  };

  const handleRemoveLine = (index) => {
    setFormData(prev => ({
      ...prev,
      salesOrderLines: prev.salesOrderLines.filter((_, i) => i !== index)
    }));
  };

  const handleLineChange = (index, field, value) => {
    const newLines = [...formData.salesOrderLines];
    newLines[index][field] = value;

    // Calculate amounts
    if (field === 'quantity' || field === 'price' || field === 'tax') {
      const line = newLines[index];
      const qty = parseFloat(line.quantity) || 0;
      const price = parseFloat(line.price) || 0;
      const taxRate = parseFloat(line.tax) || 0;

      line.exclAmount = qty * price;
      line.taxAmount = line.exclAmount * (taxRate / 100);
      line.inclAmount = line.exclAmount + line.taxAmount;
    }

    setFormData(prev => ({
      ...prev,
      salesOrderLines: newLines
    }));
  };

  const calculateTotals = () => {
    const totalExcl = formData.salesOrderLines.reduce((sum, line) => sum + (line.exclAmount || 0), 0);
    const totalTax = formData.salesOrderLines.reduce((sum, line) => sum + (line.taxAmount || 0), 0);
    const totalIncl = formData.salesOrderLines.reduce((sum, line) => sum + (line.inclAmount || 0), 0);
    return { totalExcl, totalTax, totalIncl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId) {
      alert('Please select a customer');
      return;
    }

    if (!formData.invoiceNo) {
      alert('Please enter an invoice number');
      return;
    }

    if (formData.salesOrderLines.length === 0) {
      alert('Please add at least one line item');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        customerId: parseInt(formData.customerId),
        invoiceDate: new Date(formData.invoiceDate).toISOString(),
        salesOrderLines: formData.salesOrderLines.map(line => ({
          ...line,
          quantity: parseInt(line.quantity) || 0,
          price: parseFloat(line.price) || 0,
          tax: parseFloat(line.tax) || 0,
          exclAmount: parseFloat(line.exclAmount) || 0,
          taxAmount: parseFloat(line.taxAmount) || 0,
          inclAmount: parseFloat(line.inclAmount) || 0
        }))
      };

      if (order && order.salesOrderId) {
        await salesOrderApi.update(order.salesOrderId, {
          ...dataToSubmit,
          salesOrderId: order.salesOrderId
        });
        alert('Order updated successfully');
      } else {
        await salesOrderApi.create(dataToSubmit);
        alert('Order created successfully');
      }

      onSave();
    } catch (error) {
      console.error('Error saving order:', error);
      console.error('Error details:', error.response?.data);
      const errorMsg = error.response?.data?.errors 
        ? JSON.stringify(error.response.data.errors) 
        : (error.response?.data?.message || error.message);
      alert('Failed to save order: ' + errorMsg);
    }
  };

  const selectedCustomer = customers.find(c => c.customerId === parseInt(formData.customerId));
  const totals = calculateTotals();

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Sales Order</h2>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Save Order
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section customer-section">
            <div className="form-group">
              <label>Customer Name *</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName}
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomer && (
              <>
                <div className="form-group">
                  <label>Address 1</label>
                  <input type="text" value={selectedCustomer.address1 || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Address 2</label>
                  <input type="text" value={selectedCustomer.address2 || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Address 3</label>
                  <input type="text" value={selectedCustomer.address3 || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Suburb</label>
                  <input type="text" value={selectedCustomer.suburb || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" value={selectedCustomer.state || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Post Code</label>
                  <input type="text" value={selectedCustomer.postCode || ''} readOnly />
                </div>
              </>
            )}
          </div>

          <div className="form-section invoice-section">
            <div className="form-group">
              <label>Invoice No. *</label>
              <input
                type="text"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Invoice Date *</label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Reference No</label>
              <input
                type="text"
                name="referenceNo"
                value={formData.referenceNo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>
        </div>

        <div className="line-items-section">
          <div className="section-header">
            <h3>Line Items</h3>
            <button type="button" className="btn btn-success" onClick={handleAddLine}>
              Add Line
            </button>
          </div>

          <table className="line-items-table">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Description</th>
                <th>Note</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax %</th>
                <th>Excl Amount</th>
                <th>Tax Amount</th>
                <th>Incl Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.salesOrderLines.map((line, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={line.itemCode}
                      onChange={(e) => handleLineChange(index, 'itemCode', e.target.value)}
                      placeholder="Item code"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.description}
                      onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.note}
                      onChange={(e) => handleLineChange(index, 'note', e.target.value)}
                      placeholder="Note"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={line.quantity}
                      onChange={(e) => handleLineChange(index, 'quantity', e.target.value)}
                      min="1"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={line.price}
                      onChange={(e) => handleLineChange(index, 'price', e.target.value)}
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={line.tax}
                      onChange={(e) => handleLineChange(index, 'tax', e.target.value)}
                      min="0"
                    />
                  </td>
                  <td className="amount-cell">${(line.exclAmount || 0).toFixed(2)}</td>
                  <td className="amount-cell">${(line.taxAmount || 0).toFixed(2)}</td>
                  <td className="amount-cell">${(line.inclAmount || 0).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveLine(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totals-section">
          <div className="totals-grid">
            <div className="total-row">
              <label>Total Excl:</label>
              <span>${totals.totalExcl.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <label>Total Tax:</label>
              <span>${totals.totalTax.toFixed(2)}</span>
            </div>
            <div className="total-row total-incl">
              <label>Total Incl:</label>
              <span>${totals.totalIncl.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalesOrderForm;
