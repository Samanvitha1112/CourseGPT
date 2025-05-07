import React, { useState } from 'react';
import '../ComponentCss/FullpageRender.css';
import MainPageRender from './MainPageRender';
import SidePageRender from './SidePageRender';
// bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';


const FullpageRender = () => {
  // State to toggle the visibility of the SidePageRender component
  const [sidePageVisible, setSidePageVisible] = useState(true);

  const toggleSidePage = () => {
    setSidePageVisible(prevState => !prevState);
  };

  return (
    <div className="fullpage-container">
      <div className="mainpage-wrapper" style={{ flex: sidePageVisible ? 3 : 1 }}>
        <MainPageRender />
        <button className="toggle-btn" onClick={toggleSidePage}>
          {/* Display left arrow if the side page is visible, otherwise right arrow */}
          <i className={`bi ${sidePageVisible ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
        </button>
      </div>

      {sidePageVisible && (
        <div className="sidepage-wrapper">
          <SidePageRender />
        </div>
      )}
    </div>
  );
};

export default FullpageRender;
