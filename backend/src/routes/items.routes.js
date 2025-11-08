const express = require('express');
const router = express.Router();
const { createItem, listItems, getItem, updateItem, deleteItem } = require('../controllers/items.controller');
const { authMiddleware, requireRole } = require('../middleware/auth.middleware');

router.get('/', listItems);
router.get('/:id', getItem);

// instructor/admin protected
router.post('/', authMiddleware, requireRole('instructor'), createItem);
router.put('/:id', authMiddleware, requireRole('instructor'), updateItem);
router.delete('/:id', authMiddleware, requireRole('instructor'), deleteItem);

module.exports = router;
