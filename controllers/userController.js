const { User } = require('../models');

// Handle user registration
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use.' });
        }
        // Create the user
        const newUser = await User.create({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Handle user login
exports.loginUser = async (req, res, next) => {
    try {
        // Your logic to authenticate user credentials
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        next(error);
    }
};

// Get all users (Admin only)
exports.getUsers = async (req, res, next) => {
    try {
        // Implement middleware to check for 'ADMIN' role here. For now, we assume it's an admin.
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Update a user by ID (Admin only)
exports.updateUser = async (req, res, next) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID (Admin only)
exports.deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        next(error);
    }
};