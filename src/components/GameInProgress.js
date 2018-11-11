import React, { Component } from "react";
import Clarifai from "clarifai";

import Challenge from "./Challenge";
import GetGameData from "./GetGameData";
import Winner from "./Winner";
import { checkSubmission } from "../helpers/helpers";

const clarifaiApp = new Clarifai.App({
  apiKey: "78812b999a7e4e76b5c5765356651516"
});

class GameInProgress extends Component {
  state = {
    base64: null,
    pictureIsValid: null,
    isValidatingPicture: false,
    results: []
  };

  startHandleUpload = ({ target: { files } }, { cfid, keyword, model }) => {
    this.setState({
      isValidatingPicture: true
    });
    this.handleUpload(files, cfid, keyword, model);
  };

  handleUpload = async (files, cfid, keyword, model) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({ base64: reader.result.split(",")[1] }, () =>
        this.getClarifaiData(cfid, keyword, model)
      );
    });
    reader.readAsDataURL(files[0]);
  };

  getClarifaiData = (cfid, keyword, model) => {
    const { base64 } = this.state;
    clarifaiApp.models.predict(cfid, { base64 }).then(results =>
      this.setState({
        isValidatingPicture: false,
        results,
        pictureIsValid: checkSubmission({ keyword, results, model })
      })
    );
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
            <>
              <Challenge display={gameData.display} />
              <div className="clarifai-upload">
                <input
                  placeholder="Found one!"
                  type="file"
                  accept="image/*"
                  capture
                  id="provided-image"
                  onChange={e =>
                    this.startHandleUpload(e, {
                      cfid: gameData.cfid,
                      keyword: gameData.keyword,
                      model: gameData.model
                    })
                  }
                />
              </div>
              {pictureIsValid && <Winner userId={userId} />}
              {isValidatingPicture && <p>Validating...</p>}
              {pictureIsValid === false &&
                !isValidatingPicture && (
                  <p>{`Sorry, this is not a picture of ${
                    gameData.display
                  }. Try again!`}</p>
                )}
            </>
          );
        }}
      </GetGameData>
    );
  }
}

export default GameInProgress;
