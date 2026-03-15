import Category from "../models/Category.js";


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


export const createCategory = async (req, res) => {
 try {
  //if (!req.body.name) {
    //return res.status(422).json({ error: "No tiene nombre"});
 // }
  //const data = {
//name: req.body.name,
//description: req.body.description,
 // };

  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);

 } catch (error) {
  console.log(error.name);
if (error.name == "ValidationError"){
  return res.status(422).json({ error: error.message });
}

  res.status(500).json({ error: "error al crear la categoria"});
}
  };

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.name) {
      return res.status(422).json({ error: "Name required"});
    }

    const categoryUpdate = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    if (!categoryUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(categoryUpdate);

  } catch (error) {
    res.status(400).json({ error: "Invalid category id" });
  }
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


export const searchCategory = (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  const results = categories.filter((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(results);
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);

  } catch (error) {
    return res.status(400).json({ message: "Invalid category ID" });
  }
};



