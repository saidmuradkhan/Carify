import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/blogPosts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Bloq yazısı tapılmadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="detail-loading">Yüklənir...</div>;
  if (!post) return <div className="detail-loading">Bloq yazısı tapılmadı</div>;

  return (
    <div className="blog-detail-page">
      <div className="container">
        <Link to="/blog" className="back-link"><FaArrowLeft /> Bloqa qayıt</Link>
        <article className="blog-article">
          <div className="blog-article-img">
            <img src={post.sekil} alt={post.baslik} />
          </div>
          <div className="blog-article-date">
            <FaCalendarAlt />
            <span>{post.tarix}</span>
          </div>
          <h1>{post.baslik}</h1>
          <div className="blog-article-body">
            <p>{post.tam_metn}</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogDetail;
