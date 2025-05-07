import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styles from "../ComponentCss/MainPageRender.module.css"; // Import the CSS for styling
import { AppContext } from "../ContextApiComponent/AppContext";
import { useContext } from "react";

const PopupModal = ({ generateMoreCards }) => {
  const { popModalRen, setPopModalRen,focusInput } = useContext(AppContext);
  console.log(popModalRen);

  // Function to handle stopping the modal render
  const stopRender = () => {
    setPopModalRen(false);
    console.log(popModalRen);
  };

  // Function to handle card click event
  const handleCardClick = (headline, description) => {
    console.log("Card Clicked:");
    console.log("Headline:", headline);
    console.log("Description:", description);
    focusInput(headline);
    setPopModalRen(false);
  };

  return (
    <div className={styles["popup-modal"]}>
      <div className={styles["popup-header"]}>
        <Button
          variant="link"
          className={styles["close-btn"]}
          onClick={stopRender}
        >
          <FaTimes size={60} color="#ff0000" />
        </Button>
        <h3>More Prompt Cards</h3>
      </div>
      <div className={styles["popup-content"]}>
        {generateMoreCards().map((card, index) => (
          <Card
            key={index}
            className={styles["popup-card"]}
            onClick={() => handleCardClick(card.headline, card.description)} // Add onClick handler here
          >
            <Card.Body>
              <Card.Title>{card.headline}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopupModal;
