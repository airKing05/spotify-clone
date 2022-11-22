import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { reducerCases } from '../utilities/Constants';
import { useStateProvider } from '../utilities/StateProvider';
import Footer from './Footer';
import MainBody from './MainBody';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Spotify() {
    const [{token}, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navbarBackground, setNavbarBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);


    const headerData = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    }

    const getUserInfo = async ()=>{
        const res = await axios.get("https://api.spotify.com/v1/me", {
            headers: headerData
        });
        const userInfo = {
            userName: res.data.display_name,
            userId: res.data.id
        }
        //console.log("res", res)
       dispatch({type: reducerCases.SET_USER, userInfo});
    };

    useEffect(()=>{
        getUserInfo();
    }, [token, dispatch]);

    function bodyScroll(){
        bodyRef.current.scrollTop>=30 ? setNavbarBackground(true): setNavbarBackground(false);
        bodyRef.current.scrollTop>= 265 ? setHeaderBackground(true) : setHeaderBackground(false);
    }
    //console.log("spotify", navbarBackground, headerBackground)
    return (
        <Container>
            <div className="spotify__body">
                <Sidebar />
                <div className="body" ref={bodyRef} onScroll={bodyScroll}>
                    <Navbar navbarBackground = {navbarBackground} />
                    <div className="body__contents">
                        <MainBody headerBackground={headerBackground}/>
                    </div>
                </div>
            </div>
            <div className="spotify__footer">
                <Footer />
            </div>
        </Container>
    )
}

// const Container = styled.div`
// 
// `;

const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows: 85vh 15vh;
.spotify__body{
    widht: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 15vw 85vw;
    background: linear-gradient(transparent, rgba(0,0,0,1));
    background-color: rgb(32, 87, 100); 
}
.body{
     widht: 100%;
    height: 100%;
    overflow: auto;
     &::-webkit-scrollbar{
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
   }
}
`
