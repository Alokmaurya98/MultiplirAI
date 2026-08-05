const express = require('express');
const { body } = require('express-validator');
const { createLink, getLinks, deleteLink } = require('../controllers/linkController');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All link routes are protected

router.post(
  '/',
  [
    body('url').notEmpty().withMessage('URL is required').isURL().withMessage('Please provide a valid URL'),
  ],
  validate,
  createLink
);

router.get('/', getLinks);
router.delete('/:id', deleteLink);

module.exports = router;
