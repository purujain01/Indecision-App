import React from 'react'
import Modal from 'react-modal'

const ShowOption = (props) => (
    <Modal
      isOpen={!!props.open}
      onRequestClose={props.clearModal}
      ariaHideApp={false}
      contentLabel="Selected Option"
      closeTimeoutMS={200}
      className="modal"
    >
        <h3 className="modal__title">Selected Option</h3>
        {props.open && <p className="modal__body">{props.open}</p>}
        <button className="button" onClick={props.clearModal}>Okay</button>
    </Modal>
)

export default ShowOption