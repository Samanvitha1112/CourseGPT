import React, { useState, useEffect } from "react";
import styles from "../ComponentCss/MessageRender.module.css";
import { useContext } from "react";
import { AppContext } from "../ContextApiComponent/AppContext";

const MessageRenderFromObject = ({ messagesObject }) => {
  const { userMessages = [], assistantMessages = [] } = messagesObject || {};
  const [combinedMessages, setCombinedMessages] = useState([]);

  const {
    containerHeight,
    setContainerHeight,
  } = useContext(AppContext);

  // Combine user and assistant messages into a single array
  useEffect(() => {
    if (userMessages && assistantMessages) {
      const maxLength = Math.max(userMessages.length, assistantMessages.length);
      const combined = [];

      for (let i = 0; i < maxLength; i++) {
        if (userMessages[i]) {
          combined.push({ text: userMessages[i], type: "user" });
        }
        if (assistantMessages[i]) {
          combined.push({ text: assistantMessages[i], type: "response" });
        }
      }

      setCombinedMessages(combined);
    }
  }, [userMessages, assistantMessages]);

  useEffect(() => {
    if (combinedMessages.length > 0) {
      setContainerHeight("70vh"); // Adjust container height when messages are available
    }
  }, [combinedMessages]);

  return (
    <div
      className={styles["message-container"]}
      style={{ height: containerHeight }}
    >
      {combinedMessages.length === 0 ? (
        <div>No messages available</div>
      ) : (
        combinedMessages.map((message, index) => (
          <div key={index} className={styles["message-row"]}>
            <div
              className={
                message.type === "user"
                  ? styles["user-message"]
                  : styles["response-message"]
              }
            >
              {message.text}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageRenderFromObject;
