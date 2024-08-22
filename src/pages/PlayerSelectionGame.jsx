import React, { useState, useEffect } from 'react';
import players from '../NRL-Data/nrl_players.json';
import logo from '../assets/tackle1.png';
import NavBar from '../components/NavBar';
import backgroundImage from '../assets/seamlessness1.png';
import '../styles/search.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SuccessModal from '../components/SuccessModal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AwesomeButton } from 'react-awesome-button';
import FailModal from '../components/FailModal';

const columnWidth = '120px'; // Adjust width for better fit with borders

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: columnWidth,
        fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
        width: columnWidth,
        borderRight: '2px solid lightgrey', // Vertical line between cells
        '&:last-child': {
            borderRight: 'none', // Remove border for the last cell in the row
        }
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const GameTable = ({ selectedPlayers, randomPlayer, lastSelectedPlayer }) => {
    const [animationKey, setAnimationKey] = useState(Date.now());

    useEffect(() => {
        setAnimationKey(Date.now()); // Force re-render to apply animation
    }, [selectedPlayers]);

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Player</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Position</StyledTableCell>
                        <StyledTableCell align="center">Team</StyledTableCell>
                        <StyledTableCell align="center">Age</StyledTableCell>
                        <StyledTableCell align="center">Height</StyledTableCell>
                        <StyledTableCell align="center">Weight</StyledTableCell>
                        <StyledTableCell align="center">Birth Place</StyledTableCell>
                        <StyledTableCell align="center">Previous Club</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedPlayers.map((player, index) => (
                        <StyledTableRow 
                            key={player.Player + animationKey} // Unique key for animation
                            className={player.Player === lastSelectedPlayer?.Player ? "fade-in-up" : ""} // Apply animation class conditionally
                            style={{ animationDelay: `${index * 0.2}s` }} // Staggered animation
                        >
                            <StyledTableCell component="th" scope="row">
                                <img src={player["Profile-Img"]} alt={`${player.Player}`} style={{ height: '150px', width: 'auto' }} />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.Player === randomPlayer?.Player ? '#5CE65C' : '' }}>{player.Player}</StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.Position === randomPlayer?.Position ? '#5CE65C' : '' }}>{player.Position}</StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.TeamName === randomPlayer?.TeamName ? '#5CE65C' : '' }}>{player.TeamName}</StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.Age === randomPlayer?.Age ? '#5CE65C' : '' }}>
                                {player.Age}
                                {randomPlayer && (player.Age < randomPlayer.Age ? ' ⬆️' : player.Age > randomPlayer.Age ? ' ⬇️' : '')}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.Height === randomPlayer?.Height ? '#5CE65C' : '' }}>
                                {player.Height}
                                {randomPlayer && (player.Height < randomPlayer.Height ? ' ⬆️' : player.Height > randomPlayer.Height ? ' ⬇️' : '')}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.Weight === randomPlayer?.Weight ? '#5CE65C' : '' }}>
                                {player.Weight}
                                {randomPlayer && (player.Weight < randomPlayer.Weight ? ' ⬆️' : player.Weight > randomPlayer.Weight ? ' ⬇️' : '')}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.BirthPlace === randomPlayer?.BirthPlace ? '#5CE65C' : '' }}>{player.BirthPlace}</StyledTableCell>
                            <StyledTableCell align="center" style={{ backgroundColor: player.PreviousClub === randomPlayer?.PreviousClub ? '#5CE65C' : '' }}>{player.PreviousClub}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};




