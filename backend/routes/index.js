const express = require('express');
const router = express.Router();
// const firebase = require('firebase');
const admin = require('firebase-admin')
const cors = require("cors")
const keys = require('../private_keys.json')
admin.initializeApp({
  credential: admin.credential.cert(keys)
});
const db = admin.firestore();
const users = [
  {
    "studentName": "keshav",
    "rollNumber": "111",
    "password": "password",
    "Useremail": "kskrao@gmail.com"
  },
  {
    "studentName": "john",
    "rollNumber": "112",
    "password": "password",
    "Useremail": "stephen@gmail.com"
  },
  {
    "studentName": "stephen",
    "rollNumber": "113",
    "password": "password",
    "Useremail": "bb@gmail.com"
  },
  {
    "studentName": "rose",
    "rollNumber": "114",
    "password": "password",
    "Useremail": "rose@gmail.com"
  },
  {
    "rollNumber": "12",
    "studentName": "Virginie",
    "Useremail": "vfrede0@shutterfly.com",
    "password": "password"
  },
  { "rollNumber": "177", "studentName": "Charla", "Useremail": "cnorsworthy1@zimbio.com", "password": "password" },
  { "rollNumber": "14", "studentName": "Kaine", "Useremail": "ktiler2@e-recht24.de", "password": "password" },
  { "rollNumber": "110", "studentName": "Fianna", "Useremail": "feadington3@go.com", "password": "password" },
  { "rollNumber": "143", "studentName": "Maitilde", "Useremail": "mtellenbroker4@meetup.com", "password": "password" },
  { "rollNumber": "86", "studentName": "Tome", "Useremail": "tdaniellot5@craigslist.org", "password": "password" },
  { "rollNumber": "24", "studentName": "Neila", "Useremail": "ngrovier6@domainmarket.com", "password": "password" },
  { "rollNumber": "82", "studentName": "Moyra", "Useremail": "mbladen7@opera.com", "password": "password" }
]
const admindata = [
  {
    "adminID": "4321",
    "adminName": "john",
    "adminpass": "adminpass",
    "adminEmail": "john@gmail.com",
    "adminNumber": "900077668"
  }
]
// Route mappings and API's
/* GET home page. */
/*Firebase Testi API's */
router.post('/test', async (req, res) => {
  try {
    const id = req.body.email
    const userjson = {
      email: req.body.email,
      name: req.body.name,
      place: req.body.place,
    }
    const response = await db.collection('users').add(userjson);
    res.send(response);
  }
  catch (err) {
    console.log(err)
  }
})
router.get('/testget', async (req, res) => {
  try {
    const useref = db.collection('users')
    const response = await useref.get()
    let arr = [];
    response.forEach(doc => {
      arr.push(doc.data());
    })
    res.send(arr)
  }
  catch (err) {
    console.log(err)
  }
})
router.get('/testget/:id', async (req, res) => {
  try {
    const useref = db.collection('users').doc(req.params.id)
    const response = await useref.get()
    res.send(response.data());
  }
  catch (err) {
    console.log(err)
  }
})




/*Portal CRUD API's*/
router.get('/', function (req, res, next) {
  res.send("welcome");
});
router.post('/login', (req, res, next) => {
  let result = users.find((user) => {
    console.log(user.rollNumber)
    console.log(req.body.idNumber)
    return (user.rollNumber == req.body.idNumber)
  });
  console.log(result)
  if (result) {
    if (result.password == req.body.password) {
      res.status(200).send({
        loggedData: result,
        auth: true,
        message: "Login successfull",
      })
    } else {
      res.status(200).send({
        auth: false,
        message: "incorrect password"
      })
    }
  }
  else {
    res.status(200).send({
      auth: false,
      message: "user not found",
    })
  }
})
router.post('/adminlogin', (req, res, next) => {
  let adminfound = admindata.find((user) => {
    console.log(req.body.idNumber)
    return (user.adminID == req.body.idNumber)
  });
  console.log(adminfound)
  if (adminfound) {
    if (adminfound.adminpass == req.body.password) {
      res.status(200).send({
        loggedData: adminfound,
        auth: true,
        message: "admin Login successfull",
      })
    } else {
      res.status(200).send({
        auth: false,
        message: "incorrect password"
      })
    }
  }
  else {
    res.status(200).send({
      auth: false,
      message: "admin not found",
    })
  }
})

