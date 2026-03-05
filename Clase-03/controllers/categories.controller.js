const categories = [
  {
    id: 1,
    name: "Electro",
    description: "Lorem ipsum",
  },
  {
    id: 2,
    name: "Bazar",
    description: "Lorem ipsum bazar",
  },
];

export const getCategories = (req, res) => {
  res.json(categories);
};

export const getCategoryById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const category = categories.find((c) => c.id == id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
};

export const createCategory = (req, res) => {
  console.log(req.body, req.body.name);

  if (!req.body.name) {
    return res.status(422).json({ error: "name is required" });
  }

  const newCategory = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
};

export const updateCategory = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const category = categories.find((c) => c.id == id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  category.name = name;

  res.json(category);
};

 export const deleteCategory = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const categoryIndex = categories.findIndex((c) => c.id == id);

  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }

  categories.splice(categoryIndex, 1);

  res.status(204).send();
};