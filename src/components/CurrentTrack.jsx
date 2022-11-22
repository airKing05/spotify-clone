import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { reducerCases } from '../utilities/Constants';
import {useStateProvider} from '../utilities/StateProvider';

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
   
  //console.log("currentlyPlaying----", currentlyPlaying)
    const headerData = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    };
    const getCurrentTrack =  async () => {
      const res = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers : headerData
        });
        if(res.data !== ""){
         
          const { item} = res.data;
          const currentlyPlaying = {
            currentTrackId: item.id,
            currentTrackName: item.name,
            currentTrackImage: item.album.images[2].url,
            currentTrackArtists: item.artists.map((artist) => artist.name)
          }
          //console.log("currently playing", currentlyPlaying);
          dispatch({ type: reducerCases.SET_CURRENTLY_PLAYING, currentlyPlaying })
        }
        //console.log("current track",res)        
    };

  useEffect(() => { 
    getCurrentTrack()
  }, [token, dispatch])
  return (
    <Container>
      {
        currentlyPlaying && (
          <>
          <div className="track">
            <div className="track__image">
                <img src={currentlyPlaying.currentTrackImage} alt="current-track-img"/>
            </div>
            <div className="track__info">
              <h4>{currentlyPlaying.currentTrackName}</h4>
              <h6>{currentlyPlaying.currentTrackArtists.join(", ")}</h6>
            </div>
          </div>
          </>
        )
      }
    </Container>
  )
}


const Container = styled.div`
.track{
  display: flex;
  align-items: center;
  gap: 1rem;
  &__info{
    display: flex;
    flex-direction: column;
    gap: .3rem;
    h4{
      color: #fff;
    }
    h6{
      color: #b3b3b3;
    }
  }
}
`;