const jsonwebtoken = require("jsonwebtoken");
const gettopic = require("../module/topic");
const artical1 = require("../module/artical");
const comment1 = require("../module/comment");

let result = "";
//create artical....
const artical = async (req, res) => {
  try {
    let ariticaldata = new artical1(req.body);
    let data = await gettopic.find({ topic: req.body.topicname });
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (req.body.user_id == null) {
          res.status(400).send("please enter user id..");
        } else if (req.body.topicname == null) {
          res.status(400).send("please enter your topic name");
        } else if (data.length == 0) {
          res.status(400).send("please create artical and with selected topic");
        } else if (req.body.authorname == null) {
          res.status(400).send("please enter author name");
        } else if (req.body.introduction == null) {
          res.status(400).send("please enter your artical introduction..");
        } else {
          result = ariticaldata
            .save()
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(400).json("ERROR:" + err));
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

//get artical.....
const getartical = async (req, res) => {
  try {
    const data = await artical1.find();
    if (data == null) {
      res.status(400).send("artical not found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//delet aritical...
const deletartical = async (req, res) => {
  try {
    let data = await artical1.findByIdAndDelete(req.params);
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (data == null) {
          res.status(400).send("artical not found");
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
//edit artical
const editartical = async (req, res) => {
  try {
    let data = await artical1.findByIdAndUpdate(req.params, {
      authorname: req.body.authorname,
      introduction: req.body.introduction,
      decription: req.body.decription,
    });
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (data == null) {
          res.status(400).send("artical not found");
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
//get articles by topic
const getarticalbytopic = async (req, res) => {
  try {
    const data = await artical1.find({ topicname: req.body.topicname });
    if (req.body.topicname == null) {
      res.status(400).send("please enter topic name...");
    } else if (data.length == []) {
      res.status(400).send("artical not found...");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//  get most recent articles
const recentaritical = async (req, res) => {
  try {
    const data = await artical1.find().sort({ topicname: 1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
// get articles of following users
const folluser = async (req, res) => {
  try {
    const data = await artical1.find({ user_id: req.body.user_id });
    if (req.body.user_id == null) {
      res.status(400).send("please enter user_id...");
    } else if (data.length == []) {
      res.status(400).send("artical not found...");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//comment in aritical
const comment = async (req, res) => {
  try {
    let data = await artical1.findByIdAndUpdate(req.params, {
      comment: req.body.comment,
    });
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (req.body.comment == null) {
          res.status(400).send("please enter comment...");
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
//follow and unfollow user...
const followunfollow = async (req, res) => {
  try {
    let data = await artical1.findByIdAndUpdate(req.params, {
      followUnfollow: req.body.followUnfollow,
    });
    jsonwebtoken.verify(
      req.token,
      "ghjkjhgfdsdfghjkiuytrertyuioiwert",
      (err, authdata) => {
        if (err) {
          res.sendStatus(403);
        } else if (req.body.followUnfollow == null) {
          res.status(400).send("please enter true or false...");
        } else {
          res.status(200).send(data);
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  artical,
  getartical,
  deletartical,
  editartical,
  getarticalbytopic,
  recentaritical,
  folluser,
  comment,
  followunfollow,
};
