import * as usersServices from "./users.services.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function updateMe(req, res, next) {
  try {
    const user = await usersServices.updateMe(req.user.sub, req.body);
    res.json({ user });
  } catch (e) {
    next(e);
  }
}

export async function updateProfilePhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Veuillez envoyer une image" });
    }

    const uploadPath = "public/uploads/profiles";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `profile-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const filePath = path.join(uploadPath, fileName);

    // Conversion en WebP avec Sharp
    await sharp(req.file.buffer)
      .resize(500, 500, { fit: "cover" }) // Optionnel : redimensionner à 500x500
      .webp({ quality: 80 })
      .toFile(filePath);

    // Le chemin sera relatif au serveur
    const photoUrl = `/uploads/profiles/${fileName}`;
    const user = await usersServices.updateProfilePhoto(req.user.sub, photoUrl);

    res.json({ 
      message: "Photo de profil mise à jour (Format WebP)",
      photoProfil: user.photoProfil 
    });
  } catch (e) {
    next(e);
  }
}
