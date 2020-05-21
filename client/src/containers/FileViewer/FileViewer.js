import React, { useState } from 'react';

import FileItem from '../../components/FileItem/FileItem';
import './FileViewer.css';

const FileViewer = props => {
  const [viewMode, setViewMode] = useState('default');

  const changeViewModeHandler = () => {
    const mode = viewMode === 'default' ? 'simple' : 'default';
    setViewMode(mode);
  }

  const files = props.files.map(e => {
    return <FileItem
      key={e.id}
      name={e.file.name}
      type={e.file.type}
      size={viewMode === 'default' ? e.file.size : null}
      id={e.id}
      error={e.error}
      deleted={props.clicked}
       />
  });

  return (
    <div className="viewer">
      <button 
        className="viewer__changer"
        onClick={changeViewModeHandler}>
          View
      </button>
      <div className="viewer__row">
        <p className="viewer__cell--head viewer__cell--name viewer__cell">
          Name
        </p>
        <p className="viewer__cell--head viewer__cell--type viewer__cell">
          Extension
        </p>
        {
          viewMode === 'default' ?
          <p className="viewer__cell--head viewer__cell--size viewer__cell">
            Size
          </p> :
          null
        }
      </div>
      {files}
    </div>
  );
}

export default FileViewer
