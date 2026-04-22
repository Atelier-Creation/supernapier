import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartApi } from '../api/cartApi';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Persist to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 2. Fetch cart from Database when user logs in
  useEffect(() => {
    const syncWithDB = async () => {
      if (token && user) {
        try {
          setIsSyncing(true);
          const res = await cartApi.getCart();
          if (res.data.success) {
            const dbItems = res.data.data.items.map(item => ({
              id: item.product?._id || item.product,
              name: item.product?.name?.en || item.product?.name || 'Product',
              image: item.product?.images?.[0] || '/placeholder.png',
              price: item.price,
              quantity: item.quantity,
              weight: item.weight,
              unit: item.unit,
              weightOption: item.weightOption,
              cuttingType: item.cuttingType,
              dbItemId: item._id // Store the DB item ID for updates/removal
            }));

            // Merge Logic: Use DB items as primary, but maybe keep some local ones?
            // For simplicity, we favor the database after login
            setCartItems(dbItems);
          }
        } catch (err) {
          console.error("Cart sync failed:", err);
        } finally {
          setIsSyncing(false);
        }
      }
    };
    syncWithDB();
  }, [token, user]);

  const addToCart = async (product, quantity = 1, weightOption = null) => {
    const productId = product._id || product.id;
    
    // Create new local item
    const newItem = {
      id: productId,
      name: product.name?.en || product.name || 'Product',
      image: product.image || product.images?.[0] || '/placeholder.png',
      price: Number(product.price),
      quantity: quantity,
      weight: product.weight || weightOption?.weight,
      unit: product.unit || weightOption?.unit,
      weightOption: weightOption?._id || product.weightOptionId,
      cuttingType: product.cuttingType || ""
    };

    // Update Local State
    setCartItems(prev => {
      const existing = prev.find(item => 
        String(item.id) === String(productId) && 
        String(item.weightOption || "") === String(newItem.weightOption || "") && 
        String(item.cuttingType || "") === String(newItem.cuttingType || "")
      );

      if (existing) {
        return prev.map(item => 
          (String(item.id) === String(productId) && 
           String(item.weightOption || "") === String(newItem.weightOption || "") && 
           String(item.cuttingType || "") === String(newItem.cuttingType || ""))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, newItem];
    });

    setCartOpen(true);

    // Update Database if logged in
    if (token) {
      try {
        await cartApi.addToCart({
          productId,
          quantity,
          price: newItem.price,
          weightOptionId: newItem.weightOption,
          unit: newItem.unit,
          cuttingType: newItem.cuttingType
        });
      } catch (err) {
        console.error("Failed to sync add item:", err);
      }
    }
  };

  const removeFromCart = async (itemId, isDbId = false) => {
    const itemToRemove = cartItems.find(it => isDbId ? it.dbItemId === itemId : it.id === itemId);
    
    setCartItems(prev => prev.filter(item => isDbId ? item.dbItemId !== itemId : item.id !== itemId));

    if (token && itemToRemove?.dbItemId) {
      try {
        await cartApi.removeFromCart(itemToRemove.dbItemId);
      } catch (err) {
        console.error("Failed to sync remove item:", err);
      }
    }
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));

    const item = cartItems.find(it => it.id === itemId);
    if (token && item?.dbItemId) {
      try {
        await cartApi.updateCartItem(item.dbItemId, { quantity: newQty });
      } catch (err) {
        console.error("Failed to sync quantity update:", err);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    // Optionally clear DB too? Usually checkout does this
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartOpen, 
      setCartOpen,
      isSyncing 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
