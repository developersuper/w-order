import React from 'react';
import Routes from 'routes/Routes';
import AuthProvider from 'contexts/Auth/AuthProvider';

const App: React.FC = () => (
  <div data-theme={process.env.REACT_APP_WHITELABEL} className={process.env.REACT_APP_LANGUAGE_DEFAULT}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </div>
);

export default App;