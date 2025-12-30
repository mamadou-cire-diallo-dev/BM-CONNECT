import { requestsService } from "./requests.services.js";

export async function createRequest(req, res, next) {
  try {
    const request = await requestsService.createRequest(req.user.sub, req.body);
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
}

export async function getMyRequests(req, res, next) {
  try {
    const role = req.user.role;
    let requests;
    if (role === "CLIENT") {
      requests = await requestsService.getClientRequests(req.user.sub);
    } else if (role === "PRESTATAIRE") {
      requests = await requestsService.getPrestataireRequests(req.user.sub);
    } else {
      return res.status(403).json({ message: "Role non autorisé pour cette liste" });
    }
    res.json(requests);
  } catch (error) {
    next(error);
  }
}

export async function getRequestById(req, res, next) {
  try {
    const request = await requestsService.getRequestById(req.params.id, req.user.sub, req.user.role);
    if (!request) {
      return res.status(404).json({ message: "Demande introuvable" });
    }
    res.json(request);
  } catch (error) {
    if (error.status === 403) return res.status(403).json({ message: error.message });
    next(error);
  }
}

export async function updateRequestStatus(req, res, next) {
  try {
    const updated = await requestsService.updateStatus(
      req.params.id,
      req.user.sub,
      req.user.role,
      req.body.statut
    );
    res.json(updated);
  } catch (error) {
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  }
}
