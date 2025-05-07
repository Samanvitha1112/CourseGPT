import React, { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa"; // Import bin icon
import "../ComponentCss/SidePageRender.css";
import { AppContext } from "../ContextApiComponent/AppContext";

const SidePageRender = () => {
  const {
    sessionHistory,
    setSessionHistory,
    retrieveDataFromBridge,
    linkRenMess,
    setLinkRenMess,
    linkRen,
    setLinkRen,
  } = useContext(AppContext);

  // Function to handle tab deletion
  const handleDeleteTab = (index) => {
    console.log(`Deleting tab at index: ${index}`);

    // Filter out the session at the specified index
    const updatedSessionHistory = sessionHistory.filter((_, i) => i !== index);

    // Update the session history state
    setSessionHistory(updatedSessionHistory);

    // Optional: Update session storage if needed
    sessionStorage.setItem(
      "sessionHistory",
      JSON.stringify(updatedSessionHistory)
    );
  };

  // Function to handle tab click
  const handleTabClick = (index) => {
    console.log(`Tab clicked at index: ${index}`);
    retrieveDataFromBridge(index); // Call retrieveDataFromBridge with the tab index
    setLinkRenMess(false);
    setLinkRen(true);
  };

  return (
    <div className="sidepage-container">
      <h1 className="sidepage-container-header">History</h1>

      <div className="tabs-wrapper">
        <Nav variant="pills" className="flex-column tab-list">
          {sessionHistory.map((session, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                eventKey={index.toString()}
                className="tab-item"
                onClick={() => handleTabClick(index)} // Attach click handler
              >
                {session.userMessages[0] || `Session ${index + 1}`}{" "}
                {/* Default title if userMessages[0] is undefined */}
                <Button
                  variant="link"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tab click event
                    handleDeleteTab(index);
                  }}
                  className="delete-btn"
                >
                  <FaTrashAlt />
                </Button>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      <div className="tab-content-wrapper">
        {/* Empty now, no Tab content section */}
      </div>
    </div>
  );
};

export default SidePageRender;
