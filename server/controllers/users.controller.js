import users from "../data/users.js";

/**
 * @desc All users
 * @route get /api/users
 * @access  Public
 */
export const getUsers = (req, res) => {
    try {
        const result = users; 
        res.json(result);
      } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};