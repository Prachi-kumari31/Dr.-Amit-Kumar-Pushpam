import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  UserRound,
  Send,
  MessageCircle,
  Check,
  AlertCircle,
} from "lucide-react";

import {
  getComments,
  createComment,
} from "../api/commentApi";

import "./CommentSection.css";

export default function CommentSection({
  contentId,
  contentType = "Content",
}) {
  const [comments, setComments] =
    useState([]);

  const [name, setName] =
    useState("");

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH COMMENTS
  |--------------------------------------------------------------------------
  */

  const loadComments =
    useCallback(async () => {
      if (!contentId) return;

      try {
        setLoading(true);
        setError("");

        const response =
          await getComments(
            contentId,
            contentType
          );

        setComments(
          Array.isArray(
            response?.data
          )
            ? response.data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load comments:",
          err
        );

        setComments([]);

        setError(
          "Unable to load comments."
        );
      } finally {
        setLoading(false);
      }
    }, [
      contentId,
      contentType,
    ]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT COMMENT
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      const cleanName =
        name.trim();

      const cleanText =
        text.trim();

      if (!cleanName) {
        setError(
          "Please enter your name."
        );
        return;
      }

      if (!cleanText) {
        setError(
          "Please write a comment."
        );
        return;
      }

      if (!contentId) {
        setError(
          "Content information is unavailable."
        );
        return;
      }

      try {
        setSubmitting(true);

        const response =
          await createComment(
            contentId,
            contentType,
            cleanName,
            cleanText
          );

        if (
          response?.success === false
        ) {
          throw new Error(
            response?.message ||
              "Unable to submit comment."
          );
        }

        setName("");
        setText("");

        setSuccess(
          "Your comment has been submitted for review. It will appear after admin approval."
        );
      } catch (err) {
        console.error(
          "Comment submission failed:",
          err?.response?.data ||
            err
        );

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Unable to submit your comment."
        );
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <section
      className="comment-section"
      id="comments"
    >
      <div className="comment-section-header">
        <div>
          <span className="comment-kicker">
            COMMUNITY
          </span>

          <h2>
            Join the conversation
          </h2>

          <p>
            Share your thoughts,
            reflections or questions.
          </p>
        </div>

        <div className="comment-count">
          <MessageCircle size={17} />
          <span>
            {comments.length}
          </span>
        </div>
      </div>

      {/* FORM */}

      <form
        className="comment-form"
        onSubmit={handleSubmit}
      >
        <div className="comment-form-header">
          <div className="comment-avatar">
            <UserRound size={20} />
          </div>

          <div>
            <strong>
              Leave a comment
            </strong>

            <span>
              No account or email required.
            </span>
          </div>
        </div>

        {/* NAME */}

        <div className="comment-field">
          <label htmlFor="comment-name">
            Your name
          </label>

          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Enter your name"
            maxLength={100}
          />
        </div>

        {/* COMMENT */}

        <div className="comment-field">
          <label htmlFor="comment-text">
            Your comment
          </label>

          <textarea
            id="comment-text"
            value={text}
            onChange={(event) =>
              setText(
                event.target.value
              )
            }
            placeholder="Write your thoughts..."
            rows={5}
            maxLength={1000}
          />
        </div>

        <div className="comment-form-footer">
          <span>
            {text.length}/1000
          </span>

          <button
            type="submit"
            disabled={
              submitting ||
              !name.trim() ||
              !text.trim()
            }
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                Submit comment
                <Send size={15} />
              </>
            )}
          </button>
        </div>

        {success && (
          <div className="comment-success">
            <Check size={16} />
            {success}
          </div>
        )}

        {error && (
          <div className="comment-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </form>

      {/* COMMENTS */}

      <div className="comments-list">
        {loading ? (
          <div className="comments-state">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="comments-empty">
            <MessageCircle size={28} />

            <h3>
              No comments yet
            </h3>

            <p>
              Be the first to share
              your perspective.
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
                  {comment.author
                    ?.avatar ? (
                    <img
                      src={
                        comment.author
                          .avatar
                      }
                      alt={
                        comment.name ||
                        comment.author
                          ?.name ||
                        "Reader"
                      }
                    />
                  ) : (
                    <UserRound
                      size={19}
                    />
                  )}
                </div>

                <div className="comment-body">
                  <div className="comment-top">
                    <strong>
                      {comment.name ||
                        comment.author
                          ?.name ||
                        "Reader"}
                    </strong>

                    <span>
                      {comment.createdAt
                        ? new Date(
                            comment.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}
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