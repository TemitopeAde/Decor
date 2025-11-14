'use client'

import Link from 'next/link'
import { useQuoteStore } from '@/store/useQuoteStore'
import ThemeToggle from './ThemeToggle'
import { FiShoppingBag } from 'react-icons/fi'
import { useEffect, useState } from 'react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useQuoteStore((state) => state.getTotalItems)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setMounted(true)
    setTotalItems(getTotalItems())
  }, [getTotalItems])

  useEffect(() => {
    if (mounted) {
      const unsubscribe = useQuoteStore.subscribe((state) => {
        setTotalItems(state.getTotalItems())
      })
      return unsubscribe
    }
  }, [mounted])

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] backdrop-blur-sm bg-opacity-90">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold font-[var(--font-display)]">
            <span className="text-[var(--primary)]">Decor</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-[var(--primary)] transition-colors">
              Products
            </Link>
            <Link href="/about" className="hover:text-[var(--primary)] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/quote" className="relative p-2 hover:text-[var(--primary)] transition-colors">
              <FiShoppingBag className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--background)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4 flex items-center justify-around py-2 border-t border-[var(--border)]">
          <Link href="/" className="text-sm hover:text-[var(--primary)] transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm hover:text-[var(--primary)] transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-sm hover:text-[var(--primary)] transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-[var(--primary)] transition-colors">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
