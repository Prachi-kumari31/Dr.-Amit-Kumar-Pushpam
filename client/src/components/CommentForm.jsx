import React, {
  useState,
} from "react";

import {
  Send,
  UserRound,
} from "lucide-react";

import commentApi from "../api/commentApi";

import "./CommentForm.css";

const CommentForm = ({
  contentId,
  onCommentCreated,
}) => {
  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem(
      "token"
    );

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!token) {
      setError(
        "Please login to leave a comment."
      );
      return;
    }

    if (!text.trim()) {
      setError(
        "Please write a comment before submitting."
      );
      return;
    }

    if (!contentId) {
      setError(
        "Unable to identify this content."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await commentApi.createComment(
          contentId,
          text.trim()
        );

      const comment =
        response?.data;

      setText("");

      onCommentCreated?.(
        comment
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to submit comment."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="comment-login-message">
        <div className="comment-login-icon">
          <UserRound size={20} />
        </div>

        <div>
          <strong>
            Login to join the conversation
          </strong>

          <p>
            Sign in to share your
            thoughts and participate
            in the discussion.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
    >
      <div className="comment-form-header">
        <div className="comment-form-avatar">
          <UserRound size={18} />
        </div>

        <div>
          <h4>
            Share your thoughts
          </h4>

          <p>
            Your comment will be
            reviewed before appearing
            publicly.
          </p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(event) =>
          setText(
            event.target.value
          )
        }
        placeholder="Write your comment..."
        maxLength={1000}
        rows={5}
      />

      <div className="comment-form-footer">
        <span>
          {text.length}/1000
        </span>

        <button
          type="submit"
          disabled={
            loading ||
            !text.trim()
          }
        >
          <Send size={16} />

          {loading
            ? "Submitting..."
            : "Submit Comment"}
        </button>
      </div>

      {error && (
        <div className="comment-form-error">
          {error}
        </div>
      )}
    </form>
  );
};

export default CommentForm;