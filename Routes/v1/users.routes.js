const express = require('express');
const usersControllers = require('../../Controllers/v1/users.controllers');
const router = express.Router();

// All Users
router.route('/')
.get(usersControllers.getAllUsers);

// Random Users
router.route('/random')
.get(usersControllers.getRandomUsers)

// Save User
router.route('/save')
.post(usersControllers.saveUsers)

// User Update
router.route('/update/:id') 
.patch(usersControllers.UpdateUser)

// Bulk-Update
router.route('/bulk-update')
.patch(usersControllers.updateBulk)

// Delete User
router.route('/delete/:id')
.delete(usersControllers.deleteUser)

module.exports = router;
