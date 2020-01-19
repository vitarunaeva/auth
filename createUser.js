const {User} = require('./connect');

module.exports = async (req, res) => {
    const {login, password} = req.body; //получение логина и пароля из тела запроса

    const x  = await User.findOne({login});

    if (x) return res.json('Логин уже зарегистрирован');

    const newUser = new User({login, password});

    try {
        res.status(201).json(await newUser.save()); //сохранение пользоватля в БД
    } catch (e) {
        await res.status(500).json('Internal Server Error');
    }
};
