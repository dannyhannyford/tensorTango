import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseNet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div>
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
      style ={{
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
