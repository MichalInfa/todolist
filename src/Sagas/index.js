import {put, takeEvery, takeLatest, all} from 'redux-saga/effects';
import {getCommentsList, deleteCommentFromList} from './remote';


function* fetchComments (action){
    const resp = yield getCommentsList(action.url)
    yield put ({type: "COMMENTS_RECEIVED", comments: resp.comments, meta: resp.meta});
}

function* deleteComment (action) {
    console.log(action.element, action.url)

    yield deleteCommentFromList(action.deleteurl, action.element)
    const resp = yield getCommentsList(action.url);
    yield put ({type: "COMMENTS_RECEIVED", comments: resp.comments, meta: resp.meta});
}

/*-------------------------------------------------- */

function* actionFetchCommentsWatcher(){
    yield takeEvery('GET_COMMENTS', fetchComments)
}

function* actionCommentsDeleteWatcher(){
    yield takeLatest('DELETE_COMMENT', deleteComment)
}

export default function* rootSaga(){
    yield all([
        actionFetchCommentsWatcher(),
        actionCommentsDeleteWatcher(),
    ]);
}