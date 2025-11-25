import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import SearchBar from './components/SearchBar'
import { productAPI } from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await productAPI.getAll()
      setProducts(response.data.results || response.data)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchParams) => {
    setLoading(true)
    try {
      const response = await productAPI.search(searchParams)
      setProducts(response.data.results || response.data)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (productData) => {
    await productAPI.create(productData)
    await loadProducts()
    setShowForm(false)
  }

  const handleUpdate = async (productData) => {
    await productAPI.update(editingProduct.id, productData)
    await loadProducts()
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return
    await productAPI.delete(productId)
    await loadProducts()
  }

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-lg shadow-[0_10px_50px_-20px_rgba(0,0,0,0.8)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
            Inventory Hub
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            E-Commerce Product Control
          </h1>
          <p className="mt-4 text-base text-slate-300">
            Monitor stock, pricing, and attributes with a layout that adapts beautifully on every screen size.
          </p>
        </header>

        {!showForm ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg shadow-lg sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-indigo-300">Overview</p>
                <p className="text-lg font-semibold text-white">{products.length} products loaded</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={loadProducts}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.01]"
                >
                  + Create Product
                </button>
              </div>
            </div>

            <SearchBar onSearch={handleSearch} />

            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-16 text-center text-lg font-medium text-white/70 backdrop-blur">
                <div className="h-14 w-14 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                <p className="mt-4">Fetching latest inventory…</p>
              </div>
            ) : (
              <ProductList
                products={products}
                onEdit={(product) => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        ) : (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={() => {
              setEditingProduct(null)
              setShowForm(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App