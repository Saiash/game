import React, { useState } from 'react';
import { Game } from './components/game';
import { Editor } from './components/editor';
import { Generator } from './components/generator';

const ROUTES = {
  game: '/',
  admin: '/admin',
  generator: '/generator',
};

function App() {
  const path = window.location.pathname;
  const isAdmin = path === '/admin';
  return (
    <>
      {path === ROUTES.admin && <Editor></Editor>}
      {path === ROUTES.generator && <Generator></Generator>}
      {path === ROUTES.game && <Game></Game>}
    </>
  );
}

export default App;
