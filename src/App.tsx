import React, { useState } from 'react';
import { Game } from './components/game';
import { Editor } from './components/editor';

function App() {
  const isAdmin = true;
  return (
    <>
      {isAdmin && <Editor></Editor>}
      {!isAdmin && <Game></Game>}
    </>
  );
}

export default App;
