import Modal from 'Components/Modal.jsx';
import noData from 'Assets/img/builder/no-data.png';
import React, { useEffect, useState } from "react";
import useFormAPI from 'API/useFormAPI.js';
import TemplateBox from './Style';

const Table = () => {
    const { createItem: createForm, getItems: getAllForms, updateItem: updateFormName, deleteItem: deleteForm } = useFormAPI();
    /* Initialize State */
    const [state, setState] = useState({
        data: [],
        titleInput: '',
        message: '',
        responseType: '',
        deleteId: '',
        modalStatus: 'close',
        loader: true,
    });

    /* Initialize editElementIndex State */
    const [editElementIndexState, seteditElementIndexState] = useState({
        editElementIndex: '',
    });

    /* State Destructuring  */
    const { data, titleInput, message, responseType, modalStatus, deleteId, loader } = state;
    const { editElementIndex } = editElementIndexState;

    /* Edit Mode Activation */
    const activateeditElementIndex = (e, name, index) => {
        e.preventDefault()
        setState({
            ...state,
            titleInput: name,
        });
        seteditElementIndexState({
            editElementIndex: index,
        });
    };

    /* Edit Mode Cancelation */
    const canceleditElementIndex = (e) => {
        e.preventDefault();
        seteditElementIndexState({
            editElementIndex: '',
        });
    };

    /* Update Table Name */
    const updateTableName = (event) => {
        setState({
            ...state,
            titleInput: event.target.value,
        });
    };

    /* Remove The Notice Box */
    const removeNotice = (event) => {
        event.preventDefault();
        setState({
            ...state,
            message: '',
        });
    };

    /* Update Table Name */
    const saveTableName = (e,id) => {
        e.preventDefault();
        data.filter(item => item.id === id).map(item => {
            let args = {};
            args.name = (titleInput) ? titleInput : '';
            

            
            updateFormName(id,args)
                .then(response => {
                    if (response.success) {
                        const stateData = data.filter(stateItem => {
                            if (stateItem.id === id) {
                                stateItem.name = titleInput;
                            }
                            return stateItem;
                        });
                        setState({
                            ...state,
                            data: stateData,
                            responseType: 'success',
                            message: response.message,
                            loader: false,
                        });
                    } else {
                        setState({
                            ...state,
                            data: data,
                            responseType: 'warning',
                            message: response.message,
                            loader: false,
                        });
                    }
                    seteditElementIndexState({
                        editElementIndex: '',
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    };

    /* Handle Delete Confirmation */
    const handleOk = e => {
        e.preventDefault();
        
        deleteForm(deleteId)
            .then(response => {
                console.log(response)
                if (response.success) {
                    const stateData = data.filter(item => item.id !== deleteId);
                    setState({
                        ...state,
                        data: stateData,
                        responseType: 'success',
                        message: response.message,
                        modalStatus: 'close',
                        loader: false,
                    });
                }
            })
            .catch((error) => {
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                    modalStatus: 'close',
                    loader: false,
                });
            });
    };

    /* Handle Delete Modal Cancelation */
    const handleCancel = e => {
        e.preventDefault();
        setState({
            ...state,
            modalStatus: 'close'
        });
    };

    /* Delete Form */
    const formDeletion = (e,id) => {
        e.preventDefault();
        setState({
            ...state,
            modalStatus: "open",
            deleteId: id,
        });
    };

    /* useEffect Hook used for render data when component was mounted  */
    useEffect(() => {
        getAllForms()
            .then(response => {
                setState({
                    ...state,
                    // titleInput: response.data.name,
                    data: response.data,
                    loader: false,
                });
            })
            .catch((error) => {
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                    loader: false,
                });
            });
    }, []);

    return (
        <TemplateBox className={loader ? "wpwax-vm-loder-active" : null}>
            <div className="wpwax-vm-table-wrap wpwax-vm-table-responsive">
                {message ?
                    <p className={`${responseType === 'success' ? 'wpwax-vm-notice wpwax-vm-notice-success' : 'wpwax-vm-notice wpwax-vm-notice-danger'}`}>
                        <span className="wpwax-vm-notice__text">{message}</span>
                        <a href="#" className="wpwax-vm-notice__close" onClick={removeNotice}>x</a>
                    </p>
                    : ''
                }
                {
                    loader ? <span className="wpwax-vm-loading-spin">
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                    </span> :
                    data.length > 0 ? 
                        <table  className="wpwax-vm-table">
                            <thead>
                                    <tr>
                                        <th className="wpwax-vm-head-name">Title</th>
                                        <th className="wpwax-vm-head-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((value, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <div className="wpwax-vm-titlebox">
                                                            <div className="wpwax-vm-titlebox-inner">
                                                                <span className={editElementIndex === key ? 'wpwax-vm-titlebox__name' : 'wpwax-vm-titlebox__name wpwax-vm-show'}>
                                                                    {value.name}
                                                                    <span className="wpwax-vm-titlebox__id">ID: {value.id}</span>
                                                                </span>
                                                                <div className={editElementIndex === key ? `wpwax-vm-titlebox__editor wpwax-vm-show` : `wpwax-vm-titlebox__editor`}>
                                                                    <input type="text" name="wpwax-vm-title-input" value={titleInput || ''} onChange={updateTableName} />
                                                                </div>
                                                                <div className="wpwax-vm-titlebox__editor-action">
                                                                    <a href="#" className={editElementIndex === key ? 'wpwax-vm-titlebox__editor--cancel wpwax-vm-show' : 'wpwax-vm-titlebox__editor--cancel'} onClick={e => canceleditElementIndex(e)}>
                                                                        <span className="dashicons dashicons-no"></span>
                                                                    </a>
                                                                    <a href="#" className={editElementIndex === key ? 'wpwax-vm-titlebox__editor--yes wpwax-vm-show' : 'wpwax-vm-titlebox__editor--yes'} onClick={e => saveTableName(e,value.id)}>
                                                                        <span className="dashicons dashicons-yes"></span>
                                                                    </a>
                                                                    <a href="#" className={editElementIndex === key ? 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit' : 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show'} onClick={e => activateeditElementIndex(e, value.name, key)}></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="wpwax-vm-table-action">
                                                            <a href={`${location.href}&mode=edit&id=${value.id}`} className="wpwax-vm-btn wpwax-vm-btn-light"> <span className="dashicons dashicons-edit"></span> Edit</a>
                                                            <a href="#" className="wpwax-vm-btn wpwax-vm-btn-danger" onClick={e => formDeletion(e,value.id)}> <span className="dashicons dashicons-trash"></span> Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }) 
                                    }
                                </tbody>
                        </table>
                        :
                        <div className="wpwax-empty-table-box">
                            <div className="wpwax-empty-table-box__img">
                                <img src={noData} alt="Video Support" />
                            </div>
                            <div className="wpwax-empty-table-box__content">
                                <p>Ready to start creating your first video message form?</p>
                                <a href={location.href+'&mode=edit'} className={`wpwax-vm-page-header-btn wpwax-vm-btn wpwax-vm-btn-primary`}>Create Form</a>
                            </div>
                        </div> 
                }

                <Modal title="Delete Template" handleOk={e=>handleOk(e)} handleCancel={e=>handleCancel(e)} status={modalStatus}>
                    <p>Are Your Sure ?</p>
                </Modal>
            </div>
        </TemplateBox>
    )
}

export default Table;