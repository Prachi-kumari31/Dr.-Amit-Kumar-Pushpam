import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUserCircle,
  FaPaperPlane,
  FaCommentAlt,
} from "react-icons/fa";

import {
  getComments,
  createComment,
} from "../api/commentApi";

export default function StoryComments({
  contentId,
  contentType,
}) {
  const [comments, setComments] =
    useState([]);

  const [name, setName] =
    useState("");

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const loadComments = async () => {
    try {
      setLoading(true);

      const response =
        await getComments(
          contentId,
          contentType
        );

      setComments(
        response?.data || []
      );
    } catch (error) {
      console.error(
        "Comments error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contentId) {
      loadComments();
    }
  }, [contentId, contentType]);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      setMessage(
        "Please enter your name and comment."
      );
      return;
    }

    try {
      setSending(true);
      setMessage("");

      await createComment(
        contentId,
        name,
        text,
        contentType
      );

      setName("");
      setText("");

      setMessage(
        "Thank you! Your comment has been submitted for approval."
      );
    } catch (error) {
      setMessage(
        error?.response?.data
          ?.message ||
          "Unable to submit comment."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="story-comments">
      <div className="comments-heading">
        <span>
          <FaCommentAlt />
          COMMUNITY
        </span>

        <h2>
          Join the conversation
        </h2>

        <p>
          Share your thoughts,
          reflections or perspective.
        </p>
      </div>

      <form
        className="comment-form"
        onSubmit={handleSubmit}
      >
        <div className="comment-form-row">
          <div className="comment-input">
            <FaUserCircle />

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Your name"
            />
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Write your thoughts..."
          rows="5"
        />

        <div className="comment-form-footer">
          {message && (
            <span className="comment-message">
              {message}
            </span>
          )}

          <button
            type="submit"
            disabled={sending}
          >
            <FaPaperPlane />

            {sending
              ? "Submitting..."
              : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {loading ? (
          <p>
            Loading comments...
          </p>
        ) : comments.length ===
          0 ? (
          <div className="no-comments">
            <FaCommentAlt />

            <h3>
              Be the first to comment
            </h3>

            <p>
              Your perspective could
              start a meaningful
              conversation.
            </p>
          </div>
        ) : (
          comments.map(
            (comment) => (
              <article
                className="comment-item"
                key={comment._id}
              >
                <div className="comment-avatar">
                  <FaUserCircle />
                </div>

                <div className="comment-body">
                  <div className="comment-meta">
                    <strong>
                      {comment.name}
                    </strong>

                    <span>
                      {new Date(
                        comment.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <p>
                    {comment.text}
                  </p>
                </div>
              </article>
            )
          )
        )}
      </div>
    </section>
  );
}