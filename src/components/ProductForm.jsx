import { useState } from 'react'

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name ?? '',
    price: product?.price ?? '',
    quantity: product?.quantity ?? '',
    attributes: JSON.stringify(product?.attributes ?? {}, null, 2),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      attributes: JSON.parse(formData.attributes || '{}'),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    }
    onSubmit(payload)
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-slate-900/40 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">
            {product ? 'Editing' : 'New Item'}
          </p>
          <h2 className="text-2xl font-semibold text-white">
            {product ? `Update ${product.name}` : 'Create a product'}
          </h2>
        </div>
        <button
          onClick={onCancel}
          type="button"
          className="text-sm font-medium text-slate-300 hover:text-white"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        {[
          { label: 'Name', name: 'name', type: 'text', placeholder: 'Winter Jacket' },
          { label: 'Price', name: 'price', type: 'number', placeholder: '100', step: '0.01', min: '0' },
          { label: 'Quantity', name: 'quantity', type: 'number', placeholder: '50', min: '0' },
        ].map((field) => (
          <label key={field.name} className="space-y-2 text-sm font-medium text-slate-200">
            {field.label}
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-base text-white shadow-inner placeholder:text-white/50 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              {...field}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </label>
        ))}

        <label className="space-y-2 text-sm font-medium text-slate-200">
          Attributes (JSON)
          <textarea
            name="attributes"
            rows={6}
            value={formData.attributes}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            placeholder='{"color":"red","tags":["summer","sale"]}'
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-[1.01]"
          >
            {product ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProductForm