import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Confetti from 'react-confetti';
import { Transition } from 'react-transition-group';

const duration = 200; // Duration of the transition in milliseconds

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const SuccessModal = ({ open, onClose, player }) => {
    if (!player) return null;

    return (
      <Transition in={open} timeout={duration}>
        {state => (
          <Modal
              aria-labelledby="success-modal-title"
              keepMounted
              open={state !== 'exited'}
              onClose={onClose}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
              <div>
                  <Confetti
                      width={window.innerWidth}
                      height={window.innerHeight}
                      numberOfPieces={500}
                      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                  />
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: 'md',
                      p: 3,
                      boxShadow: 'lg',
                      opacity: 0,
                      transition: `opacity ${duration}ms ease-in-out`,
                      ...transitionStyles[state],
                    }}
                  >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                      component="h2"
                      id="modal-title"
                      level="h3"
                      textColor="inherit"
                      fontWeight="lg"
                      mb={1}
                    >
                      Congratulations!
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                      You have found the correct player!
                    </Typography>
                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {player["Profile-Img"] ? (
                            <img src={player["Profile-Img"]} alt={player.Player} style={{ height: '300px', width: 'auto', borderRadius: '8px' }} />
                        ) : (
                            <p>Image not available</p>
                        )}
                        <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
                            {player.Player || "Player name not available"}
                        </Typography>
                    </div>
                  </Sheet>
              </div>
          </Modal>
        )}
      </Transition>
    );
};

export default SuccessModal;
