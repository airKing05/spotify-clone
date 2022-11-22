import styled from 'styled-components';
import Footer from './Footer';
import MainBody from './MainBody';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Spotify() {
    return (
        <Container>
            <div className="spotify__body">
                <Sidebar />
                <div className="body">
                    <Navbar />
                    <div className="body__contents">
                        <MainBody />
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
    overflow: auto
}
`
