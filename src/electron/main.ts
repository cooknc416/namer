import 'regenerator-runtime';
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron';
import * as path from 'path';
import * as url from 'url';
import { IpcMainEvent } from 'electron/main';
import { getVideoData } from './video.service';
import { renameFile } from './modification.service';

let mainWindow: Electron.BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    x: isDev ? 0 : undefined,
    y: isDev ? 100 : undefined,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#293241',
    title: 'Namer'
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../react/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

ipcMain.on('file-selected', async (event: IpcMainEvent, filePath: string) => {
  const videoData = await getVideoData(filePath);
  event.reply('video-data-async', videoData);
});

ipcMain.on('file-rename', async (event: IpcMainEvent, renameData) => {
  const videoData = await renameFile(renameData);
  event.reply('file-rename-success', videoData);
});

app.on('ready', createWindow);
