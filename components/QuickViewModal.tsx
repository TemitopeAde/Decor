'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiX, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useQuoteStore } from '@/store/useQuoteStore'

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

type QuickViewModalProps = {
  product: Product
  onClose: () => void
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const addItem = useQuoteStore((state) => state.addItem)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleAddToQuote = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[var(--background)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--background)] border-b border-[var(--border)] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold font-[var(--font-display)]">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.images[currentImageIndex] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <FiChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[var(--primary)]'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[var(--muted)] text-sm font-semibold rounded-full mb-2">
                  {product.category.name}
                </span>
                <h1 className="text-3xl font-bold mb-2 font-[var(--font-display)]">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-[var(--primary)]">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-[var(--foreground)] opacity-70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToQuote}
                  className="w-full px-6 py-4 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2"
                >
                  <FiShoppingBag />
                  Add to Quote Request
                </button>

                <Link
                  href={`/products/${product.slug}`}
                  className="block w-full px-6 py-4 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all text-center"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
