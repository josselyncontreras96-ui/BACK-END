import CategoryType from "../models/CategoryType.js";

export const createCategoryType = async (req, res) => {
 try {
    const categoryType = new CategoryType(req.body);

    await categoryType.save();

    res.status(201).json(categoryType);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json({ error: error.errors });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};