import 'regenerator-runtime';
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron';
import * as path from 'path';
import * as url from 'url';
import { processVideo } from './video.service';

let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#293241',
    title: 'Namer'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
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

ipcMain.on('onfileselected', async (event, fileObj) => {
  const videoData = await processVideo(fileObj);
  event.reply('video-data-async', videoData);
});

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
