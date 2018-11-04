import React, { Component } from "react";
import Clarifai from "clarifai";
import Winner from "./Winner";

import Challenge from "./Challenge";
import GetGameData from "./GetGameData";

const clarifaiApp = new Clarifai.App({
  apiKey: "78812b999a7e4e76b5c5765356651516"
});

class GameInProgress extends Component {
  state = {
    imageURL: "",
    pictureIsValid: null,
    isValidatingPicture: false,
    results: []
  };

  startHandleUpload = ({ target: { files } }, { cfid, keyword }) => {
    this.setState({
      isValidatingPicture: true
    });
    this.handleUpload(files, cfid, keyword);
  };

  handleUpload = async (files, cfid, keyword) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "siccpiccs");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/brandonstinson/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    this.setState({ imageURL: file.secure_url }, () =>
      this.getClarifaiData(cfid, keyword)
    );
  };

  getClarifaiData = (cfid, keyword) => {
    const { imageURL } = this.state;
    clarifaiApp.models
      .predict(cfid, imageURL)
      .then(res =>
        this.setState({ isValidatingPicture: false, results: res }, () =>
          this.checkSubmission(keyword)
        )
      );
  };

  checkSubmission = keyword => {
    const { results } = this.state;
    const names = [];
    results.outputs[0].data.concepts
      .filter(concept => concept.value > 0.9)
      .map(filtered => names.push(filtered.name));
    this.setState({
      pictureIsValid: names.includes(keyword)
    });
  };

  render() {
    const { pictureIsValid, isValidatingPicture } = this.state;
    const { userId, gameId, gameDataId } = this.props;
    if (pictureIsValid) {
      return <Winner userId={userId} gameId={gameId} />;
    }
    return (
      <GetGameData gameDataId={gameDataId}>
        {gameData => {
          return (
            <React.Fragment>
              <Challenge display={gameData.display} />
              <input
                type="file"
                accept="image/*"
                capture
                id="provided-image"
                onChange={e =>
                  this.startHandleUpload(e, {
                    cfid: gameData.cfid,
                    keyword: gameData.keyword
                  })
                }
              />
              {isValidatingPicture && <p>Validating...</p>}
              {pictureIsValid === false &&
                !isValidatingPicture && (
                  <p>
                    {`Sorry, this is not a picture of ${
                      gameData.display
                    }. Try again!`}
                  </p>
                )}
            </React.Fragment>
          );
        }}
      </GetGameData>
    );
  }
}

export default GameInProgress;
