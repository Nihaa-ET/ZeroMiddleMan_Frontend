import React from 'react';
import PropTypes from 'prop-types';
 // Ensure you have correct styles for modal

const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <p>{message}</p>
                <div className='modal-actions'>
                    <button onClick={onConfirm} className='confirm-button'>OK</button>
                    <button onClick={onCancel} className='cancel-button'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ConfirmationModal;
