import React from 'react';
import { ipcRenderer } from 'electron';
import { mocked } from 'ts-jest/utils';
import {
  render,
  act
} from '../../../../test-utils/testUtils';
import { FileList } from './FileList';
import { Metadata } from './FileListItem';
import mockVideoInfo from '../../../../test-utils/videoInfoMock';
import mockMovieDbResponse from '../../../../test-utils/videoMetadataMock';
import { searchMovie } from '../../services/moviedb';

jest.mock('../../services/moviedb');

const expectedValues = {
  fileName: 'Palm.Springs.2020.1080p.AVC.EAC3.6ch.mkv',
  title: 'Palm Springs',
  encoder: 'Matroska / WebM',
  fileSize: '3.15 GB',
  bitRate: '4.67 MB/s',
  duration: '1:29:60'
};

test('should render the video data', () => {
  mocked(searchMovie).mockResolvedValue(mockMovieDbResponse);
  const events: {[key: string]: any} = {};
  jest.spyOn(ipcRenderer, 'on').mockImplementation((channel, listener) => {
    events[channel] = listener;
    return ipcRenderer;
  });
  jest.spyOn(ipcRenderer, 'send').mockImplementation((event, data) => {
    events[event](event, data);
  });
  const { getByText } = render(<FileList />);
  act(() => {
    ipcRenderer.send('video-data-async', mockVideoInfo);
  });
  const fileName = getByText(expectedValues.fileName);
  const encoder = getByText(expectedValues.encoder);
  const fileSize = getByText(expectedValues.fileSize);
  const bitRate = getByText(expectedValues.bitRate);
  const duration = getByText(expectedValues.duration);

  expect(fileName).toBeInTheDocument();
  expect(encoder).toBeInTheDocument();
  expect(fileSize).toBeInTheDocument();
  expect(bitRate).toBeInTheDocument();
  expect(duration).toBeInTheDocument();
});

test('should render a title, synopsis, and image', () => {
  const {
    getByText, getByRole 
  } = render(<Metadata metadata={mockMovieDbResponse.results[0]} />);

  const title = getByText(mockMovieDbResponse.results[0].title);
  const synopsis = getByText(mockMovieDbResponse.results[0].overview);
  const image = getByRole('img');

  expect(title).toBeInTheDocument();
  expect(synopsis).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
