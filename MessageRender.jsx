import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../ComponentCss/MessageRender.module.css";
import { useContext, useCallback } from "react";
import { AppContext } from "../ContextApiComponent/AppContext";

const MessageRender = ({ setMessages, messages }) => {
  // const [loading, setLoading] = useState(false);
  // const [renderedMessages, setRenderedMessages] = useState([]);

  const {
    userMess,
    setUserMess,
    assistantMessage,
    setAssistantMessage,
    containerHeight,
    setContainerHeight,
    renderedMessages,
    setRenderedMessages,
    loading,
    setLoading,
    prompt,
    setPrompt,
  } = useContext(AppContext);

  const transformMessages = useCallback((messages) => {
    if (!messages) return [];

    // Handle array of message objects
    if (Array.isArray(messages)) {
      return messages.flatMap((msg) => {
        if (msg.userMessages && msg.assistantMessages) {
          return msg.userMessages
            .map((userMsg, i) => [
              { text: userMsg, type: "user" },
              { text: msg.assistantMessages[i] || "", type: "response" },
            ])
            .flat();
        }
        return msg;
      });
    }

    return [];
  }, []);

  useEffect(() => {
    const transformed = transformMessages(messages);
    setRenderedMessages(transformed);
    setContainerHeight(transformed.length ? "70vh" : "30vh");
  }, [messages, transformMessages]);

  return (
    <div
      className={styles["message-container"]}
      style={{ height: containerHeight }}
    >
      {loading && (
        <div className={styles["loading-indicator"]}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {renderedMessages.map((message, index) => (
        <div
          key={index}
          className={`${styles["message-row"]} ${
            message.type === "user"
              ? styles["user-message"]
              : styles["response-message"]
          }`}
        >
          <div className={styles["message-content"]}>{message.text}</div>
        </div>
      ))}
    </div>
  );
};
export default MessageRender;
