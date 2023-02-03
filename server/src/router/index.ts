const Router = require('express')
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router()

router.post('/registration',
    body('login').isLength({min:3, max:10}),
    body('email').isEmail(),
    body('password').isLength({min:3, max:10}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)



export default  router