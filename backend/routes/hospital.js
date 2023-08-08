const router = require('express').Router();
const Hospital = require("../models/Hospital");


router.get('/find', (req,res)=>{
  Hospital.find({}, (err, findHospitals) => {
    if (!err) {
      res.send(findHospitals);
    }
  });
})

router.get('/find/:id', (req, res) => {
  const id = req.params.id;
  
  Hospital.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send(
          { message: `Hospital not found` });
      } else {
        res.send(data)
    }
    })
    .catch(err => {
    res.status(500).send({message: "Error"})
  })
    
  })


module.exports = router;