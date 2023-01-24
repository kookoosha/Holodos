import express from 'express'; // Подключение библиотеки express
import session from 'express-session';
import path from 'path'; // Подключаем переменную path для того что бы путь был найден при запуске из другого места
import morgan from 'morgan';
import store from 'session-file-store';
import isAuth from './middlewares/isAuth';
import authRouter from './routes/authRouter';
import holodosRouter from './routes/holodosRouter';
import jsxRender from './utils/jsxRender'; // Импорт кастомного рендера jsx-файлов

const app = express();
const PORT = 3000;

app.engine('jsx', jsxRender);// Регистрируем движок для рендера
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));// Указываем путь до компонентов

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Подключение middleware, который отдаёт клиенту файлы из папки или (app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());// Подключение middleware, который парсит JSON от клиента
app.use(morgan('dev'));

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: 'oh klahoma', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

app.use('/auth', authRouter);
app.use('/holodos', holodosRouter);

app.get('/', (req, res) => {
  res.render('Layout');
});
app.use(isAuth); // миделвара для проверки регистрацииставить на этапе где нужна поверка!

// app.get('/holodos', (req, res) => {
//   res.render('Layout');
// });

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
