const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

app.get("/products", (req, res) => {
  res.status(200).json(products);
});


app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});


app.get("/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  res.status(200).json(filteredProducts);
});

app.post("/products", (req, res) => {
  const { name, category, price, stock, rating } = req.body;

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    category,
    price,
    stock,
    rating
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});


app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, category, price, stock, rating } = req.body;

  products[index] = {
    id: id,
    name,
    category,
    price,
    stock,
    rating
  };

  res.status(200).json(products[index]);
});


app.put("/products/:id/stock", (req, res) => {
  const id = parseInt(req.params.id);
  const { stock } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.stock = stock;

  res.status(200).json(product);
});


app.put("/products/:id/price", (req, res) => {
  const id = parseInt(req.params.id);
  const { price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.price = price;

  res.status(200).json(product);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

