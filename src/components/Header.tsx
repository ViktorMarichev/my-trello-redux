import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import img from '../img/face.png';
const StyledHeader = styled.header`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #242528;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderContainer = styled(Container)`
  display: flex;
  height: 100%;
`;
const LogoText = styled.div`
  padding-right: 5px;
  box-sizing: border-box;
  font-size: 20px;
  color: white;
`;
const LogoImg = styled.img`
  filter: drop-shadow(1px 1px 5px #f44c95);
  width: 30px;
  height: 30px;
`;
type HeaderProps = {
  title: string;
};
const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <LogoWrapper>
          <LogoText>{props.title}</LogoText>
          <LogoImg src={img} />
        </LogoWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
};
export default Header;
