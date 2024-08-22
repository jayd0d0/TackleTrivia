import React from 'react';
import logo from '../assets/tackle1.png';
import backgroundImage from '../assets/seamlessness1.png';
import NavBar from '../components/NavBar';
import BottomBar from '../components/BottomBar';
import StartButton from '../components/StartButton';

function StartPage({ onStart }) {
    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center', 
            backgroundRepeat: 'repeat',
            width: '100vw',
        }}>
            <NavBar></NavBar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                <img 
                    src={logo} 
                    alt="Tackle Trivia Logo" 
                    style={{ height: '250px', cursor: 'pointer', transition: 'transform 0.3s ease' }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} 
                />
                <h1 style={{ 
                    color: 'white', 
                    fontSize: '50px',
                    marginBottom: '20px', 
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: `
                        -3px -3px 0 #000,  /* Top left shadow */
                        3px -3px 0 #000,  /* Top right shadow */
                        -3px  3px 0 #000,  /* Bottom left shadow */
                        3px  3px 0 #000   /* Bottom right shadow */
                    `
                }}>
                    WELCOME TO TACKLE TRIVIA
                </h1>
                <h2 style={{ 
                    color: 'white', 
                    height: '50px', 
                    fontSize: '25px', 
                    marginBottom: '20px', 
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: `
                        -2px -2px 0 #000,  /* Top left shadow */
                        2px -2px 0 #000,  /* Top right shadow */
                        -2px  2px 0 #000,  /* Bottom left shadow */
                        2px  2px 0 #000   /* Bottom right shadow */
                    `
                }}>
                    GUESS NATIONAL RUGBY LEAGUE PLAYERS
                </h2>
                <StartButton
                    onStart={onStart}
                >
                </StartButton>
            </div>
            <BottomBar></BottomBar>
        </div>
    );
}

export default StartPage;
