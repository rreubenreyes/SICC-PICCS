import React, { Component } from 'react'
import Clarifai from 'clarifai'

const clarifaiApp = new Clarifai.App({
  apiKey: '78812b999a7e4e76b5c5765356651516'
})

export default class App extends Component {
  state = {
    imageURL: '',
    results: false
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
      .then(res => this.setState({ results: res }))
  }

  render() {
    const { results } = this.state
    return (
      <React.Fragment>
        <h1>Take a picture!</h1>
        <input
          type="file"
          accept="image/*"
          capture
          id="provided-image"
          onChange={this.handleUpload}
          placeholder="Click to open your camera"
        />
        <h1>Results:</h1>
        <div style={{ margin: '20px' }}>
          {results &&
            results.outputs[0].data.concepts.map(item => (
              <p key={item.id}>
                {item.name}
                --
                {item.value}
              </p>
            ))}
        </div>
      </React.Fragment>
    )
  }
}
