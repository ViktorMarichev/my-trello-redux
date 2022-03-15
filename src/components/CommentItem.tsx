import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import userImage from '../img/userImage.png';
import { Comment } from '../types/tasks';
import { useAppSelector, useAppDispatch } from '../redux/configureStore';
import cross from '../img/cross.svg';
import { CommentSelectors, changeComment } from '../redux/Comment/index';
import { deleteComment } from '../redux/Comment/index';
import { Form, Field } from 'react-final-form';
type commentItemType = {
  comment: Comment;
};
function CommentItem(props: commentItemType) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function formatDate(date: Date) {
    let dd: string | number = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: string | number = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: string | number = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }
  function resize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    setTimeout(function () {
      textAreaRef.current!.style.cssText = 'height:auto; padding:1';
      textAreaRef.current!.style.cssText = 'height:' + textAreaRef.current!.scrollHeight + 'px';
    }, 1);
  }
  type FormType = {
    message?: string;
  };

  const submitComment = (e: FormType) => {
    dispatch(changeComment({ id: props.comment.id, message: e.message }));
    setIsChanged(false);
  };

  const validateComment = (e: FormType) => {
    const errors: FormType = {};
    if (e.message && e.message?.length < 5) errors.message = 'Too short';
    return errors;
  };

  return (
    <Form
      onSubmit={submitComment}
      validate={validateComment}
      render={({ handleSubmit }) => {
        return (
          <CommentListItem onSubmit={handleSubmit}>
            <UserImageWrapper>
              <UserImage src={userImage} />
            </UserImageWrapper>
            <UserName>{props.comment.user}</UserName>
            <CommentDate>{formatDate(new Date(props.comment.date))}</CommentDate>
            {isChanged ? (
              <Field
                name="message"
                initialValue={props.comment.message}
                render={({ input, meta }) => (
                  <>
                    {meta.touched && meta.error && (
                      <span className="error-message">{meta.error}</span>
                    )}
                    <CommentInput
                      value={input.value}
                      onKeyPress={resize}
                      onChange={input.onChange}
                      rows={1}
                      ref={textAreaRef}
                    />
                  </>
                )}
              />
            ) : (
              <CommentMessage>{props.comment.message}</CommentMessage>
            )}

            {isChanged ? (
              <CommentButtons>
                <SaveCommentButton onClick={() => handleSubmit()}>Save</SaveCommentButton>
                <CloseButton src={cross} onClick={() => setIsChanged(false)} />
              </CommentButtons>
            ) : (
              <CommentButtons>
                <EditButton onClick={() => setIsChanged(true)}>Edit</EditButton>
                <DeleteButton
                  onClick={() => dispatch(deleteComment({ commentId: props.comment.id }))}
                >
                  Delete
                </DeleteButton>
              </CommentButtons>
            )}
          </CommentListItem>
        );
      }}
    />
  );
}
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
const CommentDate = styled.div`
  font-family: 'Balsamiq Sans', cursive;
  font-size: 15px;
  color: #5e6c84;
  grid-area: date;
`;
/* const CommentListItemWrapper = styled.div`
  display: flex;
  flex-direction: flex;
  width: 100%;
`; */
const CommentListItem = styled.form`
  display: grid;
  grid-template-areas:
    'userImage username date'
    'userImage message message'
    'userImage buttons buttons';
  grid-template-columns: 50px auto 1fr;
  grid-gap: 5px;
  margin-top: 5px;
`;
const UserName = styled.div`
  width: 100%;
  font-family: 'Balsamiq Sans', cursive;
  font-weight: bold;
  font-size: 18px;
  color: #e1528d;
  grid-area: username;
`;
const CommentButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  grid-area: buttons;
`;
const EditButton = styled.a`
  cursor: default;
  font-family: 'Balsamiq Sans', cursive;
  color: #5e6c84;
  margin-right: 5px;
  &:hover {
    color: #e1528d;
  }
`;
const DeleteButton = styled(EditButton)``;
const CommentMessage = styled.div`
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
  box-shadow: 0 1px 2px -1px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  padding-left: 23px;
  height: 35px;
  grid-area: message;
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
  grid-area: message;
  resize: none;
  ::placeholder {
    color: #0b97dc;
  }
`;
const SaveCommentButton = styled.button`
  width: 100%;
  height: 30px;
  max-width: 125px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background-color: #0b97dc;
  font-family: 'Comfortaa', cursive;
  font-weight: bold;
  font-size: 13px;
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

export default CommentItem;
