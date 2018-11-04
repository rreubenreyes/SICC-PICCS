import React, { Component } from 'react'
import Clarifai from 'clarifai'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const FINISH_GAME = gql`
  mutation update_games(
    $userId: String!
    $gameId: String!
    $gameDataId: String!
  ) {
    update_games(
      where: {
        createdBy: { _eq: $userId }
        id: { _eq: $gameId }
        status: { _eq: "pending" }
      }
      _set: { status: "inProgress", game_data_id: $gameDataId }
    ) {
      affected_rows
    }
  }
`

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
    console.log(res)
    const file = await res.json()

    this.setState({ imageURL: file.secure_url }, this.getClarifaiData)
  }

  getClarifaiData = () => {
    const { imageURL } = this.state
    clarifaiApp.models
      .predict('bd367be194cf45149e75f01d59f77ba7', imageURL)
      .then(res =>
        this.setState({ loading: false, results: res }, this.checkSubmission)
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
    const { gameId, userId } = this.props
    return (
      <Mutation mutation={FINISH_GAME} variables={{ gameId, userId }}>
        {finishGame => (
          <>
            <h1>Find a {huntedItem}!</h1>
            <input
              type="file"
              accept="image/*"
              capture
              id="provided-image"
              onChange={this.handleUpload}
            />
            validating: {isValidatingPicture ? 'true' : 'false'}
            {pictureIsValid ? finishGame() : ''}
          </>
        )}
      </Mutation>
    )
  }
}

export default GameStarted
