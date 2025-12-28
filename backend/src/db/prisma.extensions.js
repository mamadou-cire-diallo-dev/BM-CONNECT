import { Prisma } from "../generated/prisma/index.js";

const softDeleteModels = [
  'Utilisateur', 'Client', 'Prestataire', 'Vendeur', 'Administrateur',
  'CategorieService', 'ServiceOffre', 'DemandeService', 'Facture',
  'Paiement', 'Produit', 'DocumentPrestataire', 'Specialite'
];

export const softDeleteExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          if (softDeleteModels.includes(model)) {
            args.where = { deletedAt: null, ...args.where };
          }
          return query(args);
        },
        async findFirst({ model, args, query }) {
          if (softDeleteModels.includes(model)) {
            args.where = { deletedAt: null, ...args.where };
          }
          return query(args);
        },
        async findUnique({ model, args, query }) {
          if (softDeleteModels.includes(model)) {
            // findUnique only allows unique fields. Convert to findFirst for filtering.
            // But check if we are doing a real query or just checking existence.
            return client[model].findFirst({
              ...args,
              where: { ...args.where, deletedAt: null }
            });
          }
          return query(args);
        },
        async delete({ model, args, query }) {
          if (softDeleteModels.includes(model) && !args?.hardDelete) {
            return client[model].update({
              where: args.where,
              data: { deletedAt: new Date() }
            });
          }
          // Remove the custom arg before passing to Prisma if it exists
          if (args?.hardDelete) {
            const { hardDelete, ...realArgs } = args;
            return query(realArgs);
          }
          return query(args);
        },
        async deleteMany({ model, args, query }) {
          if (softDeleteModels.includes(model) && !args?.hardDelete) {
            return client[model].updateMany({
              where: args.where,
              data: { deletedAt: new Date() }
            });
          }
          if (args?.hardDelete) {
            const { hardDelete, ...realArgs } = args;
            return query(realArgs);
          }
          return query(args);
        },
      },
    },
  });
});
