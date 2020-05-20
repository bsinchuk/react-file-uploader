import React from 'react';

const FileItem = props => {
  const classes = ['viewer__row', props.error ? 'viewer__row--error' : null ];
  return (
    <React.Fragment>
      <div className={classes.join(' ')}>
        <p className="viewer__cell--body viewer__cell--name viewer__cell">
          {props.name}
        </p>
        <p className="viewer__cell--body viewer__cell--type viewer__cell">
          {props.type.split('/')[1]}
        </p>
        {
          props.size ?
          <p className="viewer__cell--body viewer__cell--size viewer__cell">
            {props.size}
          </p> :
          null
        }
        <button 
          className="viewer__remove"
          onClick={e => props.deleted(e, props.id)}>
            X
        </button>
      </div>
      {
        props.error ? 
        <p className="viewer__error-msg">
          {props.error}
        </p> : null
      }
    </React.Fragment>

  );
}

export default FileItem;