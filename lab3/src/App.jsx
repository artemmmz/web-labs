import { useState, useEffect } from 'react';

const BOOKS_DATA = [
  { id: 1, title: "Изучаем React", author: "Дэн Абрамов", year: 2023, inStock: true },
  { id: 2, title: "Грокаем алгоритмы", author: "Адитья Бхаргава", year: 2021, inStock: false },
  { id: 3, title: "Чистый код", author: "Роберт Мартин", year: 2019, inStock: true },
  { id: 4, title: "Паттерны проектирования", author: "Эрих Гамма", year: 2020, inStock: false },
  { id: 5, title: "Веб-дизайн для разработчиков", author: "Джейсон Бирд", year: 2022, inStock: true },
];

const FILTERS = ["Все", "В наличии", "Нет в наличии"];

const fetchBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(BOOKS_DATA);
    }, 1500);
  });
};

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
            {book.year}
          </span>
          <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${book.inStock ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
            {book.inStock ? 'В наличии' : 'Занято'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {book.author}
        </p>
      </div>
      <button 
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${book.inStock ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        disabled={!book.inStock}
      >
        {book.inStock ? 'Взять книгу' : 'Ожидание'}
      </button>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const filteredBooks = books.filter((book) => {
    if (activeFilter === 0) return true;
    if (activeFilter === 1) return book.inStock;
    if (activeFilter === 2) return !book.inStock;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Polytech Library</h1>
          <p className="text-gray-500 text-lg">Электронный каталог учебной литературы</p>
        </header>

        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map((filter, ind) => (
            <button
              key={ind}
              onClick={() => setActiveFilter(ind)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm border border-transparent
                ${activeFilter === ind
                  ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium animate-pulse">Загружаем книги...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-lg">В этой категории пока нет книг</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
