const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userService = require('./services/user.service');
const petService = require('./services/pet.service');
const foodService = require('./services/food.service')
const cartService = require('./services/cart.service')
const saleService = require('./services/sale.service')
const requestService = require('./services/request.service')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ukkk'
var fs = require('fs')

const { User, Pet, Food, Cart, Sale } = require('./db');
const { BIconArrowDownUp } = require('bootstrap-vue');
const { request } = require('express');
const formidable = require('formidable');


router.get('/users', async (req, res) => {
  const users = await userService.findAll()
  res.send(users)
});

const hashPromise = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (e, hash) {
      if (e) {
        console.error(e)
        reject(e)
      }
      resolve(hash)
    })
  })
}

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.query().findById(id)
    if (!user) {
      res.sendStatus(404)
      return
    }
    res.send(user)
  } catch (err) {
    res.send(err)
  }

})

router.post('/register', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  const hasUser = await userService.findByEmail(body.email)

  if (hasUser) {
    console.info('This email has been registered!')
    res.sendStatus(400)
    return
  }

  const hash = await hashPromise(body.password, saltRounds)
  const addUser = await userService.addUser(body.name, hash, body.dateOfBirth, body.address, body.phoneNumber, body.gender, body.email, 0)

  const token = jwt.sign({ userId: addUser.id }, SECRET_KEY)
  return res.status(200).json({
    title: 'login successfully',
    token: token,
    user: addUser,
  })

});

router.post('/login', (req, res) => {
  const user = req.body

  userService.findByEmail(user.email)
    .then(result => {
      if (!result) {
        res.send(404)
        return
      }

      bcrypt.compare(user.password, result.password, function (err, fit) {
        if (err) {
          return res.statusCode(401).json({
            title: 'login failed',
            error: 'invalid credentials'
          })
        }
        if (fit) {
          const token = jwt.sign({ userId: user.id }, SECRET_KEY)
          return res.status(200).json({
            title: 'login successfully',
            token: token,
            userId: user.id,
          })
        }
        console.info('wrong password')
        res.sendStatus(401)
      })
    })
    .catch(e => {
      console.error(e.response.data)
      res.sendStatus(e.statusCode)
    })
})

router.get('/pets', async (req, res) => {
  const pets = await petService.findAll()
  res.send(pets)
})


router.get('/foods', async (req, res) => {
  const foods = await foodService.findAll()
  res.send(foods)
})

module.exports = router
