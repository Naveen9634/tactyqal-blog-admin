
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://tactyqal-blog-admin.onrender.com/api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "Admin",
    image_url: "",
    status: "draft",
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.success) setPosts(result.data);
    } catch (error) {
      console.error("Could not load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      alert(editingId ? "Post updated!" : "Post created!");
      resetForm();
      fetchPosts();
    } catch (error) {
      alert("Backend server se connection nahi ho paya.");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      author: "Admin",
      image_url: "",
      status: "draft",
    });
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      content: post.content,
      author: post.author,
      image_url: post.image_url || "",
      status: post.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Post delete nahi hua.");
        return;
      }

      fetchPosts();
    } catch (error) {
      alert("Backend server se connection nahi ho paya.");
    }
  };

  const publishedCount = posts.filter(
    (post) => post.status === "published"
  ).length;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="brand">Tactyqal<span> ...</span></h2>
        <p className="sidebar-label">WORKSPACE</p>
        <div className="nav-item active">▦ &nbsp; Dashboard</div>
        <div className="nav-item">▤ &nbsp; Blog Posts</div>
        <div className="nav-item">⚙ &nbsp; Settings</div>
        <div className="sidebar-bottom">Blog Management System</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
  <span className="blog-title-cyan">Blog</span>{" "}
  <span className="dashboard-title-purple">Dashboard</span>
</h1>
            <p>Manage your blog content in one place.</p>
          </div>
          <div className="admin-profile">
            <div className="avatar">A</div>
            <span>Admin</span>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <p>Total Posts</p>
            <h2>{posts.length}</h2>
          </div>
          <div className="stat-card">
            <p>Published Posts</p>
            <h2>{publishedCount}</h2>
          </div>
          <div className="stat-card">
            <p>Draft Posts</p>
            <h2>{posts.length - publishedCount}</h2>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>
  {editingId ? (
    "Edit Post"
  ) : (
    <>
      <span className="blog-title-cyan">Create</span>{" "}
      <span className="dashboard-title-purple">New Post</span>
    </>
  )}
</h2>
              <p>Add and manage your blog content.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="post-form">
            <label>Post Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />

            <label>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your blog content..."
              rows="5"
              required
            />

            <div className="form-row">
              <div>
                <label>Author</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Image URL</label>
                <input
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <label>Post Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                {editingId ? "Update Post" : "+ Create Post"}
              </button>
              {editingId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel posts-panel">
          <div className="section-heading">
            <div>
              <h2>
  <span className="blog-title-cyan">All Blog</span>{" "}
  <span className="dashboard-title-purple">Posts</span>
</h2>
              <p>Your latest blog content.</p>
            </div>
            <span className="post-count">{posts.length} Posts</span>
          </div>

          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="empty-state">No posts yet. Create your first post above.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.author}</td>
                      <td>
                        <span className={`status ${post.status}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
