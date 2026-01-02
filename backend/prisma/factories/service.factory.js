import { faker } from "@faker-js/faker";

export function buildCategory(overrides = {}) {
  return {
    nom: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    actif: true,
    ...overrides,
  };
}

export function buildOffer(prestataireId, categorieId, overrides = {}) {
  return {
    titre: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    tempsEstime: faker.number.int({ min: 1, max: 24 }),
    prix: parseFloat(faker.commerce.price({ min: 10000, max: 500000 })),
    prixDiagnostic: parseFloat(faker.commerce.price({ min: 20000, max: 50000 })),
    fraisTransport: parseFloat(faker.commerce.price({ min: 5000, max: 20000 })),
    prestataireId,
    categorieId,
    ...overrides,
  };
}
