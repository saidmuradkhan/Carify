import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('carify_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('carify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car) => {
    setWishlist((prev) => {
      if (!prev.find(item => item.id === car.id)) {
        return [...prev, car];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter(car => car.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some(car => car.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
