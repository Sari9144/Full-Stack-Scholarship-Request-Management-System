import userModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAll = (req, res) => {
    userModel.find()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err))
}

export const login = (req, res) => {
    const { owner, password } = req.body
    userModel.findOne({ owner })
        .then(async user => {
            if (!user)
                return res.status(404).send('user not found!')
            const result = await bcrypt.compare(password, user.password)
            if (!result)
                return res.status(404).send('user not found!')
            const token = jwt.sign(
                { _id: user._id, firstName: user.firstName, lastName: user.lastName, owner: user.owner },
                process.env.SECRET,
                { expiresIn: '2h' }
            )
            user.password = undefined
            res.status(200).send({ user, token })
        })
        .catch(error => res.status(500).send(error))
}

export const register = (req, res) => {
    const { owner, firstName, lastName, password } = req.body
    userModel.findOne({ owner })
        .then(async user => {
            if (user)
                return res.status(400).send('owner has already been existed!')
            const hash = await bcrypt.hash(password, 9)
            const newUser = new userModel({ owner, firstName, lastName, password: hash })
            return newUser.save()
        })
        .then(async user => {
            const token = jwt.sign(
                { _id: user._id, firstName: user.firstName, lastName: user.lastName, owner: user.owner },
                process.env.SECRET,
                { expiresIn: '2h' }
            )
            user.password = undefined
            res.status(200).send({ user, token })
        })
        .catch(error => res.status(500).send(error))
}
