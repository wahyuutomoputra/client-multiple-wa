import React, { useState } from 'react';
import { Header, Sidebar, Footer } from './layouts';
import { Route, Switch } from 'react-router-dom';
import Routes from './routes';

function App() {

  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Switch>
        {Routes.map((prop, key) => (
          <Route exact path={prop.path} key={prop.path} component={prop.component} />
        ))}
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
