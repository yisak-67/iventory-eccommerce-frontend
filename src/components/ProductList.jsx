import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-[#333] bg-[#1a1a1a] p-12 text-center">
        <div className="max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#333]">
            <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-xl font-bold text-white">
            No products found
          </p>
          <p className="text-sm text-gray-500">
            Start by creating your first product or adjust your search filters to see more results.
          </p>
        </div>
      </div>
    )
  }

  const formatValue = (value) => {
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'object' && value !== null) return JSON.stringify(value)
    return String(value ?? '—')
  }

  const renderAttributes = (attributes) => {
    if (!attributes || typeof attributes !== 'object') {
      return (
        <span className="inline-flex rounded bg-[#333] px-3 py-1 text-xs text-gray-300">
          {formatValue(attributes)}
        </span>
      )
    }

    return (
      <div className="space-y-2">
        {Object.entries(attributes).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col rounded-lg border border-[#333] bg-[#111] p-3 md:flex-row md:items-center md:gap-3"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 md:min-w-[100px]">
              {key}
            </dt>
            <dd className="text-sm text-gray-300">{formatValue(value)}</dd>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mobile Card View */}
      <div className="block space-y-4 lg:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-[#333] bg-[#1a1a1a] p-6"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-semibold text-emerald-400">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">
                      {product.quantity} in stock
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg border border-blue-400 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="rounded-lg border border-red-400 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Attributes */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Attributes
                </h4>
                {renderAttributes(product.attributes)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111] text-gray-400 border-b border-[#333]">
              <tr>
                <th className="p-4 font-medium w-16">ID</th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Qty</th>
                <th className="p-4 font-medium">Attributes</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#222] transition-colors group">
                  {/* ID */}
                  <td className="p-4 text-gray-500">#{product.id}</td>

                  {/* Product Name */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.id}</p>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 text-gray-300">${parseFloat(product.price).toFixed(2)}</td>

                  {/* Quantity */}
                  <td className="p-4 text-gray-300">
                    <span className={`px-2 py-1 rounded text-xs ${product.quantity < 10 ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                      {product.quantity}
                    </span>
                  </td>

                  {/* Attributes */}
                  <td className="p-4 align-top">
                    {renderAttributes(product.attributes)}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onDelete(product.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-white">{products.length}</span> product{products.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-400/50"></div>
              <span className="text-gray-500">In Stock</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-400/50"></div>
              <span className="text-gray-500">Low Stock</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-400/50"></div>
              <span className="text-gray-500">Out of Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList