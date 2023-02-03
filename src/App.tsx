import React, { useState } from 'react';
import { Game } from './components/game';
import { Editor } from './components/editor';

function App() {
  const path = window.location.pathname;
  const isAdmin = path === "/admin";
  return (
    <>
      {isAdmin && <Editor></Editor>}
      {!isAdmin && <Game></Game>}
    </>
  );
}

export default App;
