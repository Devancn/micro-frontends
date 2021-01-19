import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link} from 'react-router-dom'


function render() {
  ReactDOM.render(
    <BrowserRouter basename={ window.__POWERED_BY_QIANKUN__ ? '/react' : ''}>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/about">about</Link></li>
      </ul>
      <Route path="/" exact render={() => <div>home 页面</div>}></Route>
      <Route path="/about" render={() => <div>about 页面</div>}></Route>
    </BrowserRouter>,
    document.getElementById('react-app')
  )
}

export async function bootstrap() {}

export async function mount(props) {
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode( document.getElementById('react-app'));
}