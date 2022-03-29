(function() {
var exports = {};
exports.id = "pages/api/endpoint";
exports.ids = ["pages/api/endpoint"];
exports.modules = {

/***/ "./pages/api/endpoint.ts":
/*!*******************************!*\
  !*** ./pages/api/endpoint.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handler; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./pages/api/index.ts");
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = __webpack_require__(/*! fs/promises */ "fs/promises");


const METHODS = {
  saveData: ___WEBPACK_IMPORTED_MODULE_0__.saveData,
  collectData: ___WEBPACK_IMPORTED_MODULE_0__.collectData,
  getItem
};
async function handler(req, res) {
  const {
    endpoint,
    data
  } = req.body;
  res.status(200).json(await METHODS[endpoint](data));
}

async function getItem(data) {
  const itemName = data.itemName;
  const path = './pages/data/items/items.json';
  const fileData = await fs.readFile(path, 'utf8');
  const parsedData = JSON.parse(fileData);
  if (parsedData[itemName]) return parsedData[itemName];
  return '';
}

/***/ }),

/***/ "./pages/api/index.ts":
/*!****************************!*\
  !*** ./pages/api/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "saveData": function() { return /* reexport safe */ _saveData__WEBPACK_IMPORTED_MODULE_0__.saveData; },
/* harmony export */   "collectData": function() { return /* reexport safe */ _parseData__WEBPACK_IMPORTED_MODULE_1__.collectData; }
/* harmony export */ });
/* harmony import */ var _saveData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./saveData */ "./pages/api/saveData.ts");
/* harmony import */ var _parseData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseData */ "./pages/api/parseData.ts");




/***/ }),

/***/ "./pages/api/parseData.ts":
/*!********************************!*\
  !*** ./pages/api/parseData.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handler; },
/* harmony export */   "collectData": function() { return /* binding */ collectData; }
/* harmony export */ });
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = __webpack_require__(/*! fs/promises */ "fs/promises");

async function handler(req, res) {
  res.status(200).json(await collectData());
}
const collectData = async () => {
  const folder = './pages/data/';
  const data = {};
  const types = ['actions', 'info', 'nodes', 'events', 'scenes'];

  for (const type of types) {
    const files = await fs.readdir(folder + type + '/_current/');
    const sceneData = [];

    for (const file of files) {
      const fileData = await fs.readFile(folder + type + '/_current/' + file, 'utf8');
      sceneData.push(fileData);
    }

    data[type] = JSON.parse(sceneData);
  }

  return data;
};

/***/ }),

/***/ "./pages/api/saveData.ts":
/*!*******************************!*\
  !*** ./pages/api/saveData.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handler; },
/* harmony export */   "saveData": function() { return /* binding */ saveData; }
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = __webpack_require__(/*! fs/promises */ "fs/promises");

