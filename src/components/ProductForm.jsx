import { useState } from 'react'

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name ?? '',
    price: product?.price ?? '',
    quantity: product?.quantity ?? '',
    attributes: JSON.stringify(product?.attributes ?? {}, null, 2),
  })

  const [jsonError, setJsonError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Validate JSON in real-time for attributes field
    if (name === 'attributes') {
      try {
        if (value.trim()) {
          JSON.parse(value)
          setJsonError('')
        }
      } catch (error) {
        setJsonError('Invalid JSON format')
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Final JSON validation
    try {
      const attributes = formData.attributes.trim() ? JSON.parse(formData.attributes) : {}
      const payload = {
        ...formData,
        attributes,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      }
      setJsonError('')
      onSubmit(payload)
    } catch (error) {
      setJsonError('Please fix JSON syntax errors before submitting')
      return
    }
  }

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(formData.attributes)
      setFormData(prev => ({
        ...prev,
        attributes: JSON.stringify(parsed, null, 2)
      }))
      setJsonError('')
    } catch (error) {
      setJsonError('Cannot format invalid JSON')
    }
  }

  return (
    <section className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl border border-[#333] p-6 mt-6">
      <div className="flex items-center justify-between mb-6 border-b border-[#333] pb-4">
        <h2 className="text-xl font-bold text-white">
          {product ? 'Edit Product' : 'Create Product'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>

      {jsonError && (
        <div className="bg-red-900/20 border border-red-800/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
          {jsonError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              label: 'Product Name', 
              name: 'name', 
              type: 'text', 
              placeholder: 'Winter Jacket',
              required: true
            },
            { 
              label: 'Price ($)', 
              name: 'price', 
              type: 'number', 
              placeholder: '99.99', 
              step: '0.01', 
              min: '0',
              required: true
            },
            { 
              label: 'Quantity', 
              name: 'quantity', 
              type: 'number', 
              placeholder: '50', 
              min: '0',
              required: true
            },
          ].map((field) => (
            <label key={field.name} className="space-y-2">
              <div className="text-sm font-medium text-gray-300">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </div>
              <input
                className="w-full bg-[#111] border border-[#333] rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </label>
          ))}
        </div>

        {/* Attributes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Product Attributes</h3>
              <p className="text-sm text-gray-500">
                Add custom attributes in JSON format
              </p>
            </div>
            <button
              type="button"
              onClick={formatJSON}
              className="bg-[#333] hover:bg-[#444] text-gray-300 px-3 py-2 rounded-lg text-sm font-medium"
            >
              Format JSON
            </button>
          </div>

          <div className="space-y-3">
            <textarea
              name="attributes"
              rows={8}
              value={formData.attributes}
              onChange={handleChange}
              className={`w-full bg-[#111] border font-mono text-sm ${
                jsonError ? 'border-red-500' : 'border-[#333]'
              } rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500/50 outline-none`}
              placeholder={`{\n  "color": "red",\n  "size": "XL",\n  "material": "cotton",\n  "tags": ["fashion", "winter"]\n}`}
            />
            
            {/* JSON Examples */}
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div className="bg-[#111] border border-[#333] p-3 rounded-lg">
                <p className="font-medium text-blue-400 mb-1">Simple Example:</p>
                <code className="text-xs text-gray-400">
                  {`{"color": "black", "size": "M"}`}
                </code>
              </div>
              <div className="bg-[#111] border border-[#333] p-3 rounded-lg">
                <p className="font-medium text-purple-400 mb-1">Complex Example:</p>
                <code className="text-xs text-gray-400">
                  {`{"dimensions": {"width": 20, "height": 30}, "tags": ["new", "sale"]}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row pt-4 border-t border-[#333]">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {product ? 'Update Product' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#333] hover:bg-[#444] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Required Fields Note */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <span>Fields marked with <span className="text-red-400">*</span> are required</span>
        </div>
      </form>
    </section>
  )
}

export default ProductForm