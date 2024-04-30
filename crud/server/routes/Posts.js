const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Posts } = require('../models');

router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll();
    res.json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.status(201).json(post); // Changed from `Posts` to `post`
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/byId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const PostData = await Posts.findByPk(id);
    res.json(PostData); // Send PostData in the response
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.delete('/',async(req,res)=>{
//   try {
//     const {Posts.id} = req.body; 
//     await Posts.destroy(post)
//     res.status(201).json(Posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// })

module.exports = router;
