import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../../users.js";
import dotenv from "dotenv";

dotenv.config();

export const registerService = async ({ username, password }) => {
  const existing = users.find((u) => u.username === username);
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  return { message: "User registered successfully" };
};

export const loginService = async ({ username, password }) => {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    username: user.username,
    sub: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { message: "Login successful", token };
};
