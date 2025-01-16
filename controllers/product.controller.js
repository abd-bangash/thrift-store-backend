const productModel = require("../models/product.model");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

module.exports.addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category)
      return res.status(400).json({ message: "All fields are required" });

    const product = new productModel({
      name,
      description,
      price,
      category,
      createdBy: req.user._id,
    });

    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("createdBy", "name email phone");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });
    const product = await productModel
      .findById(id)
      .populate("createdBy", "name email phone");
    if (!product) return res.status(400).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getProductsByCategory = async (req, res) => {
  try {
    const validCategories = [
      "Books",
      "Accessories",
      "Electronics",
      "Stationery",
      "Lab Equipment",
      "Software Licenses",
    ];
    const category =
      String(req.params.category).charAt(0).toUpperCase() +
      String(req.params.category).slice(1);

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const products = await productModel.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });
    const product = await productModel.findById(id);
    if (!product) return res.status(400).json({ message: "Product not found" });

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    Object.assign(product, req.body);
    await product.save();
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id format" });
    const product = await productModel.findById(id);
    if (!product) return res.status(400).json({ message: "Product not found" });

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCategories = async (req, res) => {
  try {
    const categories = [
      "Books",
      "Accessories",
      "Electronics",
      "Stationery",
      "Lab Equipment",
      "Software Licenses",
    ];
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
