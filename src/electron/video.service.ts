import ffmpeg from 'fluent-ffmpeg';

export const processVideo = (path: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(path, (error: string, videoInfo: any) => {
      if (error) reject(error);
      resolve(videoInfo);
    });
  });
};
