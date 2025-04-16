import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    userRole: null,
    userInfo: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    insertPermission: null,
    bulkInsertPermission: null,
    searchPermission: null,
    editPermission: null,
    deletePermission: null,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        token: action.session_token,
        userId: action.userId,
        userRole: action.userRole,
        userInfo: action.userInfo,
        insertPermission: action.insertPermission,
        bulkInsertPermission: action.bulkInsertPermission,
        searchPermission: action.searchPermission,
        editPermission: action.editPermission,
        deletePermission: action.deletePermission,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;
