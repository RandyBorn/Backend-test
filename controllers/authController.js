import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Alle Felder sind Pflichtfelder" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      name,
    });
    res.status(201).send("User erstellt");
  } catch (error) {
    res.status(400).send("Ein Benutzer mit dieser E-Mail existiert bereits");
  }
};
//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Nicht gefunden" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Ungültige Anmeldeinformationen" });
    }
    // JWT
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // erstellen cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login erfolgreich" });
    token;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login Fehlgeschlagen" });
  }
};
