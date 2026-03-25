import { useState, useEffect } from 'react';

const INITIAL_COMMENTS = [
  { id: 1, author: "Алексей", text: "Отличная статья, спасибо за информацию!", notify: false },
  { id: 2, author: "Мария", text: "А когда планируется обновление?", notify: true },
];

function App() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [notify, setNotify] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setComments(INITIAL_COMMENTS);
      setIsLoaded(true);
    }, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newComment = {
      id: Date.now(),
      author,
      text,
      notify,
    };

    setComments([newComment, ...comments]);
    setAuthor("");
    setText("");
    setNotify(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Форум читателей</h1>
          <p className="text-gray-500">Оставьте свой комментарий под статьей</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Введите имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                placeholder="Напишите ваш комментарий..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="notify" className="text-sm text-gray-700 cursor-pointer select-none">
                Получить уведомление об ответах
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Опубликовать
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Комментарии {!isLoaded && <span className="text-sm font-normal text-gray-500 ml-2">(Загрузка...)</span>}
          </h2>
          
          {comments.length === 0 && isLoaded ? (
            <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
              Комментариев пока нет. Будьте первым!
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{comment.author}</h3>
                  {comment.notify && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      Подписан на ответы
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
