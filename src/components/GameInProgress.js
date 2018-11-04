import React, { Component } from 'react'
import Clarifai from 'clarifai'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Challenge from './Challenge'

const clarifaiApp = new Clarifai.App({
  apiKey: '78812b999a7e4e76b5c5765356651516'
})

class GameStarted extends Component {
  state = {
    huntedItem: 'banana',
    imageURL: '',
    pictureIsValid: false,
    isValidatingPicture: false,
    results: []
  }

  startHandleUpload = ({ target: { files } }) => {
    this.setState({
      isValidatingPicture: true
    })
    this.handleUpload(files)
  }

  handleUpload = async files => {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'siccpiccs')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/brandonstinson/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    this.setState({ imageURL: file.secure_url }, this.getClarifaiData)
  }

  getClarifaiData = () => {
    const { imageURL } = this.state
    clarifaiApp.models
      .predict('bd367be194cf45149e75f01d59f77ba7', imageURL)
      .then(res =>
        this.setState(
          { isValidatingPicture: false, results: res },
          this.checkSubmission
        )
      )
  }

  checkSubmission = () => {
    const { huntedItem, results } = this.state
    const names = []
    results.outputs[0].data.concepts
      .filter(concept => concept.value > 0.9)
      .map(filtered => names.push(filtered.name))
    this.setState({
      pictureIsValid: names.includes(huntedItem)
    })
  }

  render() {
    const { huntedItem, pictureIsValid, isValidatingPicture } = this.state
    const { gameId, userId, gameDataId } = this.props
    const GET_GAME_DATA_FROM_ID = gql`
      query {
        game_data(where: {
          id: { _eq: "${gameDataId}" }
        } ) {
          keyword
        }
      }
    `
    return (
      <>
        <Challenge gameDataId={gameDataId} />
        <input
          type="file"
          accept="image/*"
          capture
          id="provided-image"
          onChange={this.startHandleUpload}
        />
        validating: {isValidatingPicture ? 'true' : 'false'}
        {/* {pictureIsValid ? finishGame() : ''} */}
      </>
    )
  }
}

export default GameStarted
