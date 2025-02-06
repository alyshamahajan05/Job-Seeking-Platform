import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const App = () => {
  const { isAuthorised } = useContext(Context);

  return (
    <div id="root">
      <footer className={isAuthorised ? "footerShow" : "footerHide"}>
        <div>
          <Link to={'/'} target="_blank"><FaFacebook /></Link>
          <Link to={'/'} target="_blank"><FaLinkedin /></Link>
          <Link to={'/'} target="_blank"><FaTwitter /></Link>
          <Link to={'/'} target="_blank"><RiInstagramFill /></Link>
        </div>
      </footer>
    </div>
  );
};

export default App;
