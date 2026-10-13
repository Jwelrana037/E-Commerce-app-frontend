import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // localStorage থেকে আগের Cart Data লোড করব
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopzone-cart');

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  });

  // Cart পরিবর্তন হলে localStorage আপডেট হবে
  useEffect(() => {
    localStorage.setItem('shopzone-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart-এ Product যোগ করা
  function addToCart(product, quantity = 1) {
    setCartItems((previousItems) => {
      const existingProduct = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  }

  // Quantity বাড়ানো
  function increaseQuantity(productId) {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // Quantity কমানো
  function decreaseQuantity(productId) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Cart থেকে Product Remove করা
  function removeFromCart(productId) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId)
    );
  }

  // সম্পূর্ণ Cart খালি করা
  function clearCart() {
    setCartItems([]);
  }

  // Cart-এ মোট Product Quantity
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // সব Product-এর Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // আপাতত Delivery Charge শূন্য
  const shipping = 0;

  // মোট মূল্য
  const totalPrice = subtotal + shipping;

  // সব Function ও Data অন্য Component-এ ব্যবহার করা যাবে
  const value = {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Context Data ব্যবহারের Custom Hook
export function useCart() {
  return useContext(CartContext);
}
