// File: src/ContextApiComponent/AppContext.js

import React, { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // State variables
  const [prompt, setPrompt] = useState("");
  const [messRender, setMessRender] = useState(true);
  const [popModalRen, setPopModalRen] = useState(false);
  const [userMess, setUserMess] = useState([]);
  const [assistantMessage, setAssistantMessage] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [containerHeight, setContainerHeight] = useState("30vh");
  const [messages, setMessages] = useState([]);
  const [linkRenMess, setLinkRenMess] = useState(true);
  const [linkRen, setLinkRen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderedMessages, setRenderedMessages] = useState([]);

  // Ref for prompt input
  const promptRef = useRef();

  // Function to display messages and save to the session history
  const displayAndSentToBridge = () => {
    const sessionEntry = {
      userMessages: [...userMess],
      assistantMessages: [...assistantMessage],
    };

    setSessionHistory((prevHistory) => [...prevHistory, sessionEntry]);
    setUserMess([]);
    setAssistantMessage([]);
    setPrompt("");
    setMessRender(true);
    setPopModalRen(false);
    setContainerHeight("30vh");
    setMessages([]);
  };

  // Retrieve session data by index
  const retrieveDataFromBridge = (index) => {
    if (index < 0 || index >= sessionHistory.length) {
      console.error("Invalid session index.");
      return;
    }

    const session = sessionHistory[index];
    setMessages([session]);
    setUserMess(session.userMessages || []);
    setAssistantMessage(session.assistantMessages || []);
    setPrompt("");
    setMessRender(false);
    setContainerHeight("70vh");
  };

  // Handle prompt submission
  const handlePromptSubmit = async (prompt) => {
    if (!prompt) {
      console.warn("No prompt provided. Skipping submission.");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: prompt, type: "user" },
    ]);

    setUserMess((prevUserMess) => [...prevUserMess, prompt]);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/get-suggestions/",
        { prompt }
      );

      const responseMessage =
        response.status === 200 && response.data?.suggestion
          ? response.data.suggestion
          : "Default fallback response";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseMessage, type: "response" },
      ]);

      setAssistantMessage((prevAssistantMessage) => [
        ...prevAssistantMessage,
        responseMessage,
      ]);
    } catch (error) {
      console.error("Error during API request:", error);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to fetch response", type: "response" },
      ]);

      setAssistantMessage((prevAssistantMessage) => [
        ...prevAssistantMessage,
        "Error: Unable to fetch response",
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle user input
  const getInput = () => {
    setMessRender(false);
    const input = promptRef.current.value;
    setPrompt(input);
    handlePromptSubmit(input);
    promptRef.current.value = "";
    setLinkRenMess(true);
    setLinkRen(false);
  };

  // Transform messages for rendering
  const transformMessages = (messageObject) => {
    console.log(messageObject);
    console.log(typeof(messageObject));
    console.log(messageObject.length);
 
    if(messageObject.length===2 || messageObject.length%2===0){
      return messageObject;
    }
    if (Array.isArray(messageObject)) {
      const combinedMessages = [];
      messageObject.forEach((messageItem) => {
        const { userMessages = [], assistantMessages = [] } = messageItem;
        const maxLength = Math.max(userMessages.length, assistantMessages.length);

        for (let i = 0; i < maxLength; i++) {
          if (userMessages[i]) {
            combinedMessages.push({ text: userMessages[i], type: "user" });
          }
          if (assistantMessages[i]) {
            combinedMessages.push({ text: assistantMessages[i], type: "response" });
          }
        }
      });
      console.log(combinedMessages);
      return combinedMessages;
    }

    // if (typeof messageObject === "string") {
    //   console.log("message came as a string");
    //   return [{ text: messageObject, type: "user" },{ text: assistantMessage, type: "response" }];
    // }

    return [];
  };

  // Sync rendered messages when `messages` or `prompt` changes
  useEffect(() => {
    if (messages) {
      console.log(messages);
      const transformedMessages = transformMessages(messages);
      setRenderedMessages(transformedMessages);
    }
  }, [messages]);

  useEffect(() => {
    console.log("Updated Session History:", sessionHistory);
  }, [sessionHistory]);

  return (
    <AppContext.Provider
      value={{
        promptRef,
        focusInput: (str) => (promptRef.current.value = str),
        prompt,
        setPrompt,
        getInput,
        messRender,
        setMessRender,
        popModalRen,
        setPopModalRen,
        userMess,
        setUserMess,
        assistantMessage,
        setAssistantMessage,
        displayAndSentToBridge,
        sessionHistory,
        setSessionHistory,
        containerHeight,
        setContainerHeight,
        messages,
        setMessages,
        retrieveDataFromBridge,
        linkRenMess,
        setLinkRenMess,
        linkRen,
        setLinkRen,
        loading,
        setLoading,
        renderedMessages,
        setRenderedMessages,
      }}
    >
      
      {children}
    </AppContext.Provider>
  );
};
