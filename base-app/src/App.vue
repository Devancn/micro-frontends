<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="home"><router-link to="/">home</router-link></a-menu-item>
      <a-menu-item key="about"><router-link to="/about">about</router-link></a-menu-item>
      <a-menu-item key="react"><router-link to="/react">react</router-link></a-menu-item>
      <a-menu-item key="vue"><router-link to="/vue">vue</router-link></a-menu-item>
    </a-menu>
    <div id="sub-app"></div>
    <router-view></router-view>
  </div>
  
</template>

