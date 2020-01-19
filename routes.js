const express = require('express');
const cors = require('cors');
const router = express.Router();

const findUsers = require('./findUsers');
const loginCheck = require('./checkAuthLogin');
const createUser = require('./createUser');
const logout = require('./logout');

const checkLogin = (req, res, next) => {
    if (req.session.auth === 'ok') {
        res.redirect('/');
    } else {
        next();
    }
};

const checkAuth = (req, res, next) => {
    if (req.session.auth === 'ok') {
        next();
    } else {
        res.redirect('/login');
    }
};


// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// если пользователь авторизован по маршруту / выполнить findUsers
router.get('/', checkAuth, findUsers);


router.route('/logout').get(logout);


// добавление нового пользователя
router.get('/registration', checkLogin, async (req,res) => {
    await res.sendFile('./public/registration.html', {root: __dirname })
});

router.route('/registration').post(createUser);

// возвращает html со страницей логина
router
    .get('/login', checkLogin, async (req, res) => {
        await res.sendFile('./public/index.html', {root: __dirname })
    });

// проверка логина-пароля в бд
router.route('/login').post(loginCheck);

module.exports = router;
