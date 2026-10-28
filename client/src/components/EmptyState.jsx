import React from "react";
import {
  SearchX,
  BookOpen,
} from "lucide-react";

import "./EmptyState.css";

const EmptyState = ({
  title = "Nothing found",
  message = "There is no content available at the moment.",
  action,
  search = false,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {search ? (
          <SearchX size={32} />
        ) : (
          <BookOpen size={32} />
        )}
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;