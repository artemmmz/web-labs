import { useState } from 'react';

const CATEGORIES = ["Все", "Внеучебка", "Общежития", "Достижения", "Спорт", "Плохое"];
const NEWS_DATA = [
  {
    id: 1,
    title: "Студенческий хакатон состоится в выходные",
    content: "Приглашаем всех желающих принять участие в ежегодном хакатоне. Призовой фонд - 100 000 рублей.",
    category: 1,
    isTop: true,
  },
  {
    id: 2,
    title: "Ремонт в 11-м общежитии завершен",
    content: "Заменены окна и установлена новая система вентиляции. Заезд возможен с понедельника.",
    category: 2, 
    isTop: false,
  },
  {
    id: 3,
    title: "Наши студенты выиграли грант Президента",
    content: "Команда кафедры ИиИТ получила поддержку на разработку нового образовательного приложения.",
    category: 3,
    isTop: true,
  },
  {
    id: 4,
    title: "Футбольный турнир между факультетами",
    content: "Сборная ФИТА вышла в финал. Матч пройдет на стадионе университета в субботу.",
    category: 4,
    isTop: false,
  },
  {
    id: 5,
    title: "День открытых дверей для абитуриентов",
    content: "Помоги университету привлечь новых студентов! Волонтерам выдаются фирменные мерч и часы.",
    category: 1,
    isTop: false,
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredNews = NEWS_DATA.filter((news) => {
    if (activeCategory === 0) return true;
    return news.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artem's News</h1>
          <p className="text-gray-500">Главные события Московского Политеха</p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat, ind) => (
            <button
              key={ind}
              onClick={() => setActiveCategory(ind)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${activeCategory === ind
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <div
                key={news.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg cursor-pointer
                  ${news.isTop 
                    ? 'border-yellow-400 ring-1 ring-yellow-400 bg-yellow-50/30' 
                    : 'border-gray-100'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded">
                    {CATEGORIES[news.category]}
                  </span>
                  
                  {news.isTop && (
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                      Топ
                    </span>
                  )}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${news.isTop ? 'text-gray-900' : 'text-gray-700'}`}>
                  {news.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {news.content}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              Новостей пока нет, но скоро добавим ))
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
