import React, { Component } from 'react'

class Test extends Component {
  state = {
    imageURL: '',
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
        body: data,
      }
    )
    const file = await res.json()
    this.setState({ imageURL: file.secure_url })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Take a pic or load an image:</h1>
        <input
          type="file"
          accept="image/*"
          capture
          id="provided-image"
          onChange={this.handleUpload}
        />
      </React.Fragment>
    )
  }
}

export default Test
