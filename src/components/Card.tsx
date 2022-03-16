import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../types/tasks';
import commentImage from '../img/comment.png';
import pencil from '../img/pencil.svg';
import cross from '../img/cross.svg';
import dell from '../img/delete.svg';
import { setCurrentCard } from '../redux/CurrentCard/index';
import { setCardName, deleteCard } from '../redux/Card/index';
import { CommentSelectors } from '../redux/Comment';
import { Form, Field } from 'react-final-form';
import { useAppSelector, useAppDispatch } from '../redux/configureStore';

type CardProps = {
  card: CardType;
  columnId: string;
  selectCardHandler?: (id: string, columnId: string) => void;
  deleteCardHandler?: (cardId: string) => void;
  setCardName?: (id: string, title: string) => void;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const [isChangedCard, setIsChangedCard] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const comments = useAppSelector((state) => CommentSelectors.getCommentsByCardId(state, card.id));
  const dispatch = useAppDispatch();
  type FormType = {
    title?: string;
  };
  function resize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    setTimeout(function () {
      textAreaRef.current!.style.cssText = 'height:auto; padding:1';
      textAreaRef.current!.style.cssText = 'height:' + textAreaRef.current!.scrollHeight + 'px';
    }, 1);
  }
  const onSubmit = (e: FormType) => {
    dispatch(setCardName!({ id: card.id, title: e.title! }));
    setIsChangedCard(false);
  };

  const validate = (e: FormType) => {
    const errors: FormType = {};
    if (e.title && e.title.length < 5) errors.title = 'Too short';

    return errors;
  };
  return (
    <CardListItem
      onClick={() => dispatch(setCurrentCard({ cardId: card.id, columnId: card.columnId }))}
    >
      <EditButtonWrapper
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setIsChangedCard(true);
        }}
      >
        <EditButton src={pencil} />
      </EditButtonWrapper>
      <DeleteButtonWrapper
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteCard({ cardId: card.id }));
        }}
      >
        <DeleteButton src={dell} />
      </DeleteButtonWrapper>
      {isChangedCard ? (
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextAreaWrapper>
                <Field
                  name="title"
                  initialValue={card.title}
                  render={({ input, meta }) => (
                    <>
                      {meta.touched && meta.error && (
                        <span className="error-message">{meta.error}</span>
                      )}
                      <CardTitleTextArea
                        ref={textAreaRef}
                        onKeyPress={resize}
                        onClick={(e) => e.stopPropagation()}
                        onChange={input.onChange}
                        value={input.value}
                        rows={1}
                      />
                    </>
                  )}
                />
                <ButtonsWrapper>
                  <SaveButton
                    type="submit"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                  >
                    Save title
                  </SaveButton>
                  <CloseButton
                    src={cross}
                    onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                      e.stopPropagation();
                      setIsChangedCard(false);
                    }}
                  />
                </ButtonsWrapper>
              </TextAreaWrapper>
            </form>
          )}
        />
      ) : (
        <CardListItemTitle>{card.title}</CardListItemTitle>
      )}
      <CardBottom>
        <CommentImage src={commentImage} />
        <CommentCount>{comments.length}</CommentCount>
      </CardBottom>
    </CardListItem>
  );
};

const CardListItem = styled.div`
  background-color: white;
  border-radius: 10px;
  min-height: 60px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  position: relative;
`;
const CardListItemTitle = styled.div`
  font-family: 'Balsamiq Sans', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #0b97dc;
  padding: 5px;
`;
const CardBottom = styled.div`
  display: flex;
  padding: 5px 5px;
  align-items: center;
`;
const CommentImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 3px;
`;
const CommentCount = styled.div`
  font-family: 'Balsamiq Sans', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: #e1528d;
`;
const EditButtonWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 5;
  border-radius: 15px;
  background: rgb(255 255 255 / 77%);
  top: 5px;
  right: 5px;
  display: none;
  ${CardListItem}:hover & {
    display: block;
  }
  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(0.98);
  }
`;
const EditButton = styled.img`
  width: 100%;
  height: 100%;
`;
const DeleteButtonWrapper = styled(EditButtonWrapper)`
  top: auto;
  bottom: 5px;
`;
const DeleteButton = styled(EditButton)`
  color: white;
`;
const CardTitleTextArea = styled.textarea`
  background: #ffffff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  font-family: 'Balsamiq Sans', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #e1528d !important;
  line-height: 20px;
  border: 1px solid #242528;
  padding: 10px;
  height: 35px;
  width: 100%;
  overflow: hidden;
  ::placeholder {
    color: #0b97dc;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
`;
const CloseButton = styled.img`
  width: 30px;
  height: 30px;
  filter: drop-shadow(1px 1px 3px white);
  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(0.98);
  }
`;

const TextAreaWrapper = styled.div``;
const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  max-width: 125px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background-color: #0b97dc;
  font-family: 'Comfortaa', cursive;
  font-weight: bold;
  font-size: 12px;
  color: white;
  padding: 5px;
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin-right: 5px;
  &:hover {
    background-color: #0a85c2;
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(0.98);
  }
`;

export default Card;
