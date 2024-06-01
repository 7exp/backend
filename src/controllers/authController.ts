import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import { config } from "../config";

const oauth2Client = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret, config.googleCallbackUrl);

const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export const googleAuth = (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
};

export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email || !data.name) {
    return res.json({ data });
  }

  let user = await prisma.users.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    // Jika pengguna tidak ada, tambahkan sebagai pengguna baru
    user = await prisma.users.create({
      data: { name: data.name, email: data.email, address: "-", role: "user", image: data.picture },
    });
  }

  // Cek apakah pengguna adalah admin
  const isAdmin = user.role === "admin";

  // Simpan informasi pengguna ke sesi
  const payload = { id: user.id, name: user.name, address: user.address, role: user.role, image: user.image };
  const token = jwt.sign(payload, config.jwtSecret!, { expiresIn: 60 * 60 * 1 });

  res.cookie("token", token);

  if (isAdmin) {
    res.redirect(`${config.googleRedirectUrlAdmin}`); // Redirect ke halaman admin jika pengguna adalah admin
  } else {
    res.redirect(`${config.googleRedirectUrlUser}`); // Redirect ke halaman pengguna jika pengguna adalah pengguna biasa
  }
};
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.users.create({ data: { name, email, password: hashedPassword } });
  res.json({ message: "user created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.password) {
    return res.status(404).json({ message: "Password not set" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = { id: user.id, name: user.name, address: user.address, role: user.role };
    const token = jwt.sign(payload, config.jwtSecret!, { expiresIn: 60 * 60 * 1 });
    return res.json({ data: { id: user.id, name: user.name, address: user.address }, token });
  } else {
    return res.status(403).json({ message: "Wrong password" });
  }
};

// buatkan logout juga menggunakan jwt menghapus token dari client
export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token not found" });
  }
  return res.json({ message: "Logout success" });
};

export const getUserInfo = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret!);
    const user = await prisma.users.findUnique({
      where: { id: (decoded as any).id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id: user.id, name: user.name, email: user.email, address: user.address, role: user.role, image: user.image });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
