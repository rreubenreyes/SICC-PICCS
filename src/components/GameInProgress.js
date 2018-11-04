import React, { Component } from 'react'
import Clarifai from 'clarifai'

const clarifaiApp = new Clarifai.App({
  apiKey: '78812b999a7e4e76b5c5765356651516'
})

class GameStarted extends Component {
  state = {
    huntedItem: 'banana',
    imageURL: '',
    results: []
  }

  handleUpload = async e => {
    const files = e.target.files
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
      .then(res => this.setState({ results: res }, this.checkSubmission))
  }

  checkSubmission = () => {
    const { huntedItem, results } = this.state
    const names = []
    results.outputs[0].data.concepts
      .filter(concept => concept.value > 0.9)
      .map(filtered => names.push(filtered.name))
    return names.includes(huntedItem)
  }

  render() {
    const { huntedItem } = this.state
    return (
      <>
        <h1>Find a {huntedItem}!</h1>
        <input
          type="file"
          accept="image/*"
          capture
          id="provided-image"
          onChange={this.handleUpload}
        />
        {/* <h1>Results:</h1> */}
        {/* <div style={{ margin: '20px' }}>
          {results &&
            results.outputs[0].data.concepts.map(item => (
              <p key={item.id}>
                {item.name}
                --
                {item.value}
              </p>
            ))}
        </div> */}
      </>
    )
  }
}

export default GameStarted
