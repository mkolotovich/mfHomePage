import dbConnect from '../../lib/dbConnect'
import jwt from 'jsonwebtoken'
const { User } = require('../../models/Email.cjs');

export default async (req, res) => {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const pets = await Pet.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const users = await User.find({}) /* find all the data in our database */
        const filteredUsers = users.filter((el) => el.login === req.body.login)
        if (filteredUsers.length === 0) {
          var token = jwt.sign(req.body, 'shhhhh',  {
            // срок жизни токена, т.е. время, в течение которого токен будет считаться валидным составляет 7 дней
            expiresIn: '7d'
            // expiresIn: 60 * 1
          });
          // req.body.token = token;
          req.body.expired = false;
          req.body.visited = false;
          const pet = await User.create(
            req.body
          ) /* create a new model in the database */
          // res.status(201).json({ success: true, data: pet })
          res.status(201).json({ success: true, data: {pet, token} })
        } 
        const [user] = filteredUsers;
        if (user.expired) {
          var token = jwt.sign(req.body, 'shhhhh',  {
            // срок жизни токена, т.е. время, в течение которого токен будет считаться валидным составляет 7 дней
            expiresIn: '7d'
            // expiresIn: 60 * 1
          });
          // user.token = token;
          user.expired = false;
          user.visited = false;
          await user.save();
          // res.status(201).json({ success: true, data: user })
          res.status(201).json({ success: true, data: {user, token} })
        }
        else {
          await User.deleteOne({login: req.body.login});
          var token = jwt.sign(req.body, 'shhhhh',  {
            // срок жизни токена, т.е. время, в течение которого токен будет считаться валидным составляет 7 дней
            expiresIn: '7d'
            // expiresIn: 60 * 1
          });
          // req.body.token = token;
          req.body.expired = false;
          req.body.visited = false;
          const pet = await User.create(
              req.body
            ) /* create a new model in the database */
          // res.status(201).json({ success: true, data: pet });
          res.status(201).json({ success: true, data: {pet, token} })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
