const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { userAuthMiddleware } = require("../middlewares/auth.midleware");
const {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductByID,
} = require("../controllers/product.controller");

const validCategories = [
  "Books",
  "Accessories",
  "Electronics",
  "Stationery",
  "Lab Equipment",
  "Software Licenses",
];

//add a product
router.post(
  "/",
  [
    // Middleware to ensure user is logged in

    body("name")
      .isLength({ min: 3 })
      .withMessage("Product name must be at least 3 characters long"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .isIn(validCategories)
      .withMessage(`Category must be one of: ${validCategories.join(", ")}`),
  ],
  userAuthMiddleware,
  addProduct
);

//get all products
router.get("/", userAuthMiddleware, getAllProducts);
//get all categories
router.get("/categories/", userAuthMiddleware, getCategories);
//get products of a certain category
router.get("/categories/:category", userAuthMiddleware, getProductsByCategory);
//get a specific product
router.get("/:id", userAuthMiddleware, getProductByID);
//update a product details
router.patch("/:id", userAuthMiddleware, updateProduct);

//delete product details
router.delete("/:id", userAuthMiddleware, deleteProduct);

module.exports = router;
