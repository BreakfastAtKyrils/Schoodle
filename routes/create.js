const express = require('express');
const router  = express.Router();
const format = require("pg-format");

module.exports = (db) => {
  //POST /create
  router.post("/", (req,res)=> {
    console.log("creating an event");
    //check if exists first (SELECT * FROM users WHERE email = don@gmail.com)
    //check result.rows length, if length is 0 then it doesnt exist
    //if exists(length is > 0), then don't insert, get the ID (user = result1.rows[0]), insert into the event table
    // let start_time2 = req.body.times[0][0];
    // console.log("start time 2", start_time2)
    const email = req.body.email;
    let user;
    db
    .query(`SELECT id FROM users WHERE email = $1;`,[email])
    .then(emailResult =>{
      // console.log(emailResult)
      //IF THE EMAIL EXISTS THEN DO THIS
      if(emailResult.rows.length > 0){

        //INSERT THE EVENT
        user = emailResult.rows[0]
        // console.log('USER Search +++++++++++++++++++', user)
        const body = req.body;
        console.log("BODY++++++++++++++++++++", req.body)
        const queryString2 = `INSERT INTO events(gen_id, user_id, title, description) VALUES($1, $2, $3, $4) RETURNING *;`;
          //insert random gnerated
          let gen_id = generateRandomId();
          // console.log(gen_id);
          // const user_id = 1;
          const values2 = [gen_id, user.id, body.title, body.description];
          db
            .query(queryString2, values2)
            .then(result => {
              // console.log("----------Result--------", result)
              // console.log("----------Eveent_id--------", result.rows[0].id)
              //INSERT THE EVENT TIMES
              const event_id = result.rows[0].id;  //event_id

              //temporary times
              const start_time = req.body.times[0][0];
              const end_time = req.body.times[0][1];
              const queryEventTimes = `INSERT INTO event_times(event_id, start_time, end_time) VALUES($1,$2,$3) RETURNING *;`;
              const valuesEventTimes = [event_id, start_time, end_time];
              return db
              .query(queryEventTimes, valuesEventTimes)
              .then( result3 => {
                // console.log("post create result3", result3);
                if (!result3) {
                  res.send({error: "error"});
                  return;
                }
                console.log("redirecting User exists")
                res.send(`/events/${gen_id}`)
              })
            })
            .catch(err => console.log(err.message))
      }else{
        //IF THAT EMAIL DOES NOT EXIST THEN INSERRT NEW USER
        const body = req.body;
        const queryString1 = `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *;`;
        const values1 = [body.name, body.email];
        db
          .query(queryString1, values1)
          .then(result1 =>{
            const user = result1.rows[0].id
            // console.log("+++++++++++ USER", user)
            const queryString2 = `INSERT INTO events(gen_id, user_id, title, description) VALUES($1, $2, $3, $4) RETURNING *;`;
            //insert event id as random gnerated id
            let gen_id = generateRandomId();
            // console.log(gen_id);
            // const user_id = 1;
            const values2 = [gen_id, user, body.title, body.description];
            db
              .query(queryString2, values2)
              .then(result => {
                const event_id = result.rows[0].id;  //event_id
                console.log("req.body.times!!!!!!!!!", req.body.times);
                console.log(event_id);
                const times = req.body.times;
                console.log(times.length);
                if (times.length <= 1) {
                  const start_time = req.body.times[0][0];
                const end_time = req.body.times[0][1];
                ////////////////////
              const queryEventTimes = `INSERT INTO event_times(event_id, start_time, end_time) VALUES($1,$2,$3) RETURNING *;`;
              const valuesEventTimes = [event_id, start_time, end_time];
              return db
              .query(queryEventTimes, valuesEventTimes)
              .then( result3 => {
                // console.log(result);
                if (!result3) {
                  console.log("Error in result3, User did Not Exist", result3);
                  res.send({error: "error"});
                  return;
                }
                console.log("redirecting User did not exist")
                res.send(`/events/${gen_id}`)
              }).catch(err => console.log(err.message))
                } else {
                  let space = [];
                  for (let i=0; i < times.length; i++) {
                    console.log(times[i]);
                    const start_time = times[i][0];
                    const end_time = times[i][1];
                    const valuesEventTimes = [event_id, start_time, end_time];
                    space.push(valuesEventTimes);
                  }
                  console.log(space);
                  const queryEventTimes = format(`INSERT INTO event_times(event_id, start_time, end_time) VALUES %L`, space);
                  return db
                  .query(queryEventTimes)
                  .then( result3 => {
                    console.log(result3);
                    if (!result3) {
                      console.log("Error in result3, User did Not Exist", result3);
                      res.send({error: "error"});
                      return;
                    }
                    console.log("redirecting User did not exist")
                    res.send(`/events/${gen_id}`)
                  }).catch(err => console.log(err.message))
                }
              //////////////
            })
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

