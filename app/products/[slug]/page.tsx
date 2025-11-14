'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useQuoteStore } from '@/store/useQuoteStore'

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
  inStock: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const addItem = useQuoteStore((state) => state.addItem)

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToQuote = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        slug: product.slug,
      })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="bg-gray-300 dark:bg-gray-700 h-8 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-12 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-32 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 font-[var(--font-display)]">
              Product Not Found
            </h1>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/" className="text-[var(--primary)] hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="text-[var(--primary)] hover:underline">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="text-[var(--primary)] hover:underline"
            >
              {product.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery Slider */}
            <div>
              <div className="relative h-[500px] rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={product.images[currentImageIndex] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white transition-all shadow-lg"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white transition-all shadow-lg"
                      aria-label="Next image"
                    >
                      <FiChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[var(--primary)]'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="inline-block px-4 py-2 bg-[var(--muted)] text-sm font-semibold rounded-full mb-4 hover:bg-[var(--primary)] hover:text-white transition-colors"
                >
                  {product.category.name}
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-display)]">
                  {product.name}
                </h1>
                <p className="text-4xl font-bold text-[var(--primary)] mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    product.inStock
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3 font-[var(--font-display)]">
                  Description
                </h2>
                <p className="text-[var(--foreground)] opacity-80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToQuote}
                  disabled={!product.inStock}
                  className={`w-full px-8 py-4 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingBag />
                  {added ? 'Added to Quote!' : 'Add to Quote Request'}
                </button>

                <Link
                  href="/quote"
                  className="block w-full px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all text-center"
                >
                  View Quote Cart
                </Link>
              </div>

              <div className="mt-8 p-6 bg-[var(--muted)] rounded-lg">
                <h3 className="font-bold mb-3 font-[var(--font-display)]">
                  Need Help?
                </h3>
                <p className="text-sm text-[var(--foreground)] opacity-70 mb-3">
                  Our team is here to assist you with any questions about this product.
                </p>
                <Link
                  href="/contact"
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
