import React,
{ useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { Button } from '../Button';
import { Icon } from '../Icon';

const {
  ipcRenderer 
} = window.require('electron');

export interface FilePickerProps {
  onChange: (files: Array<File>) => void;
}

export const FilePicker = (props: FilePickerProps) => {
  const {
    onChange 
  } = props;
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    onChange(acceptedFiles);
    acceptedFiles.forEach((file: File) => {
      const fileObj = {
        id: uuid(),
        path: file.path
      };
      ipcRenderer.send('onfileselected', fileObj);
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
