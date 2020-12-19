import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseNet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeypoints, drawSkeleton } from '../utilities';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [backup, setBackup] = useState(false);

  const runPosenet = async () => {
    const net = await poseNet.load({
      inputResolution: { width: 640, height: 480 },
      // scale: smaller is faster/less accurate
      scale: 0.5,
    });

    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      // video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // setting video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // detections
      const pose = await net.estimateSinglePose(video);
      console.log('detect pose: ', pose);
      if (pose.score < 0.6) {
        notifyBackup(true);
      } else {
        notifyBackup(false);
      }

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
  };

  const notifyBackup = (bool) => {
    setBackup(bool);
  };

  runPosenet();

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <Profile />
      {backup && <div>please back up</div>}
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default App;
