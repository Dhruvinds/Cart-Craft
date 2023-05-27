const express = require("express");
const errLogger = require("./utils/errorLogger");
const db = require("./config/db");
const path = require("path");
// const logger = require("./utils/logger");

const usersRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const manufacturerRoutes = require("./routes/ManufacturerRoutes");
const subcategoriesRoutes = require("./routes/SubcategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
const userlistRoutes = require("./routes/userslistRoutes");
const orderRoutes = require("./routes/orderRoutes");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/subcategories", subcategoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/users", userlistRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(
    "Afvkt0a5j69dcxSn1HxqOfYmJsnWdPALjd-L2mlsRPhxzoKP2OWYz5x7wlynFk9tlJztvFC4jI9ubiGk"
  )
);

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));

app.listen(5000, () => {
  console.log(`server running at http://localhost:${5000}`);
});
