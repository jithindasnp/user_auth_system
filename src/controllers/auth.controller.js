import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const dashboard = (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}! This is your dashboard.`,
  });
};
