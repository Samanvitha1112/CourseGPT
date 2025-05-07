import React from 'react';
import { AppProvider } from './ContextApiComponent/AppContext';
import FullpageRender from './Components/FullpageRender';

const App = () => {
  return (
    <AppProvider>
      <FullpageRender />
    </AppProvider>
  );
};

export default App;