import { useState, useContext, createContext, useEffect } from 'react';

const PRODUCTS = [
  { id: 1, name: "Наушники Wireless X", price: 4500, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Headphones" },
  { id: 2, name: "Смартфон Pro 12", price: 65000, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Smartphone" },
  { id: 3, name: "Ноутбук Ultra", price: 120000, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Laptop" },
  { id: 4, name: "Клавиатура Mech", price: 8900, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Keyboard" },
  { id: 5, name: "Мышь Gaming", price: 3200, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Mouse" },
  { id: 6, name: "Монитор 4K", price: 25000, image: "https://placehold.co/400x300/e2e8f0/1e293b?text=Monitor" },
];

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, isOpen, setIsOpen, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 mb-1 text-lg">{product.name}</h3>
        <p className="text-gray-500 mb-4 text-sm">{product.price.toLocaleString()} ₽</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          В корзину
        </button>
      </div>
    </div>
  );
}

function CartSidebar() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Корзина</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors p-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p>Корзина пуста</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.price.toLocaleString()} ₽</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100 text-gray-600 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-white border flex items-center justify-center hover:bg-gray-100 text-gray-600 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-800">
            <span>Итого:</span>
            <span>{totalPrice.toLocaleString()} ₽</span>
          </div>
          <button
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 ${
              cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-200 active:scale-95'
            }`}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </>
  );
}

function Header() {
  const { setIsOpen, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ЭлектроВеник
          </h1>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-blue-600 transition-colors"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {totalItems > 0 && (
            <span key={totalItems} className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-bounce">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Каталог товаров</h2>
            <p className="text-gray-500">Выберите технику для вашей работы и отдыха</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

export default App;