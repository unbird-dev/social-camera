import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderContainer, Logo, LogoWrapper, LogoImg,
} from './style';

const Header = () => {
  const title = 'Social Camera';

  return (
    <HeaderContainer>
      <Link to="/organizations">
        <LogoWrapper>
          <LogoImg src={require('../../assets/img/app-icon.png')} alt="Gibril App Logo" />
          <Logo>
            {title}
          </Logo>
        </LogoWrapper>
      </Link>
    </HeaderContainer>
  );
};


export default Header;
