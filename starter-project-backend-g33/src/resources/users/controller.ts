import { NextFunction, Request, Response } from 'express'
import User from './model'
import dataAccessLayer from '../../common/dal'

const UserDAL = dataAccessLayer(User)

const tester = (res, next, func, message, filter) => {
  func(filter)
    .then((data: any) => {
      if (data.length == 0) {
        throw message
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  const filter = { isActive: true }

  UserDAL.getMany(filter)
    .then((data: any) => {
      if (data.length == 0) {
        res.status(404)
        throw 'No User Found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  UserDAL.getOne(userId)
    .then((data: any) => {
      if (!data) {
        res.status(404)
        throw 'User Not Found'
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// create user
const create = (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  UserDAL.createOne(newUser)
    .then((data) => {
      if (!data) {
        //console.log(data)
        res.status(400)
        throw " Couldn't create a new user"
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// update user
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  const changedProps = req.body
  console.log(changedProps)
  UserDAL.updateOne(changedProps, userId)
    .then((data) => {
      if (!data) {
        res.status(202)
        throw " Couldn't Update the user"
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// delete user
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  UserDAL.deleteOne(userId)
    .then((data) => {
      if (!data) {
        res.status(202)
        throw " Couldn't  Delete the user"
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}
// login

// export functions
export default {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  create
}
