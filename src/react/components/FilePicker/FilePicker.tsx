import React,
{ useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ipcRenderer } from 'electron';
import { Button } from '../Button';
import { Icon } from '../Icon';

export const FilePicker = () => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file: File) => {
      ipcRenderer.send('file-selected', file.path);
    });
  }, []);

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    multiple: false,
    onDrop
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        color='primary'
        size='lg'
        startIcon={(
          <Icon
            icon='folder-open'
          />
        )}
      >
        Select files...
      </Button>
    </div>
  );
};
