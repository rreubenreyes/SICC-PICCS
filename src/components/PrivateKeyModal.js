import React, { Component } from 'react';

export default class PrivateKeyModal extends Component {
  render() {
    const { show, toggle, privateKey } = this.props;
    return (
      <div
        className={`game--private-key-modal__${show ? 'active' : 'inactive'}`}
      >
        <div className="modal">
          <p>Send this code out to invite friends!</p>
          <h1 className="modal--key">{privateKey}</h1>
          <button
            className="button--small button--info modal--button__close App-headerbutton--info"
            onClick={() => toggle(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}
