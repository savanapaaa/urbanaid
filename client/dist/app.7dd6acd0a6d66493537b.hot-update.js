"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateurbanaid"]("app",{

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BASE_URL: function() { return /* binding */ BASE_URL; },\n/* harmony export */   CLIENT_URL: function() { return /* binding */ CLIENT_URL; },\n/* harmony export */   config: function() { return /* binding */ config; }\n/* harmony export */ });\nconst config = {\n  BASE_URL: 'https://urbanaid-server.vercel.app/api',\n  CLIENT_URL: 'https://urbanaid-client.vercel.app',\n  DEV: {\n    BASE_URL: 'http://localhost:5000/api',\n    CLIENT_URL: 'http://localhost:9000'\n  }\n};\nconst isProduction = \"development\" === 'production';\nconst currentConfig = isProduction ? config : config.DEV;\nconst BASE_URL = currentConfig.BASE_URL;\nconst CLIENT_URL = currentConfig.CLIENT_URL;\nconsole.log('Environment:', \"development\");\nconsole.log('Using URLs:', currentConfig);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLE1BQU1BLE1BQU0sR0FBRztFQUNwQkMsUUFBUSxFQUFFLHdDQUF3QztFQUNsREMsVUFBVSxFQUFFLG9DQUFvQztFQUNoREMsR0FBRyxFQUFFO0lBQ0RGLFFBQVEsRUFBRSwyQkFBMkI7SUFDckNDLFVBQVUsRUFBRTtFQUNoQjtBQUNGLENBQUM7QUFFRCxNQUFNRSxZQUFZLEdBQUdDLGFBQW9CLEtBQUssWUFBWTtBQUMxRCxNQUFNRyxhQUFhLEdBQUdKLFlBQVksR0FBR0osTUFBTSxHQUFHQSxNQUFNLENBQUNHLEdBQUc7QUFFakQsTUFBTUYsUUFBUSxHQUFHTyxhQUFhLENBQUNQLFFBQVE7QUFDdkMsTUFBTUMsVUFBVSxHQUFHTSxhQUFhLENBQUNOLFVBQVU7QUFFbERPLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsRUFBRUwsYUFBb0IsQ0FBQztBQUNqREksT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYSxFQUFFRixhQUFhLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cmJhbmFpZC8uL3NyYy9jb25maWcuanM/ZGI0OSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIEJBU0VfVVJMOiAnaHR0cHM6Ly91cmJhbmFpZC1zZXJ2ZXIudmVyY2VsLmFwcC9hcGknLFxyXG4gIENMSUVOVF9VUkw6ICdodHRwczovL3VyYmFuYWlkLWNsaWVudC52ZXJjZWwuYXBwJyxcclxuICBERVY6IHtcclxuICAgICAgQkFTRV9VUkw6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAvYXBpJyxcclxuICAgICAgQ0xJRU5UX1VSTDogJ2h0dHA6Ly9sb2NhbGhvc3Q6OTAwMCdcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG5jb25zdCBjdXJyZW50Q29uZmlnID0gaXNQcm9kdWN0aW9uID8gY29uZmlnIDogY29uZmlnLkRFVjtcclxuXHJcbmV4cG9ydCBjb25zdCBCQVNFX1VSTCA9IGN1cnJlbnRDb25maWcuQkFTRV9VUkw7XHJcbmV4cG9ydCBjb25zdCBDTElFTlRfVVJMID0gY3VycmVudENvbmZpZy5DTElFTlRfVVJMO1xyXG5cclxuY29uc29sZS5sb2coJ0Vudmlyb25tZW50OicsIHByb2Nlc3MuZW52Lk5PREVfRU5WKTtcclxuY29uc29sZS5sb2coJ1VzaW5nIFVSTHM6JywgY3VycmVudENvbmZpZyk7Il0sIm5hbWVzIjpbImNvbmZpZyIsIkJBU0VfVVJMIiwiQ0xJRU5UX1VSTCIsIkRFViIsImlzUHJvZHVjdGlvbiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImN1cnJlbnRDb25maWciLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "e7aaeed8a11fecd0dd1d"; }
/******/ }();
/******/ 
/******/ }
);