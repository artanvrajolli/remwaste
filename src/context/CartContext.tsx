/* eslint-disable */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ProductType } from '../components/ProductCard';

export interface CartItem extends ProductType {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: ProductType }
    | { type: 'REMOVE_FROM_CART'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

interface CartContextType {
    state: CartState;
    addToCart: (product: ProductType) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.currentPrice
                };
            } else {
                const newItem: CartItem = { ...action.payload, quantity: 1 };
                return {
                    ...state,
                    items: [...state.items, newItem],
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.currentPrice
                };
            }
        }

        case 'REMOVE_FROM_CART': {
            const itemToRemove = state.items.find(item => item.id === action.payload);
            if (!itemToRemove) return state;

            const updatedItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - itemToRemove.quantity,
                totalPrice: state.totalPrice - (itemToRemove.currentPrice * itemToRemove.quantity)
            };
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (!itemToUpdate) return state;

            const quantityDiff = quantity - itemToUpdate.quantity;
            const updatedItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems + quantityDiff,
                totalPrice: state.totalPrice + (itemToUpdate.currentPrice * quantityDiff)
            };
        }

        case 'CLEAR_CART':
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0
            };

        default:
            return state;
    }
};

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product: ProductType) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            state,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