router.post('/register', (req, res, next) => {
  console.log(req.body);

  let foundrollnumber = users.find((user) => {
    return (req.body.rollNumber == user.rollNumber)
  })
  console.log(foundrollnumber);
  if (foundrollnumber) {
    res.send({
      found: true,
      message: "user already registered"
    }).status(200);
  }
  else {
    users.push(req.body)
    res.send({
      userdata: users[users.length - 1],
      found: false,
      message: "student successfully registered"
    }).status(200);
  }
})
router.get('/usersdata', (req, res) => {
  res.send(users)
})
router.get('/student/:id', (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  // res.send(id).status(200)
  const userdata = users.find((user) => {
    return (user.rollNumber === id)
  })
  if (userdata) {
    res.send({
      ...userdata,
      found: true
    }).status(200)
  }
  else {
    res.send(
      {
        message: "user not found",
        found: false
      }
    ).status(404)
  }
})
router.put('/updatedata/:id', (req, res) => {
  const { id } = req.params;
  let exists = users.find((user) => {
    return (req.body.rollNumber === user.rollNumber)
  })
  let resultid = users.findIndex((user) => {
    return (id === user.rollNumber);
  })

  const { studentName, rollNumber, Useremail, password } = req.body;
  console.log(exists, id, rollNumber);
  if (resultid >= 0) {
    [users[resultid].studentName, users[resultid].password, users[resultid].rollNumber, users[resultid].Useremail] = [studentName, password, rollNumber, Useremail];
    res.send({
      message: "successfully updated",
      updatedData: users[resultid]
    });
  }
  else {
    res.send(
      {
        message: "Invalid roll number"
      })
  }
})
router.delete('/deleteuser/:id', (req, res) => {
  const { id } = req.params
  let foundid = users.findIndex((user) => {
    return (id === user.rollNumber);
  })
  if (foundid >= 0) {
    users.splice(foundid, 1)
    res.send({ deleted: true }).status(200)
  }
  else {
    res.send({ message: "user not found" }).status(200);
  }
})
router.post('/newmarksrecord', async (req, res) => {
  console.log(req.body);
  try {
    const { studentName, rollNumber, subjectdata } = req.body;
    const docId = rollNumber;
    const response = await db.collection('marks_data').doc(docId).set(req.body);
  }
  catch (err) {
    console.log(err)
  }
})
router.get('/studentmarks/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const single_user_data = db.collection('marks_data').doc(req.params.id)
    const response = await single_user_data.get()
    console.log(response)
    if (response.data())
      res.send({
        found: true,
        fetched_data: response.data()
      });
    else
      res.send({ found: false }).status(200)
  }
  catch (err) {
    console.log(err);
  }
})
router.post('/marksupdate/:id', async(req, res) => {
  const  {id} = req.params;
  const data = req.body
  try{
  const update_data = db.collection('marks_data').doc(id)
  const check = await update_data.get()
  console.log(update_data)
  if(!check.exists){
    res.send({updated:false}).status(200)
  }
  else{
  const response = await update_data.update(data)  
    res.send({updated:true}).status(200);
  }
  } 
  catch(err){
    console.log(err);
  }
})
router.delete('/delete/:id', async(req, res) => {
  const  {id} = req.params;
  try{
  const delete_data = db.collection('marks_data').doc(id)
  const check = await delete_data.get()
  console.log(delete_data)
  if(!check.exists){
    res.send({deleted:false}).status(200)
  }
  else{
  const response = await delete_data.delete()
    res.send({deleted:true}).status(200);
  }
  } 
  catch(err){
    console.log(err);
  }
})
module.exports = router;


