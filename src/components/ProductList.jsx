import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const formatAttributes = (attributes) => {
    if (typeof attributes === 'object' && attributes !== null) {
      return JSON.stringify(attributes, null, 2);
    }
    return attributes;
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Attributes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <pre className="attributes">
                    {formatAttributes(product.attributes)}
                  </pre>
                </td>
                <td>
                  <button 
                    onClick={() => onEdit(product)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;