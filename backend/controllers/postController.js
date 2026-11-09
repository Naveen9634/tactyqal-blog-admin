import pool from "../config/db.js";

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const [posts] = await pool.query(
            "SELECT * FROM posts ORDER BY created_at DESC"
        );

        res.json({ success: true, data: posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get single post
export const getPostById = async (req, res) => {
    try {
        const [posts] = await pool.query(
            "SELECT * FROM posts WHERE id = ?",
            [req.params.id]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ success: true, data: posts[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create post
export const createPost = async (req, res) => {
    try {
        const {
            title,
            content,
            author = "Admin",
            image_url = null,
            status = "draft"
        } = req.body;

        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        if (!["draft", "published"].includes(status)) {
            return res.status(400).json({
                message: "Invalid post status"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO posts
            (title, content, author, image_url, status)
            VALUES (?, ?, ?, ?, ?)`,
            [title.trim(), content, author, image_url, status]
        );

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const allowedFields = ["title", "content", "author", "image_url", "status"];

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const fields = [];
        const values = [];

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                fields.push(`${field} = ?`);
                values.push(req.body[field]);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        if (req.body.status && !["draft", "published"].includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid post status" });
        }

        const [existing] = await pool.query(
            "SELECT id FROM posts WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        values.push(id);

        await pool.query(
            `UPDATE posts SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        res.json({ success: true, message: "Post updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const [result] = await pool.query(
            "DELETE FROM posts WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};