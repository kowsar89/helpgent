import { ReactSVG } from 'react-svg';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';
import {
    updateFormData as upateUserFormData,
    upateState as upateUserState,
} from '../../../../store/forms/user/actionCreator';

import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import { useState } from 'react';
import screenTypes from '../../../../store/chatbox/screenTypes';
import { useEffect } from 'react';

function Form() {
    const dispatch = useDispatch();

    const { userForm, messengerForm } = useSelector((state) => {
        return {
            userForm: state.userForm,
            messengerForm: state.messengerForm,
        };
    });

    const nameRef = useRef();
    const emailRef = useRef();

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userForm.formData.name) {
            nameRef.current.value = userForm.formData.name;
        }

        if (userForm.formData.email) {
            emailRef.current.value = userForm.formData.email;
        }
    }, []);

    // After User Creation Failed
    useEffect(() => {
        if (false !== userForm.status) {
            return;
        }

        if (userForm.statusMessage) {
            setErrorMessage(userForm.statusMessage);
        } else if (messengerForm.statusMessage) {
            setErrorMessage(messengerForm.statusMessage);
        }
    }, [userForm.status]);

    // submitHandler
    function submitHandler(e) {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;

        if (!name || !email) {
            setErrorMessage('Please fill up the required fields');
            return;
        }

        const formData = { name, email };

        dispatch(upateUserFormData(formData, true));
        dispatch(upateUserState({ submitted: false, status: null }));
        dispatch(changeChatScreen(screenTypes.SENDING));
    }

    return (
        <form onSubmit={submitHandler} className='wpwax-vm-h-100pr'>
            <div className='wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column'>
                <div className='wpwax-vm-body wpwax-vm-flex-grow-1'>
                    <h4 className='wpwax-vm-contact-form__title'>
                        Before you go, please leave your contact details so we
                        can get back to you…
                    </h4>

                    <div className='wpwax-vm-form-group'>
                        <input
                            ref={nameRef}
                            type='text'
                            className='wpwax-vm-form__element'
                            placeholder='Your name*'
                        />
                    </div>

                    <div className='wpwax-vm-form-group'>
                        <input
                            ref={emailRef}
                            type='email'
                            className='wpwax-vm-form__element'
                            placeholder='Your email*'
                        />
                    </div>
                </div>

                <div className='wpwax-vm-footer'>
                    <button
                        type='submit'
                        className='wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary'
                    >
                        Submit <ReactSVG src={paperPlan} />
                    </button>

                    {errorMessage && (
                        <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default Form;
