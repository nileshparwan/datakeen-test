import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black/50 animate-fadeIn'>
            <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-slideUp'>
                <div className='modal-header flex justify-between align-center mb-5'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <button className='btn-close' type='button' onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className='modal-body'>
                    {children}
                </div>
                {/* <div className='modal-footer flex justify-end'>
                    <button className='mt-4 bg-blue-500 text-white p-2 rounded-md ' type='button' onClick={onClose}>
                        Update
                    </button>
                </div> */}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
