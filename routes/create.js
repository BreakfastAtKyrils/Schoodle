const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //POST /create
  router.post("/", (req,res)=> {
    //check if exists first (SELECT * FROM users WHERE email = don@gmail.com)
    //check result.rows length, if length is 0 then it doesnt exist
    //if exists(length is > 0), then don't insert, get the ID (user = result1.rows[0]), insert into the event table
    const email = req.body.email;
    let user;
    db
    .query(`SELECT id FROM users WHERE email = $1;`,[email])
    .then(emailResult =>{
      console.log(emailResult)
      //IF THE EMAIL EXISTS THEN DO THIS
      if(emailResult.rows.length > 0){
        user = emailResult.rows[0]
        console.log('USER Search +++++++++++++++++++', user)
        const body = req.body;
        const queryString2 = `INSERT INTO events(gen_id, user_id, title, description) VALUES($1, $2, $3, $4) RETURNING *;`;
          //insert event id as random gnerated id
          let gen_id = generateRandomId();
          console.log(gen_id);
          // const user_id = 1;
          const values2 = [gen_id, user.id, body.title, body.description];
          return db
            .query(queryString2, values2)
            .then(result => {
              // console.log(result);
              if (!result) {
                // console.log("post create result", result);
                res.send({error: "error"});
                return;
              }
              res.redirect(`/events/${gen_id}`)
            })
            .catch(err => console.log(err.message))
      }else{
        //IF THAT EMAIL DOES NOT EXIST THEN DO THIS
        const body = req.body;
        const queryString1 = `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *;`;
        const values1 = [body.name, body.email];
        db
          .query(queryString1, values1)
          .then(result1 =>{
            const user = result1.rows[0].id
            console.log("+++++++++++ USER", user)
            const queryString2 = `INSERT INTO events(gen_id, user_id, title, description) VALUES($1, $2, $3, $4) RETURNING *;`;
            //insert event id as random gnerated id
            let gen_id = generateRandomId();
            console.log(gen_id);
            // const user_id = 1;
            const values2 = [gen_id, user, body.title, body.description];
            return db
              .query(queryString2, values2)
              .then(result => {
                // console.log(result);
                if (!result) {
                  console.log("post create result", result);
                  res.send({error: "error"});
                  return;
                }
                res.send(`/events/${gen_id}`)
              })
              .catch(err => console.log(err.message))
          })
      }

    })
    .catch(err => console.log(err.message))


  });




  //GET /create
  router.get("/", (req, res) => {
    res.render('create');
  });

  return router;

}


function generateRandomId() {
  let length = 6;
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

