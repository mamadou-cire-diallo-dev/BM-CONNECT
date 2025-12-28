import { offersService } from "./offers.services.js";

export async function getOffers(req, res, next) {
  try {
    const { categoryId, prestataireId, search } = req.query;
    const offers = await offersService.getAll({ categoryId, prestataireId, search });
    res.json(offers);
  } catch (error) {
    next(error);
  }
}

export async function getOfferById(req, res, next) {
  try {
    const offer = await offersService.getById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }
    res.json(offer);
  } catch (error) {
    next(error);
  }
}

export async function createOffer(req, res, next) {
  try {
    // In our system, the user.sub is the prestataireId (since it's a 1:1 relation with same ID)
    const offer = await offersService.create(req.user.sub, req.body);
    res.status(201).json(offer);
  } catch (error) {
    next(error);
  }
}

export async function updateOffer(req, res, next) {
  try {
    const offer = await offersService.update(req.params.id, req.user.sub, req.body);
    res.json(offer);
  } catch (error) {
    if (error.message.includes("Forbidden")) {
      return res.status(403).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteOffer(req, res, next) {
  try {
    // Check if user is admin OR the owner
    const isOwner = req.user.role === "PRESTATAIRE";
    const prestataireId = isOwner ? req.user.sub : null;
    
    await offersService.delete(req.params.id, prestataireId);
    res.status(204).end();
  } catch (error) {
    if (error.message.includes("Forbidden")) {
      return res.status(403).json({ message: error.message });
    }
    next(error);
  }
}
