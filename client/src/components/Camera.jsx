import React from "react";
import { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

// history function works but is buggy

function Camera() {
  let classesDir = {
    0: {
      name: "Electric Battery",
      id: 0,
      catergroy: "E-Waste",
      fact: "Rechargeable batteries consume less natural resources!",
    },
    1: {
      name: "Light Bulb",
      id: 1,
      catergroy: "Lighting Waste",
      fact: "LEDs use about 75 per cent less energy, lasts 5 to 10 times longer and do not contain toxins such as mercury!",
    },
    2: {
      name: "Plastic Bottle",
      id: 2,
      catergroy: "Common Recyclables",
      fact: "There are more than 8,000 blue recycling bins in residential estates all over Singapore!",
      // https://www.onemap.gov.sg/main/v2/
    },
    3: {
      name: "Smart Phone",
      id: 3,
      catergroy: "E-Waste",
      fact: "Steve jobs was not able to tell the difference between the iPhone 13 and 14, how shocking!",
    },
  };

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);

  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  // const [history, setHistory] = useState([]);

  const imageRef = useRef();
  const fileInputRef = useRef();

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  const [falseIsUploadTrueIsCamera, setMode] = useState(false);

  const cwidth = 720;
  const cheight = cwidth / (16 / 9);

  // handle models

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await loadGraphModel(
        "https://raw.githubusercontent.com/jeslynlamxy/whack-model-deployment/main/green_penguins/model.json"
      );
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // handles uploaded images

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const triggerUpload = () => {
    setHasPhoto(false);
    setMode(false); //falseIsUploadTrueIsCamera
    fileInputRef.current.click();
  };

  const identify = async () => {
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);

    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(imageRef.current), [
          modelWidth,
          modelHeight,
        ])
        .div(255.0)
        .expandDims(0);
    });

    const results = await model.executeAsync(input);
    const [boxes, scores, classes, valid_detections] = results; // need box to fill up unneeded data
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];
    tf.dispose(results);

    const detectionObjects = [];
    var i;
    for (i = 0; i < valid_detections_data; ++i) {
      detectionObjects.push({
        label: classesDir[classes_data[i]].name,
        score: scores_data[i].toFixed(4),
        catergroy: classesDir[classes_data[i]].catergroy,
        fact: classesDir[classes_data[i]].fact,
      });
    }
    setResults(detectionObjects);
  };

  useEffect(() => {
    loadModel();
  }, []);

  // useEffect(() => {
  //   if (imageURL) {
  //     setHistory([imageURL, ...history]);
  //   }
  // }, [imageURL]);

  // handles webcam detection

  const getVideo = () => {
    setMode(true); //falseIsUploadTrueIsCamera
    setPlaying(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: cwidth, height: cheight } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = videoRef.current;
    video.srcObject.getTracks()[0].stop();
  };

  const takePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = cwidth;
    photo.height = cheight;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, cwidth, cheight);
    setHasPhoto(true);
  };

  const identifyForVideo = async () => {
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);

    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(photoRef.current), [
          modelWidth,
          modelHeight,
        ])
        .div(255.0)
        .expandDims(0);
    });

    const results = await model.executeAsync(input);
    const [boxes, scores, classes, valid_detections] = results; // need box to fill up unneeded data
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];
    tf.dispose(results);

    const detectionObjects = [];
    var i;
    for (i = 0; i < valid_detections_data; ++i) {
      detectionObjects.push({
        label: classesDir[classes_data[i]].name,
        score: scores_data[i].toFixed(4),
        catergroy: classesDir[classes_data[i]].catergroy,
        fact: classesDir[classes_data[i]].fact,
      });
    }
    setResults(detectionObjects);
  };

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
        <h1 class="font-weight-light">Category Classification</h1>
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
          <Button onClick={triggerUpload}>UPLOAD IMAGE</Button>
        </div>

        <div class="col-lg-2">
          <div ref={videoRef} className="app__input">
            {playing ? (
              <Button onClick={stopVideo}>STOP WEBCAM</Button>
            ) : (
              <Button onClick={getVideo}>START WEBCAM</Button>
            )}
          </div>
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

      {/* one or the other */}

      {falseIsUploadTrueIsCamera ? (
        // camera
        <div className="imageHolder">
          {playing && (
            <div>
              <div className="camera">
                <video ref={videoRef}></video>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Button onClick={takePhoto} class="middle">
                  CAPTURE IMAGE
                </Button>
              </div>
              <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
                <canvas ref={photoRef}></canvas>
                {hasPhoto && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                    }}
                  >
                    <Button onClick={identifyForVideo} class="middle">
                      IDENTIFY IMAGE
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        // upload
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
      )}

      <div className="resultsHolder">
        {results.map((result, index) => {
          return (
            <div className="result" key={index}>
              <span className="name">Item detected: {result.label} </span>
              <span className="confidence">
                Confidence level: {result.score}{" "}
                {index === 0 && <span className="bestGuess">Best Guess</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="recycleGuideHolder">
        {results.map((result, index) => {
          return (
            <div className="result" key={index}>
              <span className="name">
                Recycling Category: {result.catergroy}
              </span>
              <span className="funfact">Did you know? {result.fact}</span>
            </div>
          );
        })}
      </div>

      {/* {history.length > 0 && (
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
      )} */}
    </div>
  );
}

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 8px 8px 8px 8px;
  border-radius: 10px;
  margin: 10px 10px
  cursor: pointer;
`;

export default Camera;
