import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Modal from './components/Modal';
function App() {
  return (
    <>
      <Modal title="Enter your Name" />
      <Header title="Finger" />
      <Main />
    </>
  );
}

export default App;
