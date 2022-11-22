import React from 'react'
import { useStateProvider } from '../utilities/StateProvider';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styled from 'styled-components';

export default function Navbar({navbarBackground}) {
  const [{ userInfo }] = useStateProvider();
  //console.log("userInfo", userInfo)


  return (
    <Container navbarBackground={navbarBackground}>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="What do you want to listen to?" />
      </div>
      <div className="user">
        <a hreaf="#"><CgProfile /><span>{userInfo && userInfo.userName}</span></a>
      </div>
    </Container>
  )
}


const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 15vh;
padding: 2rem;
top: 0;
transition: .3s ease-in-out;
background-color: ${({navbarBackground}) => navbarBackground? "rgba(0,0,0,0.7)": "none"};
position: sticky;
.search__bar{
  background-color: white;
  width: 30%;
  display:flex;
  align-items: center;
  padding: .4rem 1rem;
  border-radius: 2rem;
  gap: .5rem;
  input{
    height: 2rem;
    width: 100%;
    border: none;
    &:focus{
      outline: none;
    }
  }
}
.user{
  background-color: #000;
  padding: .3rem .4rem;
  padding-right: 1rem;
  border-radius: 2rem;
  display: flex;
  justify-content:center;
  align-items: center;
  a{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-decoration: none;
    gap: .5rem;
    font-weight: bold;
    svg{
      font-size: 1.3rem;
      background-color: #282828;
      padding: .2rem;
      border-radius: 1rem;
      color: #c7c5c5;
    }
  }
}
`;
