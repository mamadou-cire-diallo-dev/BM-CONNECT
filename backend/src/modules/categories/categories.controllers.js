import { categoriesService } from "./categories.services.js";

export async function getCategories(req, res, next) {
  try {
    const categories = await categoriesService.getAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await categoriesService.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const category = await categoriesService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const category = await categoriesService.update(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await categoriesService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
