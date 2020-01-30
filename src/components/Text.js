import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import '../styles/css/Text.css';
import searchAndSave from '../utilities/searchAndSave';
import { addText, addTemplate } from '../actions';

const mapStateToProps = state => ({
  text: state.text
});

const mapDispatchToProps = dispatch => ({
  addText: text => dispatch(addText(text)),
  addTemplate: templates => dispatch(addTemplate(templates))
});

const Text = ({ addText, addTemplate, history, text }) => {
  const [letter, setLetter] = useState('');

  const handleChange = e => {
    setLetter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const templates = searchAndSave(letter);
    addTemplate(templates);
    addText(letter);
    history.push('/edit');
  };

  return (
    <div className="Text">
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <TextareaAutosize
          placeholder="Paste the cover letter here..."
          autoFocus
          required
          name="text"
          value={text || letter}
        />
        <button type="submit">PROCESS COVER LETTER</button>
      </form>
    </div>
  );
};

Text.propTypes = {
  addText: PropTypes.func.isRequired,
  addTemplate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Text));
