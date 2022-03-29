(function() {
var exports = {};
exports.id = "pages/api/parseData";
exports.ids = ["pages/api/parseData"];
exports.modules = {

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
var __webpack_exports__ = (__webpack_exec__("./pages/api/parseData.ts"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvYXBpL3BhcnNlRGF0YS50cyIsIndlYnBhY2s6Ly90ZXN0L2V4dGVybmFsIFwiZnMvcHJvbWlzZXNcIiJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwic3RhdHVzIiwianNvbiIsImNvbGxlY3REYXRhIiwiZm9sZGVyIiwiZGF0YSIsInR5cGVzIiwidHlwZSIsImZpbGVzIiwicmVhZGRpciIsInNjZW5lRGF0YSIsImZpbGUiLCJmaWxlRGF0YSIsInJlYWRGaWxlIiwicHVzaCIsIkpTT04iLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxNQUFNQSxFQUFFLEdBQUdDLG1CQUFPLENBQUMsZ0NBQUQsQ0FBbEI7O0FBTWUsZUFBZUMsT0FBZixDQUNiQyxHQURhLEVBRWJDLEdBRmEsRUFHYjtBQUNBQSxLQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixNQUFNQyxXQUFXLEVBQXRDO0FBQ0Q7QUFFTSxNQUFNQSxXQUFXLEdBQUcsWUFBWTtBQUNyQyxRQUFNQyxNQUFNLEdBQUcsZUFBZjtBQUNBLFFBQU1DLElBQUksR0FBRyxFQUFiO0FBQ0EsUUFBTUMsS0FBSyxHQUFHLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsT0FBcEIsRUFBNkIsUUFBN0IsRUFBdUMsUUFBdkMsQ0FBZDs7QUFDQSxPQUFLLE1BQU1DLElBQVgsSUFBbUJELEtBQW5CLEVBQTBCO0FBQ3hCLFVBQU1FLEtBQUssR0FBRyxNQUFNWixFQUFFLENBQUNhLE9BQUgsQ0FBV0wsTUFBTSxHQUFHRyxJQUFULEdBQWdCLFlBQTNCLENBQXBCO0FBQ0EsVUFBTUcsU0FBYyxHQUFHLEVBQXZCOztBQUNBLFNBQUssTUFBTUMsSUFBWCxJQUFtQkgsS0FBbkIsRUFBMEI7QUFDeEIsWUFBTUksUUFBUSxHQUFHLE1BQU1oQixFQUFFLENBQUNpQixRQUFILENBQ3JCVCxNQUFNLEdBQUdHLElBQVQsR0FBZ0IsWUFBaEIsR0FBK0JJLElBRFYsRUFFckIsTUFGcUIsQ0FBdkI7QUFJQUQsZUFBUyxDQUFDSSxJQUFWLENBQWVGLFFBQWY7QUFDRDs7QUFDRFAsUUFBSSxDQUFDRSxJQUFELENBQUosR0FBYVEsSUFBSSxDQUFDQyxLQUFMLENBQVdOLFNBQVgsQ0FBYjtBQUNEOztBQUNELFNBQU9MLElBQVA7QUFDRCxDQWpCTSxDOzs7Ozs7Ozs7OztBQ2RQLHlDIiwiZmlsZSI6InBhZ2VzL2FwaS9wYXJzZURhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcy9wcm9taXNlcycpO1xuXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcblxudHlwZSBEYXRhID0gYW55O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKGF3YWl0IGNvbGxlY3REYXRhKCkpO1xufVxuXG5leHBvcnQgY29uc3QgY29sbGVjdERhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGZvbGRlciA9ICcuL3BhZ2VzL2RhdGEvJztcbiAgY29uc3QgZGF0YSA9IHt9O1xuICBjb25zdCB0eXBlcyA9IFsnYWN0aW9ucycsICdpbmZvJywgJ25vZGVzJywgJ2V2ZW50cycsICdzY2VuZXMnXTtcbiAgZm9yIChjb25zdCB0eXBlIG9mIHR5cGVzKSB7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBmcy5yZWFkZGlyKGZvbGRlciArIHR5cGUgKyAnL19jdXJyZW50LycpO1xuICAgIGNvbnN0IHNjZW5lRGF0YTogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlRGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKFxuICAgICAgICBmb2xkZXIgKyB0eXBlICsgJy9fY3VycmVudC8nICsgZmlsZSxcbiAgICAgICAgJ3V0ZjgnXG4gICAgICApO1xuICAgICAgc2NlbmVEYXRhLnB1c2goZmlsZURhdGEpO1xuICAgIH1cbiAgICBkYXRhW3R5cGVdID0gSlNPTi5wYXJzZShzY2VuZURhdGEpO1xuICB9XG4gIHJldHVybiBkYXRhO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzL3Byb21pc2VzXCIpOzsiXSwic291cmNlUm9vdCI6IiJ9