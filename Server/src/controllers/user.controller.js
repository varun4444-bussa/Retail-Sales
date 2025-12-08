import { registerUser, loginUser } from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User Registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json({ message: "Login Successful", ...data });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
