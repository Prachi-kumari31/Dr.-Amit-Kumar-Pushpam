import React from "react";

import {
  UserRound,
  MessageCircle,
} from "lucide-react";

import "./CommentItem.css";

const CommentItem = ({
  comment,
}) => {
  if (!comment) return null;

  const author =
    comment.author?.name ||
    comment.author?.fullName ||
    comment.author?.username ||
    "Anonymous";

  const avatar =
    comment.author?.avatar ||
    comment.author?.profilePicture ||
    "";

  const date =
    comment.createdAt
      ? new Date(
          comment.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "";

  return (
    <article className="comment-item">
      <div className="comment-item-avatar">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
          />
        ) : (
          <>
            {author
              .charAt(0)
              .toUpperCase() || (
              <UserRound size={17} />
            )}
          </>
        )}
      </div>

      <div className="comment-item-content">
        <div className="comment-item-top">
          <div>
            <h4>{author}</h4>

            <span>
              {date}
            </span>
          </div>

          <MessageCircle
            size={16}
          />
        </div>

        <p>{comment.text}</p>

        {comment.replies?.length >
          0 && (
          <div className="comment-replies">
            {comment.replies.map(
              (reply) => {
                const replyAuthor =
                  reply.author
                    ?.name ||
                  reply.author
                    ?.fullName ||
                  reply.author
                    ?.username ||
                  "User";

                return (
                  <div
                    className="comment-reply"
                    key={
                      reply._id
                    }
                  >
                    <strong>
                      {
                        replyAuthor
                      }
                    </strong>

                    <p>
                      {
                        reply.text
                      }
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentItem;