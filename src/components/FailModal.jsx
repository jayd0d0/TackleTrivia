import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Transition } from 'react-transition-group';

const duration = 200; // Duration of the transition in milliseconds

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const FailModal = ({ open, onClose, player }) => {
    if (!player) return null;

    return (
      <Transition in={open} timeout={duration}>
        {state => (
          <Modal
              aria-labelledby="fail-modal-title"
              keepMounted
              open={state !== 'exited'}
              onClose={onClose}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1, alignSelf: 'flex-end' }} />
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h3"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                  align="center" // Center align the text
                >
                  Unlucky Mate!
                </Typography>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {player["Profile-Img"] ? (
                        <img src={player["Profile-Img"]} alt={player.Player} style={{ height: '300px', width: 'auto', borderRadius: '8px' }} />
                    ) : (
                        <p>Image not available</p>
                    )}
                    <Typography variant="h6" component="div" style={{ marginTop: '10px', textAlign: 'center' }}>
                        The correct player was {player.Player || "Player name not available"}!
                    </Typography>
                </div>
              </Sheet>
          </Modal>
        )}
      </Transition>
    );
};

export default FailModal;
