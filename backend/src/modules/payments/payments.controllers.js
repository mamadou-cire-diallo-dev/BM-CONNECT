import { paymentsService } from "./payments.services.js";
import { invoicesService } from "./invoices.services.js";

export async function initPayment(req, res, next) {
  try {
    const { factureId, modePaye } = req.body;
    // Note: On pourrait vérifier ici que l'utilisateur est bien le client de la facture
    const payment = await paymentsService.initializePayment(factureId, modePaye);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
}

export async function simulateWebhook(req, res, next) {
  try {
    const { paiementId, referenceExterne } = req.body;
    const payment = await paymentsService.confirmPayment(paiementId, referenceExterne);
    res.json({ message: "Paiement confirmé avec succès", payment });
  } catch (error) {
    next(error);
  }
}

export async function getInvoices(req, res, next) {
  try {
    const invoices = await invoicesService.getInvoicesByDemand(req.params.demandeId);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
}
