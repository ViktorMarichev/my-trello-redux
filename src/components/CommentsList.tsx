import React from 'react';
import styled from 'styled-components';
import userImage from '../img/userImage.png';
import CommentItem from './CommentItem';
import { Form, Field } from 'react-final-form';
import { useAppSelector, useAppDispatch } from '../redux/configureStore';
import { addComment } from '../redux/Comment/index';
import { CommentSelectors } from '../redux/Comment';
import { Comment } from '../types/tasks';
type commentListProps = {
  cardId: string;
};
const CommentList: React.FC<commentListProps> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const comments = useAppSelector((state) => CommentSelectors.getCommentsByCardId(state, cardId));
  function resize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.cssText = 'height:auto; padding:1';
    e.currentTarget.style.cssText = 'height:' + e.currentTarget.scrollHeight + 'px';
  }
  type FormType = {
    message?: string;
  };
  const sendComment = (e: FormType) => {
    dispatch(
      addComment({
        cardId: cardId,
        message: e.message,
        username,
      })
    );
    e.message = '';
  };
  const validateComment = (e: FormType) => {
    const errors: FormType = {};
    if (e.message && e.message.length < 3) errors.message = 'Too Short';
    return errors;
  };
  return (
    <CommentListWrapper>
      <Form
        onSubmit={sendComment}
        validate={validateComment}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <CommentInputWrapper>
                <UserImageWrapper>
                  <UserImage src={userImage} />
                </UserImageWrapper>
                <Field
                  name="message"
                  render={({ input, meta }) => {
                    return (
                      <InputContainer>
                        {meta.touched && meta.error && (
                          <span className="error-message">{meta.error}</span>
                        )}
                        <CommentInput
                          onKeyPress={resize}
                          onChange={input.onChange}
                          placeholder="enter your comment"
                          value={input.value}
                          rows={1}
                        />
                      </InputContainer>
                    );
                  }}
                />
              </CommentInputWrapper>
              <ButtonWrapper>
                <SaveCommentButton type="submit">Send</SaveCommentButton>
              </ButtonWrapper>

              <CommentsList>
                {comments.map((elem: Comment) => {
                  return <CommentItem comment={elem} key={elem.id} />;
                })}
              </CommentsList>
            </form>
          );
        }}
      />
    </CommentListWrapper>
  );
};
const CommentListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #5e6c84;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-top: 5px;
  padding: 5px 5px;
  box-sizing: border-box;
`;
const InputContainer = styled.div`
  width: 100%;
`;
const CommentInput = styled.textarea`
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
  resize: none;
  ::placeholder {
    color: #0b97dc;
  }
`;
const UserImageWrapper = styled.div`
  padding: 3px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  grid-area: userImage;
`;
const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CommentInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const CommentsList = styled.div`
  width: 100%;
`;
const SaveCommentButton = styled.button`
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
  width: 100%;
`;
export default CommentList;
