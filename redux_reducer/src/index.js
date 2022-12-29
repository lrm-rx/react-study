import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './store'
// import { StoreContext } from './utils/context'
import {Provider} from 'react-redux'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <StoreContext.Provider value={store}>
    //     <App />
    // </StoreContext.Provider>
    <Provider store={store}>
        <App/>
    </Provider>
);
