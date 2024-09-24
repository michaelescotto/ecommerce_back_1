import fs from "fs/promises";
import generateId from "../utils/generateId.js";

const path = "./src/data/users.json";

class UsersManager {
  constructor() {
    this.path = path;
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return []; 
      }
      throw error; 
    }
  }

  async readOne(id) {
    const users = await this.read();
    return users.find((user) => user.id === id);
  }

  async create(user) {
    user.id = generateId();
    user.photo = user.photo || "default-photo.png"; 
    user.role = user.role || 0;

    const users = await this.read();
    users.push(user);
    await this.save(users);
    return user.id;
  }

  async update(id, data) {
    const users = await this.read();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data }; 
    await this.save(users);
    return users[index]; 
  }

  async delete(id) {
    const users = await this.read();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null; 

    const [deletedUser] = users.splice(index, 1); 
    await this.save(users);
    return deletedUser; 
  }

  async save(users) {
    try {
      await fs.writeFile(this.path, JSON.stringify(users, null, 2), "utf-8");
    } catch (error) {
      throw error; 
    }
  }
}

export default new UsersManager();
