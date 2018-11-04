import React, { Component } from 'react'

class Challenge extends Component {
  render() {
    const { display } = this.props
    return (
      <div
        className="challenge"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          padding: '0 1rem',
          justifyContent: 'center'
        }}>
        <p>
          Hello{' '}
          <strong>
            <em>MORTAL</em>
          </strong>
          , find the following:
        </p>
        <h1 style={{ flexBasis: '100%', textAlign: 'center' }}>{display}</h1>
        <p>and take a picture of it!</p>
      </div>
    )
  }
}

export default Challenge
