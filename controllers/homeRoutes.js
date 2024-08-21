const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['updated_at', 'DESC']],
      limit: 5,
    });

    const posts = postData.map((data) => data.get({ plain: true }));

    res.render('homepage', { posts, logged_in: req.session.logged_in, logged_in_username: req.session.username });
  } catch (error) {
    res.status(500).json(error);
  }
});
