import actions from './actions';

const initialState = {
    paginationPerPage: 10,
    selectedSession: null,
    allSessions: {},
    isLoadingSession: false,
    messageType: 'video',
    videoStage: 'home',
    replyMode: false,
    loading: false,
    error: null,
};

const {
    UPDATE_SELECTED_SESSION,
    ADD_SESSION,
    UPDATE_SESSION_MESSAGES,

    REPLY_MODE_UPDATE_BEGIN,
    REPLY_MODE_UPDATE_SUCCESS,
    REPLY_MODE_UPDATE_ERR,

    MESSAGE_TYPE_UPDATE_BEGIN,
    MESSAGE_TYPE_UPDATE_SUCCESS,
    MESSAGE_TYPE_UPDATE_ERR,

    MESSAGE_STAGE_UPDATE_BEGIN,
    MESSAGE_STAGE_UPDATE_SUCCESS,
    MESSAGE_STAGE_UPDATE_ERR,
} = actions;

const Reducer = (state = initialState, action) => {
    const { type, data, error } = action;
    switch (type) {
        case UPDATE_SELECTED_SESSION:
            return {
                ...state,
                selectedSession: data,
            };
        case ADD_SESSION:

            if ( !data.sessionID ) {
                return state;
            }

            if ( ! data.session) {
                return state;
            }

            if ( Object.keys( state.allSessions ).includes( data.sessionID ) ){
                return state;
            }

            return {
                ...state,
                allSessions: { ...state.allSessions, [data.sessionID]: data.session },
            };
        case UPDATE_SESSION_MESSAGES:

            if ( !data.sessionID ) {
                return state;
            }

            if ( ! data.sessionMessages) {
                return state;
            }

            if ( ! Object.keys( state.allSessions ).includes( data.sessionID ) ){
                return state;
            }

            return {
                ...state,
                allSessions: { ...state.allSessions, [data.sessionID]: data.sessionMessages },
            };
        case REPLY_MODE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case REPLY_MODE_UPDATE_SUCCESS:
            return {
                ...state,
                replyMode: data,
                sLoading: false,
            };
        case REPLY_MODE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        case MESSAGE_TYPE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case MESSAGE_TYPE_UPDATE_SUCCESS:
            return {
                ...state,
                messageType: data,
                replyMode: true,
                sLoading: false,
            };
        case MESSAGE_TYPE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        case MESSAGE_STAGE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case MESSAGE_STAGE_UPDATE_SUCCESS:
            return {
                ...state,
                videoStage: data,
                sLoading: false,
            };
        case MESSAGE_STAGE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        default:
            return state;
    }
};

export default Reducer;
