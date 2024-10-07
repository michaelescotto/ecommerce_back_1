import UsersManager from "../managers/Users.manager.js";

class UserController {
  async createUser(req, res) {
    try {
      const { email, password, photo, role } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }

      const user = { email, password, photo, role };
      const id = await UsersManager.create(user);

      res.status(201).json({ id, message: "User created successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error creating user." });
    }
  }

  async getAllUsers(req, res) {
    try {
      const { role } = req.query;
      let users = await UsersManager.read();

      if (role) {
        users = users.filter((user) => user.role === Number(role));
      }

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving users." });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UsersManager.readOne(id);

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving user." });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await UsersManager.update(id, req.body);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found." });
      }

      res
        .status(200)
        .json({ updatedUser, message: "User updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error updating user." });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await UsersManager.delete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ deletedUser, message: "User deleted." });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user." });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UsersManager.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new UserController();
