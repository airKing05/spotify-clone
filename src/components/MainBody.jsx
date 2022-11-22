import axios from 'axios';
import React, { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai'
import styled from 'styled-components';
import { reducerCases } from '../utilities/Constants';
import { useStateProvider } from '../utilities/StateProvider';

export default function MainBody({headerBackground}) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  const headerData = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  const getInititailPlaylist = async () => {
    const res = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: headerData
      }
    );

    const selectedPlaylist = {
      playlistId: res.data.id,
      playlistName: res.data.name,
      //playlistDescription: res.data.description.startWith("<a") ? "" : res.data.description,
      playlistImage: res.data.images[0].url,
      playlistTracks: res.data.tracks.items.map(({ track }) => {
        return {
          trackId: track.id,
          trackName: track.name,
          trackAlbumName: track.album.name,
          trackArtics: track.artists.map(artist => artist.name),
          trackImage: track.album.images[2].url,
          trackContex_uri: track.uri,
          trackNumber: track.track_number,
          trackDuration: track.duration_ms
        };
      })
    }
    //console.log("main body",res.data)
    //console.log("selected play list", selectedPlaylist)
    dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
  }

  useEffect(() => {
    getInititailPlaylist();
  }, [token, selectedPlaylistId, dispatch]);

  // conver milliseconds to  minutes and second
  function msToMinSec(ms){
    let min = ms / 1000 / 60;
    let remainder = min % 1;
    let sec = Math.floor(remainder * 60);
    if (sec < 10) {
      sec = '0' + sec;
    }
    min = Math.floor(min);
      // const min = Math.floor(ms/60000);
      // const sec = ((ms%6000)/1000).toFixed(0);
  
      return `${min}:${sec}`;
  }
  //console.log("selected play list from reducer", selectedPlaylist.playlistTracks)
  return (
    <Container headerBackground={headerBackground}>
      {
        selectedPlaylist && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={selectedPlaylist.playlistImage} alt="selectedPlaylist-img" />
              </div>
              <div className="details">
                <span className='type'>PLAYLIST</span>
                <h1 className='title'>{selectedPlaylist.playlistName}</h1>
                <p className='description'>description</p>
              </div>
            </div>
            <div className="list">
              <div className="header__row">
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div>
                <div className="col">
                  <span>ALBUM</span>
                </div>
                <div className="col">
                  <span><AiFillClockCircle /></span>
                </div>
              </div>
              <div className="tracks">
                {
                  selectedPlaylist && selectedPlaylist.playlistTracks.map((item, index) => {
                    //console.log("insield the map", item.trackId)
                    return (
                      <div className="row" key={item.trackId}>
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                          <div className="image">
                            <img src={item.trackImage} alt="trackImage" />
                          </div>
                          <div className="info">
                            <span className="name">{item.trackName}</span>
                            <span>{item.trackArtics}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{item.trackAlbumName}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinSec(item.trackDuration)}</span>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </Container>
  )
}


const Container = styled.div`

.playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list{
    .header__row{
      display: grid;
      grid-template-columns: .3fr 3fr 2fr .1fr;
      color: #dddcdc;
      margin-top: 1rem;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: .3s ease-in-out;
      background-color: ${({headerBackground}) => headerBackground? "#000000dc": "none"}
    }
    .tracks{
      margin : 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row{
        padding: .5rem 1rem;
        display: grid;
        grid-template-columns: .3fr 3.1fr 1.87fr .1fr;
        &:hover{
          background-color: rgba( 0, 0, 0, .7);
        }
        .col{
          display: flex;
          align-items: center;
          color: #dddcdc;
          img{
height: 40px;
          }
        }
        .detail{
          display: flex;
          gap: 1rem;
          .info{
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;