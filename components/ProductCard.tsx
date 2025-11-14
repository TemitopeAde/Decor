'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiEye, FiShoppingBag } from 'react-icons/fi'
import { useQuoteStore } from '@/store/useQuoteStore'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

type ProductCardProps = {
  product: Product
  onQuickView: (product: Product) => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const addItem = useQuoteStore((state) => state.addItem)

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView(product)
  }

  return (
    <div className="group relative bg-white dark:bg-[var(--muted)] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.images[currentImageIndex] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleQuickView}
              className="p-3 bg-white rounded-full hover:bg-[var(--primary)] hover:text-white transition-all"
              aria-label="Quick view"
            >
              <FiEye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToQuote}
              className="p-3 bg-white rounded-full hover:bg-[var(--primary)] hover:text-white transition-all"
              aria-label="Add to quote"
            >
              <FiShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 font-[var(--font-display)] line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[var(--primary)] font-bold text-xl">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  )
}
