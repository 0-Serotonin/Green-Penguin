import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

tf.setBackend("webgl");

const threshold = 0.75;

let classesDir = {
  1: {
      name: 'Kangaroo',
      id: 1,
  },
  2: {
      name: 'Other',
      id: 2,
  }
}

function Camera() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();


  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await loadGraphModel(
        "https://raw.githubusercontent.com/jeslynlamxy/whack-model-storage/main/model.json"
      );
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const identify = async () => {
    const tensorImg = tf.browser
      .fromPixels(imageRef.current)
      .resizeNearestNeighbor([640, 640])
      .toFloat()
      .expandDims();
    const results = await model.executeAsync(tensorImg);

    const [boxes, scores, classes, valid_detections] = results;
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    tf.dispose(results);

    var i;
    for (i = 0; i < valid_detections_data; ++i) {
      const klass = classes_data[i];
      const score = scores_data[i].toFixed(2);
      console.log(klass, score);
    }

    // // output is an array of tf.tensor.
    // results.forEach((t) => t.print()); // log out the data of all tensors
    // const data = [];
    // for (let i = 0; i < results.length; i++) data.push(results[i].dataSync()); // get the data

    // const scores = results[1].arraySync();
    // const classes = results[2].dataSync();

    // const threshold = 0.8;

    // const detectionObjects = [];
    // scores.forEach((score, i) => {
    //   if (score[i] > threshold) {
    //     detectionObjects.push({
    //       class: classes[i],
    //       label: classesDir[classes[i]].name,
    //       score: score[i].toFixed(2),
    //     });
    //   }
    // });

    // setResults(detectionObjects);
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (imageURL) {
      setHistory([imageURL, ...history]);
    }
  }, [imageURL]);

  if (isModelLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <h1 class="font-weight-light">Model Loading...</h1>
      </div>
    );
  }

  return (
    <div class="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <h1 class="font-weight-light">Catergroy Classification</h1>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <h3
            style={{
              fontFamily: "Playfield display",
              fontWeight: "bold",
              height: "10vh",
            }}
          >
            Find out where to recycle your items
          </h3>
        </div>
        <div class="col-lg-3">
          <input
            type="text"
            placeholder="Paste Image URL"
            ref={textInputRef}
            onChange={handleOnChange}
          />
        </div>
        <div class="col-lg-2">
          <Button onClick={triggerUpload}>UPLOAD IMAGE</Button>
        </div>
        <div class="col-lg-2">
          <Button onClick={null}>USE CAMERA</Button>
        </div>
      </div>

      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
      </div>

      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && (
              <img
                src={imageURL}
                alt="Upload Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>

          <div className="resultsHolder">
            {results.map((result, index) => {
              return (
                <div className="result" key={index}>
                  <span className="name">Item detected: {result.label} </span>
                  <span className="confidence">
                    Confidence level: {result.score}{" "}
                    {index === 0 && (
                      <span className="bestGuess">Best Guess</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {imageURL && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            <Button onClick={identify} class="middle">
              IDENTIFY IMAGE
            </Button>
          </div>
        )}
      </div>
      {history.length > 0 && (
        <div className="recentPredictions">
          <h2>Recent Images</h2>
          <div className="recentImages">
            {history.map((image, index) => {
              return (
                <div className="recentPrediction" key={`${image}${index}`}>
                  <img
                    src={image}
                    alt="Recent Prediction"
                    onClick={() => setImageURL(image)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
const Button = styled.button`
  background-color: white;
  padding: 8px 8px 8px 32px;
  color: black;
  font-size: 12px;
  border-radius: 10px;
  margin: 1px 100px
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABmJLR0QA/wD/AP+gvaeTAAAA7UlEQVQ4jb2UTQ6CQAyFv4gxEXfq0jvoxp97qZxJb+Fag3oBFihnYKESXdCJk8kUERNf0jTTljd9pQB/RgD0xTdCD4iAGCiAJ/CQ8xoI6xItgEwINLsC8zpE+QciYzkwq5KmdXRS4hdNclQhCfG+/MpHFivFieQTJX8wBG3xATB2yDPg5nQG0AFGVt1Eni9MYOjcdvS1bsGd4cBOBpR75M4qAXZSs5OzO7s7noVuOrO9IWhZZBtFUsfxLra+YOiRYOysxFOgq1zCnO++gKlGZDCj3OwqorQOkS15RbmQd95v7QAsq6R9ws//s0Z4AYPMj/ARKOC7AAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: 8px 8px;
`;
export default Camera;
