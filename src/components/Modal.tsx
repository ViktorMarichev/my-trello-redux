import React from 'react';
import styled from 'styled-components';
import { User } from '../types/tasks';
import { setUser } from '../redux/User/index';
import { Form, Field } from 'react-final-form';
import { useAppSelector, useAppDispatch, RootState } from '../redux/configureStore';
/* type StyledPopupProps = {
  display: string;
};*/
type ModalProps = {
  title: string;
  modalButtonHandler?: (username: string) => void;
};
type ModalWrapperProps = {
  display: string;
};

const Modal: React.FC<ModalProps> = ({ title }) => {
  const user: User = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  type FormType = {
    username?: string;
  };
  const onSubmit = (e: FormType) => {
    dispatch(setUser({ username: e.username! }));
  };

  const validate = (e: FormType) => {
    const errors: FormType = {};
    if (e.username && e.username.length < 5) errors.username = 'Too short';

    return errors;
  };
  return (
    <ModalWrapper display={user.username != null ? 'none' : 'block'}>
      <ModalBody>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ModalTitle>{title}</ModalTitle>
              <ModalContent>
                <Field
                  name="username"
                  render={({ input, meta }) => (
                    <>
                      {meta.touched && meta.error && (
                        <span className="error-message">{meta.error}</span>
                      )}
                      <ModalInput value={input.value} onChange={input.onChange} type="text" />
                    </>
                  )}
                />

                <ModalButton type="submit">Ok</ModalButton>
              </ModalContent>
            </form>
          )}
        />
      </ModalBody>
    </ModalWrapper>
  );
};
const ModalWrapper = styled.div`
  position: fixed;
  display: ${(props: ModalWrapperProps) => props.display};
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0 0.2);
  backdrop-filter: blur(10px);
  z-index: 10;
`;
const ModalBody = styled.div`
  position: relative;
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  position: relative;
  max-width: 500px;
  margin: auto;
  background-color: white;
  margin-top: 5%;
  padding: 0px 10px 10px 10px;
  border-radius: 10px;
  border: 1px solid gray;
  max-height: 400px;
  overflow-y: none;
  box-sizing: border-box;
  box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
`;
const ModalTitle = styled.h1`
  font-family: 'Balsamiq Sans', cursive;
  font-weight: bold;
  font-size: 1.5em;
  padding: 15px;
  color: #0b97dc;
  text-shadow: 1px 1px 1px white;
`;
const ModalInput = styled.input`
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
  line-height: 25px;
  border: 1px solid #242528;
  padding-left: 23px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalButton = styled.button`
  width: 100%;
  height: 40px;
  max-width: 105px;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbd9da;
  border-radius: 12px;
  background-color: #e1528d !important;
  font-family: 'Comfortaa', cursive;
  font-weight: bold;
  color: white;
  padding: 10px 10px 10px 16px;
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin-top: 5px;
  &:hover {
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }
  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(0.98);
  }
`;

export default Modal;
