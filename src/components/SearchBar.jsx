import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({ color: '', name: '', price_min: '', price_max: '' })

  const handleChange = (e) => {
    setSearchParams((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const filtered = Object.fromEntries(Object.entries(searchParams).filter(([, value]) => value !== ''))
    onSearch(filtered)
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg backdrop-blur-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Filter</p>
          <h3 className="text-xl font-semibold text-white">Search Products</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            setSearchParams({ color: '', name: '', price_min: '', price_max: '' })
            onSearch({})
          }}
          className="text-sm font-medium text-indigo-200 hover:text-white"
        >
          Clear all
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Air Max 97' },
            { label: 'Color', name: 'color', type: 'text', placeholder: 'Black' },
            { label: 'Min price', name: 'price_min', type: 'number', placeholder: '20', step: '0.01' },
            { label: 'Max price', name: 'price_max', type: 'number', placeholder: '250', step: '0.01' },
          ].map((field) => (
            <label key={field.name} className="space-y-2 text-sm font-medium text-slate-200">
              {field.label}
              <input
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-base text-white shadow-inner placeholder:text-white/50 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                {...field}
                value={searchParams[field.name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.01] md:w-auto"
        >
          Run search
        </button>
      </form>
    </section>
  )
}

export default SearchBar