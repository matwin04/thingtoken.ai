import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const VIEWS_DIR = path.join(__dirname, "views");
const PARTIALS_DIR = path.join(VIEWS_DIR, "partials");
const PUBLIC_DIR = path.join(__dirname, "public");

const upload = multer();
const PORT = process.env.PORT || 3003;


// Template engine
app.engine("html", engine({ extname: ".html", defaultLayout: false, partialsDir: PARTIALS_DIR }));
app.set("view engine", "html");
app.set("views", VIEWS_DIR);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(PUBLIC_DIR));

// Routes
app.get("/", (req, res) => {
    res.render("index",{title:"Thing Token"});
});
app.get("/about",(req, res) => {
    res.render("about",{title:"About"});
})
app.get("/blog",(req, res) => {

    res.render("blog", {title:"Blog"});
});
app.get("/contact",(req, res) => {
    res.render("contact",{title:"Contact Us"});
})
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});