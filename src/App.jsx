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
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await productAPI.getAll()
      setProducts(response.data.results || response.data)
      setSearchResults(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchParams) => {
    setLoading(true)
    try {
      const response = await productAPI.search(searchParams)
      const results = response.data.results || response.data
      setProducts(results)
      setSearchResults({
        params: searchParams,
        count: results.length
      })
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
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return
    await productAPI.delete(productId)
    await loadProducts()
  }

  const clearSearch = () => {
    setSearchResults(null)
    loadProducts()
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Enhanced Header */}
        <header className=" bg-gradient-to-br from-white/5 to-white/10 p-8 text-center backdrop-blur-xl shadow-2xl bg-[#1a1a1a] shadow-slate-900/40">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center space-x-2 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 px-4 py-2 mb-6">
              <svg className="h-4 w-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
                Inventory Management
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Product Control
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Streamline your e-commerce operations with real-time inventory tracking, 
              advanced search, and beautiful product management.
            </p>
          </div>
        </header>

        {!showForm ? (
          <div className="space-y-8">
            {/* Stats and Actions Card */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-xl shadow-2xl bg-[#1a1a1a] shadow-slate-900/40">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Dashboard</p>
                    <h2 className="text-2xl font-bold text-white mt-1">Product Overview</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400">Total Products</p>
                        <p className="text-xl font-bold text-white">{products.length}</p>
                      </div>
                    </div>

                    {searchResults && (
                      <div className="flex items-center space-x-3 rounded-2xl bg-purple-500/10 border border-purple-400/20 px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                          <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-300">Search Results</p>
                          <p className="text-xl font-bold text-white">{searchResults.count} found</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {searchResults && (
                    <button
                      onClick={clearSearch}
                      className="inline-flex items-center justify-center space-x-2 rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Clear Search</span>
                    </button>
                  )}
                  <button
                    onClick={loadProducts}
                    className="inline-flex items-center justify-center space-x-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh Data</span>
                  </button>
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center space-x-2 rounded-2xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:shadow-indigo-500/50"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <SearchBar onSearch={handleSearch} />

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 py-20 text-center backdrop-blur-xl">
                <div className="relative">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-400" />
                  <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-indigo-400/20" />
                </div>
                <p className="mt-6 text-lg font-semibold text-white">Loading Products</p>
                <p className="mt-2 text-sm text-slate-400">Fetching the latest inventory data...</p>
              </div>
            ) : (
              <>
                {/* Search Results Info */}
                {searchResults && Object.keys(searchResults.params).length > 0 && (
                  <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                          <svg className="h-4 w-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-300">Active Search Filters</p>
                          <p className="text-sm text-slate-300">
                            Showing {searchResults.count} products matching your criteria
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={clearSearch}
                        className="text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  </div>
                )}

                {/* Product List */}
                <ProductList
                  products={products}
                  onEdit={(product) => {
                    setEditingProduct(product)
                    setShowForm(true)
                  }}
                  onDelete={handleDelete}
                />

                {/* Empty State for Search Results */}
                {searchResults && products.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-gradient-to-br from-white/5 to-white/10 py-20 text-center backdrop-blur-xl">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                      <svg className="h-10 w-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="mt-6 text-xl font-bold text-white">No products found</p>
                    <p className="mt-2 text-slate-400 max-w-md">
                      No products match your current search criteria. Try adjusting your filters or search terms.
                    </p>
                    <button
                      onClick={clearSearch}
                      className="mt-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </>
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

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10">
          <p className="text-sm text-slate-400">
            Built with React • Beautiful Inventory Management System
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App