import React, { useState, useEffect } from 'react';
import { Card } from '../types/tasks';
import styled from 'styled-components';
import spinner from '../img/spinner.gif';
import { useAppSelector, useAppDispatch, RootState } from '../redux/configureStore';
import { ColumnSelectors } from '../redux/Columns/index';
import { CardSelectors, setCardDescription } from '../redux/Card/index';
import CommentsList from './CommentsList';
import { Form, Field } from 'react-final-form';

function CardDetails() {
  const [isChangedDescription, setIsChangedDescription] = useState<boolean>();
  const dispatch = useAppDispatch();
  const currentCard = useAppSelector((state) => state.currentCard);
  const column = useAppSelector((state) => {
    return ColumnSelectors.getColumnById(state, state.currentCard.columnId!);
  });
  const card: Card = useAppSelector((state: RootState) => {
    return CardSelectors.getCardById(state, currentCard.cardId!);
  });

  function resize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.cssText = 'height:auto; padding:1';
    e.currentTarget.style.cssText = 'height:' + e.currentTarget.scrollHeight + 'px';
  }
  function keyDownHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    resize(e);
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
            {isChangedDescription ? (
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
                                  onKeyDown={keyDownHandler}
                                  onChange={input.onChange}
                                  onBlur={handleSubmit}
                                  value={input.value!}
                                  placeholder="enter description"
                                  rows={1}
                                />
                              </>
                            );
                          }}
                        />
                      </DescriptionWrapper>
                    </form>
                  );
                }}
              />
            ) : (
              <>
                <DescriptionFixed
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    setIsChangedDescription(true);
                  }}
                >
                  {card.description ? (
                    card.description
                  ) : (
                    <DescriptionHint>Click here to add a description</DescriptionHint>
                  )}
                </DescriptionFixed>
              </>
            )}
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
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 10px;
  min-height: 100px;
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
  grid-area: message;
  resize: none;
  ::placeholder {
    color: #0b97dc;
  }
`;
const DescriptionFixed = styled.div`
  background: #ffffff;
  height: auto;
  word-wrap: break-word;
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
  cursor: default;
`;
const DescriptionHint = styled.div`
  font-family: 'Balsamiq Sans', cursive;
  font-size: 15px;
  color: #5e6c84;
  grid-area: date;
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
