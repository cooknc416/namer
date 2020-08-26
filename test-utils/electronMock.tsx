/* eslint-disable import/no-extraneous-dependencies */
import createIPCMock from 'electron-mock-ipc';

const mocked = createIPCMock();
const { ipcMain } = mocked;
const { ipcRenderer } = mocked;
export {
  ipcMain,
  ipcRenderer 
};
