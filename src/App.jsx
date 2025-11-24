import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { productAPI } from './services/api';
import './App.css';


function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const response = await productAPI.search(searchParams);
      setProducts(response.data.results || response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      alert('Error searching products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productData) => {
    try {
      await productAPI.create(productData);
      await loadProducts();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  const handleUpdate = async (productData) => {
    try {
      await productAPI.update(editingProduct.id, productData);
      await loadProducts();
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(productId);
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      handleUpdate(productData);
    } else {
      handleCreate(productData);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>E-Commerce Inventory</h1>
      </header>
      
      <main className="app-main">
        {!showForm ? (
          <>
            <div className="controls">
              <button 
                onClick={() => setShowForm(true)}
                className="btn-create"
              >
                Create New Product
              </button>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <ProductList 
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;