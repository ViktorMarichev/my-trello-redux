import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import spinner from '../img/spinner.gif';
import { useAppSelector, useAppDispatch } from '../redux/configureStore';
import { ColumnSelectors } from '../redux/Columns/index';
import { CardSelectors, setCardDescription } from '../redux/Card/index';
import CommentsList from './CommentsList';
import { Form, Field } from 'react-final-form';
type cardInfoProps = {};

function CardDetails(props: cardInfoProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isChangedDescription, setIsChangedDescription] = useState<boolean>();
  const dispatch = useAppDispatch();
  const currentCard = useAppSelector((state) => state.currentCard);
  const column = useAppSelector((state) => {
    return ColumnSelectors.getColumnById(state, state.currentCard.columnId!);
  });
  const card = useAppSelector((state) => {
    return CardSelectors.getCardById(state, currentCard.cardId!);
  });
  function resize() {
    setTimeout(function () {
      textAreaRef.current!.style.cssText = 'height:auto; padding:0';
      textAreaRef.current!.style.cssText = 'height:' + textAreaRef.current!.scrollHeight + 'px';
    }, 1);
  }
  function keyDownHandler() {
    resize();
    if (textAreaRef.current!.value != card.description) setIsChangedDescription(true);
    else setIsChangedDescription(false);
  }

  type FormType = {
    description?: string;
  };
  const submitDesc = (e: FormType) => {
    dispatch(setCardDescription({ id: card.id, description: e.description }));
    setIsChangedDescription(false);
  };
  const descValidate = (e: FormType) => {
    const errors: FormType = {};
    if (e.description && e.description.length < 10) errors.description = 'Too short';
    return errors;
  };
  useEffect(() => {
    if (card === undefined) return;
  }, []);

  return (
    <InfoBody>
      <>
        {card ? (
          <>
            {' '}
            <TitleWrapper>
              <Title>{card.title}</Title>
              <ColumnName>{column.title}</ColumnName>
            </TitleWrapper>
            <Form
              onSubmit={submitDesc}
              validate={descValidate}
              render={({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <DescriptionWrapper>
                      <Field
                        name="description"
                        initialValue={card.description}
                        render={({ input, meta }) => {
                          return (
                            <>
                              <Description
                                ref={textAreaRef}
                                onKeyDown={keyDownHandler}
                                onChange={input.onChange}
                                value={input.value!}
                                placeholder="enter description"
                                rows={1}
                              />
                            </>
                          );
                        }}
                      />
                    </DescriptionWrapper>
                    {isChangedDescription ? (
                      <ButtonWrapper>
                        <SaveDescriptionButton type="submit">Save</SaveDescriptionButton>
                      </ButtonWrapper>
                    ) : null}
                  </form>
                );
              }}
            />
            <AuthorWrapper>author:{card.author}</AuthorWrapper>
            <CommentsList cardId={card.id} />
          </>
        ) : (
          <Spinner src={spinner} />
        )}
      </>
    </InfoBody>
  );
}
const InfoBody = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  padding: 10px 8px;
`;
const Title = styled.div`
  font-family: 'Balsamiq Sans', cursive;
  font-weight: bold;
  font-size: 20px;
  color: #0b97dc;
`;
const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Description = styled.textarea`
  background: #ffffff;
  overflow-y: hidden;
  height: auto;
  min-height: 100px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  font-family: 'Balsamiq Sans', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #e1528d !important;
  line-height: 25px;
  padding: 10px;
  width: 100%;
  resize: none;
  ::placeholder {
    color: #0b97dc;
  }
`;
const SaveDescriptionButton = styled.button`
  height: 40px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background-color: #0b97dc;
  font-family: 'Comfortaa', cursive;
  font-weight: bold;
  font-size: 15px;
  color: white;
  padding: 10px 10px 10px 16px;
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
const ButtonWrapper = styled.div`
  padding: 5px;
  font-family: 'Balsamiq Sans', cursive;
  font-size: 15px;
  width: 100%;
`;
const Spinner = styled.img`
  width: 40px;
  height: 40px;
`;
const ColumnName = styled.div`
  width: 100%;
  color: #5e6c84;
`;
const AuthorWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export default CardDetails;
