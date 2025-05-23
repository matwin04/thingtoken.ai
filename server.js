import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import {sql,setupDB} from "./db.js";

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


// DB Function


setupDB();
// Routes
app.get("/", (req, res) => {
    res.render("index",{title:"Thing Token"});
});
app.get("/about",(req, res) => {
    res.render("about",{title:"About"});
})
app.get("/blog", async (req, res) => {
    const posts = await sql `SELECT * FROM blogposts ORDER BY created_at DESC`;
    res.render("blog", {title:"Blog",posts});
});

app.get("/blog/:id", async (req, res) => {
    const id = req.params.id;
    const blogPost = await sql(`SELECT *
                                FROM blogposts
                                WHERE id = ${id}`);
    res.render("blog", {title: "Blog", blogPost});
})
app.get("/chat",async(req,res)=>{
    const chats = await sql `SELECT * FROM chat ORDER BY created_at DESC`;
    res.render("chat",{title:"Chat",chats});
});
app.get("/chat/:id",async(req,res)=>{
    const id = req.params.id;
    const chat = await sql(`SELECT * FROM chatposts WHERE id = ${id}`);
    res.render("chat",{title:"Chat",chat:chat});
});
app.get("/misato",async (req,res)=>{
    res.render("epic",{title:"Misato"});
})
app.post("/chat/new", async (req, res) => {
    const { chatcontent, from_user } = req.body;
    const created_at = new Date().toISOString(); // Get current time in ISO format
    try {
        await sql`
            INSERT INTO chat (chatcontent, from_user, created_at)
            VALUES (${chatcontent}, ${from_user}, ${created_at})
        `;
        res.redirect("/chat");
    } catch (err) {
        console.error("Error adding chat message:", err);
        res.status(500).send("Error adding chat message");
    }
});
app.get("/contact",(req, res) => {
    res.render("contact",{title:"Contact Us"});
})
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});