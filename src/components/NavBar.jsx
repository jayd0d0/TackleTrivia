import React, { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import HelpIcon from '@mui/icons-material/Help';
import HelpModal from './InfoModal'

function NavBar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div style={{ backgroundColor: 'rgb(232, 186, 12)' }}>
      <AwesomeButton
        type="primary"
        style={{ margin: '10px' }}
        onPress={() => setModalShow(true)}
      >
        <HelpIcon />
      </AwesomeButton>

      <HelpModal
        open={modalShow}
        onClose={() => setModalShow(false)}
      />
    </div>
  );
}

export default NavBar;
