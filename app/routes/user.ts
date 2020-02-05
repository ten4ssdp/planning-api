    (function(){

      const express = require("express");
      //const User = require("../models/User");
      const jwt = require('jsonwebtoken');
      const verifyToken = require('./helpers/verifyToken');
  
      const router = express.router();
  
      router.post('/register', async function (req, res) {
          try{
              
          }catch(err){
  
          }
      })
  
      router.post('/login', async function (req, res) {
          try{
              jwt.sign(
                  {
                    email: req.params.email,
                    password: req.params.password,
                  },
                  'secretKey',
                  (err, token) => {
                    if (err) {
                      res.sendStatus(401);
                    } else {
                      res.json({ token });
                    }
                  },
                );
          }catch(err){
  
          }
      });
  
      router.get('/all', verifyToken , async function (req, res) {
          res.json({
              message: "GET sur les user",
            });
          /*
          try{
              jwt.verify(req.token, 'secretKey', (err, authData) => {
                  if (err) {
                    res.sendStatus(403);
                  } else {
                    res.json({
                      message: 'planning de la semaine',
                      authData,
                    });
                  }
                });
          }catch(err){
  
          }
          */
      });
  
      
      module.exports = router;
  
    })()