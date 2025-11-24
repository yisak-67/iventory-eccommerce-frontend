import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    attributes: '{}'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        attributes: JSON.stringify(product.attributes, null, 2)
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const submittedData = {
        ...formData,
        attributes: JSON.parse(formData.attributes),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };
      onSubmit(submittedData);
    } catch (error) {
      alert('Invalid JSON in attributes field');
    }
  };

  return (
    <div className="product-form">
      <h2>{product ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Attributes (JSON):</label>
          <textarea
            name="attributes"
            value={formData.attributes}
            onChange={handleChange}
            rows="6"
            placeholder='{"color": "red", "tags": ["summer"]}'
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {product ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;