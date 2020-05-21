import React, {useState, useReducer, useEffect} from 'react';

import FileViewer from '../FileViewer/FileViewer';
import style from './FileUploader.module.css';
import newId from '../../utils/newid';

const FileUploader = props => {

  const [mainState, setMainState] = useState({
    selected: false,
    valid: false
  });

  const filesReducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_FILES':
        return [...prevState, ...action.payload];
      case 'DELETE_FILE':
        return prevState.filter(e => e.id !== action.payload);
      case 'DEFAULT_FILES':
        return [];
      default:
        return prevState;
    }
  }
  const [files, dispatchFiles] = useReducer(filesReducer, []);

  useEffect(() => {
    const isSelected = files.length > 0;
    let isValid = isSelected;
    for (const file of files) {
      if (file.error) {
        isValid = false;
        break;
      }
    }
    console.log('[files] useEffect', isSelected, isValid);
    setMainState(state => {
      return {
      ...state,
      selected: isSelected,
      valid: isValid
      }
    });
  }, [files]);

  const validateFile = file => {
    if (file.size > 1000000) {
      return 'files must not be bigger than 1mb';
    }
    const [type, format] = file.type.split('/');
    if (type === 'image' && format !== 'png' && format !== 'jpeg') {
      return 'if it’s an image it must be only png or jpg';
    }
    return null;
  }

  const selectFilesHandler = e => {
    const files = [...e.target.files].map(file => {
      return {
        id: newId(),
        file: file,
        error: validateFile(file)
      }
    })
    console.log(files);
    dispatchFiles({type: 'SET_FILES', payload: files});
  }

  const deleteFileHandler = (e, id) => {
    dispatchFiles({type: 'DELETE_FILE', payload: id});
  }

  const saveFilesHandler = () => {
    const fd = new FormData();
    const filesArr = files.map(e => e.file);
    filesArr.forEach(file => fd.append(file.name, file, file.name));
    fetch('upload', {
      method: 'post',
      body: fd
    })
      .then(res => res.text())
      .then(console.log)
      .catch(console.log)
      .finally(dispatchFiles({type: 'DEFAULT_FILES'}));
  }

  return (
    <div className={style['file-uploader']}>
      <label htmlFor="file-uploader" className={style['file-uploader__choose']}>
        Select Files
        <input 
          type="file" 
          id="file-uploader"
          name="MyFiles"
          multiple 
          className={style['file-uploader__choose']}
          onChange={selectFilesHandler} />
      </label>
      { mainState.selected ? 
        <FileViewer 
          files={files} 
          clicked={deleteFileHandler} /> : 
        null 
      }
      { 
        mainState.selected ? 
        <button 
          disabled={!mainState.valid} 
          onClick={saveFilesHandler}
          className={style['file-uploader__send']}> Send </button> :
        null
      }
    </div>
  );
}

export default FileUploader;
