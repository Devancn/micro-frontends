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
      <Route path="/" exact render={(props) => {
        console.log(props, 'props')
        return <div>home 页面</div>
      }}></Route>
      <Route path="/about" render={(props) => {
        console.log(props, 'props')
        return <div>about 页面</div>
      }}></Route>
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

if(window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if(!window.__POWERED_BY_QIANKUN__) {
  render()
}

