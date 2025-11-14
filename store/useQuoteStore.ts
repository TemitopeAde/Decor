import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: string
  name: string
  price: number
  images: string[]
  slug: string
}

type QuoteItem = {
  product: Product
  quantity: number
}

type QuoteStore = {
  items: QuoteItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearItems: () => void
  getTotalItems: () => number
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { items: [...state.items, { product, quantity: 1 }] }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearItems: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'quote-storage',
    }
  )
)
