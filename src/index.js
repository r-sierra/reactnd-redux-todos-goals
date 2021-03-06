import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './index.css'
import ConnectedApp from './components/App'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <ConnectedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
