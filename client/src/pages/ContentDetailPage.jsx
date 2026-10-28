import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaCalendar,
  FaUser,
  FaClock,
} from "react-icons/fa";

import contentApi from "../api/contentApi";

import LoadingSpinner from "../components/LoadingState";
import CommentSection from "../components/CommentSection";
import LikeDislike from "../components/LikeDislike";

const ContentDetailPage = () => {
  const { slug } = useParams();

  const [content, setContent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);

      const response =
        await contentApi.getBySlug(slug);

      setContent(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!content) {
    return (
      <div className="content-not-found">
        <h2>Content not found</h2>

        <Link to="/publications">
          Back to Publications
        </Link>
      </div>
    );
  }

  return (
    <article className="content-detail-page">

      <div className="container">

        <Link
          to="/publications"
          className="back-link"
        >
          <FaArrowLeft />
          Back to Publications
        </Link>

        <header className="content-detail-header">

          <span className="detail-type">
            {content.type}
          </span>

          <h1>{content.title}</h1>

          <p className="detail-excerpt">
            {content.excerpt}
          </p>

          <div className="detail-meta">

            <span>
              <FaUser />

              {content.author?.name ||
                content.author?.fullName ||
                "Prosper Foundation"}
            </span>

            <span>
              <FaCalendar />

              {new Date(
                content.publishedAt ||
                  content.createdAt
              ).toLocaleDateString()}
            </span>

            {content.readTime && (
              <span>
                <FaClock />
                {content.readTime} min read
              </span>
            )}

          </div>

        </header>

        {content.image && (
          <div className="detail-cover">

            <img
              src={content.image}
              alt={content.title}
            />

          </div>
        )}

        <div className="content-detail-layout">

          <main className="content-detail-main">

            <div
              className="content-body"
              dangerouslySetInnerHTML={{
                __html:
                  content.content,
              }}
            />

            <LikeDislike
  contentId={content._id}
  likes={content.likes}
  dislikes={content.dislikes}
  onUpdate={(data) => {
    setContent((prev) => ({
      ...prev,
      likes: data.likes,
      dislikes: data.dislikes,
    }));
  }}
/>

            <CommentSection
  contentId={content._id}
  contentType="Content"
/>

          </main>

        </div>

      </div>

    </article>
  );
};

export default ContentDetailPage;