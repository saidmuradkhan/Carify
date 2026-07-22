import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaExternalLinkAlt } from 'react-icons/fa'; // or we can use custom ↗ icon
import './BlogSection.css';

function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blogPosts?_limit=4');
        setPosts(response.data);
      } catch (error) {
        console.error("Bloqları yükləyərkən xəta:", error);
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="section blog-section">
      <div className="container">
        <div className="section-header-modern">
          <h2 className="section-title-modern">New Blogs</h2>
          <Link to="/blog" className="btn-show-all">Show All</Link>
        </div>
        
        <div className="blog-grid-modern">
          {posts.map(post => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card-modern">
              <div className="blog-img-modern">
                <img src={post.sekil} alt={post.baslik} />
              </div>
              <div className="blog-content-modern">
                <h3 className="blog-title-modern">{post.baslik}</h3>
                <p className="blog-desc-modern">{post.qisa_tesvir.substring(0, 100)}...</p>
                <hr className="blog-divider" />
                <div className="blog-footer-modern">
                  <span className="blog-time">1 day ago</span>
                  <span className="view-detail">View Detail &#x2197;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
