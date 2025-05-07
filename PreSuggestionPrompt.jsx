import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../ComponentCss/PreSuggestionPrompt.module.css'; // Assuming the CSS file is named this way

import { AppContext } from '../ContextApiComponent/AppContext';
import { useContext } from 'react';

const PreSuggestionPrompt = ({ cardData }) => {
  // Local state to manage which cards are expanded
  const [expanded, setExpanded] = useState({});
    const { promptRef, focusInput } = useContext(AppContext);

  // Toggle card expansion
  const handleLoadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle card click (example: logging headline)
  const handleCardClick = (headline) => {
    console.log(`Card clicked: ${headline}`);
    focusInput(headline);
  };

  return (
    <Row className="justify-content-center my-4">
      {cardData && cardData.length > 0 ? (
        cardData.map((card, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card
              className={styles['unique-card']}
              onClick={() => handleCardClick(card.headline)}
            >
              <Card.Body className={styles['unique-card-body']}>
                <Card.Title className={styles['unique-card-title']}>
                  {card.headline}
                </Card.Title>
                <Card.Text className={styles['unique-card-text']}>
                  {card.description}
                  {expanded[index] && (
                    <div className={styles['extra-data-scrollable']}>
                      <p>{card.extraData}</p>
                    </div>
                  )}
                </Card.Text>
              </Card.Body>
              <div className={styles['load-more-wrapper']}>
                <Button
                  className={styles['load-more-btn']}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    handleLoadMore(index);
                  }}
                >
                  {expanded[index] ? 'Show Less' : 'Load More'}
                </Button>
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <p>No data available</p>
      )}
    </Row>
  );
};

// Default props for safety
PreSuggestionPrompt.defaultProps = {
  cardData: [],
};

export default PreSuggestionPrompt;
