'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuickViewModal from '@/components/QuickViewModal'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
}

type Category = {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState('createdAt')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [search, selectedCategory, priceRange, sortBy])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search,
        category: selectedCategory,
        minPrice: priceRange.min.toString(),
        maxPrice: priceRange.max.toString(),
        sort: sortBy,
        order: 'desc',
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setPriceRange({ min: 0, max: 10000 })
    setSortBy('createdAt')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 font-[var(--font-display)]">Our Products</h1>
            <p className="text-[var(--foreground)] opacity-70">
              Discover our curated collection of premium furniture and decor
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="createdAt">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="name">Name: A to Z</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-3 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2"
            >
              <FiFilter />
              Filters
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? 'block' : 'hidden'
              } md:block w-full md:w-64 flex-shrink-0`}
            >
              <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg font-[var(--font-display)]">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
                  >
                    <FiX className="w-4 h-4" />
                    Clear
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <span>All Categories</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.slug}
                          onChange={() => setSelectedCategory(category.slug)}
                          className="text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span>
                          {category.name} ({category._count.products})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-[var(--foreground)] opacity-70 mb-1 block">
                        Min: ${priceRange.min}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[var(--foreground)] opacity-70 mb-1 block">
                        Max: ${priceRange.max}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-2xl font-semibold text-[var(--foreground)] opacity-50">
                    No products found
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  )
}