function PlayerSelectionGame({ onReset }) {
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [randomPlayer, setRandomPlayer] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for SuccessModal
    const [showFailModal, setShowFailModal] = useState(false); // State for SuccessModal
    const [alertOpen, setAlertOpen] = useState(false); // State for Alert
    const [lastSelectedPlayer, setLastSelectedPlayer] = useState(null);

    // Updated filtering logic
    const filteredPlayers = players.filter(player => {
        // Normalize and trim search query
        const query = searchQuery.trim().replace(/\s+/g, ' ').toLowerCase();
        const playerName = player.Player.trim().replace(/\s+/g, ' ').toLowerCase();
    
        // Check if the normalized query is a substring of the normalized player name
        return playerName.includes(query);
    });

    useEffect(() => {
        const savedPlayer = localStorage.getItem('randomPlayer');
        if (savedPlayer) {
            setRandomPlayer(JSON.parse(savedPlayer));
        } else if (players.length > 0) {
            const randomIndex = Math.floor(Math.random() * players.length);
            const player = players[randomIndex];
            setRandomPlayer(player);
            localStorage.setItem('randomPlayer', JSON.stringify(player));
        }
        setGameOver(false);
    }, []);

    const handlePlayerSelection = (player) => {
        if (gameOver || isScrolling) return;

        if (selectedPlayers.includes(player)) {
            setAlertOpen(true); // Show Alert
            return;
        }

        const newSelectedPlayers = [player, ...selectedPlayers];
        setSelectedPlayers(newSelectedPlayers);
        setLastSelectedPlayer(player); // Update newly picked player

        // Check if game should end
        if (player.Player === randomPlayer?.Player) {
            setShowSuccessModal(true); // Show SuccessModal
            setGameOver(true);
        } else if (newSelectedPlayers.length >= 8) {
            setGameOver(true);
            setShowFailModal(true);
        }

        setDropdownVisible(false);
    };

    const resetGame = () => {
        if (players.length > 0) {
            const randomIndex = Math.floor(Math.random() * players.length);
            const player = players[randomIndex];
            setRandomPlayer(player);
            localStorage.setItem('randomPlayer', JSON.stringify(player));
            setSelectedPlayers([]);
            setGameOver(false);
            setShowSuccessModal(false); // Hide SuccessModal on reset
            setShowSuccessModal(false);
        }
    };

    const handleScroll = () => {
        setIsScrolling(true);
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
        }, 200); // Adjust the delay as needed
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'space-between',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
        }}>
            <NavBar />
            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div
                        onClick={onReset}
                        style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img src={logo} alt="Tackle Trivia Logo" style={{ height: '200px' }} />
                    </div>
                </div>

                <h1 style={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: `
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px  1px 0 #000,
                        1px  1px 0 #000
                    `
                }}>
                    NRL GUESSING GAME
                </h1>

                <div style={{ marginBottom: '20px' }}>
                    <form action="">
                        <input
                            type="search"
                            placeholder="Search for NRL players here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setDropdownVisible(true)}
                            onBlur={() => setTimeout(() => setDropdownVisible(false), 100)}
                            onScroll={handleScroll}
                        />
                        {dropdownVisible && (
                            <div className="dropdown-menu" onScroll={handleScroll}>
                                <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                                    {filteredPlayers.map((player, index) => (
                                        <li
                                            key={index}
                                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                                            onClick={() => handlePlayerSelection(player)}
                                        >
                                            {player.Player}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>

                {/* Conditionally render the table */}
                {selectedPlayers.length > 0 && (
                    <GameTable selectedPlayers={selectedPlayers} randomPlayer={randomPlayer} lastSelectedPlayer={lastSelectedPlayer} />
                )}

                {gameOver && (
                    <AwesomeButton
                        onPress={resetGame}
                        type="danger"
                        style={{
                            marginTop: '20px',
                            '--button-danger-color': '#3db64b',
                            '--button-danger-color-dark': '#d2e054',
                            '--button-danger-color-light': '#ffffff',
                            '--button-danger-color-hover': '#3aae48',
                            '--button-danger-color-active': '#37a343',
                            '--button-danger-border': '2px solid #d2e054',
                        }}
                    >
                        Start Again
                    </AwesomeButton>
                )}
            </div>
            <SuccessModal
                   open={showSuccessModal}
                   onClose={() => setShowSuccessModal(false)}
                   player={randomPlayer}
            />
            <FailModal
                open={showFailModal}
                onClose={() => setShowFailModal(false)}
                player={randomPlayer}
            />
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={() => setAlertOpen(false)}
            >
                <Alert onClose={() => setAlertOpen(false)} variant="filled" severity="error">
                    You have already choosen the NRL player.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default PlayerSelectionGame;
