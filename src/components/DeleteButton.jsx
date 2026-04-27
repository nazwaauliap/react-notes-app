import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ onDelete }) {
  return (
    <button className="action" type="button" onClick={onDelete}>
      ×
    </button>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;