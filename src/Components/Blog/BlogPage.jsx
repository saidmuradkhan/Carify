import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaCalendarAlt } from 'react-icons/fa';
import './BlogPage.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blogPosts');
        setPosts(response.data);
      } catch (error) {
        console.error("Bloqları yükləyərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">Bloq</h1>
        {loading ? (
          <p className="loading-text">Yüklənir...</p>
        ) : (
          <div className="blog-page-grid">
            {posts.map(post => (
              <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
                <div className="blog-img">
                  <img src={post.sekil} alt={post.baslik} />
                </div>
                <div className="blog-content">
                  <div className="blog-date">
                    <FaCalendarAlt />
                    <span>{post.tarix}</span>
                  </div>
                  <h3 className="blog-title">{post.baslik}</h3>
                  <p className="blog-desc">{post.qisa_tesvir.substring(0, 120)}...</p>
                  <span className="read-more">Ətraflı oxu &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
