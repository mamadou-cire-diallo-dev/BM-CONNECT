import { addressesService } from "./addresses.services.js";

export async function addAddress(req, res, next) {
  try {
    const address = await addressesService.create(req.user.sub, req.body);
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
}

export async function getMyAddresses(req, res, next) {
  try {
    const addresses = await addressesService.list(req.user.sub);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
}

export async function updateAddress(req, res, next) {
  try {
    const updated = await addressesService.update(req.params.id, req.user.sub, req.body);
    res.json(updated);
  } catch (error) {
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  }
}

export async function deleteAddress(req, res, next) {
  try {
    await addressesService.delete(req.params.id, req.user.sub);
    res.status(204).send();
  } catch (error) {
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  }
}
