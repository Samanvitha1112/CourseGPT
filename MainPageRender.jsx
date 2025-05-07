import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { IoSparklesOutline } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { AiOutlineWindows } from "react-icons/ai";
import styles from "../ComponentCss/MainPageRender.module.css";
import MessageRender from "./MessageRender";
import { AppContext } from "../ContextApiComponent/AppContext";
import PreSuggestionPrompt from "../Components/PreSuggestionPrompt";
import PopupModal from "./PopupModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const MainPageRender = () => {
  const [expanded, setExpanded] = useState([]);
  const [showPromptCards, setShowPromptCards] = useState(false);

  const {
    promptRef,
    focusInput,
    prompt,
    setPrompt,
    getInput,
    messRender,
    setMessRender,
    popModalRen,
    setPopModalRen,
    displayAndSentToBridge,
    setMessages,
    messages,
  } = useContext(AppContext);

  // Updated CourseGPT card data
  const cardData = [
    {
      headline: "Lesson Generator",
      description: "Create structured lessons with AI in seconds.",
      icon: "📚", // Added icon
    },
    {
      headline: "Module Organizer",
      description: "Drag-and-drop lessons into cohesive modules.",
      icon: "🗂️", // Added icon
    },
    {
      headline: "Interactive Editor",
      description: "Edit and refine AI-generated content effortlessly.",
      icon: "✏️", // Added icon
    },
  ];

  const handleCardClick = (headline) => {
    setPrompt(headline);
  };

  const handleLoadMore = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const generateMoreCards = () => {
    const moreCards = [];
    for (let i = 1; i <= 20; i++) {
      moreCards.push({
        headline: `Course Template ${i}`,
        description: `Example course structure ${i}`,
      });
    }
    return moreCards;
  };

  return (
    <Container className={styles["unique-container"]}>
      <Row className="justify-content-center">
        <Col md="auto">
          <h1 className={styles["unique-title"]}>CourseGPT</h1>
        </Col>
      </Row>

      <div className={styles["animated-text"]}>
        AI-Powered Course Authoring Tool
      </div>

      {messRender && <PreSuggestionPrompt cardData={cardData} />}

      <MessageRender
        prompt={prompt}
        setPrompt={setPrompt}
        setMessages={setMessages}
        messages={messages}
      />

      <div className={styles["prompt-container"]}>
        <Form className={styles["prompt-form"]}>
          <Form.Group controlId="promptInput">
            <Form.Control
              type="text"
              placeholder="Describe your course topic..." // Updated placeholder
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={styles["unique-input"]}
              ref={promptRef}
            />
          </Form.Group>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Generate Course Content</Tooltip>} // Updated tooltip
          >
            <Button className={styles["unique-submit-btn"]} onClick={getInput}>
              <FaArrowRightToBracket />
            </Button>
          </OverlayTrigger>
        </Form>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Get Course Suggestions</Tooltip>} // Updated tooltip
        >
          <Button
            variant="link"
            className={styles["prompt-icon-btn"]}
            onClick={() => setPopModalRen(!popModalRen)}
          >
            <IoSparklesOutline size={40} color="#007bff" />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Start New Course</Tooltip>} // Updated tooltip
        >
          <Button
            variant="link"
            className={styles["prompt-icon-btn"]}
            onClick={displayAndSentToBridge}
          >
            <AiOutlineWindows size={40} color="#007bff" />
          </Button>
        </OverlayTrigger>
      </div>

      {popModalRen && <PopupModal generateMoreCards={generateMoreCards} />}
    </Container>
  );
};

export default MainPageRender;
