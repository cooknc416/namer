import ffmpeg from 'fluent-ffmpeg';

export const processVideo = async (fileObj: {id: string, path: string}) => {
  ffmpeg.ffprobe(fileObj.path, (error: string, videoInfo) => {
    if (error) throw new Error(error);
    return videoInfo;
  });
};
