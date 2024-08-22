import React from 'react';
import '../styles/button.css';
import { AwesomeButtonSocial } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function BottomBar() {
  return (
    <div style={{ backgroundColor: 'rgb(0, 113, 57)' }} >
      <AwesomeButtonSocial 
          type="github" 
          href="https://github.com/jayd0d0"
          style={{
              margin: '10px'
          }}
      >
          GitHub
      </AwesomeButtonSocial>
      <AwesomeButtonSocial type="linkedin" href="https://www.linkedin.com/in/jason-do-293139260/">Linkedin</AwesomeButtonSocial>
    </div>
  )
}

export default BottomBar;