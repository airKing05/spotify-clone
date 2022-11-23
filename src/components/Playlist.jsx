import axios from 'axios'
import React, { useEffect } from 'react';
import { useStateProvider } from "../utilities/StateProvider";
import { reducerCases } from "../utilities/Constants";
import styled from 'styled-components';

export default function Playlist() {
  const [{ token, playlists, selectedPlaylistId }, dispatch] = useStateProvider();
  
  const headerData = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  }

  const getUserPlaylist = async () => {
    let res = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: headerData
    });
    const { items } = res.data;
    const playlists = items.map(({ name, id }) => {
      return { name, id }
    })
    //console.log("items", playlists)
    dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
  }

  useEffect(() => {
    getUserPlaylist();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) =>{
    //console.log("sleecffdsd", selectedPlaylistId)
    dispatch({ type: reducerCases.SET_CURRENT_PLYALIST_ID, selectedPlaylistId })
  }
  return (
    <Contianer>
      <ul>
        {
          playlists.map((item) => {
            return (
              <li key={item.id} onClick={()=> changeCurrentPlaylist(item.id)}>{item.name}</li>
            )
          })
        }
        {
          playlists.map((item) => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          })
        }
        {
          playlists.map((item) => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          })
        }
        {
          playlists.map((item) => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          })
        }
      </ul> 
    </Contianer>
  )
}


const Contianer = styled.div`
  height: 100%;
  overflow: hidden;
ul{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 50vh;
  max-height: 100%;
   overflow: auto;
   &::-webkit-scrollbar{
    width: 0.7rem;
    &-thumb {
      background-color: rgba(255, 255, 255, 0.6);
    }
   }
  li{
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    :hover{
      color: white;
    }
  }
`;

