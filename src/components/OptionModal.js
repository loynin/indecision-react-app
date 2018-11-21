import React from 'react';
import Modal from 'react-modal';

class OptionModal extends React.Component{
    render(){
        return (
            <Modal
                isOpen= {!!this.props.selectedOption}
                contentLabel="Selected Option"
                appElement={document.getElementById('app')}
                onRequestClose={this.props.closeModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Selected Option</h3>
                {this.props.selectedOption && <p className="modal__body">{this.props.selectedOption}</p>}
                <button className="button" onClick={this.props.closeModal}>Close</button>
            </Modal>
        )
    }
    
}

export default OptionModal;