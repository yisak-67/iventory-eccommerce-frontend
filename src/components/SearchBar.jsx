import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    color: '',
    price_min: '',
    price_max: '',
    attributeKey: '',
    attributeValue: '',
  })

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const handleChange = (e) => {
    setSearchParams((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { attributeKey, attributeValue, ...rest } = searchParams
    const filtered = Object.fromEntries(
      Object.entries(rest).filter(([, value]) => value !== '')
    )
    
    // Add attribute search if provided
    if (attributeKey && attributeValue) {
      filtered[attributeKey] = attributeValue
    }
    
    onSearch(filtered)
  }

  const reset = () => {
    const initial = {
      name: '',
      color: '',
      price_min: '',
      price_max: '',
      attributeKey: '',
      attributeValue: '',
    }
    setSearchParams(initial)
    onSearch({})
  }

  const hasActiveFilters = Object.values(searchParams).some(value => value !== '')

  // Common attribute examples for quick selection
  // const attributeExamples = [
  //   { key: 'color', value: 'midnight blue', description: 'Search by color name' },
  //   { key: 'sku', value: 'AR-2025-XL', description: 'Search by product SKU' },
  //   { key: 'dimensions.width', value: '11', description: 'Search by width dimension' },
  //   { key: 'specs.weight', value: '240g', description: 'Search by weight' },
  // ]

  // const applyExample = (example) => {
  //   setSearchParams(prev => ({
  //     ...prev,
  //     attributeKey: example.key,
  //     attributeValue: example.value
  //   }))
  //   setIsAdvancedOpen(true)
  // }

  return (
    <section className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Search Products</h3>
          <p className="text-sm text-gray-500">
            Refine your search with multiple filters
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              Active Filters
            </span>
          )}
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-gray-400 hover:text-white"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Filters Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Product Name',
              name: 'name',
              type: 'text',
              placeholder: 'Aurora Runner Sneaker',
            },
            {
              label: 'Color',
              name: 'color',
              type: 'text',
              placeholder: 'midnight blue',
            },
            {
              label: 'Min Price',
              name: 'price_min',
              type: 'number',
              placeholder: '20.00',
              step: '0.01',
            },
            {
              label: 'Max Price',
              name: 'price_max',
              type: 'number',
              placeholder: '250.00',
              step: '0.01',
            },
          ].map((field) => (
            <label key={field.name} className="space-y-2">
              <div className="text-sm font-medium text-gray-300">{field.label}</div>
              <input
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-200 focus:border-indigo-500 outline-none"
                {...field}
                value={searchParams[field.name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>

        {/* Quick Examples */}
       

        {/* Advanced Filters Toggle */}
        <div className="border-t border-[#333] pt-4">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex w-full items-center justify-between p-3 hover:bg-[#222] rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-white">Advanced Search</p>
                <p className="text-sm text-gray-500">Search nested attributes using dot notation</p>
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Advanced Filters Content */}
          {isAdvancedOpen && (
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Attribute Key</div>
                  <input
                    type="text"
                    name="attributeKey"
                    placeholder="dimensions.width, specs.weight, sku"
                    value={searchParams.attributeKey}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-200 focus:border-purple-500 outline-none"
                  />
                  <p className="text-xs text-gray-500">
                    Use dots for nested objects
                  </p>
                </label>
                <label className="space-y-2">
                  <div className="text-sm font-medium text-gray-300">Attribute Value</div>
                  <input
                    type="text"
                    name="attributeValue"
                    placeholder="11, React Air, mesh, AR-2025-XL"
                    value={searchParams.attributeValue}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-200 focus:border-purple-500 outline-none"
                  />
                  <p className="text-xs text-gray-500">
                    Exact match search
                  </p>
                </label>
              </div>
              
              {/* Advanced Examples */}
              
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-[#333]">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Use dot notation for nested attributes</span>
          </div>
          <div className="flex gap-3">
            {searchParams.attributeKey && (
              <button 
                type="button"
                onClick={() => { setSearchParams(prev => ({ ...prev, attributeKey: '', attributeValue: '' })) }}
                className="text-sm text-gray-500 hover:text-white"
              >
                Clear Advanced
              </button>
            )}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Products</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchBar