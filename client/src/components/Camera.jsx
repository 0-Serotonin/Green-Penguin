import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
function Camera() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  let classesDir = {
    1: {
      name: "Class name 1",
      id: 1,
    },
    2: {
      name: "Class name 2",
      id: 2,
    },
    3: {
      name: "Class name 3",
      id: 3,
    },
    4: {
      name: "Class name 4",
      id: 4,
    }
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await loadGraphModel(
        "https://raw.githubusercontent.com/jeslynlamxy/whack-model-storage/main/best_web_model/model.json"
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
    // textInputRef.current.value = "";
    // const results = await model.classify(imageRef.current);
    // setResults(results);

    const tensorImg = tf.browser
      .fromPixels(imageRef.current)
      .resizeNearestNeighbor([640, 640])
      .toFloat()
      .expandDims();
    const result = await model.executeAsync(tensorImg);

    result.forEach((t) => t.print()); // log out the data of all tensors
    const data = [];
    for (let i = 0; i < result.length; i++) data.push(result[i].dataSync()); // get the data

    const boxes = result[0].dataSync();
    const scores = result[1].arraySync();
    const classes = result[2].dataSync();
    
    const threshold = 0;
    const imageHeight = 640;
    const imageWidth = 640;
    const detectionObjects = [];
    scores.forEach((score, i) => {
      console.log(classesDir[classes[i]].name);
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[i * 4] * imageHeight;
        const minX = boxes[i * 4 + 1] * imageWidth;
        const maxY = boxes[i * 4 + 2] * imageHeight;
        const maxX = boxes[i * 4 + 3] * imageWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;

        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox,
        });
      }
    });

    console.log(detectionObjects)

    // setResults(result);
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
    return <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "20vh",
    }}
  >
    <h1 class="font-weight-light">Model Loading...</h1>
  </div>;
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
        <div class="col-lg-8">
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
        <div class="col-lg-2">
          <Button onClick={null}>UPLOAD IMAGE</Button>
        </div>
        <div class="col-lg-2">
          <Button onClick={null}>USE CAMERA</Button>
        </div>
      </div>

      <h1 className="header">Image Identification</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={triggerUpload}>
          Upload Image
        </button>
        <span className="or">OR</span>
        <input
          type="text"
          placeholder="Paster image URL"
          ref={textInputRef}
          onChange={handleOnChange}
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
          {results.length > 0 && (
            <div className="resultsHolder">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && (
                        <span className="bestGuess">Best Guess</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imageURL && (
          <button className="button" onClick={identify}>
            Identify Image
          </button>
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
