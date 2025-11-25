const ProductList = ({ products, onEdit, onDelete }) => {
 
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300 backdrop-blur">
        <p className="text-lg font-semibold text-white">Nothing to show yet</p>
        <p className="mt-2 text-sm text-slate-300">Adjust your filters or create your first product.</p>
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
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
          {formatValue(attributes)}
        </span>
      )
    }
  
    return (
      <dl className="space-y-2 text-xs text-slate-100">
        {Object.entries(attributes).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col rounded-2xl border border-white/10 bg-black/30 p-3 shadow-inner md:flex-row md:items-center md:gap-3"
          >
            <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-200 md:min-w-[90px]">
              {key}
            </dt>
            <dd className="text-sm text-slate-100">{formatValue(value)}</dd>
          </div>
        ))}
      </dl>
    )
  }
                                    
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-900/40 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-100">
          <thead className="bg-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            <tr>
              {['Name', 'Price', 'Quantity', 'Attributes', 'Actions'].map((heading) => (
                <th key={heading} className="px-6 py-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="transition hover:bg-white/10">
                <td className="px-6 py-4 text-base font-semibold text-white">{product.name}</td>
                <td className="px-6 py-4 text-sm text-indigo-200">${parseFloat(product.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-slate-200">{product.quantity}</td>
                <td className="px-6 py-4 align-top">{renderAttributes(product.attributes)}</td>
                <td className="px-6 py-4 space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-indigo-200/40 px-4 py-1.5 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-400/10 sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-rose-200/40 px-4 py-1.5 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/10 sm:w-auto"
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
  )
}

export default ProductList