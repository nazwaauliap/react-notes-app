import React from 'react';
import PropTypes from 'prop-types';

function ArchiveButton({ archived, onArchive }) {
  return (
    <button className="action" type="button" onClick={onArchive}>
      {archived ? '↩' : '✓'}
    </button>
  );
}

ArchiveButton.propTypes = {
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;