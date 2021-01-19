const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = {
    verify: (username, password, done) => {
        db.Users.findOne({ where: { email: username.body.email } })
            .then(user => {
                if (!user) {
                    return password.json(username.session)
                }
                return bcrypt.compare(username.body.password, user.password)
                    .then(match => {
                        if (match) {
                            username.session.userId = user.dataValues.id
                            username.session.roleId = user.dataValues.RoleId
                            username.session.isUserLoggin = true;
                            if (user.dataValues.RoleId === 6) {
                                return password.json(username.session)
                            }
                            else if (user.dataValues.RoleId === 13) {
                                return password.json(username.session)
                            }
                            else if (user.dataValues.RoleId > 0 && user.dataValues.RoleId < 5) {
                                return password.json(username.session)
                            }
                            else {
                                username.session.destroy()
                                return password.status(401).send('no user exists in db to update');
                            }
                        }
                        username.session.isUserLoggin = false;
                        return password.status(401).send('no user exists in db to update');
                    })
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    },
    serializeUser: (user, done) => done(null, user._id),
    deserializeUser: (id, done) => {
        db.Users.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => done(err));
    },
    checkSecurity: (req, res, next) => {
        if (req.session.isUserLoggin) {
            let data = {
                isUserLoggin: req.session.isUserLoggin,
                userId: req.session.userId,
                roleId: req.session.roleId
            }
            console.log('TRUE')
            console.log(req.session)
            res.json(data)
        } else {
            let data = {
                isUserLoggin: false,
                userId: null
            }
            console.log('FALSE')
            console.log(req.session)
            res.json(data)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).json()
    }
    /*   isLoggedIn: (req, res, next) => {
          if (req.user) {
              next();
          } else {
              res.redirect('/login');
          }
      },*/
    /*  isLoggedInPage: (req, res, next) => { */
    /*  checkSession: (req, res) => {
         if (req.session.isUserLoggin === false) {
             let data = {
                 userId: req.session.userId,
                 isSuccess: "No"
             }
             return res.json(data)
         }
         let data = {
             userId: req.session.userId,
             isUserLoggin: req.session.isUserLoggin
         }
         res.json(data)
     }, */

}