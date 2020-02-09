import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducers from './Reducers';
import rootSaga from './Sagas';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware()

/*
const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
*/

    const composeEnhancers = 
        typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? 
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware, /*other middleware*/),
        /* other store enhancers if any */
      );

    const store = createStore(
        allReducers, enhancer
    );



/*
const store = createStore(
    allReducers,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  );
*/
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
