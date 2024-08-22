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

export default function HelpModal({ open, onClose }) {
  return (
    <Transition in={open} timeout={duration}>
      {state => (
        <Modal
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
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              How to play?
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              <ul>
                <li>You get 8 guesses to figure out the NRL player.</li>
                <li><span style={{ backgroundColor: '#5CE65C' }}>Green</span> in any column indicates a match.</li>
                <li>⬆️ and ⬇️ indicates the correct player's stat is either higher or lower.</li>
              </ul>
            </Typography>
          </Sheet>
        </Modal>
      )}
    </Transition>
  );
}
