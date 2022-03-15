import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Modal from './components/Modal';
import Popup from './components/Popup';
import CardDetails from './components/CardDetails';
import { setCurrentCard } from './redux/CurrentCard';
import { useAppSelector, useAppDispatch } from './redux/configureStore';
function App() {
  const currentCardId = useAppSelector((state) => state.currentCard.cardId);
  const dispatch = useAppDispatch();
  return (
    <>
      <Popup
        display={currentCardId === null ? false : true}
        onClose={() => dispatch(setCurrentCard({ cardId: null, columnId: null }))}
      >
        <CardDetails />
      </Popup>
      <Modal title="Enter your Name" />
      <Header title="Finger" />
      <Main />
    </>
  );
}

export default App;
