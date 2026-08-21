import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.product === product._id
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          // Check stock before updating
          if (updatedItems[existingItemIndex].quantity + quantity > product.stock) {
            toast.error(`Only ${product.stock} items available in stock`);
            return;
          }
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success("Cart updated");
        } else {
          // Check stock
          if (quantity > product.stock) {
            toast.error(`Only ${product.stock} items available in stock`);
            return;
          }
          set({
            items: [
              ...currentItems,
              {
                product: product._id,
                name: product.name,
                image: product.images?.[0] || "",
                price: product.discountPrice || product.price,
                quantity,
                stock: product.stock,
              },
            ],
          });
          toast.success("Added to cart");
        }
      },

      updateQuantity: (productId, quantity) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) => {
          if (item.product === productId) {
            if (quantity > item.stock) {
              toast.error(`Only ${item.stock} items available`);
              return item;
            }
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product !== productId),
        }));
        toast.success("Removed from cart");
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
