import React from 'react';
import styled from 'styled-components';

export default function Login() {
  function handleLogin(){
    const clientID = '4825cec7d34b45ef876170501d3f510f';
    const reDirectUrl = 'http://localhost:3000/';
    const apiurl= 'https://accounts.spotify.com/authorize';
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${apiurl}?client_id=${clientID}&redirect_uri=${reDirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  }
  return (
    <Container>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="logo-img" />
          <button onClick={handleLogin}>Connect Spotify</button>
    </Container>
  )
};


const Container = styled.div`
display: flex;
background: #1db954;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
gap:5rem;
img{
  height: 20vh;
}
button{
  font-size: 1.5rem;
  cursor: pointer;
  padding: 1rem 5rem;
  border-radius: 5rem;
  border: none;
  background: #000;
  color: #49f585; 
}
`