async function handler(req, res) {
  res.status(200).json(await saveData(req));
}
const saveData = async req => {
  console.log('test');

  const _req$body = req.body,
        {
    id,
    type
  } = _req$body,
        data = _objectWithoutProperties(_req$body, ["id", "type"]); //const folder = './pages/data/nodes/_current/scene_01/';


  if (!type) return;
  const folder = './pages/data/';
  const fileDataRaw = await fs.readFile(folder + type + '/_current/index.json');
  const fileData = JSON.parse(fileDataRaw);
  if (!fileData[id]) return;
  await fs.writeFile(folder + type + `/_backup_data/index-${Date.now()}.json`, fileDataRaw);
  fileData[id] = _objectSpread(_objectSpread({}, fileData[id]), data);
  await fs.writeFile(folder + type + `/_current/index.json`, JSON.stringify(fileData));
  return {
    type,
    data: fileData
  };
};

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("fs/promises");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/api/endpoint.ts"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvYXBpL2VuZHBvaW50LnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9hcGkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL2FwaS9wYXJzZURhdGEudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL2FwaS9zYXZlRGF0YS50cyIsIndlYnBhY2s6Ly90ZXN0L2V4dGVybmFsIFwiZnMvcHJvbWlzZXNcIiJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJNRVRIT0RTIiwic2F2ZURhdGEiLCJjb2xsZWN0RGF0YSIsImdldEl0ZW0iLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiZW5kcG9pbnQiLCJkYXRhIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJpdGVtTmFtZSIsInBhdGgiLCJmaWxlRGF0YSIsInJlYWRGaWxlIiwicGFyc2VkRGF0YSIsIkpTT04iLCJwYXJzZSIsImZvbGRlciIsInR5cGVzIiwidHlwZSIsImZpbGVzIiwicmVhZGRpciIsInNjZW5lRGF0YSIsImZpbGUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImlkIiwiZmlsZURhdGFSYXciLCJ3cml0ZUZpbGUiLCJEYXRlIiwibm93Iiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE1BQU1BLEVBQUUsR0FBR0MsbUJBQU8sQ0FBQyxnQ0FBRCxDQUFsQjs7QUFFQTtBQU1BLE1BQU1DLE9BQU8sR0FBRztBQUFFQyxVQUFRLEVBQUVBLHVDQUFaO0FBQXNCQyxhQUFXLEVBQUVBLDBDQUFuQztBQUFnREM7QUFBaEQsQ0FBaEI7QUFFZSxlQUFlQyxPQUFmLENBQ2JDLEdBRGEsRUFFYkMsR0FGYSxFQUdiO0FBQ0EsUUFBTTtBQUFFQyxZQUFGO0FBQVlDO0FBQVosTUFBcUJILEdBQUcsQ0FBQ0ksSUFBL0I7QUFDQUgsS0FBRyxDQUFDSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsTUFBTVgs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QUFDbkIsUUFBTS9CLEVBQUUsQ0FBQ2lDLFNBQUgsQ0FDSlosTUFBTSxHQUFHRSxJQUFULEdBQWlCLHVCQUFzQlcsSUFBSSxDQUFDQyxHQUFMLEVBQVcsT0FEOUMsRUFFSkgsV0FGSSxDQUFOO0FBSUFoQixVQUFRLENBQUNlLEVBQUQsQ0FBUixtQ0FBb0JmLFFBQVEsQ0FBQ2UsRUFBRCxDQUE1QixHQUFxQ3JCLElBQXJDO0FBQ0EsUUFBTVYsRUFBRSxDQUFDaUMsU0FBSCxDQUNKWixNQUFNLEdBQUdFLElBQVQsR0FBaUIsc0JBRGIsRUFFSkosSUFBSSxDQUFDaUIsU0FBTCxDQUFlcEIsUUFBZixDQUZJLENBQU47QUFLQSxTQUFPO0FBQUVPLFFBQUY7QUFBUWIsUUFBSSxFQUFFTTtBQUFkLEdBQVA7QUFDRCxDQXBCTSxDOzs7Ozs7Ozs7OztBQ2RQLHlDIiwiZmlsZSI6InBhZ2VzL2FwaS9lbmRwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzL3Byb21pc2VzJyk7XG5cbmltcG9ydCB7IHNhdmVEYXRhLCBjb2xsZWN0RGF0YSB9IGZyb20gJy4nO1xuXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcblxudHlwZSBEYXRhID0gYW55O1xuXG5jb25zdCBNRVRIT0RTID0geyBzYXZlRGF0YTogc2F2ZURhdGEsIGNvbGxlY3REYXRhOiBjb2xsZWN0RGF0YSwgZ2V0SXRlbSB9O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIGNvbnN0IHsgZW5kcG9pbnQsIGRhdGEgfSA9IHJlcS5ib2R5O1xuICByZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCBNRVRIT0RTW2VuZHBvaW50XShkYXRhKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEl0ZW0oZGF0YTogYW55KSB7XG4gIGNvbnN0IGl0ZW1OYW1lID0gZGF0YS5pdGVtTmFtZTtcbiAgY29uc3QgcGF0aCA9ICcuL3BhZ2VzL2RhdGEvaXRlbXMvaXRlbXMuanNvbic7XG4gIGNvbnN0IGZpbGVEYXRhID0gYXdhaXQgZnMucmVhZEZpbGUocGF0aCwgJ3V0ZjgnKTtcbiAgY29uc3QgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZmlsZURhdGEpO1xuICBpZiAocGFyc2VkRGF0YVtpdGVtTmFtZV0pIHJldHVybiBwYXJzZWREYXRhW2l0ZW1OYW1lXTtcbiAgcmV0dXJuICcnO1xufVxuIiwiaW1wb3J0IHsgc2F2ZURhdGEgfSBmcm9tICcuL3NhdmVEYXRhJztcclxuaW1wb3J0IHsgY29sbGVjdERhdGEgfSBmcm9tICcuL3BhcnNlRGF0YSc7XHJcblxyXG5leHBvcnQgeyBzYXZlRGF0YSwgY29sbGVjdERhdGEgfTtcclxuIiwiLy8gTmV4dC5qcyBBUEkgcm91dGUgc3VwcG9ydDogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvYXBpLXJvdXRlcy9pbnRyb2R1Y3Rpb25cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMvcHJvbWlzZXMnKTtcblxuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5cbnR5cGUgRGF0YSA9IGFueTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8RGF0YT5cbikge1xuICByZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCBjb2xsZWN0RGF0YSgpKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbGxlY3REYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBmb2xkZXIgPSAnLi9wYWdlcy9kYXRhLyc7XG4gIGNvbnN0IGRhdGEgPSB7fTtcbiAgY29uc3QgdHlwZXMgPSBbJ2FjdGlvbnMnLCAnaW5mbycsICdub2RlcycsICdldmVudHMnLCAnc2NlbmVzJ107XG4gIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgZnMucmVhZGRpcihmb2xkZXIgKyB0eXBlICsgJy9fY3VycmVudC8nKTtcbiAgICBjb25zdCBzY2VuZURhdGE6IGFueSA9IFtdO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgZmlsZURhdGEgPSBhd2FpdCBmcy5yZWFkRmlsZShcbiAgICAgICAgZm9sZGVyICsgdHlwZSArICcvX2N1cnJlbnQvJyArIGZpbGUsXG4gICAgICAgICd1dGY4J1xuICAgICAgKTtcbiAgICAgIHNjZW5lRGF0YS5wdXNoKGZpbGVEYXRhKTtcbiAgICB9XG4gICAgZGF0YVt0eXBlXSA9IEpTT04ucGFyc2Uoc2NlbmVEYXRhKTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcy9wcm9taXNlcycpO1xuXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcblxudHlwZSBEYXRhID0gYW55O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF3YWl0IHNhdmVEYXRhKHJlcSkpO1xufVxuXG5leHBvcnQgY29uc3Qgc2F2ZURhdGEgPSBhc3luYyAocmVxOiBOZXh0QXBpUmVxdWVzdCkgPT4ge1xuICBjb25zb2xlLmxvZygndGVzdCcpO1xuICBjb25zdCB7IGlkLCB0eXBlLCAuLi5kYXRhIH0gPSByZXEuYm9keTtcbiAgLy9jb25zdCBmb2xkZXIgPSAnLi9wYWdlcy9kYXRhL25vZGVzL19jdXJyZW50L3NjZW5lXzAxLyc7XG4gIGlmICghdHlwZSkgcmV0dXJuO1xuICBjb25zdCBmb2xkZXIgPSAnLi9wYWdlcy9kYXRhLyc7XG4gIGNvbnN0IGZpbGVEYXRhUmF3ID0gYXdhaXQgZnMucmVhZEZpbGUoZm9sZGVyICsgdHlwZSArICcvX2N1cnJlbnQvaW5kZXguanNvbicpO1xuICBjb25zdCBmaWxlRGF0YSA9IEpTT04ucGFyc2UoZmlsZURhdGFSYXcpO1xuICBpZiAoIWZpbGVEYXRhW2lkXSkgcmV0dXJuO1xuICBhd2FpdCBmcy53cml0ZUZpbGUoXG4gICAgZm9sZGVyICsgdHlwZSArIGAvX2JhY2t1cF9kYXRhL2luZGV4LSR7RGF0ZS5ub3coKX0uanNvbmAsXG4gICAgZmlsZURhdGFSYXdcbiAgKTtcbiAgZmlsZURhdGFbaWRdID0geyAuLi5maWxlRGF0YVtpZF0sIC4uLmRhdGEgfTtcbiAgYXdhaXQgZnMud3JpdGVGaWxlKFxuICAgIGZvbGRlciArIHR5cGUgKyBgL19jdXJyZW50L2luZGV4Lmpzb25gLFxuICAgIEpTT04uc3RyaW5naWZ5KGZpbGVEYXRhKVxuICApO1xuXG4gIHJldHVybiB7IHR5cGUsIGRhdGE6IGZpbGVEYXRhIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMvcHJvbWlzZXNcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=