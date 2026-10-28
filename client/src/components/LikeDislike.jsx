import React, {
  useState,
} from "react";

import {
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import "./LikeDislike.css";

import contentApi from "../api/contentApi";

const LikeDislike = ({
  id,
  type = "content",
  likes = 0,
  dislikes = 0,
  liked = false,
  disliked = false,
  onUpdate,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [localLikes, setLocalLikes] =
    useState(likes || 0);

  const [
    localDislikes,
    setLocalDislikes,
  ] = useState(dislikes || 0);

  const [
    localLiked,
    setLocalLiked,
  ] = useState(Boolean(liked));

  const [
    localDisliked,
    setLocalDisliked,
  ] = useState(Boolean(disliked));

  const getApiFunction = (
    action
  ) => {
    if (type === "blog") {
      return action === "like"
        ? contentApi.likeBlog
        : contentApi.dislikeBlog;
    }

    if (type === "publication") {
      return action === "like"
        ? contentApi.likePublication
        : contentApi.dislikePublication;
    }

    return action === "like"
      ? contentApi.likeContent
      : contentApi.dislikeContent;
  };

  const handleAction = async (
    action
  ) => {
    if (!id || loading) return;

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      window.dispatchEvent(
        new CustomEvent(
          "auth-required"
        )
      );

      alert(
        "Please login to like or dislike this content."
      );

      return;
    }

    try {
      setLoading(true);

      const apiFunction =
        getApiFunction(action);

      const response =
        await apiFunction(id);

      const data =
        response?.data || response;

      if (
        typeof data.likes ===
        "number"
      ) {
        setLocalLikes(
          data.likes
        );
      }

      if (
        typeof data.dislikes ===
        "number"
      ) {
        setLocalDislikes(
          data.dislikes
        );
      }

      if (
        typeof data.liked ===
        "boolean"
      ) {
        setLocalLiked(
          data.liked
        );
      }

      if (
        typeof data.disliked ===
        "boolean"
      ) {
        setLocalDisliked(
          data.disliked
        );
      }

      onUpdate?.(data);
    } catch (error) {
      alert(
        error.message ||
          "Unable to update reaction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`like-dislike ${
        loading
          ? "like-dislike-loading"
          : ""
      }`}
    >
      <button
        type="button"
        className={`reaction-button ${
          localLiked
            ? "reaction-active"
            : ""
        }`}
        disabled={loading}
        onClick={() =>
          handleAction("like")
        }
      >
        <ThumbsUp
          size={17}
          fill={
            localLiked
              ? "currentColor"
              : "none"
          }
        />
        <span>
          {localLikes}
        </span>
        <small>Like</small>
      </button>

      <div className="reaction-divider" />

      <button
        type="button"
        className={`reaction-button ${
          localDisliked
            ? "reaction-active-dislike"
            : ""
        }`}
        disabled={loading}
        onClick={() =>
          handleAction("dislike")
        }
      >
        <ThumbsDown
          size={17}
          fill={
            localDisliked
              ? "currentColor"
              : "none"
          }
        />
        <span>
          {localDislikes}
        </span>
        <small>Dislike</small>
      </button>
    </div>
  );
};

export default LikeDislike;