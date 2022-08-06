const jsonwebtoken = require("jsonwebtoken");
const topic = require("../module/topic");
let result = "";

//post api with create your topic ...
const craetetopic = async (req, res) => {
  try {
    let Topic = new topic({ topic: req.body.topic });
    //const token = req.header("Authorization").replace("Bearer ", "");
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (req.body.topic == null) {
          res.status(400).send("please enter your topic name");
        } else {
          result = Topic.save()
            .then((result) => res.status(200).json(result))
            .catch((err) =>
              res.status(400).json("ERROR:" + "your topic is already exit...")
            );
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
const gettopic = async (req, res) => {
  try {
    let gettopic = await topic.find();
    if (gettopic == null) {
      res.status(400).send("topic not found..");
    } else {
      res.status(200).send(gettopic);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { craetetopic, gettopic };
