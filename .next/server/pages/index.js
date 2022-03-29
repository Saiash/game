(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/head */ "../next-server/lib/head"));

var _toBase = __webpack_require__(/*! ../next-server/lib/to-base-64 */ "../next-server/lib/to-base-64");

var _imageConfig = __webpack_require__(/*! ../next-server/server/image-config */ "../next-server/server/image-config");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

if (true) {
  ;
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[]} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];

    for (let match; match = viewportWidthRe.exec(sizes); match) {
      percentSizes.push(parseInt(match[2]));
    }

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load((0, _extends2.default)({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
} // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.


function removePlaceholder(img, placeholder) {
  if (placeholder === 'blur' && img) {
    const handleLoad = () => {
      if (!img.src.startsWith('data:')) {
        const p = 'decode' in img ? img.decode() : Promise.resolve();
        p.catch(() => {}).then(() => {
          img.style.filter = 'none';
          img.style.backgroundSize = 'none';
          img.style.backgroundImage = 'none';
        });
      }
    };

    if (img.complete) {
      // If the real image fails to load, this will still remove the placeholder.
      // This is the desired behavior for now, and will be revisited when error
      // handling is worked on for the image component itself.
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }
}

function Image(_ref) {
  let {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    loader = defaultImageLoader,
    placeholder = 'empty',
    blurDataURL
  } = _ref,
      all = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "objectFit", "objectPosition", "loader", "placeholder", "blurDataURL"]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';

  if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  let staticSrc = '';

  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
    }

    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;

    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;

      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);

  if (true) {
    if (!src) {
      throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
        width,
        height,
        quality
      })}`);
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(',')}.`);
    }

    if (typeof widthInt !== 'undefined' && isNaN(widthInt) || typeof heightInt !== 'undefined' && isNaN(heightInt)) {
      throw new Error(`Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`);
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`);
    }

    if (priority && loading === 'lazy') {
      throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
    }

    if (placeholder === 'blur') {
      if (layout !== 'fill' && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`);
      }

      if (!blurDataURL) {
        const VALID_BLUR_EXT = ['jpeg', 'png', 'webp']; // should match next-image-loader

        throw new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`);
      }
    }
  }

  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  const [setRef, isIntersected] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = (0, _extends2.default)({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  }, placeholder === 'blur' ? {
    filter: 'blur(20px)',
    backgroundSize: 'cover',
    backgroundImage: `url("${blurDataURL}")`
  } : undefined);

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
    }
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: `data:image/svg+xml;base64,${(0, _toBase.toBase64)(sizerSvg)}`
  }) : null) : null, !isVisible && /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  }), {
    decoding: "async",
    style: imgStyle,
    className: className
  }))), /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    ref: element => {
      setRef(element);
      removePlaceholder(element, placeholder);
    },
    style: imgStyle
  })), priority ?
  /*#__PURE__*/
  // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src // @ts-ignore: imagesrcset is not yet in the link element type
    ,
    imagesrcset: imgAttributes.srcSet // @ts-ignore: imagesizes is not yet in the link element type
    ,
    imagesizes: imgAttributes.sizes
  })) : null);
} //BUILT IN LOADERS


function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width];
  let paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return `${root}${normalizeSrc(src)}${paramsString}`;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (true) {
    const missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
        src,
        width,
        quality
      })}`);
    }

    if (src.startsWith('//')) {
      throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./pages/components/Node/actions.tsx":
/*!*******************************************!*\
  !*** ./pages/components/Node/actions.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Action; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./pages/components/utils.tsx");
/* harmony import */ var _models___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/ */ "./pages/models/index.ts");
/* harmony import */ var _editor_EditPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editor/EditPanel */ "./pages/components/editor/EditPanel.tsx");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);


var _jsxFileName = "C:\\Game\\pages\\components\\Node\\actions.tsx";





function Action({
  id,
  ctx,
  isAdmin
}) {
  const {
    context
  } = ctx;
  const model = context.getModel({
    type: 'actions',
    id
  });
  if (!(model instanceof _models___WEBPACK_IMPORTED_MODULE_3__.ActionModel)) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
  const textFragments = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getTextFragments)({
    text: model.getText()
  });
  const textJSX = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNodeFragmentsPayload)({
    ctx,
    textFragments,
    isAdmin
  });
  const action = model.getAction();

  const handleAction = () => {
    if (!action) return;

    switch (action.type) {
      case 'selectNode':
        ctx.setTextNodeId(action.value);
        break;

      case 'selectScene':
        ctx.setTextSceneId(action.value);
        break;
    }
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().action),
      children: [isAdmin && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_editor_EditPanel__WEBPACK_IMPORTED_MODULE_4__.EditPanel, {
        model: model,
        ctx: ctx
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 21
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        onClick: handleAction,
        children: textJSX
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, this)
  }, void 0, false);
}

/***/ }),

/***/ "./pages/components/Node/constants.ts":
/*!********************************************!*\
  !*** ./pages/components/Node/constants.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NODE_TYPES": function() { return /* binding */ NODE_TYPES; }
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./pages/components/Node/index.tsx");

const NODE_TYPES = {
  actions: _index__WEBPACK_IMPORTED_MODULE_0__.Actions,
  nodes: _index__WEBPACK_IMPORTED_MODULE_0__.Nodes,
  info: _index__WEBPACK_IMPORTED_MODULE_0__.Info
};

/***/ }),

/***/ "./pages/components/Node/index.tsx":
/*!*****************************************!*\
  !*** ./pages/components/Node/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nodes": function() { return /* reexport safe */ _nodes__WEBPACK_IMPORTED_MODULE_0__.default; },
/* harmony export */   "Actions": function() { return /* reexport safe */ _actions__WEBPACK_IMPORTED_MODULE_1__.default; },
/* harmony export */   "Info": function() { return /* reexport safe */ _info__WEBPACK_IMPORTED_MODULE_2__.default; }
/* harmony export */ });
/* harmony import */ var _nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodes */ "./pages/components/Node/nodes.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./pages/components/Node/actions.tsx");
/* harmony import */ var _info__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./info */ "./pages/components/Node/info.tsx");





/***/ }),

/***/ "./pages/components/Node/info.tsx":
/*!****************************************!*\
  !*** ./pages/components/Node/info.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Info; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./pages/components/utils.tsx");
/* harmony import */ var _infoDropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./infoDropdown */ "./pages/components/Node/infoDropdown.tsx");
/* harmony import */ var _models___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/ */ "./pages/models/index.ts");
/* harmony import */ var _editor_EditPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editor/EditPanel */ "./pages/components/editor/EditPanel.tsx");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__);


var _jsxFileName = "C:\\Game\\pages\\components\\Node\\info.tsx";






function Info({
  id,
  ctx,
  isAdmin
}) {
  const {
    context
  } = ctx;
  const {
    0: infoShown,
    1: setinfoShown
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const model = context.getModel({
    type: 'info',
    id
  });
  if (!(model instanceof _models___WEBPACK_IMPORTED_MODULE_4__.InfoModel)) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
  const textFragments = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getTextFragments)({
    text: model.getText()
  });
  const textJSX = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNodeFragmentsPayload)({
    ctx,
    textFragments,
    isAdmin
  });

  const handleHover = () => {
    setinfoShown(true);
  };

  const handleHoverOut = () => {
    setinfoShown(false);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().info),
    children: [isAdmin && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_editor_EditPanel__WEBPACK_IMPORTED_MODULE_5__.EditPanel, {
      model: model,
      ctx: ctx
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 19
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
      onMouseEnter: handleHover,
      onMouseLeave: handleHoverOut,
      children: [textJSX, infoShown && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_infoDropdown__WEBPACK_IMPORTED_MODULE_3__.default, {
        info: model
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 23
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./pages/components/Node/infoDropdown.tsx":
/*!************************************************!*\
  !*** ./pages/components/Node/infoDropdown.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InfoDropdown; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__);


var _jsxFileName = "C:\\Game\\pages\\components\\Node\\infoDropdown.tsx";


function InfoDropdown({
  info
}) {
  const description = info.getDescription();
  const name = info.getName();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().infoDropdownPointer)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().infoDropdown),
      children: [name && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().infoDropdownHeader),
        children: name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 18
      }, this), description && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: description
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 25
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}

/***/ }),

/***/ "./pages/components/Node/nodes.tsx":
/*!*****************************************!*\
  !*** ./pages/components/Node/nodes.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Nodes; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./pages/components/utils.tsx");
/* harmony import */ var _editor_EditPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../editor/EditPanel */ "./pages/components/editor/EditPanel.tsx");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/ */ "./pages/models/index.ts");


var _jsxFileName = "C:\\Game\\pages\\components\\Node\\nodes.tsx";





function Nodes({
  id,
  ctx,
  isAdmin
}) {
  const {
    context
  } = ctx;
  const model = context.getModel({
    type: 'nodes',
    id
  });
  if (!(model instanceof _models___WEBPACK_IMPORTED_MODULE_4__.NodeModel)) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
  const textFragments = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getTextFragments)({
    text: model.getText()
  });
  const textJSX = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNodeFragmentsPayload)({
    ctx,
    textFragments,
    isAdmin
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().textNode),
      children: [isAdmin && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_editor_EditPanel__WEBPACK_IMPORTED_MODULE_3__.EditPanel, {
        model: model,
        ctx: ctx
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 21
      }, this), textJSX]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }, this)
  }, void 0, false);
}

/***/ }),

/***/ "./pages/components/Player/inventory.tsx":
/*!***********************************************!*\
  !*** ./pages/components/Player/inventory.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Inventory; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Game\\pages\\components\\Player\\inventory.tsx";

function Inventory({
  ctx,
  inventory
}) {
  const {
    gameData
  } = ctx;
  const items = inventory.getItemsAsArray();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: items.map((item, index) => {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: item.props.name
      }, index, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 16
      }, this);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./pages/components/Player/playerNode.tsx":
/*!************************************************!*\
  !*** ./pages/components/Player/playerNode.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PlayerNode; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _inventory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inventory */ "./pages/components/Player/inventory.tsx");
/* harmony import */ var _Assets_doll_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Assets/doll.png */ "./Assets/doll.png");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5__);

var _jsxFileName = "C:\\Game\\pages\\components\\Player\\playerNode.tsx";





function PlayerNode({
  ctx,
  tab
}) {
  const {
    gameData
  } = ctx;
  const player = gameData.getPlayerCharacter();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_5___default().textNode),
    children: [tab === 'items' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_inventory__WEBPACK_IMPORTED_MODULE_2__.default, {
        ctx: ctx,
        inventory: player.inventory
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }, this), tab === 'skills' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
      children: ["Skills: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        children: JSON.stringify(player.skills.collection)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 19
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }, this), tab === 'attrs' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
      children: ["Attrs: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        children: JSON.stringify(player.attributes.collection)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 18
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }, this), tab === 'doll' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
        src: _Assets_doll_png__WEBPACK_IMPORTED_MODULE_3__.default,
        width: 128,
        height: 309,
        alt: "doll"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./pages/components/Player/playerTabs.tsx":
/*!************************************************!*\
  !*** ./pages/components/Player/playerTabs.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ playerTabs; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "C:\\Game\\pages\\components\\Player\\playerTabs.tsx";


function playerTabs({
  setTab
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().playerTabs),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      onClick: () => {
        setTab('items');
      },
      children: "Inv"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      onClick: () => {
        setTab('skills');
      },
      children: "Skills"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      onClick: () => {
        setTab('attrs');
      },
      children: "attrs"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
      onClick: () => {
        setTab('doll');
      },
      children: "doll"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./pages/components/editor/EditPanel.tsx":
/*!***********************************************!*\
  !*** ./pages/components/editor/EditPanel.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditPanel": function() { return /* binding */ EditPanel; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dropdownTextarea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdownTextarea */ "./pages/components/editor/dropdownTextarea.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./pages/utils.ts");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4__);


var _jsxFileName = "C:\\Game\\pages\\components\\editor\\EditPanel.tsx";




function EditPanel({
  model,
  ctx
}) {
  const {
    0: areaShown,
    1: setAreaShown
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  const handleEdit = async () => {
    areaShown ? setAreaShown(false) : setAreaShown(true);
  };

  const handleSave = async () => {
    model.save();
    setAreaShown(false);
    const savedData = await (0,_utils__WEBPACK_IMPORTED_MODULE_3__.callAPIEndpoint)({
      endpoint: 'saveData',
      data: model.getRaw()
    });
    ctx.context.setModel({
      type: savedData.type,
      id: savedData.data.id,
      data: savedData.data
    });
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_4___default().editPanel),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        onClick: handleEdit,
        children: "Edit"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        onClick: handleSave,
        children: "Save"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 9
      }, this), areaShown && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dropdownTextarea__WEBPACK_IMPORTED_MODULE_2__.DropdownTextarea, {
        model: model,
        ctx: ctx
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 23
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, this)
  }, void 0, false);
}

/***/ }),

/***/ "./pages/components/editor/dropdownTextarea.tsx":
/*!******************************************************!*\
  !*** ./pages/components/editor/dropdownTextarea.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownTextarea": function() { return /* binding */ DropdownTextarea; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2__);


var _jsxFileName = "C:\\Game\\pages\\components\\editor\\dropdownTextarea.tsx";


function DropdownTextarea({
  model,
  ctx
}) {
  //const description = model.getDescription();
  //const name = model.getName();
  const {
    0: text,
    1: setText
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(model.getText());

  const handleChage = event => {
    const newValue = event.target.value;
    setText(newValue);
    model.setText(newValue);
  };

  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().dropdownPointer)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().dropdown),
      children: text && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("textarea", {
        onChange: handleChage,
        value: text,
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_2___default().editArea)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }, this)]
  }, void 0, true);
}

/***/ }),

/***/ "./pages/components/utils.tsx":
/*!************************************!*\
  !*** ./pages/components/utils.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNodeFragmentsPayload": function() { return /* binding */ getNodeFragmentsPayload; },
/* harmony export */   "getTextFragments": function() { return /* binding */ getTextFragments; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Node_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node/constants */ "./pages/components/Node/constants.ts");

var _jsxFileName = "C:\\Game\\pages\\components\\utils.tsx";

function getNodeFragmentsPayload({
  ctx,
  textFragments,
  isAdmin
}) {
  const textJSX = [];
  let keyI = 0;

  for (const fragment of textFragments) {
    if (fragment[0] === '{') {
      const fragmentId = fragment.substr(1, fragment.length - 2);
      const fragmentType = fragmentId.split('_')[0];
      const Component = _Node_constants__WEBPACK_IMPORTED_MODULE_1__.NODE_TYPES[fragmentType];
      textJSX.push( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
        id: fragmentId,
        ctx: ctx,
        isAdmin: isAdmin,
        children: fragment
      }, keyI++, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 9
      }, this));
    } else {
      textJSX.push( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        children: fragment
      }, keyI++, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 20
      }, this));
    }
  }

  return textJSX;
}
function getTextFragments({
  text
}) {
  return text.split(/({(?:actions|nodes|info)_\d*})+/).filter(Boolean);
}

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "swr");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Node_nodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Node/nodes */ "./pages/components/Node/nodes.tsx");
/* harmony import */ var _components_Player_playerTabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Player/playerTabs */ "./pages/components/Player/playerTabs.tsx");
/* harmony import */ var _components_Player_playerNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Player/playerNode */ "./pages/components/Player/playerNode.tsx");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/Home.module.css */ "./styles/Home.module.css");
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models */ "./pages/models/index.ts");


var _jsxFileName = "C:\\Game\\pages\\index.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








function Home() {
  const {
    data
  } = swr__WEBPACK_IMPORTED_MODULE_2___default()('/api/parseData');
  const {
    0: settings,
    1: setSettings
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    ctx: null,
    initLoading: false,
    tab: 'items',
    textNodeId: '',
    textSceneId: ''
  });
  const isAdmin = true;

  const setCtx = ctx => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      ctx
    }));
  };

  const setTextNodeId = textNodeId => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      textNodeId
    }));
  };

  const setTextSceneId = textSceneId => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      textSceneId
    }));
  };

  const setTab = tab => {
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      tab
    }));
  };

  react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(async () => {
    const dataloaders = (0,_models__WEBPACK_IMPORTED_MODULE_6__.getDataloaders)();
    const dataSource = {
      swr: {
        mutate: swr__WEBPACK_IMPORTED_MODULE_2__.mutate,
        useSWR: (swr__WEBPACK_IMPORTED_MODULE_2___default())
      },
      dataloaders
    };
    setSettings({
      ctx: {
        update: setCtx,
        context: new _models__WEBPACK_IMPORTED_MODULE_6__.Context(data),
        dataSource,
        gameData: new _models__WEBPACK_IMPORTED_MODULE_6__.GameData(dataSource),
        setTextNodeId,
        setTextSceneId
      },
      initLoading: false,
      tab: 'items',
      textNodeId: 'nodes_1',
      textSceneId: 'scene_01'
    });
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(async () => {
    if (settings.ctx && !settings.initLoading) {
      var _newCtx$gameData;

      const newCtx = _objectSpread({}, settings.ctx);

      await ((_newCtx$gameData = newCtx.gameData) === null || _newCtx$gameData === void 0 ? void 0 : _newCtx$gameData.initialLoading());
      setSettings(_objectSpread(_objectSpread({}, settings), {}, {
        ctx: newCtx,
        initLoading: true
      }));
    }
  }, [settings.ctx]);
  if (!settings.ctx) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().container),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().settings)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().content),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().playerContainer),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Player_playerTabs__WEBPACK_IMPORTED_MODULE_4__.default, {
          setTab: setTab
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Player_playerNode__WEBPACK_IMPORTED_MODULE_5__.default, {
          ctx: settings.ctx,
          tab: settings.tab
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().textContainer),
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Node_nodes__WEBPACK_IMPORTED_MODULE_3__.default, {
          ctx: settings.ctx,
          id: settings.textNodeId,
          isAdmin: isAdmin
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().viewContainer)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_7___default().interactions)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 75,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./pages/models/actions/index.ts":
/*!***************************************!*\
  !*** ./pages/models/actions/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Empty": function() { return /* binding */ Empty; }
/* harmony export */ });
class Empty {}

/***/ }),

/***/ "./pages/models/characters/attributes/attribute.ts":
/*!*********************************************************!*\
  !*** ./pages/models/characters/attributes/attribute.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attribute": function() { return /* binding */ Attribute; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Attribute {
  constructor(props, attributes) {
    _defineProperty(this, "props", void 0);

    this.props = props;
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  check(difficulty) {
    const rand = Math.round(Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3);
    const result = rand <= this.getValue() - difficulty;
    return {
      rand,
      value: this.getValue(),
      result
    };
  }

  static getDefaultProps() {
    return {
      name: '',
      code: '',
      rawValue: 10,
      mods: []
    };
  }

  getRaw() {}

  initFromRaw() {}

}

/***/ }),

/***/ "./pages/models/characters/attributes/index.ts":
/*!*****************************************************!*\
  !*** ./pages/models/characters/attributes/index.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attributes": function() { return /* binding */ Attributes; }
/* harmony export */ });
/* harmony import */ var _models_dexterity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/dexterity */ "./pages/models/characters/attributes/models/dexterity.ts");
/* harmony import */ var _models_fatigue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/fatigue */ "./pages/models/characters/attributes/models/fatigue.ts");
/* harmony import */ var _models_health__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/health */ "./pages/models/characters/attributes/models/health.ts");
/* harmony import */ var _models_hitpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/hitpoints */ "./pages/models/characters/attributes/models/hitpoints.ts");
/* harmony import */ var _models_inteligence__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/inteligence */ "./pages/models/characters/attributes/models/inteligence.ts");
/* harmony import */ var _models_move__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/move */ "./pages/models/characters/attributes/models/move.ts");
/* harmony import */ var _models_per__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/per */ "./pages/models/characters/attributes/models/per.ts");
/* harmony import */ var _models_speed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models/speed */ "./pages/models/characters/attributes/models/speed.ts");
/* harmony import */ var _models_strength__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./models/strength */ "./pages/models/characters/attributes/models/strength.ts");
/* harmony import */ var _models_will__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./models/will */ "./pages/models/characters/attributes/models/will.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const ATTRS_LIST = [{
  code: 'str',
  model: _models_strength__WEBPACK_IMPORTED_MODULE_8__.Strength
}, {
  code: 'dex',
  model: _models_dexterity__WEBPACK_IMPORTED_MODULE_0__.Dexterity
}, {
  code: 'ht',
  model: _models_health__WEBPACK_IMPORTED_MODULE_2__.Health
}, {
  code: 'int',
  model: _models_inteligence__WEBPACK_IMPORTED_MODULE_4__.Inteligence
}, {
  code: 'hp',
  model: _models_hitpoints__WEBPACK_IMPORTED_MODULE_3__.Hitpoints
}, {
  code: 'per',
  model: _models_per__WEBPACK_IMPORTED_MODULE_6__.Perception
}, {
  code: 'will',
  model: _models_will__WEBPACK_IMPORTED_MODULE_9__.Will
}, {
  code: 'speed',
  model: _models_speed__WEBPACK_IMPORTED_MODULE_7__.Speed
}, {
  code: 'move',
  model: _models_move__WEBPACK_IMPORTED_MODULE_5__.Move
}, {
  code: 'ft',
  model: _models_fatigue__WEBPACK_IMPORTED_MODULE_1__.Fatigue
}];
class Attributes {
  constructor(inputAttrs) {
    _defineProperty(this, "collection", void 0);

    this.collection = {};
    ATTRS_LIST.forEach(attr => {
      const data = inputAttrs === null || inputAttrs === void 0 ? void 0 : inputAttrs.find(inputAttr => inputAttr.code === attr.code);
      this.collection[attr.code] = new attr.model(data || attr.model.getDefaultProps(), this);
    });
  }

  check(key, difficulty) {
    return this.collection[key].check(difficulty);
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/dexterity.ts":
/*!****************************************************************!*\
  !*** ./pages/models/characters/attributes/models/dexterity.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dexterity": function() { return /* binding */ Dexterity; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");

class Dexterity extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  static getDefaultProps() {
    return {
      name: 'Dexterity',
      code: 'dex',
      rawValue: 10,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/fatigue.ts":
/*!**************************************************************!*\
  !*** ./pages/models/characters/attributes/models/fatigue.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fatigue": function() { return /* binding */ Fatigue; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Fatigue extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "health", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['ht'])) throw Error('Health should be defined before fatigue');
    this.health = attributes.collection['ht'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.health.getValue() + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Fatigue',
      code: 'ft',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/health.ts":
/*!*************************************************************!*\
  !*** ./pages/models/characters/attributes/models/health.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Health": function() { return /* binding */ Health; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");

class Health extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  static getDefaultProps() {
    return {
      name: 'Health',
      code: 'ht',
      rawValue: 10,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/hitpoints.ts":
/*!****************************************************************!*\
  !*** ./pages/models/characters/attributes/models/hitpoints.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hitpoints": function() { return /* binding */ Hitpoints; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Hitpoints extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "strength", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['str'])) throw Error('Str should be defined before HP');
    this.strength = attributes.collection['str'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.strength.getValue() + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Hitpoints',
      code: 'hp',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/inteligence.ts":
/*!******************************************************************!*\
  !*** ./pages/models/characters/attributes/models/inteligence.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inteligence": function() { return /* binding */ Inteligence; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");

class Inteligence extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  static getDefaultProps() {
    return {
      name: 'Inteligence',
      code: 'int',
      rawValue: 10,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/move.ts":
/*!***********************************************************!*\
  !*** ./pages/models/characters/attributes/models/move.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Move": function() { return /* binding */ Move; }
/* harmony export */ });
/* harmony import */ var _speed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speed */ "./pages/models/characters/attributes/models/speed.ts");
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Move extends _attribute__WEBPACK_IMPORTED_MODULE_1__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "speed", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['speed']) || !((attributes === null || attributes === void 0 ? void 0 : attributes.collection['speed']) instanceof _speed__WEBPACK_IMPORTED_MODULE_0__.Speed)) throw Error('Speed should be defined before move');
    this.speed = attributes.collection['speed'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return Math.floor(this.speed.getValue()) + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Move',
      code: 'move',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/per.ts":
/*!**********************************************************!*\
  !*** ./pages/models/characters/attributes/models/per.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Perception": function() { return /* binding */ Perception; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Perception extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "inteligence", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['int'])) throw Error('Inteligence should be defined before per');
    this.inteligence = attributes.collection['int'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.inteligence.getValue() + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Perception',
      code: 'per',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/speed.ts":
/*!************************************************************!*\
  !*** ./pages/models/characters/attributes/models/speed.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Speed": function() { return /* binding */ Speed; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Speed extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "health", void 0);

    _defineProperty(this, "dexterity", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['dex'])) throw Error('Dex should be defined before speed');
    if (!(attributes !== null && attributes !== void 0 && attributes.collection['ht'])) throw Error('Health should be defined before speed');
    this.health = attributes.collection['ht'];
    this.dexterity = attributes.collection['dex'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.health.getValue() * 0.25 + this.dexterity.getValue() * 0.25 + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Speed',
      code: 'speed',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/strength.ts":
/*!***************************************************************!*\
  !*** ./pages/models/characters/attributes/models/strength.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Strength": function() { return /* binding */ Strength; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");

class Strength extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  static getDefaultProps() {
    return {
      name: 'Strength',
      code: 'str',
      rawValue: 10,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/attributes/models/will.ts":
/*!***********************************************************!*\
  !*** ./pages/models/characters/attributes/models/will.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Will": function() { return /* binding */ Will; }
/* harmony export */ });
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attribute */ "./pages/models/characters/attributes/attribute.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Will extends _attribute__WEBPACK_IMPORTED_MODULE_0__.Attribute {
  constructor(props, attributes) {
    super(props);

    _defineProperty(this, "inteligence", void 0);

    if (!(attributes !== null && attributes !== void 0 && attributes.collection['int'])) throw Error('Inteligence should be defined before will');
    this.inteligence = attributes.collection['int'];
  }

  getValue() {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.inteligence.getValue() + value;
  }

  getRawValue() {
    return this.props.rawValue;
  }

  static getDefaultProps() {
    return {
      name: 'Will',
      code: 'will',
      rawValue: 0,
      mods: []
    };
  }

}

/***/ }),

/***/ "./pages/models/characters/index.ts":
/*!******************************************!*\
  !*** ./pages/models/characters/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Character": function() { return /* binding */ Character; }
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./pages/models/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Character {
  constructor({
    attributeProps,
    inventoryProps,
    skillProps,
    name
  }) {
    _defineProperty(this, "attributes", void 0);

    _defineProperty(this, "inventory", void 0);

    _defineProperty(this, "skills", void 0);

    _defineProperty(this, "name", void 0);

    this.attributes = new _index__WEBPACK_IMPORTED_MODULE_0__.attributes.Attributes(attributeProps);
    this.inventory = new _index__WEBPACK_IMPORTED_MODULE_0__.inventory.Inventory(inventoryProps);
    this.skills = new _index__WEBPACK_IMPORTED_MODULE_0__.skills.Skills({
      skills: skillProps,
      attributes: this.attributes
    });
    this.name = name;
  }

  getRaw() {}

  initFromRaw() {}

}

/***/ }),

/***/ "./pages/models/characters/inventory/doll.ts":
/*!***************************************************!*\
  !*** ./pages/models/characters/inventory/doll.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Doll": function() { return /* binding */ Doll; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Doll {
  constructor(character) {
    _defineProperty(this, "character", void 0);

    _defineProperty(this, "zones", void 0);

    this.character = character;
    this.zones = {};
  }

  removeItem({
    zoneIndex,
    performer
  }) {
    const zone = this.zones[zoneIndex];
    if (zone.locked) return false;
    const item = zone.item;
    if (!item) return false;
    item.props.zones.forEach(zone => {
      delete this.zones[zone];
    });
    return performer.inventory.addItem(item);
  }

  checkIfPossibleToEquip(item) {
    let value = true;
    item.props.zones.forEach(zoneIndex => {
      if (!this.zones[zoneIndex]) return;
      if (this.zones[zoneIndex].locked) value = false;
    });
    return value;
  }

  equipItem({
    item,
    performer
  }) {
    if (!this.checkIfPossibleToEquip(item)) return false;
    item.props.zones.forEach(zoneIndex => {
      this.removeItem({
        zoneIndex,
        performer
      });
    });
    item.props.zones.forEach((zoneIndex, i) => {
      this.zones[zoneIndex] = {
        locked: false,
        item,
        parentZone: i > 0 ? item.props.zones[0] : null
      };
    });
    return true;
  }

  switchItemLock(zoneIndex) {
    const zone = this.zones[zoneIndex];
    const item = zone.item;
    if (!item) return false;
    item.props.zones.forEach(zone => {
      this.zones[zone].locked = this.zones[zone].locked ? false : true;
    });
  }

  getEquippedItems() {
    const items = [];

    for (const zoneIndex in this.zones) {
      const item = this.zones[zoneIndex].item;
      if (!this.zones[zoneIndex].parentZone) items.push(item);
    }

    return items;
  }

  getRaw() {}

  initFromRaw() {}

}

/***/ }),

/***/ "./pages/models/characters/inventory/index.ts":
/*!****************************************************!*\
  !*** ./pages/models/characters/inventory/index.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Inventory": function() { return /* binding */ Inventory; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Inventory {
  constructor(items) {
    _defineProperty(this, "items", void 0);

    this.items = items || {};
  }

  getFirstFreeSlot() {
    let index = 0;
    let freeSlot = false;

    while (index < 1000 && !freeSlot) {
      if (!this.items[index]) {
        freeSlot = true;
      } else {
        index++;
      }
    }

    return index;
  }

  addItem(item) {
    this.items[this.getFirstFreeSlot()] = item;
    return true;
  }

  removeItem(index) {
    if (this.items[index]) delete this.items[index];
  }

  getItem(index) {
    return this.items[index];
  }

  moveItem(fromIndex, toIndex) {
    const temp = this.items[toIndex];
    delete this.items[toIndex];
    this.items[toIndex] = this.items[fromIndex];
    delete this.items[fromIndex];
    this.items[fromIndex] = temp;
  }

  getItemsAsArray() {
    return Object.values(this.items);
  }

  getRaw() {}

  initFromRaw() {}

}

/***/ }),

/***/ "./pages/models/characters/inventory/item.ts":
/*!***************************************************!*\
  !*** ./pages/models/characters/inventory/item.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "itemZones": function() { return /* binding */ itemZones; },
/* harmony export */   "Item": function() { return /* binding */ Item; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ */ "./pages/models/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const itemZones = [{
  zones: 1,
  key: 'neck'
}, {
  zones: 2,
  key: 'left hand'
}, {
  zones: 3,
  key: 'right hand'
}];
class Item {
  constructor(props) {
    _defineProperty(this, "props", void 0);

    const tags = props.tags;
    const tagSystem = new ___WEBPACK_IMPORTED_MODULE_0__.TagSystem(tags);
    this.props = props;
    this.props.tags = tagSystem;
  }

  getRaw() {
    return JSON.stringify(this);
  }

  static initFromRaw(raw) {
    const props = JSON.parse(raw);
    return new Item(props);
  }

  static async initByName(dataSource, name) {
    const {
      dataloaders
    } = dataSource;
    const itemData = await dataloaders.getItem(name);
    return new Item(itemData);
  }

}

/***/ }),

/***/ "./pages/models/characters/skills/index.ts":
/*!*************************************************!*\
  !*** ./pages/models/characters/skills/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Skills": function() { return /* binding */ Skills; }
/* harmony export */ });
/* harmony import */ var _skill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./skill */ "./pages/models/characters/skills/skill.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Skills {
  constructor(input) {
    _defineProperty(this, "collection", void 0);

    this.collection = {};
    if (input) this.addSkills(input);
  }

  check(key, difficulty) {
    return this.collection[key].check(difficulty);
  }

  addSkill({
    skillInputProps,
    attributes,
    exp
  }) {
    let parentAttr = attributes.collection[skillInputProps.skillProps.parentAttrCode];

    const skillProps = _objectSpread(_objectSpread({}, skillInputProps.skillProps), {}, {
      parentAttr
    }, exp ? {
      exp
    } : {
      exp: 0
    });

    const skill = new _skill__WEBPACK_IMPORTED_MODULE_0__.Skill(skillProps);
    this.collection[skill.props.code] = skill;
  }

  addSkills({
    attributes,
    skills
  }) {
    if (!skills) return;

    for (const skill of skills) {
      this.addSkill({
        skillInputProps: skill,
        exp: skill.exp,
        attributes
      });
    }
  }

}

/***/ }),

/***/ "./pages/models/characters/skills/skill.ts":
/*!*************************************************!*\
  !*** ./pages/models/characters/skills/skill.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Skill": function() { return /* binding */ Skill; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Skill {
  constructor(props) {
    _defineProperty(this, "props", void 0);

    this.props = props;
  }

  check(difficulty) {
    const value = this.getEffectiveValue();
    const rand = Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3;
    const result = rand <= value - difficulty;
    return {
      rand,
      value,
      result
    };
  }

  getEffectiveValue() {
    const expMod = this.calculateExpMod();
    return this.props.parentAttr.getValue() + expMod - this.diffMod().value;
  }

  calculateExpMod() {
    const exp = this.props.exp;
    if (exp <= 0) return -4;
    if (exp >= 1 && exp < 2) return 0;
    if (exp >= 2 && exp < 3) return 1;
    if (exp >= 3 && exp < 4) return 1.5;
    return 3 + (exp - 4) / 4;
  }

  diffMod() {
    let value = 0;

    switch (this.props.difficulty) {
      case 'easy':
        value = 0;
        break;

      case 'medium':
        value = 1;
        break;

      case 'hard':
        value = 2;
        break;

      case 'very hard':
        value = 3;
        break;
    }

    return {
      difficulty: this.props.difficulty,
      value
    };
  }

  static getDefaultProps() {
    return {
      name: 'Default',
      description: 'Default',
      code: 'def',
      parentAttrCode: 'dex',
      difficulty: 'easy'
    };
  }

  getRaw() {}

  initFromRaw() {}

}

/***/ }),

/***/ "./pages/models/context/index.ts":
/*!***************************************!*\
  !*** ./pages/models/context/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": function() { return /* binding */ Context; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./pages/models/context/types.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Context {
  constructor(data) {
    _defineProperty(this, "datasources", undefined);

    _defineProperty(this, "getModel", ({
      type,
      id
    }) => {
      var _this$datasources;

      if (!((_this$datasources = this.datasources) !== null && _this$datasources !== void 0 && _this$datasources.data)) return null;
      return this.datasources.data[type].find(model => {
        return model.id === id;
      });
    });

    _defineProperty(this, "setModel", ({
      type,
      id,
      data
    }) => {
      var _this$datasources2;

      if (!((_this$datasources2 = this.datasources) !== null && _this$datasources2 !== void 0 && _this$datasources2.data)) return null;
      /*const node = this.datasources.data[type].find(model => {
        return model.id === id;
      });
      const modelData = {
        ...data,
        id,
        type,
      };
      const nodeModel: DefaultModel = new modelClasses[type](modelData);*/

      return null;
    });

    this.buildFromRawData(data);
  }

  buildFromRawData(data) {
    if (!data) {
      this.datasources = {
        data
      };
      return;
    }

    const datasources = {
      data: {
        nodes: [],
        actions: [],
        info: [],
        events: []
      }
    };
    const modelVariants = ['nodes', 'info', 'actions', 'events'];

    for (const variant of modelVariants) {
      const models = [];

      for (const modelDataKey in data[variant]) {
        const modelData = _objectSpread(_objectSpread({}, data[variant][modelDataKey]), {}, {
          id: modelDataKey,
          type: variant
        });

        const nodeModel = new _types__WEBPACK_IMPORTED_MODULE_0__.modelClasses[variant](modelData);
        models.push(nodeModel);
      }

      datasources.data[variant] = [...models];
    }

    this.datasources = datasources;
  }

}

/***/ }),

/***/ "./pages/models/context/model.tsx":
/*!****************************************!*\
  !*** ./pages/models/context/model.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultModel": function() { return /* binding */ DefaultModel; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DefaultModel {
  constructor(data) {
    _defineProperty(this, "id", '');

    _defineProperty(this, "save", () => {
      return false;
    });

    _defineProperty(this, "getText", () => {
      return '';
    });

    _defineProperty(this, "setText", text => {});

    _defineProperty(this, "getRaw", () => {
      return '';
    });

    this.id = data.id;
  }

}

/***/ }),

/***/ "./pages/models/context/types.tsx":
/*!****************************************!*\
  !*** ./pages/models/context/types.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modelClasses": function() { return /* binding */ modelClasses; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./pages/models/index.ts");

const modelClasses = {
  nodes: ___WEBPACK_IMPORTED_MODULE_0__.NodeModel,
  info: ___WEBPACK_IMPORTED_MODULE_0__.InfoModel,
  actions: ___WEBPACK_IMPORTED_MODULE_0__.ActionModel,
  events: ___WEBPACK_IMPORTED_MODULE_0__.NodeModel
};

/***/ }),

/***/ "./pages/models/dataloaders/index.tsx":
/*!********************************************!*\
  !*** ./pages/models/dataloaders/index.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataloaders": function() { return /* binding */ getDataloaders; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./pages/utils.ts");

function getDataloaders() {
  return {
    getItem: async name => {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.callAPIEndpoint)({
        endpoint: 'getItem',
        data: {
          itemName: name
        }
      });
    }
  };
}

/***/ }),

/***/ "./pages/models/events/index.ts":
/*!**************************************!*\
  !*** ./pages/models/events/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Empty": function() { return /* binding */ Empty; }
/* harmony export */ });
class Empty {}

/***/ }),

/***/ "./pages/models/gameData/index.tsx":
/*!*****************************************!*\
  !*** ./pages/models/gameData/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameData": function() { return /* binding */ GameData; }
/* harmony export */ });
/* harmony import */ var _models_characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/characters */ "./pages/models/characters/index.ts");
/* harmony import */ var _models_characters_inventory_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/characters/inventory/item */ "./pages/models/characters/inventory/item.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class GameData {
  constructor(dataSource) {
    _defineProperty(this, "playerCharacter", void 0);

    _defineProperty(this, "dataSource", void 0);

    this.dataSource = dataSource;
    this.playerCharacter = new _models_characters__WEBPACK_IMPORTED_MODULE_0__.Character({
      name: 'Test Name'
    });
  }

  getPlayerCharacter() {
    return this.playerCharacter;
  }

  async initialLoading() {
    const item = await _models_characters_inventory_item__WEBPACK_IMPORTED_MODULE_1__.Item.initByName(this.dataSource, 'padded_mittens');
    await this.playerCharacter.inventory.addItem(item);
  }

}

/***/ }),

/***/ "./pages/models/index.ts":
/*!*******************************!*\
  !*** ./pages/models/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scene": function() { return /* reexport module object */ _scene__WEBPACK_IMPORTED_MODULE_0__; },
/* harmony export */   "quest": function() { return /* reexport module object */ _quest__WEBPACK_IMPORTED_MODULE_1__; },
/* harmony export */   "DefaultModel": function() { return /* reexport safe */ _context_model__WEBPACK_IMPORTED_MODULE_2__.DefaultModel; },
/* harmony export */   "NodeModel": function() { return /* reexport safe */ _node__WEBPACK_IMPORTED_MODULE_3__.NodeModel; },
/* harmony export */   "InfoModel": function() { return /* reexport safe */ _node_info__WEBPACK_IMPORTED_MODULE_4__.InfoModel; },
/* harmony export */   "ActionModel": function() { return /* reexport safe */ _node_action__WEBPACK_IMPORTED_MODULE_5__.ActionModel; },
/* harmony export */   "inventory": function() { return /* reexport module object */ _characters_inventory__WEBPACK_IMPORTED_MODULE_16__; },
/* harmony export */   "events": function() { return /* reexport module object */ _events__WEBPACK_IMPORTED_MODULE_6__; },
/* harmony export */   "Context": function() { return /* reexport safe */ _context__WEBPACK_IMPORTED_MODULE_7__.Context; },
/* harmony export */   "characters": function() { return /* reexport module object */ _characters__WEBPACK_IMPORTED_MODULE_11__; },
/* harmony export */   "doll": function() { return /* reexport module object */ _characters_inventory_doll__WEBPACK_IMPORTED_MODULE_17__; },
/* harmony export */   "item": function() { return /* reexport module object */ _characters_inventory_item__WEBPACK_IMPORTED_MODULE_18__; },
/* harmony export */   "attributes": function() { return /* reexport module object */ _characters_attributes__WEBPACK_IMPORTED_MODULE_12__; },
/* harmony export */   "attribute": function() { return /* reexport module object */ _characters_attributes_attribute__WEBPACK_IMPORTED_MODULE_13__; },
/* harmony export */   "skill": function() { return /* reexport module object */ _characters_skills_skill__WEBPACK_IMPORTED_MODULE_15__; },
/* harmony export */   "skills": function() { return /* reexport module object */ _characters_skills__WEBPACK_IMPORTED_MODULE_14__; },
/* harmony export */   "actions": function() { return /* reexport module object */ _actions__WEBPACK_IMPORTED_MODULE_19__; },
/* harmony export */   "GameData": function() { return /* reexport safe */ _gameData__WEBPACK_IMPORTED_MODULE_8__.GameData; },
/* harmony export */   "TagSystem": function() { return /* reexport safe */ _tag__WEBPACK_IMPORTED_MODULE_9__.TagSystem; },
/* harmony export */   "getDataloaders": function() { return /* reexport safe */ _dataloaders__WEBPACK_IMPORTED_MODULE_10__.getDataloaders; }
/* harmony export */ });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ "./pages/models/scene/index.ts");
/* harmony import */ var _quest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quest */ "./pages/models/quest/index.ts");
/* harmony import */ var _context_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context/model */ "./pages/models/context/model.tsx");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node */ "./pages/models/node/index.ts");
/* harmony import */ var _node_info__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node/info */ "./pages/models/node/info/index.ts");
/* harmony import */ var _node_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node/action */ "./pages/models/node/action/index.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events */ "./pages/models/events/index.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context */ "./pages/models/context/index.ts");
/* harmony import */ var _gameData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gameData */ "./pages/models/gameData/index.tsx");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tag */ "./pages/models/tag/index.tsx");
/* harmony import */ var _dataloaders__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dataloaders */ "./pages/models/dataloaders/index.tsx");
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./characters */ "./pages/models/characters/index.ts");
/* harmony import */ var _characters_attributes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./characters/attributes */ "./pages/models/characters/attributes/index.ts");
/* harmony import */ var _characters_attributes_attribute__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./characters/attributes/attribute */ "./pages/models/characters/attributes/attribute.ts");
/* harmony import */ var _characters_skills__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./characters/skills */ "./pages/models/characters/skills/index.ts");
/* harmony import */ var _characters_skills_skill__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./characters/skills/skill */ "./pages/models/characters/skills/skill.ts");
/* harmony import */ var _characters_inventory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./characters/inventory */ "./pages/models/characters/inventory/index.ts");
/* harmony import */ var _characters_inventory_doll__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./characters/inventory/doll */ "./pages/models/characters/inventory/doll.ts");
/* harmony import */ var _characters_inventory_item__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./characters/inventory/item */ "./pages/models/characters/inventory/item.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./actions */ "./pages/models/actions/index.ts");






















/***/ }),

/***/ "./pages/models/node/action/index.ts":
/*!*******************************************!*\
  !*** ./pages/models/node/action/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionModel": function() { return /* binding */ ActionModel; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ */ "./pages/models/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class ActionModel extends ___WEBPACK_IMPORTED_MODULE_0__.DefaultModel {
  constructor(data) {
    super({
      id: data.id
    });

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "action", void 0);

    _defineProperty(this, "setText", text => {
      this.text = text;
      return true;
    });

    _defineProperty(this, "getText", () => {
      return this.text || '';
    });

    _defineProperty(this, "getAction", () => {
      return this.action || null;
    });

    _defineProperty(this, "save", () => {
      return true;
    });

    this.text = data.text;
    this.action = {
      type: data.actionType,
      value: data.actionValue
    };
    this.type = 'actions';
  }

}

/***/ }),

/***/ "./pages/models/node/index.ts":
/*!************************************!*\
  !*** ./pages/models/node/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeModel": function() { return /* binding */ NodeModel; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./pages/models/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class NodeModel extends ___WEBPACK_IMPORTED_MODULE_0__.DefaultModel {
  constructor(data) {
    super({
      id: data.id
    });

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "setText", text => {
      this.text = text;
      return true;
    });

    _defineProperty(this, "getText", () => {
      return this.text || '';
    });

    _defineProperty(this, "save", () => {
      return true;
    });

    _defineProperty(this, "getRaw", () => {
      return JSON.stringify(this);
    });

    this.text = data.text;
    this.type = 'nodes';
  }

}

/***/ }),

/***/ "./pages/models/node/info/index.ts":
/*!*****************************************!*\
  !*** ./pages/models/node/info/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoModel": function() { return /* binding */ InfoModel; }
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ */ "./pages/models/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class InfoModel extends ___WEBPACK_IMPORTED_MODULE_0__.DefaultModel {
  constructor(data) {
    super({
      id: data.id
    });

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "image", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "setText", text => {
      this.text = text;
      return true;
    });

    _defineProperty(this, "getText", () => {
      return this.text || '';
    });

    _defineProperty(this, "getDescription", () => {
      return this.description || '';
    });

    _defineProperty(this, "getName", () => {
      return this.name || '';
    });

    _defineProperty(this, "save", () => {
      return true;
    });

    this.text = data.text;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.type = 'info';
  }

}

/***/ }),

/***/ "./pages/models/quest/index.ts":
/*!*************************************!*\
  !*** ./pages/models/quest/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Empty": function() { return /* binding */ Empty; }
/* harmony export */ });
class Empty {}

/***/ }),

/***/ "./pages/models/scene/index.ts":
/*!*************************************!*\
  !*** ./pages/models/scene/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Empty": function() { return /* binding */ Empty; }
/* harmony export */ });
class Empty {}

/***/ }),

/***/ "./pages/models/tag/index.tsx":
/*!************************************!*\
  !*** ./pages/models/tag/index.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagSystem": function() { return /* binding */ TagSystem; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TagSystem {
  constructor(props) {
    _defineProperty(this, "required", void 0);

    _defineProperty(this, "inherited", void 0);

    _defineProperty(this, "applied", void 0);

    this.required = {};
    this.inherited = {};
    this.applied = {};
  }

}

/***/ }),

/***/ "./pages/utils.ts":
/*!************************!*\
  !*** ./pages/utils.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callAPIEndpoint": function() { return /* binding */ callAPIEndpoint; }
/* harmony export */ });
async function callAPIEndpoint({
  endpoint,
  data
}) {
  return fetch('http://localhost:3000/api/endpoint', {
    body: JSON.stringify({
      endpoint,
      data
    }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  }).then(function (response) {
    return response.json();
  });
}

/***/ }),

/***/ "./Assets/doll.png":
/*!*************************!*\
  !*** ./Assets/doll.png ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"src":"/_next/static/image/Assets/doll.ef41b2c2578f3c0d949ffd3e304b1fc2.png","height":509,"width":211,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAICAQAAACW5o33AAAAQ0lEQVR42mN4zvu69gEDwy3VB5su2DDcDHv64po9w7X2R1eO8zM81nq67ywPw0OxezMvczO8EL7ev1mQ4RTHKcvXDAAqDhuO6qDr6gAAAABJRU5ErkJggg=="});

/***/ }),

/***/ "./styles/Home.module.css":
/*!********************************!*\
  !*** ./styles/Home.module.css ***!
  \********************************/
/***/ (function(module) {

// Exports
module.exports = {
	"container": "Home_container__1EcsU",
	"settings": "Home_settings__2a9_9",
	"content": "Home_content__2fqOz",
	"playerContainer": "Home_playerContainer__1pvAf",
	"textContainer": "Home_textContainer__3xIRY",
	"viewContainer": "Home_viewContainer__29gJ8",
	"interactions": "Home_interactions__fP-d-",
	"condition": "Home_condition__2y7qa",
	"object": "Home_object__1s762",
	"information": "Home_information__3O8Qg",
	"interaction": "Home_interaction__2cP-t",
	"textNodeContainer": "Home_textNodeContainer__1G1e5",
	"textNode": "Home_textNode__1JX0r",
	"action": "Home_action__3B16m",
	"info": "Home_info__337F2",
	"infoDropdownHeader": "Home_infoDropdownHeader__20pTP",
	"infoDropdown": "Home_infoDropdown__2Q4T5",
	"dropdown": "Home_dropdown__1bIxT",
	"infoDropdownPointer": "Home_infoDropdownPointer__1oPCG",
	"dropdownPointer": "Home_dropdownPointer__152PE",
	"editPanel": "Home_editPanel__1kZXj",
	"editArea": "Home_editArea__vLfcP"
};


/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js":
/*!**************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/extends.js ***!
  \**************************************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************/
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../next-server/lib/head":
/*!****************************************************!*\
  !*** external "next/dist/next-server/lib/head.js" ***!
  \****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head.js");;

/***/ }),

/***/ "../next-server/lib/to-base-64":
/*!**********************************************************!*\
  !*** external "next/dist/next-server/lib/to-base-64.js" ***!
  \**********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/to-base-64.js");;

/***/ }),

/***/ "../next-server/server/image-config":
/*!***************************************************************!*\
  !*** external "next/dist/next-server/server/image-config.js" ***!
  \***************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/image-config.js");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "swr":
/*!**********************!*\
  !*** external "swr" ***!
  \**********************/
/***/ (function(module) {

"use strict";
module.exports = require("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JlcXVlc3QtaWRsZS1jYWxsYmFjay5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvdXNlLWludGVyc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvY29tcG9uZW50cy9Ob2RlL2FjdGlvbnMudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL05vZGUvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL05vZGUvaW5kZXgudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL05vZGUvaW5mby50c3giLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL2NvbXBvbmVudHMvTm9kZS9pbmZvRHJvcGRvd24udHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL05vZGUvbm9kZXMudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL1BsYXllci9pbnZlbnRvcnkudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL1BsYXllci9wbGF5ZXJOb2RlLnRzeCIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvY29tcG9uZW50cy9QbGF5ZXIvcGxheWVyVGFicy50c3giLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL2NvbXBvbmVudHMvZWRpdG9yL0VkaXRQYW5lbC50c3giLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL2NvbXBvbmVudHMvZWRpdG9yL2Ryb3Bkb3duVGV4dGFyZWEudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9jb21wb25lbnRzL3V0aWxzLnRzeCIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvaW5kZXgudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvYWN0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NoYXJhY3RlcnMvYXR0cmlidXRlcy9hdHRyaWJ1dGUudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMvbW9kZWxzL2RleHRlcml0eS50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NoYXJhY3RlcnMvYXR0cmlidXRlcy9tb2RlbHMvZmF0aWd1ZS50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NoYXJhY3RlcnMvYXR0cmlidXRlcy9tb2RlbHMvaGVhbHRoLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9hdHRyaWJ1dGVzL21vZGVscy9oaXRwb2ludHMudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMvbW9kZWxzL2ludGVsaWdlbmNlLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9hdHRyaWJ1dGVzL21vZGVscy9tb3ZlLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9hdHRyaWJ1dGVzL21vZGVscy9wZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMvbW9kZWxzL3NwZWVkLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9hdHRyaWJ1dGVzL21vZGVscy9zdHJlbmd0aC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NoYXJhY3RlcnMvYXR0cmlidXRlcy9tb2RlbHMvd2lsbC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NoYXJhY3RlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2ludmVudG9yeS9kb2xsLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9pbnZlbnRvcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL2ludmVudG9yeS9pdGVtLnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvY2hhcmFjdGVycy9za2lsbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jaGFyYWN0ZXJzL3NraWxscy9za2lsbC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NvbnRleHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9jb250ZXh0L21vZGVsLnRzeCIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL2NvbnRleHQvdHlwZXMudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvZGF0YWxvYWRlcnMvaW5kZXgudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvZXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvZ2FtZURhdGEvaW5kZXgudHN4Iiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9ub2RlL2FjdGlvbi9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL25vZGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9ub2RlL2luZm8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL3BhZ2VzL21vZGVscy9xdWVzdC9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvbW9kZWxzL3NjZW5lL2luZGV4LnRzIiwid2VicGFjazovL3Rlc3QvLi9wYWdlcy9tb2RlbHMvdGFnL2luZGV4LnRzeCIsIndlYnBhY2s6Ly90ZXN0Ly4vcGFnZXMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vdGVzdC8uL0Fzc2V0cy9kb2xsLnBuZyIsIndlYnBhY2s6Ly90ZXN0Ly4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL25leHQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vdGVzdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcyIsIndlYnBhY2s6Ly90ZXN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly90ZXN0L2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9oZWFkLmpzXCIiLCJ3ZWJwYWNrOi8vdGVzdC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdG8tYmFzZS02NC5qc1wiIiwid2VicGFjazovL3Rlc3QvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL2ltYWdlLWNvbmZpZy5qc1wiIiwid2VicGFjazovL3Rlc3QvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL3Rlc3QvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly90ZXN0L2V4dGVybmFsIFwic3dyXCIiXSwibmFtZXMiOlsiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJleHBvcnRzIiwiSW1hZ2UiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTIiLCJfZXh0ZW5kczIiLCJfcmVhY3QiLCJfaGVhZCIsIl90b0Jhc2UiLCJfaW1hZ2VDb25maWciLCJfdXNlSW50ZXJzZWN0aW9uIiwiZ2xvYmFsIiwiX19ORVhUX0lNQUdFX0lNUE9SVEVEIiwiVkFMSURfTE9BRElOR19WQUxVRVMiLCJ1bmRlZmluZWQiLCJsb2FkZXJzIiwiTWFwIiwiaW1naXhMb2FkZXIiLCJjbG91ZGluYXJ5TG9hZGVyIiwiYWthbWFpTG9hZGVyIiwiZGVmYXVsdExvYWRlciIsIlZBTElEX0xBWU9VVF9WQUxVRVMiLCJpc1N0YXRpY1JlcXVpcmUiLCJzcmMiLCJkZWZhdWx0IiwiaXNTdGF0aWNJbWFnZURhdGEiLCJpc1N0YXRpY0ltcG9ydCIsImRldmljZVNpemVzIiwiY29uZmlnRGV2aWNlU2l6ZXMiLCJpbWFnZVNpemVzIiwiY29uZmlnSW1hZ2VTaXplcyIsImxvYWRlciIsImNvbmZpZ0xvYWRlciIsInBhdGgiLCJjb25maWdQYXRoIiwiZG9tYWlucyIsImNvbmZpZ0RvbWFpbnMiLCJwcm9jZXNzIiwiaW1hZ2VDb25maWdEZWZhdWx0IiwiYWxsU2l6ZXMiLCJzb3J0IiwiYSIsImIiLCJnZXRXaWR0aHMiLCJ3aWR0aCIsImxheW91dCIsInNpemVzIiwidmlld3BvcnRXaWR0aFJlIiwicGVyY2VudFNpemVzIiwibWF0Y2giLCJleGVjIiwicHVzaCIsInBhcnNlSW50IiwibGVuZ3RoIiwic21hbGxlc3RSYXRpbyIsIk1hdGgiLCJtaW4iLCJ3aWR0aHMiLCJmaWx0ZXIiLCJzIiwia2luZCIsIlNldCIsIm1hcCIsInciLCJmaW5kIiwicCIsImdlbmVyYXRlSW1nQXR0cnMiLCJ1bm9wdGltaXplZCIsInF1YWxpdHkiLCJzcmNTZXQiLCJsYXN0IiwiaSIsImpvaW4iLCJnZXRJbnQiLCJ4IiwiZGVmYXVsdEltYWdlTG9hZGVyIiwibG9hZGVyUHJvcHMiLCJsb2FkIiwiZ2V0Iiwicm9vdCIsIkVycm9yIiwiVkFMSURfTE9BREVSUyIsInJlbW92ZVBsYWNlaG9sZGVyIiwiaW1nIiwicGxhY2Vob2xkZXIiLCJoYW5kbGVMb2FkIiwic3RhcnRzV2l0aCIsImRlY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2F0Y2giLCJ0aGVuIiwic3R5bGUiLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRJbWFnZSIsImNvbXBsZXRlIiwib25sb2FkIiwiX3JlZiIsInByaW9yaXR5IiwibG9hZGluZyIsImNsYXNzTmFtZSIsImhlaWdodCIsIm9iamVjdEZpdCIsIm9iamVjdFBvc2l0aW9uIiwiYmx1ckRhdGFVUkwiLCJhbGwiLCJyZXN0Iiwic3RhdGljU3JjIiwic3RhdGljSW1hZ2VEYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIndpZHRoSW50IiwiaGVpZ2h0SW50IiwicXVhbGl0eUludCIsImluY2x1ZGVzIiwiU3RyaW5nIiwiaXNOYU4iLCJjb25zb2xlIiwid2FybiIsIlZBTElEX0JMVVJfRVhUIiwiaXNMYXp5Iiwic2V0UmVmIiwiaXNJbnRlcnNlY3RlZCIsInVzZUludGVyc2VjdGlvbiIsInJvb3RNYXJnaW4iLCJkaXNhYmxlZCIsImlzVmlzaWJsZSIsIndyYXBwZXJTdHlsZSIsInNpemVyU3R5bGUiLCJzaXplclN2ZyIsImltZ1N0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJib3hTaXppbmciLCJwYWRkaW5nIiwiYm9yZGVyIiwibWFyZ2luIiwiZGlzcGxheSIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJxdW90aWVudCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImltZ0F0dHJpYnV0ZXMiLCJjcmVhdGVFbGVtZW50IiwiYWx0Iiwicm9sZSIsInRvQmFzZTY0IiwiT2JqZWN0IiwiYXNzaWduIiwiZGVjb2RpbmciLCJyZWYiLCJlbGVtZW50Iiwia2V5IiwicmVsIiwiYXMiLCJocmVmIiwiaW1hZ2VzcmNzZXQiLCJpbWFnZXNpemVzIiwibm9ybWFsaXplU3JjIiwic2xpY2UiLCJwYXJhbXMiLCJwYXJhbXNTdHJpbmciLCJtaXNzaW5nVmFsdWVzIiwicGFyc2VkU3JjIiwiVVJMIiwiZXJyIiwiZXJyb3IiLCJob3N0bmFtZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJzZWxmIiwiY2IiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJzZXRUaW1lb3V0IiwiZGlkVGltZW91dCIsInRpbWVSZW1haW5pbmciLCJtYXgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJpZCIsImNsZWFyVGltZW91dCIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJ1bm9ic2VydmUiLCJ1c2VSZWYiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsInVzZVN0YXRlIiwidXNlQ2FsbGJhY2siLCJlbCIsImN1cnJlbnQiLCJ0YWdOYW1lIiwib2JzZXJ2ZSIsInVzZUVmZmVjdCIsImlkbGVDYWxsYmFjayIsImNhbGxiYWNrIiwib3B0aW9ucyIsIm9ic2VydmVyIiwiZWxlbWVudHMiLCJjcmVhdGVPYnNlcnZlciIsInNldCIsImRlbGV0ZSIsInNpemUiLCJkaXNjb25uZWN0Iiwib2JzZXJ2ZXJzIiwiaW5zdGFuY2UiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5IiwidGFyZ2V0IiwiaXNJbnRlcnNlY3RpbmciLCJpbnRlcnNlY3Rpb25SYXRpbyIsIkFjdGlvbiIsImN0eCIsImlzQWRtaW4iLCJjb250ZXh0IiwibW9kZWwiLCJnZXRNb2RlbCIsInR5cGUiLCJBY3Rpb25Nb2RlbCIsInRleHRGcmFnbWVudHMiLCJnZXRUZXh0RnJhZ21lbnRzIiwidGV4dCIsImdldFRleHQiLCJ0ZXh0SlNYIiwiZ2V0Tm9kZUZyYWdtZW50c1BheWxvYWQiLCJhY3Rpb24iLCJnZXRBY3Rpb24iLCJoYW5kbGVBY3Rpb24iLCJzZXRUZXh0Tm9kZUlkIiwidmFsdWUiLCJzZXRUZXh0U2NlbmVJZCIsInN0eWxlcyIsIk5PREVfVFlQRVMiLCJhY3Rpb25zIiwiQWN0aW9ucyIsIm5vZGVzIiwiTm9kZXMiLCJpbmZvIiwiSW5mbyIsImluZm9TaG93biIsInNldGluZm9TaG93biIsIkluZm9Nb2RlbCIsImhhbmRsZUhvdmVyIiwiaGFuZGxlSG92ZXJPdXQiLCJJbmZvRHJvcGRvd24iLCJkZXNjcmlwdGlvbiIsImdldERlc2NyaXB0aW9uIiwibmFtZSIsImdldE5hbWUiLCJpbmZvRHJvcGRvd25Qb2ludGVyIiwiTm9kZU1vZGVsIiwiSW52ZW50b3J5IiwiaW52ZW50b3J5IiwiZ2FtZURhdGEiLCJpdGVtcyIsImdldEl0ZW1zQXNBcnJheSIsIml0ZW0iLCJpbmRleCIsInByb3BzIiwiUGxheWVyTm9kZSIsInRhYiIsInBsYXllciIsImdldFBsYXllckNoYXJhY3RlciIsInNraWxscyIsImNvbGxlY3Rpb24iLCJhdHRyaWJ1dGVzIiwiZG9sbCIsInBsYXllclRhYnMiLCJzZXRUYWIiLCJFZGl0UGFuZWwiLCJhcmVhU2hvd24iLCJzZXRBcmVhU2hvd24iLCJoYW5kbGVFZGl0IiwiaGFuZGxlU2F2ZSIsInNhdmUiLCJzYXZlZERhdGEiLCJjYWxsQVBJRW5kcG9pbnQiLCJlbmRwb2ludCIsImRhdGEiLCJnZXRSYXciLCJzZXRNb2RlbCIsIkRyb3Bkb3duVGV4dGFyZWEiLCJzZXRUZXh0IiwiaGFuZGxlQ2hhZ2UiLCJldmVudCIsIm5ld1ZhbHVlIiwiZHJvcGRvd25Qb2ludGVyIiwiZWRpdEFyZWEiLCJrZXlJIiwiZnJhZ21lbnQiLCJmcmFnbWVudElkIiwic3Vic3RyIiwiZnJhZ21lbnRUeXBlIiwic3BsaXQiLCJDb21wb25lbnQiLCJCb29sZWFuIiwiSG9tZSIsInVzZVNXUiIsInNldHRpbmdzIiwic2V0U2V0dGluZ3MiLCJpbml0TG9hZGluZyIsInRleHROb2RlSWQiLCJ0ZXh0U2NlbmVJZCIsInNldEN0eCIsIlJlYWN0IiwiZGF0YWxvYWRlcnMiLCJnZXREYXRhbG9hZGVycyIsImRhdGFTb3VyY2UiLCJzd3IiLCJtdXRhdGUiLCJ1cGRhdGUiLCJDb250ZXh0IiwiR2FtZURhdGEiLCJuZXdDdHgiLCJpbml0aWFsTG9hZGluZyIsInZpZXdDb250YWluZXIiLCJpbnRlcmFjdGlvbnMiLCJFbXB0eSIsIkF0dHJpYnV0ZSIsImNvbnN0cnVjdG9yIiwiZ2V0VmFsdWUiLCJyYXdWYWx1ZSIsIm1vZHMiLCJtb2QiLCJnZXRSYXdWYWx1ZSIsImNoZWNrIiwiZGlmZmljdWx0eSIsInJhbmQiLCJyb3VuZCIsInJhbmRvbSIsInJlc3VsdCIsImdldERlZmF1bHRQcm9wcyIsImNvZGUiLCJpbml0RnJvbVJhdyIsIkFUVFJTX0xJU1QiLCJTdHJlbmd0aCIsIkRleHRlcml0eSIsIkhlYWx0aCIsIkludGVsaWdlbmNlIiwiSGl0cG9pbnRzIiwiUGVyY2VwdGlvbiIsIldpbGwiLCJTcGVlZCIsIk1vdmUiLCJGYXRpZ3VlIiwiQXR0cmlidXRlcyIsImlucHV0QXR0cnMiLCJhdHRyIiwiaW5wdXRBdHRyIiwiaGVhbHRoIiwic3RyZW5ndGgiLCJzcGVlZCIsImZsb29yIiwiaW50ZWxpZ2VuY2UiLCJkZXh0ZXJpdHkiLCJDaGFyYWN0ZXIiLCJhdHRyaWJ1dGVQcm9wcyIsImludmVudG9yeVByb3BzIiwic2tpbGxQcm9wcyIsIkRvbGwiLCJjaGFyYWN0ZXIiLCJ6b25lcyIsInJlbW92ZUl0ZW0iLCJ6b25lSW5kZXgiLCJwZXJmb3JtZXIiLCJ6b25lIiwibG9ja2VkIiwiYWRkSXRlbSIsImNoZWNrSWZQb3NzaWJsZVRvRXF1aXAiLCJlcXVpcEl0ZW0iLCJwYXJlbnRab25lIiwic3dpdGNoSXRlbUxvY2siLCJnZXRFcXVpcHBlZEl0ZW1zIiwiZ2V0Rmlyc3RGcmVlU2xvdCIsImZyZWVTbG90IiwiZ2V0SXRlbSIsIm1vdmVJdGVtIiwiZnJvbUluZGV4IiwidG9JbmRleCIsInRlbXAiLCJ2YWx1ZXMiLCJpdGVtWm9uZXMiLCJJdGVtIiwidGFncyIsInRhZ1N5c3RlbSIsIlRhZ1N5c3RlbSIsInJhdyIsInBhcnNlIiwiaW5pdEJ5TmFtZSIsIml0ZW1EYXRhIiwiU2tpbGxzIiwiaW5wdXQiLCJhZGRTa2lsbHMiLCJhZGRTa2lsbCIsInNraWxsSW5wdXRQcm9wcyIsImV4cCIsInBhcmVudEF0dHIiLCJwYXJlbnRBdHRyQ29kZSIsInNraWxsIiwiU2tpbGwiLCJnZXRFZmZlY3RpdmVWYWx1ZSIsImV4cE1vZCIsImNhbGN1bGF0ZUV4cE1vZCIsImRpZmZNb2QiLCJkYXRhc291cmNlcyIsImJ1aWxkRnJvbVJhd0RhdGEiLCJldmVudHMiLCJtb2RlbFZhcmlhbnRzIiwidmFyaWFudCIsIm1vZGVscyIsIm1vZGVsRGF0YUtleSIsIm1vZGVsRGF0YSIsIm5vZGVNb2RlbCIsIm1vZGVsQ2xhc3NlcyIsIkRlZmF1bHRNb2RlbCIsIml0ZW1OYW1lIiwicGxheWVyQ2hhcmFjdGVyIiwiYWN0aW9uVHlwZSIsImFjdGlvblZhbHVlIiwiaW1hZ2UiLCJyZXF1aXJlZCIsImluaGVyaXRlZCIsImFwcGxpZWQiLCJmZXRjaCIsImJvZHkiLCJtZXRob2QiLCJoZWFkZXJzIiwiSGVhZGVycyIsIkFjY2VwdCIsInJlc3BvbnNlIiwianNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFhOztBQUFBLElBQUlBLHNCQUFzQixHQUFDQyxtQkFBTyxDQUFDLHNJQUFELENBQWxDOztBQUFtRkMsa0JBQUEsR0FBbUIsSUFBbkI7QUFBd0JBLGVBQUEsR0FBZ0JDLEtBQWhCOztBQUFzQixJQUFJQyw4QkFBOEIsR0FBQ0osc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsb0pBQUQsQ0FBUixDQUF6RDs7QUFBMEgsSUFBSUksU0FBUyxHQUFDTCxzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQywwR0FBRCxDQUFSLENBQXBDOztBQUFnRixJQUFJSyxNQUFNLEdBQUNOLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLG9CQUFELENBQVIsQ0FBakM7O0FBQW9ELElBQUlNLEtBQUssR0FBQ1Asc0JBQXNCLENBQUNDLG1CQUFP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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0M7Ozs7Ozs7Ozs7O0FDZkEsK0Q7Ozs7Ozs7Ozs7O0FDQUEscUU7Ozs7Ozs7Ozs7O0FDQUEsMEU7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjt2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5kZWZhdWx0PUltYWdlO3ZhciBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpKTt2YXIgX2V4dGVuZHMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKSk7dmFyIF9yZWFjdD1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7dmFyIF9oZWFkPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL25leHQtc2VydmVyL2xpYi9oZWFkXCIpKTt2YXIgX3RvQmFzZT1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvbGliL3RvLWJhc2UtNjRcIik7dmFyIF9pbWFnZUNvbmZpZz1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvc2VydmVyL2ltYWdlLWNvbmZpZ1wiKTt2YXIgX3VzZUludGVyc2VjdGlvbj1yZXF1aXJlKFwiLi91c2UtaW50ZXJzZWN0aW9uXCIpO2lmKHR5cGVvZiB3aW5kb3c9PT0ndW5kZWZpbmVkJyl7O2dsb2JhbC5fX05FWFRfSU1BR0VfSU1QT1JURUQ9dHJ1ZTt9Y29uc3QgVkFMSURfTE9BRElOR19WQUxVRVM9WydsYXp5JywnZWFnZXInLHVuZGVmaW5lZF07Y29uc3QgbG9hZGVycz1uZXcgTWFwKFtbJ2ltZ2l4JyxpbWdpeExvYWRlcl0sWydjbG91ZGluYXJ5JyxjbG91ZGluYXJ5TG9hZGVyXSxbJ2FrYW1haScsYWthbWFpTG9hZGVyXSxbJ2RlZmF1bHQnLGRlZmF1bHRMb2FkZXJdXSk7Y29uc3QgVkFMSURfTEFZT1VUX1ZBTFVFUz1bJ2ZpbGwnLCdmaXhlZCcsJ2ludHJpbnNpYycsJ3Jlc3BvbnNpdmUnLHVuZGVmaW5lZF07ZnVuY3Rpb24gaXNTdGF0aWNSZXF1aXJlKHNyYyl7cmV0dXJuIHNyYy5kZWZhdWx0IT09dW5kZWZpbmVkO31mdW5jdGlvbiBpc1N0YXRpY0ltYWdlRGF0YShzcmMpe3JldHVybiBzcmMuc3JjIT09dW5kZWZpbmVkO31mdW5jdGlvbiBpc1N0YXRpY0ltcG9ydChzcmMpe3JldHVybiB0eXBlb2Ygc3JjPT09J29iamVjdCcmJihpc1N0YXRpY1JlcXVpcmUoc3JjKXx8aXNTdGF0aWNJbWFnZURhdGEoc3JjKSk7fWNvbnN0e2RldmljZVNpemVzOmNvbmZpZ0RldmljZVNpemVzLGltYWdlU2l6ZXM6Y29uZmlnSW1hZ2VTaXplcyxsb2FkZXI6Y29uZmlnTG9hZGVyLHBhdGg6Y29uZmlnUGF0aCxkb21haW5zOmNvbmZpZ0RvbWFpbnN9PXByb2Nlc3MuZW52Ll9fTkVYVF9JTUFHRV9PUFRTfHxfaW1hZ2VDb25maWcuaW1hZ2VDb25maWdEZWZhdWx0Oy8vIHNvcnQgc21hbGxlc3QgdG8gbGFyZ2VzdFxuY29uc3QgYWxsU2l6ZXM9Wy4uLmNvbmZpZ0RldmljZVNpemVzLC4uLmNvbmZpZ0ltYWdlU2l6ZXNdO2NvbmZpZ0RldmljZVNpemVzLnNvcnQoKGEsYik9PmEtYik7YWxsU2l6ZXMuc29ydCgoYSxiKT0+YS1iKTtmdW5jdGlvbiBnZXRXaWR0aHMod2lkdGgsbGF5b3V0LHNpemVzKXtpZihzaXplcyYmKGxheW91dD09PSdmaWxsJ3x8bGF5b3V0PT09J3Jlc3BvbnNpdmUnKSl7Ly8gRmluZCBhbGwgdGhlIFwidndcIiBwZXJjZW50IHNpemVzIHVzZWQgaW4gdGhlIHNpemVzIHByb3BcbmNvbnN0IHZpZXdwb3J0V2lkdGhSZT0vKF58XFxzKSgxP1xcZD9cXGQpdncvZztjb25zdCBwZXJjZW50U2l6ZXM9W107Zm9yKGxldCBtYXRjaDttYXRjaD12aWV3cG9ydFdpZHRoUmUuZXhlYyhzaXplcyk7bWF0Y2gpe3BlcmNlbnRTaXplcy5wdXNoKHBhcnNlSW50KG1hdGNoWzJdKSk7fWlmKHBlcmNlbnRTaXplcy5sZW5ndGgpe2NvbnN0IHNtYWxsZXN0UmF0aW89TWF0aC5taW4oLi4ucGVyY2VudFNpemVzKSowLjAxO3JldHVybnt3aWR0aHM6YWxsU2l6ZXMuZmlsdGVyKHM9PnM+PWNvbmZpZ0RldmljZVNpemVzWzBdKnNtYWxsZXN0UmF0aW8pLGtpbmQ6J3cnfTt9cmV0dXJue3dpZHRoczphbGxTaXplcyxraW5kOid3J307fWlmKHR5cGVvZiB3aWR0aCE9PSdudW1iZXInfHxsYXlvdXQ9PT0nZmlsbCd8fGxheW91dD09PSdyZXNwb25zaXZlJyl7cmV0dXJue3dpZHRoczpjb25maWdEZXZpY2VTaXplcyxraW5kOid3J307fWNvbnN0IHdpZHRocz1bLi4ubmV3IFNldCgvLyA+IFRoaXMgbWVhbnMgdGhhdCBtb3N0IE9MRUQgc2NyZWVucyB0aGF0IHNheSB0aGV5IGFyZSAzeCByZXNvbHV0aW9uLFxuLy8gPiBhcmUgYWN0dWFsbHkgM3ggaW4gdGhlIGdyZWVuIGNvbG9yLCBidXQgb25seSAxLjV4IGluIHRoZSByZWQgYW5kXG4vLyA+IGJsdWUgY29sb3JzLiBTaG93aW5nIGEgM3ggcmVzb2x1dGlvbiBpbWFnZSBpbiB0aGUgYXBwIHZzIGEgMnhcbi8vID4gcmVzb2x1dGlvbiBpbWFnZSB3aWxsIGJlIHZpc3VhbGx5IHRoZSBzYW1lLCB0aG91Z2ggdGhlIDN4IGltYWdlXG4vLyA+IHRha2VzIHNpZ25pZmljYW50bHkgbW9yZSBkYXRhLiBFdmVuIHRydWUgM3ggcmVzb2x1dGlvbiBzY3JlZW5zIGFyZVxuLy8gPiB3YXN0ZWZ1bCBhcyB0aGUgaHVtYW4gZXllIGNhbm5vdCBzZWUgdGhhdCBsZXZlbCBvZiBkZXRhaWwgd2l0aG91dFxuLy8gPiBzb21ldGhpbmcgbGlrZSBhIG1hZ25pZnlpbmcgZ2xhc3MuXG4vLyBodHRwczovL2Jsb2cudHdpdHRlci5jb20vZW5naW5lZXJpbmcvZW5fdXMvdG9waWNzL2luZnJhc3RydWN0dXJlLzIwMTkvY2FwcGluZy1pbWFnZS1maWRlbGl0eS1vbi11bHRyYS1oaWdoLXJlc29sdXRpb24tZGV2aWNlcy5odG1sXG5bd2lkdGgsd2lkdGgqMi8qLCB3aWR0aCAqIDMqL10ubWFwKHc9PmFsbFNpemVzLmZpbmQocD0+cD49dyl8fGFsbFNpemVzW2FsbFNpemVzLmxlbmd0aC0xXSkpXTtyZXR1cm57d2lkdGhzLGtpbmQ6J3gnfTt9ZnVuY3Rpb24gZ2VuZXJhdGVJbWdBdHRycyh7c3JjLHVub3B0aW1pemVkLGxheW91dCx3aWR0aCxxdWFsaXR5LHNpemVzLGxvYWRlcn0pe2lmKHVub3B0aW1pemVkKXtyZXR1cm57c3JjLHNyY1NldDp1bmRlZmluZWQsc2l6ZXM6dW5kZWZpbmVkfTt9Y29uc3R7d2lkdGhzLGtpbmR9PWdldFdpZHRocyh3aWR0aCxsYXlvdXQsc2l6ZXMpO2NvbnN0IGxhc3Q9d2lkdGhzLmxlbmd0aC0xO3JldHVybntzaXplczohc2l6ZXMmJmtpbmQ9PT0ndyc/JzEwMHZ3JzpzaXplcyxzcmNTZXQ6d2lkdGhzLm1hcCgodyxpKT0+YCR7bG9hZGVyKHtzcmMscXVhbGl0eSx3aWR0aDp3fSl9ICR7a2luZD09PSd3Jz93OmkrMX0ke2tpbmR9YCkuam9pbignLCAnKSwvLyBJdCdzIGludGVuZGVkIHRvIGtlZXAgYHNyY2AgdGhlIGxhc3QgYXR0cmlidXRlIGJlY2F1c2UgUmVhY3QgdXBkYXRlc1xuLy8gYXR0cmlidXRlcyBpbiBvcmRlci4gSWYgd2Uga2VlcCBgc3JjYCB0aGUgZmlyc3Qgb25lLCBTYWZhcmkgd2lsbFxuLy8gaW1tZWRpYXRlbHkgc3RhcnQgdG8gZmV0Y2ggYHNyY2AsIGJlZm9yZSBgc2l6ZXNgIGFuZCBgc3JjU2V0YCBhcmUgZXZlblxuLy8gdXBkYXRlZCBieSBSZWFjdC4gVGhhdCBjYXVzZXMgbXVsdGlwbGUgdW5uZWNlc3NhcnkgcmVxdWVzdHMgaWYgYHNyY1NldGBcbi8vIGFuZCBgc2l6ZXNgIGFyZSBkZWZpbmVkLlxuLy8gVGhpcyBidWcgY2Fubm90IGJlIHJlcHJvZHVjZWQgaW4gQ2hyb21lIG9yIEZpcmVmb3guXG5zcmM6bG9hZGVyKHtzcmMscXVhbGl0eSx3aWR0aDp3aWR0aHNbbGFzdF19KX07fWZ1bmN0aW9uIGdldEludCh4KXtpZih0eXBlb2YgeD09PSdudW1iZXInKXtyZXR1cm4geDt9aWYodHlwZW9mIHg9PT0nc3RyaW5nJyl7cmV0dXJuIHBhcnNlSW50KHgsMTApO31yZXR1cm4gdW5kZWZpbmVkO31mdW5jdGlvbiBkZWZhdWx0SW1hZ2VMb2FkZXIobG9hZGVyUHJvcHMpe2NvbnN0IGxvYWQ9bG9hZGVycy5nZXQoY29uZmlnTG9hZGVyKTtpZihsb2FkKXtyZXR1cm4gbG9hZCgoMCxfZXh0ZW5kczIuZGVmYXVsdCkoe3Jvb3Q6Y29uZmlnUGF0aH0sbG9hZGVyUHJvcHMpKTt9dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIFwibG9hZGVyXCIgZm91bmQgaW4gXCJuZXh0LmNvbmZpZy5qc1wiLiBFeHBlY3RlZDogJHtfaW1hZ2VDb25maWcuVkFMSURfTE9BREVSUy5qb2luKCcsICcpfS4gUmVjZWl2ZWQ6ICR7Y29uZmlnTG9hZGVyfWApO30vLyBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzM5Nzc3ODMzLzI2NjUzNSBmb3Igd2h5IHdlIHVzZSB0aGlzIHJlZlxuLy8gaGFuZGxlciBpbnN0ZWFkIG9mIHRoZSBpbWcncyBvbkxvYWQgYXR0cmlidXRlLlxuZnVuY3Rpb24gcmVtb3ZlUGxhY2Vob2xkZXIoaW1nLHBsYWNlaG9sZGVyKXtpZihwbGFjZWhvbGRlcj09PSdibHVyJyYmaW1nKXtjb25zdCBoYW5kbGVMb2FkPSgpPT57aWYoIWltZy5zcmMuc3RhcnRzV2l0aCgnZGF0YTonKSl7Y29uc3QgcD0nZGVjb2RlJ2luIGltZz9pbWcuZGVjb2RlKCk6UHJvbWlzZS5yZXNvbHZlKCk7cC5jYXRjaCgoKT0+e30pLnRoZW4oKCk9PntpbWcuc3R5bGUuZmlsdGVyPSdub25lJztpbWcuc3R5bGUuYmFja2dyb3VuZFNpemU9J25vbmUnO2ltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9J25vbmUnO30pO319O2lmKGltZy5jb21wbGV0ZSl7Ly8gSWYgdGhlIHJlYWwgaW1hZ2UgZmFpbHMgdG8gbG9hZCwgdGhpcyB3aWxsIHN0aWxsIHJlbW92ZSB0aGUgcGxhY2Vob2xkZXIuXG4vLyBUaGlzIGlzIHRoZSBkZXNpcmVkIGJlaGF2aW9yIGZvciBub3csIGFuZCB3aWxsIGJlIHJldmlzaXRlZCB3aGVuIGVycm9yXG4vLyBoYW5kbGluZyBpcyB3b3JrZWQgb24gZm9yIHRoZSBpbWFnZSBjb21wb25lbnQgaXRzZWxmLlxuaGFuZGxlTG9hZCgpO31lbHNle2ltZy5vbmxvYWQ9aGFuZGxlTG9hZDt9fX1mdW5jdGlvbiBJbWFnZShfcmVmKXtsZXR7c3JjLHNpemVzLHVub3B0aW1pemVkPWZhbHNlLHByaW9yaXR5PWZhbHNlLGxvYWRpbmcsY2xhc3NOYW1lLHF1YWxpdHksd2lkdGgsaGVpZ2h0LG9iamVjdEZpdCxvYmplY3RQb3NpdGlvbixsb2FkZXI9ZGVmYXVsdEltYWdlTG9hZGVyLHBsYWNlaG9sZGVyPSdlbXB0eScsYmx1ckRhdGFVUkx9PV9yZWYsYWxsPSgwLF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMi5kZWZhdWx0KShfcmVmLFtcInNyY1wiLFwic2l6ZXNcIixcInVub3B0aW1pemVkXCIsXCJwcmlvcml0eVwiLFwibG9hZGluZ1wiLFwiY2xhc3NOYW1lXCIsXCJxdWFsaXR5XCIsXCJ3aWR0aFwiLFwiaGVpZ2h0XCIsXCJvYmplY3RGaXRcIixcIm9iamVjdFBvc2l0aW9uXCIsXCJsb2FkZXJcIixcInBsYWNlaG9sZGVyXCIsXCJibHVyRGF0YVVSTFwiXSk7bGV0IHJlc3Q9YWxsO2xldCBsYXlvdXQ9c2l6ZXM/J3Jlc3BvbnNpdmUnOidpbnRyaW5zaWMnO2lmKCdsYXlvdXQnaW4gcmVzdCl7Ly8gT3ZlcnJpZGUgZGVmYXVsdCBsYXlvdXQgaWYgdGhlIHVzZXIgc3BlY2lmaWVkIG9uZTpcbmlmKHJlc3QubGF5b3V0KWxheW91dD1yZXN0LmxheW91dDsvLyBSZW1vdmUgcHJvcGVydHkgc28gaXQncyBub3Qgc3ByZWFkIGludG8gaW1hZ2U6XG5kZWxldGUgcmVzdFsnbGF5b3V0J107fWxldCBzdGF0aWNTcmM9Jyc7aWYoaXNTdGF0aWNJbXBvcnQoc3JjKSl7Y29uc3Qgc3RhdGljSW1hZ2VEYXRhPWlzU3RhdGljUmVxdWlyZShzcmMpP3NyYy5kZWZhdWx0OnNyYztpZighc3RhdGljSW1hZ2VEYXRhLnNyYyl7dGhyb3cgbmV3IEVycm9yKGBBbiBvYmplY3Qgc2hvdWxkIG9ubHkgYmUgcGFzc2VkIHRvIHRoZSBpbWFnZSBjb21wb25lbnQgc3JjIHBhcmFtZXRlciBpZiBpdCBjb21lcyBmcm9tIGEgc3RhdGljIGltYWdlIGltcG9ydC4gSXQgbXVzdCBpbmNsdWRlIHNyYy4gUmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShzdGF0aWNJbWFnZURhdGEpfWApO31ibHVyRGF0YVVSTD1ibHVyRGF0YVVSTHx8c3RhdGljSW1hZ2VEYXRhLmJsdXJEYXRhVVJMO3N0YXRpY1NyYz1zdGF0aWNJbWFnZURhdGEuc3JjO2lmKCFsYXlvdXR8fGxheW91dCE9PSdmaWxsJyl7aGVpZ2h0PWhlaWdodHx8c3RhdGljSW1hZ2VEYXRhLmhlaWdodDt3aWR0aD13aWR0aHx8c3RhdGljSW1hZ2VEYXRhLndpZHRoO2lmKCFzdGF0aWNJbWFnZURhdGEuaGVpZ2h0fHwhc3RhdGljSW1hZ2VEYXRhLndpZHRoKXt0aHJvdyBuZXcgRXJyb3IoYEFuIG9iamVjdCBzaG91bGQgb25seSBiZSBwYXNzZWQgdG8gdGhlIGltYWdlIGNvbXBvbmVudCBzcmMgcGFyYW1ldGVyIGlmIGl0IGNvbWVzIGZyb20gYSBzdGF0aWMgaW1hZ2UgaW1wb3J0LiBJdCBtdXN0IGluY2x1ZGUgaGVpZ2h0IGFuZCB3aWR0aC4gUmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShzdGF0aWNJbWFnZURhdGEpfWApO319fXNyYz10eXBlb2Ygc3JjPT09J3N0cmluZyc/c3JjOnN0YXRpY1NyYztjb25zdCB3aWR0aEludD1nZXRJbnQod2lkdGgpO2NvbnN0IGhlaWdodEludD1nZXRJbnQoaGVpZ2h0KTtjb25zdCBxdWFsaXR5SW50PWdldEludChxdWFsaXR5KTtpZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7aWYoIXNyYyl7dGhyb3cgbmV3IEVycm9yKGBJbWFnZSBpcyBtaXNzaW5nIHJlcXVpcmVkIFwic3JjXCIgcHJvcGVydHkuIE1ha2Ugc3VyZSB5b3UgcGFzcyBcInNyY1wiIGluIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoe3dpZHRoLGhlaWdodCxxdWFsaXR5fSl9YCk7fWlmKCFWQUxJRF9MQVlPVVRfVkFMVUVTLmluY2x1ZGVzKGxheW91dCkpe3Rocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgaW52YWxpZCBcImxheW91dFwiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bGF5b3V0fVwiIHNob3VsZCBiZSBvbmUgb2YgJHtWQUxJRF9MQVlPVVRfVkFMVUVTLm1hcChTdHJpbmcpLmpvaW4oJywnKX0uYCk7fWlmKHR5cGVvZiB3aWR0aEludCE9PSd1bmRlZmluZWQnJiZpc05hTih3aWR0aEludCl8fHR5cGVvZiBoZWlnaHRJbnQhPT0ndW5kZWZpbmVkJyYmaXNOYU4oaGVpZ2h0SW50KSl7dGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwid2lkdGhcIiBvciBcImhlaWdodFwiIHByb3BlcnR5LiBUaGVzZSBzaG91bGQgYmUgbnVtZXJpYyB2YWx1ZXMuYCk7fWlmKCFWQUxJRF9MT0FESU5HX1ZBTFVFUy5pbmNsdWRlcyhsb2FkaW5nKSl7dGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibG9hZGluZ1wiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bG9hZGluZ31cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTE9BRElOR19WQUxVRVMubWFwKFN0cmluZykuam9pbignLCcpfS5gKTt9aWYocHJpb3JpdHkmJmxvYWRpbmc9PT0nbGF6eScpe3Rocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgYm90aCBcInByaW9yaXR5XCIgYW5kIFwibG9hZGluZz0nbGF6eSdcIiBwcm9wZXJ0aWVzLiBPbmx5IG9uZSBzaG91bGQgYmUgdXNlZC5gKTt9aWYocGxhY2Vob2xkZXI9PT0nYmx1cicpe2lmKGxheW91dCE9PSdmaWxsJyYmKHdpZHRoSW50fHwwKSooaGVpZ2h0SW50fHwwKTwxNjAwKXtjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgc21hbGxlciB0aGFuIDQweDQwLiBDb25zaWRlciByZW1vdmluZyB0aGUgXCJwbGFjZWhvbGRlcj0nYmx1cidcIiBwcm9wZXJ0eSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLmApO31pZighYmx1ckRhdGFVUkwpe2NvbnN0IFZBTElEX0JMVVJfRVhUPVsnanBlZycsJ3BuZycsJ3dlYnAnXTsvLyBzaG91bGQgbWF0Y2ggbmV4dC1pbWFnZS1sb2FkZXJcbnRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgXCJwbGFjZWhvbGRlcj0nYmx1cidcIiBwcm9wZXJ0eSBidXQgaXMgbWlzc2luZyB0aGUgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LlxuICAgICAgICAgIFBvc3NpYmxlIHNvbHV0aW9uczpcbiAgICAgICAgICAgIC0gQWRkIGEgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LCB0aGUgY29udGVudHMgc2hvdWxkIGJlIGEgc21hbGwgRGF0YSBVUkwgdG8gcmVwcmVzZW50IHRoZSBpbWFnZVxuICAgICAgICAgICAgLSBDaGFuZ2UgdGhlIFwic3JjXCIgcHJvcGVydHkgdG8gYSBzdGF0aWMgaW1wb3J0IHdpdGggb25lIG9mIHRoZSBzdXBwb3J0ZWQgZmlsZSB0eXBlczogJHtWQUxJRF9CTFVSX0VYVC5qb2luKCcsJyl9XG4gICAgICAgICAgICAtIFJlbW92ZSB0aGUgXCJwbGFjZWhvbGRlclwiIHByb3BlcnR5LCBlZmZlY3RpdmVseSBubyBibHVyIGVmZmVjdFxuICAgICAgICAgIFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcGxhY2Vob2xkZXItYmx1ci1kYXRhLXVybGApO319fWxldCBpc0xhenk9IXByaW9yaXR5JiYobG9hZGluZz09PSdsYXp5J3x8dHlwZW9mIGxvYWRpbmc9PT0ndW5kZWZpbmVkJyk7aWYoc3JjJiZzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSl7Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9CYXNpY3Nfb2ZfSFRUUC9EYXRhX1VSSXNcbnVub3B0aW1pemVkPXRydWU7aXNMYXp5PWZhbHNlO31jb25zdFtzZXRSZWYsaXNJbnRlcnNlY3RlZF09KDAsX3VzZUludGVyc2VjdGlvbi51c2VJbnRlcnNlY3Rpb24pKHtyb290TWFyZ2luOicyMDBweCcsZGlzYWJsZWQ6IWlzTGF6eX0pO2NvbnN0IGlzVmlzaWJsZT0haXNMYXp5fHxpc0ludGVyc2VjdGVkO2xldCB3cmFwcGVyU3R5bGU7bGV0IHNpemVyU3R5bGU7bGV0IHNpemVyU3ZnO2xldCBpbWdTdHlsZT0oMCxfZXh0ZW5kczIuZGVmYXVsdCkoe3Bvc2l0aW9uOidhYnNvbHV0ZScsdG9wOjAsbGVmdDowLGJvdHRvbTowLHJpZ2h0OjAsYm94U2l6aW5nOidib3JkZXItYm94JyxwYWRkaW5nOjAsYm9yZGVyOidub25lJyxtYXJnaW46J2F1dG8nLGRpc3BsYXk6J2Jsb2NrJyx3aWR0aDowLGhlaWdodDowLG1pbldpZHRoOicxMDAlJyxtYXhXaWR0aDonMTAwJScsbWluSGVpZ2h0OicxMDAlJyxtYXhIZWlnaHQ6JzEwMCUnLG9iamVjdEZpdCxvYmplY3RQb3NpdGlvbn0scGxhY2Vob2xkZXI9PT0nYmx1cic/e2ZpbHRlcjonYmx1cigyMHB4KScsYmFja2dyb3VuZFNpemU6J2NvdmVyJyxiYWNrZ3JvdW5kSW1hZ2U6YHVybChcIiR7Ymx1ckRhdGFVUkx9XCIpYH06dW5kZWZpbmVkKTtpZih0eXBlb2Ygd2lkdGhJbnQhPT0ndW5kZWZpbmVkJyYmdHlwZW9mIGhlaWdodEludCE9PSd1bmRlZmluZWQnJiZsYXlvdXQhPT0nZmlsbCcpey8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgLz5cbmNvbnN0IHF1b3RpZW50PWhlaWdodEludC93aWR0aEludDtjb25zdCBwYWRkaW5nVG9wPWlzTmFOKHF1b3RpZW50KT8nMTAwJSc6YCR7cXVvdGllbnQqMTAwfSVgO2lmKGxheW91dD09PSdyZXNwb25zaXZlJyl7Ly8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJyZXNwb25zaXZlXCIgLz5cbndyYXBwZXJTdHlsZT17ZGlzcGxheTonYmxvY2snLG92ZXJmbG93OidoaWRkZW4nLHBvc2l0aW9uOidyZWxhdGl2ZScsYm94U2l6aW5nOidib3JkZXItYm94JyxtYXJnaW46MH07c2l6ZXJTdHlsZT17ZGlzcGxheTonYmxvY2snLGJveFNpemluZzonYm9yZGVyLWJveCcscGFkZGluZ1RvcH07fWVsc2UgaWYobGF5b3V0PT09J2ludHJpbnNpYycpey8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiaW50cmluc2ljXCIgLz5cbndyYXBwZXJTdHlsZT17ZGlzcGxheTonaW5saW5lLWJsb2NrJyxtYXhXaWR0aDonMTAwJScsb3ZlcmZsb3c6J2hpZGRlbicscG9zaXRpb246J3JlbGF0aXZlJyxib3hTaXppbmc6J2JvcmRlci1ib3gnLG1hcmdpbjowfTtzaXplclN0eWxlPXtib3hTaXppbmc6J2JvcmRlci1ib3gnLGRpc3BsYXk6J2Jsb2NrJyxtYXhXaWR0aDonMTAwJSd9O3NpemVyU3ZnPWA8c3ZnIHdpZHRoPVwiJHt3aWR0aEludH1cIiBoZWlnaHQ9XCIke2hlaWdodEludH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiLz5gO31lbHNlIGlmKGxheW91dD09PSdmaXhlZCcpey8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiZml4ZWRcIiAvPlxud3JhcHBlclN0eWxlPXtvdmVyZmxvdzonaGlkZGVuJyxib3hTaXppbmc6J2JvcmRlci1ib3gnLGRpc3BsYXk6J2lubGluZS1ibG9jaycscG9zaXRpb246J3JlbGF0aXZlJyx3aWR0aDp3aWR0aEludCxoZWlnaHQ6aGVpZ2h0SW50fTt9fWVsc2UgaWYodHlwZW9mIHdpZHRoSW50PT09J3VuZGVmaW5lZCcmJnR5cGVvZiBoZWlnaHRJbnQ9PT0ndW5kZWZpbmVkJyYmbGF5b3V0PT09J2ZpbGwnKXsvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiBsYXlvdXQ9XCJmaWxsXCIgLz5cbndyYXBwZXJTdHlsZT17ZGlzcGxheTonYmxvY2snLG92ZXJmbG93OidoaWRkZW4nLHBvc2l0aW9uOidhYnNvbHV0ZScsdG9wOjAsbGVmdDowLGJvdHRvbTowLHJpZ2h0OjAsYm94U2l6aW5nOidib3JkZXItYm94JyxtYXJnaW46MH07fWVsc2V7Ly8gPEltYWdlIHNyYz1cImkucG5nXCIgLz5cbmlmKHByb2Nlc3MuZW52Lk5PREVfRU5WIT09J3Byb2R1Y3Rpb24nKXt0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgbXVzdCB1c2UgXCJ3aWR0aFwiIGFuZCBcImhlaWdodFwiIHByb3BlcnRpZXMgb3IgXCJsYXlvdXQ9J2ZpbGwnXCIgcHJvcGVydHkuYCk7fX1sZXQgaW1nQXR0cmlidXRlcz17c3JjOidkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnLHNyY1NldDp1bmRlZmluZWQsc2l6ZXM6dW5kZWZpbmVkfTtpZihpc1Zpc2libGUpe2ltZ0F0dHJpYnV0ZXM9Z2VuZXJhdGVJbWdBdHRycyh7c3JjLHVub3B0aW1pemVkLGxheW91dCx3aWR0aDp3aWR0aEludCxxdWFsaXR5OnF1YWxpdHlJbnQsc2l6ZXMsbG9hZGVyfSk7fXJldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIse3N0eWxlOndyYXBwZXJTdHlsZX0sc2l6ZXJTdHlsZT8vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtzdHlsZTpzaXplclN0eWxlfSxzaXplclN2Zz8vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLHtzdHlsZTp7bWF4V2lkdGg6JzEwMCUnLGRpc3BsYXk6J2Jsb2NrJyxtYXJnaW46MCxib3JkZXI6J25vbmUnLHBhZGRpbmc6MH0sYWx0OlwiXCIsXCJhcmlhLWhpZGRlblwiOnRydWUscm9sZTpcInByZXNlbnRhdGlvblwiLHNyYzpgZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwkeygwLF90b0Jhc2UudG9CYXNlNjQpKHNpemVyU3ZnKX1gfSk6bnVsbCk6bnVsbCwhaXNWaXNpYmxlJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLE9iamVjdC5hc3NpZ24oe30scmVzdCxnZW5lcmF0ZUltZ0F0dHJzKHtzcmMsdW5vcHRpbWl6ZWQsbGF5b3V0LHdpZHRoOndpZHRoSW50LHF1YWxpdHk6cXVhbGl0eUludCxzaXplcyxsb2FkZXJ9KSx7ZGVjb2Rpbmc6XCJhc3luY1wiLHN0eWxlOmltZ1N0eWxlLGNsYXNzTmFtZTpjbGFzc05hbWV9KSkpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsT2JqZWN0LmFzc2lnbih7fSxyZXN0LGltZ0F0dHJpYnV0ZXMse2RlY29kaW5nOlwiYXN5bmNcIixjbGFzc05hbWU6Y2xhc3NOYW1lLHJlZjplbGVtZW50PT57c2V0UmVmKGVsZW1lbnQpO3JlbW92ZVBsYWNlaG9sZGVyKGVsZW1lbnQscGxhY2Vob2xkZXIpO30sc3R5bGU6aW1nU3R5bGV9KSkscHJpb3JpdHk/LyojX19QVVJFX18qLyAvLyBOb3RlIGhvdyB3ZSBvbWl0IHRoZSBgaHJlZmAgYXR0cmlidXRlLCBhcyBpdCB3b3VsZCBvbmx5IGJlIHJlbGV2YW50XG4vLyBmb3IgYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBgaW1hZ2VzcmNzZXRgLCBhbmQgaW4gdGhvc2UgY2FzZXNcbi8vIGl0IHdvdWxkIGxpa2VseSBjYXVzZSB0aGUgaW5jb3JyZWN0IGltYWdlIHRvIGJlIHByZWxvYWRlZC5cbi8vXG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zZW1hbnRpY3MuaHRtbCNhdHRyLWxpbmstaW1hZ2VzcmNzZXRcbl9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2hlYWQuZGVmYXVsdCxudWxsLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtrZXk6J19fbmltZy0nK2ltZ0F0dHJpYnV0ZXMuc3JjK2ltZ0F0dHJpYnV0ZXMuc3JjU2V0K2ltZ0F0dHJpYnV0ZXMuc2l6ZXMscmVsOlwicHJlbG9hZFwiLGFzOlwiaW1hZ2VcIixocmVmOmltZ0F0dHJpYnV0ZXMuc3JjU2V0P3VuZGVmaW5lZDppbWdBdHRyaWJ1dGVzLnNyYy8vIEB0cy1pZ25vcmU6IGltYWdlc3Jjc2V0IGlzIG5vdCB5ZXQgaW4gdGhlIGxpbmsgZWxlbWVudCB0eXBlXG4saW1hZ2VzcmNzZXQ6aW1nQXR0cmlidXRlcy5zcmNTZXQvLyBAdHMtaWdub3JlOiBpbWFnZXNpemVzIGlzIG5vdCB5ZXQgaW4gdGhlIGxpbmsgZWxlbWVudCB0eXBlXG4saW1hZ2VzaXplczppbWdBdHRyaWJ1dGVzLnNpemVzfSkpOm51bGwpO30vL0JVSUxUIElOIExPQURFUlNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVNyYyhzcmMpe3JldHVybiBzcmNbMF09PT0nLyc/c3JjLnNsaWNlKDEpOnNyYzt9ZnVuY3Rpb24gaW1naXhMb2FkZXIoe3Jvb3Qsc3JjLHdpZHRoLHF1YWxpdHl9KXsvLyBEZW1vOiBodHRwczovL3N0YXRpYy5pbWdpeC5uZXQvZGFpc3kucG5nP2Zvcm1hdD1hdXRvJmZpdD1tYXgmdz0zMDBcbmNvbnN0IHBhcmFtcz1bJ2F1dG89Zm9ybWF0JywnZml0PW1heCcsJ3c9Jyt3aWR0aF07bGV0IHBhcmFtc1N0cmluZz0nJztpZihxdWFsaXR5KXtwYXJhbXMucHVzaCgncT0nK3F1YWxpdHkpO31pZihwYXJhbXMubGVuZ3RoKXtwYXJhbXNTdHJpbmc9Jz8nK3BhcmFtcy5qb2luKCcmJyk7fXJldHVybmAke3Jvb3R9JHtub3JtYWxpemVTcmMoc3JjKX0ke3BhcmFtc1N0cmluZ31gO31mdW5jdGlvbiBha2FtYWlMb2FkZXIoe3Jvb3Qsc3JjLHdpZHRofSl7cmV0dXJuYCR7cm9vdH0ke25vcm1hbGl6ZVNyYyhzcmMpfT9pbXdpZHRoPSR7d2lkdGh9YDt9ZnVuY3Rpb24gY2xvdWRpbmFyeUxvYWRlcih7cm9vdCxzcmMsd2lkdGgscXVhbGl0eX0pey8vIERlbW86IGh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RlbW8vaW1hZ2UvdXBsb2FkL3dfMzAwLGNfbGltaXQscV9hdXRvL3R1cnRsZXMuanBnXG5jb25zdCBwYXJhbXM9WydmX2F1dG8nLCdjX2xpbWl0Jywnd18nK3dpZHRoLCdxXycrKHF1YWxpdHl8fCdhdXRvJyldO2xldCBwYXJhbXNTdHJpbmc9cGFyYW1zLmpvaW4oJywnKSsnLyc7cmV0dXJuYCR7cm9vdH0ke3BhcmFtc1N0cmluZ30ke25vcm1hbGl6ZVNyYyhzcmMpfWA7fWZ1bmN0aW9uIGRlZmF1bHRMb2FkZXIoe3Jvb3Qsc3JjLHdpZHRoLHF1YWxpdHl9KXtpZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7Y29uc3QgbWlzc2luZ1ZhbHVlcz1bXTsvLyB0aGVzZSBzaG91bGQgYWx3YXlzIGJlIHByb3ZpZGVkIGJ1dCBtYWtlIHN1cmUgdGhleSBhcmVcbmlmKCFzcmMpbWlzc2luZ1ZhbHVlcy5wdXNoKCdzcmMnKTtpZighd2lkdGgpbWlzc2luZ1ZhbHVlcy5wdXNoKCd3aWR0aCcpO2lmKG1pc3NpbmdWYWx1ZXMubGVuZ3RoPjApe3Rocm93IG5ldyBFcnJvcihgTmV4dCBJbWFnZSBPcHRpbWl6YXRpb24gcmVxdWlyZXMgJHttaXNzaW5nVmFsdWVzLmpvaW4oJywgJyl9IHRvIGJlIHByb3ZpZGVkLiBNYWtlIHN1cmUgeW91IHBhc3MgdGhlbSBhcyBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KHtzcmMsd2lkdGgscXVhbGl0eX0pfWApO31pZihzcmMuc3RhcnRzV2l0aCgnLy8nKSl7dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gcGFyc2Ugc3JjIFwiJHtzcmN9XCIgb24gXFxgbmV4dC9pbWFnZVxcYCwgcHJvdG9jb2wtcmVsYXRpdmUgVVJMICgvLykgbXVzdCBiZSBjaGFuZ2VkIHRvIGFuIGFic29sdXRlIFVSTCAoaHR0cDovLyBvciBodHRwczovLylgKTt9aWYoIXNyYy5zdGFydHNXaXRoKCcvJykmJmNvbmZpZ0RvbWFpbnMpe2xldCBwYXJzZWRTcmM7dHJ5e3BhcnNlZFNyYz1uZXcgVVJMKHNyYyk7fWNhdGNoKGVycil7Y29uc29sZS5lcnJvcihlcnIpO3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIHNyYyBcIiR7c3JjfVwiIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGlmIHVzaW5nIHJlbGF0aXZlIGltYWdlIGl0IG11c3Qgc3RhcnQgd2l0aCBhIGxlYWRpbmcgc2xhc2ggXCIvXCIgb3IgYmUgYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWApO31pZighY29uZmlnRG9tYWlucy5pbmNsdWRlcyhwYXJzZWRTcmMuaG9zdG5hbWUpKXt0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3JjIHByb3AgKCR7c3JjfSkgb24gXFxgbmV4dC9pbWFnZVxcYCwgaG9zdG5hbWUgXCIke3BhcnNlZFNyYy5ob3N0bmFtZX1cIiBpcyBub3QgY29uZmlndXJlZCB1bmRlciBpbWFnZXMgaW4geW91ciBcXGBuZXh0LmNvbmZpZy5qc1xcYFxcbmArYFNlZSBtb3JlIGluZm86IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtdW5jb25maWd1cmVkLWhvc3RgKTt9fX1yZXR1cm5gJHtyb290fT91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX0mdz0ke3dpZHRofSZxPSR7cXVhbGl0eXx8NzV9YDt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjaz1leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2s9dm9pZCAwO2NvbnN0IHJlcXVlc3RJZGxlQ2FsbGJhY2s9dHlwZW9mIHNlbGYhPT0ndW5kZWZpbmVkJyYmc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrfHxmdW5jdGlvbihjYil7bGV0IHN0YXJ0PURhdGUubm93KCk7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtjYih7ZGlkVGltZW91dDpmYWxzZSx0aW1lUmVtYWluaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4KDAsNTAtKERhdGUubm93KCktc3RhcnQpKTt9fSk7fSwxKTt9O2V4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjaz1yZXF1ZXN0SWRsZUNhbGxiYWNrO2NvbnN0IGNhbmNlbElkbGVDYWxsYmFjaz10eXBlb2Ygc2VsZiE9PSd1bmRlZmluZWQnJiZzZWxmLmNhbmNlbElkbGVDYWxsYmFja3x8ZnVuY3Rpb24oaWQpe3JldHVybiBjbGVhclRpbWVvdXQoaWQpO307ZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2s9Y2FuY2VsSWRsZUNhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMudXNlSW50ZXJzZWN0aW9uPXVzZUludGVyc2VjdGlvbjt2YXIgX3JlYWN0PXJlcXVpcmUoXCJyZWFjdFwiKTt2YXIgX3JlcXVlc3RJZGxlQ2FsbGJhY2s9cmVxdWlyZShcIi4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrXCIpO2NvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyPXR5cGVvZiBJbnRlcnNlY3Rpb25PYnNlcnZlciE9PSd1bmRlZmluZWQnO2Z1bmN0aW9uIHVzZUludGVyc2VjdGlvbih7cm9vdE1hcmdpbixkaXNhYmxlZH0pe2NvbnN0IGlzRGlzYWJsZWQ9ZGlzYWJsZWR8fCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcjtjb25zdCB1bm9ic2VydmU9KDAsX3JlYWN0LnVzZVJlZikoKTtjb25zdFt2aXNpYmxlLHNldFZpc2libGVdPSgwLF9yZWFjdC51c2VTdGF0ZSkoZmFsc2UpO2NvbnN0IHNldFJlZj0oMCxfcmVhY3QudXNlQ2FsbGJhY2spKGVsPT57aWYodW5vYnNlcnZlLmN1cnJlbnQpe3Vub2JzZXJ2ZS5jdXJyZW50KCk7dW5vYnNlcnZlLmN1cnJlbnQ9dW5kZWZpbmVkO31pZihpc0Rpc2FibGVkfHx2aXNpYmxlKXJldHVybjtpZihlbCYmZWwudGFnTmFtZSl7dW5vYnNlcnZlLmN1cnJlbnQ9b2JzZXJ2ZShlbCxpc1Zpc2libGU9PmlzVmlzaWJsZSYmc2V0VmlzaWJsZShpc1Zpc2libGUpLHtyb290TWFyZ2lufSk7fX0sW2lzRGlzYWJsZWQscm9vdE1hcmdpbix2aXNpYmxlXSk7KDAsX3JlYWN0LnVzZUVmZmVjdCkoKCk9PntpZighaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpe2lmKCF2aXNpYmxlKXtjb25zdCBpZGxlQ2FsbGJhY2s9KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PnNldFZpc2libGUodHJ1ZSkpO3JldHVybigpPT4oMCxfcmVxdWVzdElkbGVDYWxsYmFjay5jYW5jZWxJZGxlQ2FsbGJhY2spKGlkbGVDYWxsYmFjayk7fX19LFt2aXNpYmxlXSk7cmV0dXJuW3NldFJlZix2aXNpYmxlXTt9ZnVuY3Rpb24gb2JzZXJ2ZShlbGVtZW50LGNhbGxiYWNrLG9wdGlvbnMpe2NvbnN0e2lkLG9ic2VydmVyLGVsZW1lbnRzfT1jcmVhdGVPYnNlcnZlcihvcHRpb25zKTtlbGVtZW50cy5zZXQoZWxlbWVudCxjYWxsYmFjayk7b2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtyZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCl7ZWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpO29ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KTsvLyBEZXN0cm95IG9ic2VydmVyIHdoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gd2F0Y2g6XG5pZihlbGVtZW50cy5zaXplPT09MCl7b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO29ic2VydmVycy5kZWxldGUoaWQpO319O31jb25zdCBvYnNlcnZlcnM9bmV3IE1hcCgpO2Z1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKG9wdGlvbnMpe2NvbnN0IGlkPW9wdGlvbnMucm9vdE1hcmdpbnx8Jyc7bGV0IGluc3RhbmNlPW9ic2VydmVycy5nZXQoaWQpO2lmKGluc3RhbmNlKXtyZXR1cm4gaW5zdGFuY2U7fWNvbnN0IGVsZW1lbnRzPW5ldyBNYXAoKTtjb25zdCBvYnNlcnZlcj1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcz0+e2VudHJpZXMuZm9yRWFjaChlbnRyeT0+e2NvbnN0IGNhbGxiYWNrPWVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpO2NvbnN0IGlzVmlzaWJsZT1lbnRyeS5pc0ludGVyc2VjdGluZ3x8ZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8+MDtpZihjYWxsYmFjayYmaXNWaXNpYmxlKXtjYWxsYmFjayhpc1Zpc2libGUpO319KTt9LG9wdGlvbnMpO29ic2VydmVycy5zZXQoaWQsaW5zdGFuY2U9e2lkLG9ic2VydmVyLGVsZW1lbnRzfSk7cmV0dXJuIGluc3RhbmNlO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZS1pbnRlcnNlY3Rpb24uanMubWFwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZ2V0Tm9kZUZyYWdtZW50c1BheWxvYWQsIGdldFRleHRGcmFnbWVudHMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IEFjdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzLyc7XHJcbmltcG9ydCB7IEVkaXRQYW5lbCB9IGZyb20gJy4uL2VkaXRvci9FZGl0UGFuZWwnO1xyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBDVFggfSBmcm9tICcuLi8uLi90eXBlcy8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWN0aW9uKHtcclxuICBpZCxcclxuICBjdHgsXHJcbiAgaXNBZG1pbixcclxufToge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY3R4OiBDVFg7XHJcbiAgaXNBZG1pbjogYm9vbGVhbjtcclxufSkge1xyXG4gIGNvbnN0IHsgY29udGV4dCB9ID0gY3R4O1xyXG5cclxuICBjb25zdCBtb2RlbCA9IGNvbnRleHQuZ2V0TW9kZWwoeyB0eXBlOiAnYWN0aW9ucycsIGlkIH0pO1xyXG4gIGlmICghKG1vZGVsIGluc3RhbmNlb2YgQWN0aW9uTW9kZWwpKSByZXR1cm4gPD48Lz47XHJcblxyXG4gIGNvbnN0IHRleHRGcmFnbWVudHMgPSBnZXRUZXh0RnJhZ21lbnRzKHsgdGV4dDogbW9kZWwuZ2V0VGV4dCgpIH0pO1xyXG4gIGNvbnN0IHRleHRKU1ggPSBnZXROb2RlRnJhZ21lbnRzUGF5bG9hZCh7IGN0eCwgdGV4dEZyYWdtZW50cywgaXNBZG1pbiB9KTtcclxuXHJcbiAgY29uc3QgYWN0aW9uID0gbW9kZWwuZ2V0QWN0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFjdGlvbiA9ICgpID0+IHtcclxuICAgIGlmICghYWN0aW9uKSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3NlbGVjdE5vZGUnOlxyXG4gICAgICAgIGN0eC5zZXRUZXh0Tm9kZUlkKGFjdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NlbGVjdFNjZW5lJzpcclxuICAgICAgICBjdHguc2V0VGV4dFNjZW5lSWQoYWN0aW9uLnZhbHVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb259PlxyXG4gICAgICAgIHtpc0FkbWluICYmIDxFZGl0UGFuZWwgbW9kZWw9e21vZGVsfSBjdHg9e2N0eH0gLz59XHJcbiAgICAgICAgPHNwYW4gb25DbGljaz17aGFuZGxlQWN0aW9ufT57dGV4dEpTWH08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBY3Rpb25zLCBOb2RlcywgSW5mbyB9IGZyb20gJy4vaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5PREVfVFlQRVMgPSB7IGFjdGlvbnM6IEFjdGlvbnMsIG5vZGVzOiBOb2RlcywgaW5mbzogSW5mbyB9O1xyXG4iLCJpbXBvcnQgTm9kZXMgZnJvbSAnLi9ub2Rlcyc7XHJcbmltcG9ydCBBY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XHJcbmltcG9ydCBJbmZvIGZyb20gJy4vaW5mbyc7XHJcblxyXG5leHBvcnQgeyBOb2RlcywgQWN0aW9ucywgSW5mbyB9O1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGdldE5vZGVGcmFnbWVudHNQYXlsb2FkLCBnZXRUZXh0RnJhZ21lbnRzIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgSW5mb0Ryb3Bkb3duIGZyb20gJy4vaW5mb0Ryb3Bkb3duJztcclxuaW1wb3J0IHsgSW5mb01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzLyc7XHJcbmltcG9ydCB7IEVkaXRQYW5lbCB9IGZyb20gJy4uL2VkaXRvci9FZGl0UGFuZWwnO1xyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBDVFggfSBmcm9tICcuLi8uLi90eXBlcy8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5mbyh7XHJcbiAgaWQsXHJcbiAgY3R4LFxyXG4gIGlzQWRtaW4sXHJcbn06IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGN0eDogQ1RYO1xyXG4gIGlzQWRtaW46IGJvb2xlYW47XHJcbn0pIHtcclxuICBjb25zdCB7IGNvbnRleHQgfSA9IGN0eDtcclxuICBjb25zdCBbaW5mb1Nob3duLCBzZXRpbmZvU2hvd25dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBjb25zdCBtb2RlbCA9IGNvbnRleHQuZ2V0TW9kZWwoeyB0eXBlOiAnaW5mbycsIGlkIH0pO1xyXG4gIGlmICghKG1vZGVsIGluc3RhbmNlb2YgSW5mb01vZGVsKSkgcmV0dXJuIDw+PC8+O1xyXG5cclxuICBjb25zdCB0ZXh0RnJhZ21lbnRzID0gZ2V0VGV4dEZyYWdtZW50cyh7IHRleHQ6IG1vZGVsLmdldFRleHQoKSB9KTtcclxuICBjb25zdCB0ZXh0SlNYID0gZ2V0Tm9kZUZyYWdtZW50c1BheWxvYWQoeyBjdHgsIHRleHRGcmFnbWVudHMsIGlzQWRtaW4gfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUhvdmVyID0gKCkgPT4ge1xyXG4gICAgc2V0aW5mb1Nob3duKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUhvdmVyT3V0ID0gKCkgPT4ge1xyXG4gICAgc2V0aW5mb1Nob3duKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pbmZvfT5cclxuICAgICAge2lzQWRtaW4gJiYgPEVkaXRQYW5lbCBtb2RlbD17bW9kZWx9IGN0eD17Y3R4fSAvPn1cclxuICAgICAgPHNwYW4gb25Nb3VzZUVudGVyPXtoYW5kbGVIb3Zlcn0gb25Nb3VzZUxlYXZlPXtoYW5kbGVIb3Zlck91dH0+XHJcbiAgICAgICAge3RleHRKU1h9XHJcbiAgICAgICAge2luZm9TaG93biAmJiA8SW5mb0Ryb3Bkb3duIGluZm89e21vZGVsfSAvPn1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBJbmZvTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vLi4vLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmZvRHJvcGRvd24oeyBpbmZvIH06IHsgaW5mbzogSW5mb01vZGVsIH0pIHtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGluZm8uZ2V0RGVzY3JpcHRpb24oKTtcclxuICBjb25zdCBuYW1lID0gaW5mby5nZXROYW1lKCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmluZm9Ecm9wZG93blBvaW50ZXJ9PjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmluZm9Ecm9wZG93bn0+XHJcbiAgICAgICAge25hbWUgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pbmZvRHJvcGRvd25IZWFkZXJ9PntuYW1lfTwvZGl2Pn1cclxuICAgICAgICB7ZGVzY3JpcHRpb24gJiYgPGRpdj57ZGVzY3JpcHRpb259PC9kaXY+fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgZ2V0Tm9kZUZyYWdtZW50c1BheWxvYWQsIGdldFRleHRGcmFnbWVudHMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IEVkaXRQYW5lbCB9IGZyb20gJy4uL2VkaXRvci9FZGl0UGFuZWwnO1xyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBDVFggfSBmcm9tICcuLi8uLi90eXBlcy8nO1xyXG5pbXBvcnQgeyBOb2RlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5vZGVzKHtcclxuICBpZCxcclxuICBjdHgsXHJcbiAgaXNBZG1pbixcclxufToge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY3R4OiBDVFg7XHJcbiAgaXNBZG1pbjogYm9vbGVhbjtcclxufSkge1xyXG4gIGNvbnN0IHsgY29udGV4dCB9ID0gY3R4O1xyXG5cclxuICBjb25zdCBtb2RlbCA9IGNvbnRleHQuZ2V0TW9kZWwoeyB0eXBlOiAnbm9kZXMnLCBpZCB9KTtcclxuICBpZiAoIShtb2RlbCBpbnN0YW5jZW9mIE5vZGVNb2RlbCkpIHJldHVybiA8PjwvPjtcclxuXHJcbiAgY29uc3QgdGV4dEZyYWdtZW50cyA9IGdldFRleHRGcmFnbWVudHMoeyB0ZXh0OiBtb2RlbC5nZXRUZXh0KCkgfSk7XHJcbiAgY29uc3QgdGV4dEpTWCA9IGdldE5vZGVGcmFnbWVudHNQYXlsb2FkKHsgY3R4LCB0ZXh0RnJhZ21lbnRzLCBpc0FkbWluIH0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50ZXh0Tm9kZX0+XHJcbiAgICAgICAge2lzQWRtaW4gJiYgPEVkaXRQYW5lbCBtb2RlbD17bW9kZWx9IGN0eD17Y3R4fSAvPn1cclxuICAgICAgICB7dGV4dEpTWH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgaW52ZW50b3J5IH0gZnJvbSAnLi4vLi4vbW9kZWxzLyc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IENUWCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludmVudG9yeSh7XHJcbiAgY3R4LFxyXG4gIGludmVudG9yeSxcclxufToge1xyXG4gIGN0eDogQ1RYO1xyXG4gIGludmVudG9yeTogaW52ZW50b3J5LkludmVudG9yeTtcclxufSkge1xyXG4gIGNvbnN0IHsgZ2FtZURhdGEgfSA9IGN0eDtcclxuICBjb25zdCBpdGVtcyA9IGludmVudG9yeS5nZXRJdGVtc0FzQXJyYXkoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2l0ZW0ucHJvcHMubmFtZX08L2Rpdj47XHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBJbnZlbnRvcnkgZnJvbSAnLi9pbnZlbnRvcnknO1xyXG5cclxuaW1wb3J0IGRvbGwgZnJvbSAnLi4vLi4vLi4vQXNzZXRzL2RvbGwucG5nJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBDVFggfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXJOb2RlKHsgY3R4LCB0YWIgfTogeyBjdHg6IENUWDsgdGFiOiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IHsgZ2FtZURhdGEgfSA9IGN0eDtcclxuICBjb25zdCBwbGF5ZXIgPSBnYW1lRGF0YS5nZXRQbGF5ZXJDaGFyYWN0ZXIoKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGV4dE5vZGV9PlxyXG4gICAgICB7dGFiID09PSAnaXRlbXMnICYmIChcclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxJbnZlbnRvcnkgY3R4PXtjdHh9IGludmVudG9yeT17cGxheWVyLmludmVudG9yeX0gLz5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICl9XHJcbiAgICAgIHt0YWIgPT09ICdza2lsbHMnICYmIChcclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIFNraWxsczogPHNwYW4+e0pTT04uc3RyaW5naWZ5KHBsYXllci5za2lsbHMuY29sbGVjdGlvbil9PC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgKX1cclxuICAgICAge3RhYiA9PT0gJ2F0dHJzJyAmJiAoXHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICBBdHRyczogPHNwYW4+e0pTT04uc3RyaW5naWZ5KHBsYXllci5hdHRyaWJ1dGVzLmNvbGxlY3Rpb24pfTwvc3Bhbj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICl9XHJcbiAgICAgIHt0YWIgPT09ICdkb2xsJyAmJiAoXHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICA8SW1hZ2Ugc3JjPXtkb2xsfSB3aWR0aD17MTI4fSBoZWlnaHQ9ezMwOX0gYWx0PVwiZG9sbFwiIC8+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgdHlwZSB7IENUWCB9IGZyb20gJy4uLy4uL3R5cGVzLyc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vLi4vLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXJUYWJzKHtcclxuICBzZXRUYWIsXHJcbn06IHtcclxuICBzZXRUYWI6ICh0eXBlOiBzdHJpbmcpID0+IGFueTtcclxufSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBsYXllclRhYnN9PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgc2V0VGFiKCdpdGVtcycpO1xyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICBJbnZcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzZXRUYWIoJ3NraWxscycpO1xyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICBTa2lsbHNcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzZXRUYWIoJ2F0dHJzJyk7XHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIGF0dHJzXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgc2V0VGFiKCdkb2xsJyk7XHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIGRvbGxcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRHJvcGRvd25UZXh0YXJlYSB9IGZyb20gJy4vZHJvcGRvd25UZXh0YXJlYSc7XHJcbmltcG9ydCB7IGNhbGxBUElFbmRwb2ludCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vLi4vLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcyc7XHJcbmltcG9ydCB0eXBlIHsgQ1RYIH0gZnJvbSAnLi4vLi4vdHlwZXMvJztcclxuaW1wb3J0IHR5cGUgeyBEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBFZGl0UGFuZWwoeyBtb2RlbCwgY3R4IH06IHsgbW9kZWw6IERlZmF1bHRNb2RlbDsgY3R4OiBDVFggfSkge1xyXG4gIGNvbnN0IFthcmVhU2hvd24sIHNldEFyZWFTaG93bl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVkaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhcmVhU2hvd24gPyBzZXRBcmVhU2hvd24oZmFsc2UpIDogc2V0QXJlYVNob3duKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBtb2RlbC5zYXZlKCk7XHJcbiAgICBzZXRBcmVhU2hvd24oZmFsc2UpO1xyXG4gICAgY29uc3Qgc2F2ZWREYXRhID0gYXdhaXQgY2FsbEFQSUVuZHBvaW50KHtcclxuICAgICAgZW5kcG9pbnQ6ICdzYXZlRGF0YScsXHJcbiAgICAgIGRhdGE6IG1vZGVsLmdldFJhdygpLFxyXG4gICAgfSk7XHJcbiAgICBjdHguY29udGV4dC5zZXRNb2RlbCh7XHJcbiAgICAgIHR5cGU6IHNhdmVkRGF0YS50eXBlLFxyXG4gICAgICBpZDogc2F2ZWREYXRhLmRhdGEuaWQsXHJcbiAgICAgIGRhdGE6IHNhdmVkRGF0YS5kYXRhLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZWRpdFBhbmVsfT5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUVkaXR9PkVkaXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNhdmV9PlNhdmU8L2J1dHRvbj5cclxuICAgICAgICB7YXJlYVNob3duICYmIDxEcm9wZG93blRleHRhcmVhIG1vZGVsPXttb2RlbH0gY3R4PXtjdHh9IC8+fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdHlwZSB7IERlZmF1bHRNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy8nO1xyXG5cclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi8uLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IHR5cGUgeyBDVFggfSBmcm9tICcuLi8uLi90eXBlcy8nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyb3Bkb3duVGV4dGFyZWEoe1xyXG4gIG1vZGVsLFxyXG4gIGN0eCxcclxufToge1xyXG4gIG1vZGVsOiBEZWZhdWx0TW9kZWw7XHJcbiAgY3R4OiBDVFg7XHJcbn0pIHtcclxuICAvL2NvbnN0IGRlc2NyaXB0aW9uID0gbW9kZWwuZ2V0RGVzY3JpcHRpb24oKTtcclxuICAvL2NvbnN0IG5hbWUgPSBtb2RlbC5nZXROYW1lKCk7XHJcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGU8c3RyaW5nPihtb2RlbC5nZXRUZXh0KCkpO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFnZSA9IGV2ZW50ID0+IHtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgc2V0VGV4dChuZXdWYWx1ZSk7XHJcbiAgICBtb2RlbC5zZXRUZXh0KG5ld1ZhbHVlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kcm9wZG93blBvaW50ZXJ9PjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRyb3Bkb3dufT5cclxuICAgICAgICB7dGV4dCAmJiAoXHJcbiAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYWdlfVxyXG4gICAgICAgICAgICB2YWx1ZT17dGV4dH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuZWRpdEFyZWF9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKTtcclxufVxyXG4iLCJpbXBvcnQgeyBOT0RFX1RZUEVTIH0gZnJvbSAnLi9Ob2RlL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQ1RYIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVGcmFnbWVudHNQYXlsb2FkKHtcclxuICBjdHgsXHJcbiAgdGV4dEZyYWdtZW50cyxcclxuICBpc0FkbWluLFxyXG59OiB7XHJcbiAgY3R4OiBDVFg7XHJcbiAgdGV4dEZyYWdtZW50czogc3RyaW5nW107XHJcbiAgaXNBZG1pbjogYm9vbGVhbjtcclxufSk6IEpTWC5FbGVtZW50W10ge1xyXG4gIGNvbnN0IHRleHRKU1g6IEpTWC5FbGVtZW50W10gPSBbXTtcclxuICBsZXQga2V5SSA9IDA7XHJcblxyXG4gIGZvciAoY29uc3QgZnJhZ21lbnQgb2YgdGV4dEZyYWdtZW50cykge1xyXG4gICAgaWYgKGZyYWdtZW50WzBdID09PSAneycpIHtcclxuICAgICAgY29uc3QgZnJhZ21lbnRJZCA9IGZyYWdtZW50LnN1YnN0cigxLCBmcmFnbWVudC5sZW5ndGggLSAyKTtcclxuICAgICAgY29uc3QgZnJhZ21lbnRUeXBlID0gZnJhZ21lbnRJZC5zcGxpdCgnXycpWzBdO1xyXG4gICAgICBjb25zdCBDb21wb25lbnQgPSBOT0RFX1RZUEVTW2ZyYWdtZW50VHlwZV07XHJcbiAgICAgIHRleHRKU1gucHVzaChcclxuICAgICAgICA8Q29tcG9uZW50IGtleT17a2V5SSsrfSBpZD17ZnJhZ21lbnRJZH0gY3R4PXtjdHh9IGlzQWRtaW49e2lzQWRtaW59PlxyXG4gICAgICAgICAge2ZyYWdtZW50fVxyXG4gICAgICAgIDwvQ29tcG9uZW50PlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dEpTWC5wdXNoKDxzcGFuIGtleT17a2V5SSsrfT57ZnJhZ21lbnR9PC9zcGFuPik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGV4dEpTWDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHRGcmFnbWVudHMoeyB0ZXh0IH06IHsgdGV4dDogc3RyaW5nIH0pOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIHRleHQuc3BsaXQoLyh7KD86YWN0aW9uc3xub2Rlc3xpbmZvKV9cXGQqfSkrLykuZmlsdGVyKEJvb2xlYW4pO1xyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1c2VTV1IsIHsgbXV0YXRlIH0gZnJvbSAnc3dyJztcbmltcG9ydCBOb2RlcyBmcm9tICcuL2NvbXBvbmVudHMvTm9kZS9ub2Rlcyc7XG5pbXBvcnQgUGxheWVyVGFicyBmcm9tICcuL2NvbXBvbmVudHMvUGxheWVyL3BsYXllclRhYnMnO1xuaW1wb3J0IFBsYXllck5vZGUgZnJvbSAnLi9jb21wb25lbnRzL1BsYXllci9wbGF5ZXJOb2RlJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJztcbmltcG9ydCB7IENvbnRleHQsIEdhbWVEYXRhLCBnZXREYXRhbG9hZGVycyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB0eXBlIHsgQ1RYIH0gZnJvbSAnLi90eXBlcy8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCB7IGRhdGEgfSA9IHVzZVNXUignL2FwaS9wYXJzZURhdGEnKTtcbiAgY29uc3QgW3NldHRpbmdzLCBzZXRTZXR0aW5nc10gPSB1c2VTdGF0ZTx7XG4gICAgY3R4OiBDVFggfCBudWxsO1xuICAgIGluaXRMb2FkaW5nOiBib29sZWFuO1xuICAgIHRhYjogc3RyaW5nO1xuICAgIHRleHROb2RlSWQ6IHN0cmluZztcbiAgICB0ZXh0U2NlbmVJZDogc3RyaW5nO1xuICB9Pih7XG4gICAgY3R4OiBudWxsLFxuICAgIGluaXRMb2FkaW5nOiBmYWxzZSxcbiAgICB0YWI6ICdpdGVtcycsXG4gICAgdGV4dE5vZGVJZDogJycsXG4gICAgdGV4dFNjZW5lSWQ6ICcnLFxuICB9KTtcblxuICBjb25zdCBpc0FkbWluID0gdHJ1ZTtcblxuICBjb25zdCBzZXRDdHggPSAoY3R4OiBDVFgpID0+IHtcbiAgICBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCBjdHggfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0VGV4dE5vZGVJZCA9ICh0ZXh0Tm9kZUlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCB0ZXh0Tm9kZUlkIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldFRleHRTY2VuZUlkID0gKHRleHRTY2VuZUlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCB0ZXh0U2NlbmVJZCB9KTtcbiAgfTtcblxuICBjb25zdCBzZXRUYWIgPSAodGFiOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZXR0aW5ncyh7IC4uLnNldHRpbmdzLCB0YWIgfSk7XG4gIH07XG5cbiAgUmVhY3QudXNlTWVtbyhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZGF0YWxvYWRlcnMgPSBnZXREYXRhbG9hZGVycygpO1xuICAgIGNvbnN0IGRhdGFTb3VyY2UgPSB7IHN3cjogeyBtdXRhdGUsIHVzZVNXUiB9LCBkYXRhbG9hZGVycyB9O1xuICAgIHNldFNldHRpbmdzKHtcbiAgICAgIGN0eDoge1xuICAgICAgICB1cGRhdGU6IHNldEN0eCxcbiAgICAgICAgY29udGV4dDogbmV3IENvbnRleHQoZGF0YSksXG4gICAgICAgIGRhdGFTb3VyY2UsXG4gICAgICAgIGdhbWVEYXRhOiBuZXcgR2FtZURhdGEoZGF0YVNvdXJjZSksXG4gICAgICAgIHNldFRleHROb2RlSWQsXG4gICAgICAgIHNldFRleHRTY2VuZUlkLFxuICAgICAgfSxcbiAgICAgIGluaXRMb2FkaW5nOiBmYWxzZSxcbiAgICAgIHRhYjogJ2l0ZW1zJyxcbiAgICAgIHRleHROb2RlSWQ6ICdub2Rlc18xJyxcbiAgICAgIHRleHRTY2VuZUlkOiAnc2NlbmVfMDEnLFxuICAgIH0pO1xuICB9LCBbZGF0YV0pO1xuXG4gIFJlYWN0LnVzZU1lbW8oYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXR0aW5ncy5jdHggJiYgIXNldHRpbmdzLmluaXRMb2FkaW5nKSB7XG4gICAgICBjb25zdCBuZXdDdHggPSB7IC4uLnNldHRpbmdzLmN0eCB9O1xuICAgICAgYXdhaXQgbmV3Q3R4LmdhbWVEYXRhPy5pbml0aWFsTG9hZGluZygpO1xuICAgICAgc2V0U2V0dGluZ3MoeyAuLi5zZXR0aW5ncywgY3R4OiBuZXdDdHgsIGluaXRMb2FkaW5nOiB0cnVlIH0pO1xuICAgIH1cbiAgfSwgW3NldHRpbmdzLmN0eF0pO1xuXG4gIGlmICghc2V0dGluZ3MuY3R4KSByZXR1cm4gPD48Lz47XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNldHRpbmdzfT48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucGxheWVyQ29udGFpbmVyfT5cbiAgICAgICAgICA8UGxheWVyVGFicyBzZXRUYWI9e3NldFRhYn0gLz5cbiAgICAgICAgICA8UGxheWVyTm9kZSBjdHg9e3NldHRpbmdzLmN0eH0gdGFiPXtzZXR0aW5ncy50YWJ9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRleHRDb250YWluZXJ9PlxuICAgICAgICAgIDxOb2Rlc1xuICAgICAgICAgICAgY3R4PXtzZXR0aW5ncy5jdHh9XG4gICAgICAgICAgICBpZD17c2V0dGluZ3MudGV4dE5vZGVJZH1cbiAgICAgICAgICAgIGlzQWRtaW49e2lzQWRtaW59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudmlld0NvbnRhaW5lcn0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaW50ZXJhY3Rpb25zfT48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBFbXB0eSB7XHJcbiAgICBcclxufSIsImltcG9ydCB7IEF0dHJpYnV0ZXMsIEF0dHJpYnV0ZVByb3BzLCBDaGVja1Jlc3VsdHMgfSBmcm9tICcuLyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlIHtcclxuICBwcm9wczogQXR0cmlidXRlUHJvcHM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBdHRyaWJ1dGVQcm9wcywgYXR0cmlidXRlcz86IEF0dHJpYnV0ZXMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBjaGVjayhkaWZmaWN1bHR5OiBudW1iZXIpOiBDaGVja1Jlc3VsdHMge1xyXG4gICAgY29uc3QgcmFuZCA9IE1hdGgucm91bmQoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkgKiA1ICsgTWF0aC5yYW5kb20oKSAqIDUgKyBNYXRoLnJhbmRvbSgpICogNSArIDNcclxuICAgICk7XHJcbiAgICBjb25zdCByZXN1bHQgPSByYW5kIDw9IHRoaXMuZ2V0VmFsdWUoKSAtIGRpZmZpY3VsdHk7XHJcbiAgICByZXR1cm4geyByYW5kLCB2YWx1ZTogdGhpcy5nZXRWYWx1ZSgpLCByZXN1bHQgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREZWZhdWx0UHJvcHMoKTogQXR0cmlidXRlUHJvcHMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogJycsXHJcbiAgICAgIGNvZGU6ICcnLFxyXG4gICAgICByYXdWYWx1ZTogMTAsXHJcbiAgICAgIG1vZHM6IFtdLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFJhdygpIHt9XHJcblxyXG4gIGluaXRGcm9tUmF3KCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBBdHRyaWJ1dGUgfSBmcm9tICcuL2F0dHJpYnV0ZSc7XHJcbmltcG9ydCB7IERleHRlcml0eSB9IGZyb20gJy4vbW9kZWxzL2RleHRlcml0eSc7XHJcbmltcG9ydCB7IEZhdGlndWUgfSBmcm9tICcuL21vZGVscy9mYXRpZ3VlJztcclxuaW1wb3J0IHsgSGVhbHRoIH0gZnJvbSAnLi9tb2RlbHMvaGVhbHRoJztcclxuaW1wb3J0IHsgSGl0cG9pbnRzIH0gZnJvbSAnLi9tb2RlbHMvaGl0cG9pbnRzJztcclxuaW1wb3J0IHsgSW50ZWxpZ2VuY2UgfSBmcm9tICcuL21vZGVscy9pbnRlbGlnZW5jZSc7XHJcbmltcG9ydCB7IE1vdmUgfSBmcm9tICcuL21vZGVscy9tb3ZlJztcclxuaW1wb3J0IHsgUGVyY2VwdGlvbiB9IGZyb20gJy4vbW9kZWxzL3Blcic7XHJcbmltcG9ydCB7IFNwZWVkIH0gZnJvbSAnLi9tb2RlbHMvc3BlZWQnO1xyXG5pbXBvcnQgeyBTdHJlbmd0aCB9IGZyb20gJy4vbW9kZWxzL3N0cmVuZ3RoJztcclxuaW1wb3J0IHsgV2lsbCB9IGZyb20gJy4vbW9kZWxzL3dpbGwnO1xyXG5cclxuZXhwb3J0IHR5cGUgQXR0cmlidXRlUHJvcHMgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGNvZGU6IHN0cmluZztcclxuICByYXdWYWx1ZTogbnVtYmVyO1xyXG4gIG1vZHM6IHsgc291cmNlOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGR1cmF0aW9uOiBudW1iZXIgfVtdO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQ2hlY2tSZXN1bHRzID0ge1xyXG4gIHJhbmQ6IG51bWJlcjtcclxuICB2YWx1ZTogbnVtYmVyO1xyXG4gIHJlc3VsdDogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IEFUVFJTX0xJU1QgPSBbXHJcbiAgeyBjb2RlOiAnc3RyJywgbW9kZWw6IFN0cmVuZ3RoIH0sXHJcbiAgeyBjb2RlOiAnZGV4JywgbW9kZWw6IERleHRlcml0eSB9LFxyXG4gIHsgY29kZTogJ2h0JywgbW9kZWw6IEhlYWx0aCB9LFxyXG4gIHsgY29kZTogJ2ludCcsIG1vZGVsOiBJbnRlbGlnZW5jZSB9LFxyXG4gIHsgY29kZTogJ2hwJywgbW9kZWw6IEhpdHBvaW50cyB9LFxyXG4gIHsgY29kZTogJ3BlcicsIG1vZGVsOiBQZXJjZXB0aW9uIH0sXHJcbiAgeyBjb2RlOiAnd2lsbCcsIG1vZGVsOiBXaWxsIH0sXHJcbiAgeyBjb2RlOiAnc3BlZWQnLCBtb2RlbDogU3BlZWQgfSxcclxuICB7IGNvZGU6ICdtb3ZlJywgbW9kZWw6IE1vdmUgfSxcclxuICB7IGNvZGU6ICdmdCcsIG1vZGVsOiBGYXRpZ3VlIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlcyB7XHJcbiAgY29sbGVjdGlvbjogeyBbaW5kZXg6IHN0cmluZ106IEF0dHJpYnV0ZSB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dEF0dHJzPzogQXR0cmlidXRlUHJvcHNbXSkge1xyXG4gICAgdGhpcy5jb2xsZWN0aW9uID0ge307XHJcbiAgICBBVFRSU19MSVNULmZvckVhY2goYXR0ciA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBpbnB1dEF0dHJzPy5maW5kKGlucHV0QXR0ciA9PiBpbnB1dEF0dHIuY29kZSA9PT0gYXR0ci5jb2RlKTtcclxuICAgICAgdGhpcy5jb2xsZWN0aW9uW2F0dHIuY29kZV0gPSBuZXcgYXR0ci5tb2RlbChcclxuICAgICAgICBkYXRhIHx8IGF0dHIubW9kZWwuZ2V0RGVmYXVsdFByb3BzKCksXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVjayhrZXk6IHN0cmluZywgZGlmZmljdWx0eTogbnVtYmVyKTogQ2hlY2tSZXN1bHRzIHtcclxuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25ba2V5XS5jaGVjayhkaWZmaWN1bHR5KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXR0cmlidXRlUHJvcHMgfSBmcm9tICcuLi8nO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERleHRlcml0eSBleHRlbmRzIEF0dHJpYnV0ZSB7XHJcbiAgc3RhdGljIGdldERlZmF1bHRQcm9wcygpOiBBdHRyaWJ1dGVQcm9wcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnRGV4dGVyaXR5JyxcclxuICAgICAgY29kZTogJ2RleCcsXHJcbiAgICAgIHJhd1ZhbHVlOiAxMCxcclxuICAgICAgbW9kczogW10sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBdHRyaWJ1dGVQcm9wcywgQXR0cmlidXRlcyB9IGZyb20gJy4uJztcclxuaW1wb3J0IHsgQXR0cmlidXRlIH0gZnJvbSAnLi4vYXR0cmlidXRlJztcclxuaW1wb3J0IHsgSGVhbHRoIH0gZnJvbSAnLi9oZWFsdGgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZhdGlndWUgZXh0ZW5kcyBBdHRyaWJ1dGUge1xyXG4gIGhlYWx0aDogSGVhbHRoO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wczogQXR0cmlidXRlUHJvcHMsIGF0dHJpYnV0ZXM/OiBBdHRyaWJ1dGVzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICBpZiAoIWF0dHJpYnV0ZXM/LmNvbGxlY3Rpb25bJ2h0J10pXHJcbiAgICAgIHRocm93IEVycm9yKCdIZWFsdGggc2hvdWxkIGJlIGRlZmluZWQgYmVmb3JlIGZhdGlndWUnKTtcclxuICAgIHRoaXMuaGVhbHRoID0gYXR0cmlidXRlcy5jb2xsZWN0aW9uWydodCddO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKTogbnVtYmVyIHtcclxuICAgIGxldCB2YWx1ZSA9IHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgICB0aGlzLnByb3BzLm1vZHMuZm9yRWFjaChtb2QgPT4ge1xyXG4gICAgICB2YWx1ZSArPSBtb2QudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmhlYWx0aC5nZXRWYWx1ZSgpICsgdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdGYXRpZ3VlJyxcclxuICAgICAgY29kZTogJ2Z0JyxcclxuICAgICAgcmF3VmFsdWU6IDAsXHJcbiAgICAgIG1vZHM6IFtdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXR0cmlidXRlUHJvcHMgfSBmcm9tICcuLic7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZSB9IGZyb20gJy4uL2F0dHJpYnV0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVhbHRoIGV4dGVuZHMgQXR0cmlidXRlIHtcclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdIZWFsdGgnLFxyXG4gICAgICBjb2RlOiAnaHQnLFxyXG4gICAgICByYXdWYWx1ZTogMTAsXHJcbiAgICAgIG1vZHM6IFtdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXR0cmlidXRlUHJvcHMsIEF0dHJpYnV0ZXMgfSBmcm9tICcuLic7XHJcbmltcG9ydCB7IFN0cmVuZ3RoIH0gZnJvbSAnLi9zdHJlbmd0aCc7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZSB9IGZyb20gJy4uL2F0dHJpYnV0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSGl0cG9pbnRzIGV4dGVuZHMgQXR0cmlidXRlIHtcclxuICBzdHJlbmd0aDogU3RyZW5ndGg7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBdHRyaWJ1dGVQcm9wcywgYXR0cmlidXRlcz86IEF0dHJpYnV0ZXMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGlmICghYXR0cmlidXRlcz8uY29sbGVjdGlvblsnc3RyJ10pXHJcbiAgICAgIHRocm93IEVycm9yKCdTdHIgc2hvdWxkIGJlIGRlZmluZWQgYmVmb3JlIEhQJyk7XHJcbiAgICB0aGlzLnN0cmVuZ3RoID0gYXR0cmlidXRlcy5jb2xsZWN0aW9uWydzdHInXTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5zdHJlbmd0aC5nZXRWYWx1ZSgpICsgdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdIaXRwb2ludHMnLFxyXG4gICAgICBjb2RlOiAnaHAnLFxyXG4gICAgICByYXdWYWx1ZTogMCxcclxuICAgICAgbW9kczogW10sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBdHRyaWJ1dGVQcm9wcyB9IGZyb20gJy4uJztcclxuaW1wb3J0IHsgQXR0cmlidXRlIH0gZnJvbSAnLi4vYXR0cmlidXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnRlbGlnZW5jZSBleHRlbmRzIEF0dHJpYnV0ZSB7XHJcbiAgc3RhdGljIGdldERlZmF1bHRQcm9wcygpOiBBdHRyaWJ1dGVQcm9wcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnSW50ZWxpZ2VuY2UnLFxyXG4gICAgICBjb2RlOiAnaW50JyxcclxuICAgICAgcmF3VmFsdWU6IDEwLFxyXG4gICAgICBtb2RzOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF0dHJpYnV0ZVByb3BzLCBBdHRyaWJ1dGVzIH0gZnJvbSAnLi4nO1xyXG5pbXBvcnQgeyBTcGVlZCB9IGZyb20gJy4vc3BlZWQnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vdmUgZXh0ZW5kcyBBdHRyaWJ1dGUge1xyXG4gIHNwZWVkOiBTcGVlZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEF0dHJpYnV0ZVByb3BzLCBhdHRyaWJ1dGVzPzogQXR0cmlidXRlcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhYXR0cmlidXRlcz8uY29sbGVjdGlvblsnc3BlZWQnXSB8fFxyXG4gICAgICAhKGF0dHJpYnV0ZXM/LmNvbGxlY3Rpb25bJ3NwZWVkJ10hIGluc3RhbmNlb2YgU3BlZWQpXHJcbiAgICApXHJcbiAgICAgIHRocm93IEVycm9yKCdTcGVlZCBzaG91bGQgYmUgZGVmaW5lZCBiZWZvcmUgbW92ZScpO1xyXG4gICAgdGhpcy5zcGVlZCA9IGF0dHJpYnV0ZXMuY29sbGVjdGlvblsnc3BlZWQnXTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnNwZWVkLmdldFZhbHVlKCkpICsgdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdNb3ZlJyxcclxuICAgICAgY29kZTogJ21vdmUnLFxyXG4gICAgICByYXdWYWx1ZTogMCxcclxuICAgICAgbW9kczogW10sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBdHRyaWJ1dGVQcm9wcywgQXR0cmlidXRlcyB9IGZyb20gJy4uJztcclxuaW1wb3J0IHsgSW50ZWxpZ2VuY2UgfSBmcm9tICcuL2ludGVsaWdlbmNlJztcclxuaW1wb3J0IHsgQXR0cmlidXRlIH0gZnJvbSAnLi4vYXR0cmlidXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJjZXB0aW9uIGV4dGVuZHMgQXR0cmlidXRlIHtcclxuICBpbnRlbGlnZW5jZTogSW50ZWxpZ2VuY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBdHRyaWJ1dGVQcm9wcywgYXR0cmlidXRlcz86IEF0dHJpYnV0ZXMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGlmICghYXR0cmlidXRlcz8uY29sbGVjdGlvblsnaW50J10pXHJcbiAgICAgIHRocm93IEVycm9yKCdJbnRlbGlnZW5jZSBzaG91bGQgYmUgZGVmaW5lZCBiZWZvcmUgcGVyJyk7XHJcbiAgICB0aGlzLmludGVsaWdlbmNlID0gYXR0cmlidXRlcy5jb2xsZWN0aW9uWydpbnQnXTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnRlbGlnZW5jZS5nZXRWYWx1ZSgpICsgdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdQZXJjZXB0aW9uJyxcclxuICAgICAgY29kZTogJ3BlcicsXHJcbiAgICAgIHJhd1ZhbHVlOiAwLFxyXG4gICAgICBtb2RzOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF0dHJpYnV0ZVByb3BzLCBBdHRyaWJ1dGVzIH0gZnJvbSAnLi4nO1xyXG5pbXBvcnQgeyBIZWFsdGggfSBmcm9tICcuL2hlYWx0aCc7XHJcbmltcG9ydCB7IERleHRlcml0eSB9IGZyb20gJy4vZGV4dGVyaXR5JztcclxuaW1wb3J0IHsgQXR0cmlidXRlIH0gZnJvbSAnLi4vYXR0cmlidXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTcGVlZCBleHRlbmRzIEF0dHJpYnV0ZSB7XHJcbiAgaGVhbHRoOiBIZWFsdGg7XHJcbiAgZGV4dGVyaXR5OiBEZXh0ZXJpdHk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBBdHRyaWJ1dGVQcm9wcywgYXR0cmlidXRlcz86IEF0dHJpYnV0ZXMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIGlmICghYXR0cmlidXRlcz8uY29sbGVjdGlvblsnZGV4J10pXHJcbiAgICAgIHRocm93IEVycm9yKCdEZXggc2hvdWxkIGJlIGRlZmluZWQgYmVmb3JlIHNwZWVkJyk7XHJcbiAgICBpZiAoIWF0dHJpYnV0ZXM/LmNvbGxlY3Rpb25bJ2h0J10pXHJcbiAgICAgIHRocm93IEVycm9yKCdIZWFsdGggc2hvdWxkIGJlIGRlZmluZWQgYmVmb3JlIHNwZWVkJyk7XHJcbiAgICB0aGlzLmhlYWx0aCA9IGF0dHJpYnV0ZXMuY29sbGVjdGlvblsnaHQnXTtcclxuICAgIHRoaXMuZGV4dGVyaXR5ID0gYXR0cmlidXRlcy5jb2xsZWN0aW9uWydkZXgnXTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmhlYWx0aC5nZXRWYWx1ZSgpICogMC4yNSArIHRoaXMuZGV4dGVyaXR5LmdldFZhbHVlKCkgKiAwLjI1ICsgdmFsdWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdTcGVlZCcsXHJcbiAgICAgIGNvZGU6ICdzcGVlZCcsXHJcbiAgICAgIHJhd1ZhbHVlOiAwLFxyXG4gICAgICBtb2RzOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF0dHJpYnV0ZVByb3BzIH0gZnJvbSAnLi4vJztcclxuaW1wb3J0IHsgQXR0cmlidXRlIH0gZnJvbSAnLi4vYXR0cmlidXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJlbmd0aCBleHRlbmRzIEF0dHJpYnV0ZSB7XHJcbiAgc3RhdGljIGdldERlZmF1bHRQcm9wcygpOiBBdHRyaWJ1dGVQcm9wcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnU3RyZW5ndGgnLFxyXG4gICAgICBjb2RlOiAnc3RyJyxcclxuICAgICAgcmF3VmFsdWU6IDEwLFxyXG4gICAgICBtb2RzOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF0dHJpYnV0ZVByb3BzLCBBdHRyaWJ1dGVzIH0gZnJvbSAnLi4nO1xyXG5pbXBvcnQgeyBJbnRlbGlnZW5jZSB9IGZyb20gJy4vaW50ZWxpZ2VuY2UnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdpbGwgZXh0ZW5kcyBBdHRyaWJ1dGUge1xyXG4gIGludGVsaWdlbmNlOiBJbnRlbGlnZW5jZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEF0dHJpYnV0ZVByb3BzLCBhdHRyaWJ1dGVzPzogQXR0cmlidXRlcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgaWYgKCFhdHRyaWJ1dGVzPy5jb2xsZWN0aW9uWydpbnQnXSlcclxuICAgICAgdGhyb3cgRXJyb3IoJ0ludGVsaWdlbmNlIHNob3VsZCBiZSBkZWZpbmVkIGJlZm9yZSB3aWxsJyk7XHJcbiAgICB0aGlzLmludGVsaWdlbmNlID0gYXR0cmlidXRlcy5jb2xsZWN0aW9uWydpbnQnXTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLnJhd1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wcy5tb2RzLmZvckVhY2gobW9kID0+IHtcclxuICAgICAgdmFsdWUgKz0gbW9kLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnRlbGlnZW5jZS5nZXRWYWx1ZSgpICsgdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXdWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmF3VmFsdWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RGVmYXVsdFByb3BzKCk6IEF0dHJpYnV0ZVByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdXaWxsJyxcclxuICAgICAgY29kZTogJ3dpbGwnLFxyXG4gICAgICByYXdWYWx1ZTogMCxcclxuICAgICAgbW9kczogW10sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBhdHRyaWJ1dGVzIH0gZnJvbSAnLi4vaW5kZXgnO1xyXG5pbXBvcnQgeyBpbnZlbnRvcnkgfSBmcm9tICcuLi9pbmRleCc7XHJcbmltcG9ydCB7IGl0ZW0gfSBmcm9tICcuLi9pbmRleCc7XHJcbmltcG9ydCB7IHNraWxscyB9IGZyb20gJy4uL2luZGV4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXIge1xyXG4gIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMuQXR0cmlidXRlcztcclxuICBpbnZlbnRvcnk6IGludmVudG9yeS5JbnZlbnRvcnk7XHJcbiAgc2tpbGxzOiBza2lsbHMuU2tpbGxzO1xyXG4gIG5hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgYXR0cmlidXRlUHJvcHMsXHJcbiAgICBpbnZlbnRvcnlQcm9wcyxcclxuICAgIHNraWxsUHJvcHMsXHJcbiAgICBuYW1lLFxyXG4gIH06IHtcclxuICAgIGF0dHJpYnV0ZVByb3BzPzogYXR0cmlidXRlcy5BdHRyaWJ1dGVQcm9wc1tdO1xyXG4gICAgaW52ZW50b3J5UHJvcHM/OiB7IFtpbmRleDogbnVtYmVyXTogaXRlbS5JdGVtIH07XHJcbiAgICBza2lsbFByb3BzPzogc2tpbGxzLklucHV0U2tpbGxQcm9wc1tdO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gIH0pIHtcclxuICAgIHRoaXMuYXR0cmlidXRlcyA9IG5ldyBhdHRyaWJ1dGVzLkF0dHJpYnV0ZXMoYXR0cmlidXRlUHJvcHMpO1xyXG4gICAgdGhpcy5pbnZlbnRvcnkgPSBuZXcgaW52ZW50b3J5LkludmVudG9yeShpbnZlbnRvcnlQcm9wcyk7XHJcbiAgICB0aGlzLnNraWxscyA9IG5ldyBza2lsbHMuU2tpbGxzKHtcclxuICAgICAgc2tpbGxzOiBza2lsbFByb3BzLFxyXG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmF0dHJpYnV0ZXMsXHJcbiAgICB9KTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXRSYXcoKSB7fVxyXG5cclxuICBpbml0RnJvbVJhdygpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgaXRlbSB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuaW1wb3J0IHsgY2hhcmFjdGVycyB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuXHJcbmV4cG9ydCB0eXBlIHpvbmUgPSB7XHJcbiAgbG9ja2VkOiBib29sZWFuO1xyXG4gIGl0ZW06IGl0ZW0uSXRlbTtcclxuICBwYXJlbnRab25lOiBudW1iZXIgfCBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIERvbGwge1xyXG4gIGNoYXJhY3RlcjogY2hhcmFjdGVycy5DaGFyYWN0ZXI7XHJcbiAgem9uZXM6IHtcclxuICAgIFtpbmRleDogbnVtYmVyXTogem9uZTtcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXI6IGNoYXJhY3RlcnMuQ2hhcmFjdGVyKSB7XHJcbiAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcclxuICAgIHRoaXMuem9uZXMgPSB7fTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUl0ZW0oe1xyXG4gICAgem9uZUluZGV4LFxyXG4gICAgcGVyZm9ybWVyLFxyXG4gIH06IHtcclxuICAgIHpvbmVJbmRleDogbnVtYmVyO1xyXG4gICAgcGVyZm9ybWVyOiBjaGFyYWN0ZXJzLkNoYXJhY3RlcjtcclxuICB9KTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB6b25lID0gdGhpcy56b25lc1t6b25lSW5kZXhdO1xyXG4gICAgaWYgKHpvbmUubG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgaXRlbSA9IHpvbmUuaXRlbTtcclxuICAgIGlmICghaXRlbSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGl0ZW0ucHJvcHMuem9uZXMuZm9yRWFjaCh6b25lID0+IHtcclxuICAgICAgZGVsZXRlIHRoaXMuem9uZXNbem9uZV07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcGVyZm9ybWVyLmludmVudG9yeS5hZGRJdGVtKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJZlBvc3NpYmxlVG9FcXVpcChpdGVtOiBpdGVtLkl0ZW0pIHtcclxuICAgIGxldCB2YWx1ZSA9IHRydWU7XHJcbiAgICBpdGVtLnByb3BzLnpvbmVzLmZvckVhY2goem9uZUluZGV4ID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnpvbmVzW3pvbmVJbmRleF0pIHJldHVybjtcclxuICAgICAgaWYgKHRoaXMuem9uZXNbem9uZUluZGV4XS5sb2NrZWQpIHZhbHVlID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGVxdWlwSXRlbSh7XHJcbiAgICBpdGVtLFxyXG4gICAgcGVyZm9ybWVyLFxyXG4gIH06IHtcclxuICAgIGl0ZW06IGl0ZW0uSXRlbTtcclxuICAgIHBlcmZvcm1lcjogY2hhcmFjdGVycy5DaGFyYWN0ZXI7XHJcbiAgfSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmNoZWNrSWZQb3NzaWJsZVRvRXF1aXAoaXRlbSkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBpdGVtLnByb3BzLnpvbmVzLmZvckVhY2goem9uZUluZGV4ID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmVJdGVtKHsgem9uZUluZGV4LCBwZXJmb3JtZXIgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdGVtLnByb3BzLnpvbmVzLmZvckVhY2goKHpvbmVJbmRleCwgaSkgPT4ge1xyXG4gICAgICB0aGlzLnpvbmVzW3pvbmVJbmRleF0gPSB7XHJcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIHBhcmVudFpvbmU6IGkgPiAwID8gaXRlbS5wcm9wcy56b25lc1swXSA6IG51bGwsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoSXRlbUxvY2soem9uZUluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHpvbmUgPSB0aGlzLnpvbmVzW3pvbmVJbmRleF07XHJcbiAgICBjb25zdCBpdGVtID0gem9uZS5pdGVtO1xyXG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaXRlbS5wcm9wcy56b25lcy5mb3JFYWNoKHpvbmUgPT4ge1xyXG4gICAgICB0aGlzLnpvbmVzW3pvbmVdLmxvY2tlZCA9IHRoaXMuem9uZXNbem9uZV0ubG9ja2VkID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRFcXVpcHBlZEl0ZW1zKCk6IGl0ZW0uSXRlbVtdIHtcclxuICAgIGNvbnN0IGl0ZW1zOiBpdGVtLkl0ZW1bXSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCB6b25lSW5kZXggaW4gdGhpcy56b25lcykge1xyXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy56b25lc1t6b25lSW5kZXhdLml0ZW07XHJcbiAgICAgIGlmICghdGhpcy56b25lc1t6b25lSW5kZXhdLnBhcmVudFpvbmUpIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbXM7XHJcbiAgfVxyXG5cclxuICBnZXRSYXcoKSB7fVxyXG5cclxuICBpbml0RnJvbVJhdygpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgaXRlbSB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gJy4vaXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5IHtcclxuICBpdGVtczogeyBbaW5kZXg6IG51bWJlcl06IGl0ZW0uSXRlbSB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpdGVtcz86IHsgW2luZGV4OiBudW1iZXJdOiBpdGVtLkl0ZW0gfSkge1xyXG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0Rmlyc3RGcmVlU2xvdCgpIHtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBsZXQgZnJlZVNsb3QgPSBmYWxzZTtcclxuICAgIHdoaWxlIChpbmRleCA8IDEwMDAgJiYgIWZyZWVTbG90KSB7XHJcbiAgICAgIGlmICghdGhpcy5pdGVtc1tpbmRleF0pIHtcclxuICAgICAgICBmcmVlU2xvdCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShpdGVtOiBpdGVtLkl0ZW0pOiBib29sZWFuIHtcclxuICAgIHRoaXMuaXRlbXNbdGhpcy5nZXRGaXJzdEZyZWVTbG90KCldID0gaXRlbTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlSXRlbShpbmRleCkge1xyXG4gICAgaWYgKHRoaXMuaXRlbXNbaW5kZXhdKSBkZWxldGUgdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtKGluZGV4OiBudW1iZXIpOiBpdGVtLkl0ZW0ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXNbaW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgbW92ZUl0ZW0oZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlcikge1xyXG4gICAgY29uc3QgdGVtcCA9IHRoaXMuaXRlbXNbdG9JbmRleF07XHJcbiAgICBkZWxldGUgdGhpcy5pdGVtc1t0b0luZGV4XTtcclxuICAgIHRoaXMuaXRlbXNbdG9JbmRleF0gPSB0aGlzLml0ZW1zW2Zyb21JbmRleF07XHJcbiAgICBkZWxldGUgdGhpcy5pdGVtc1tmcm9tSW5kZXhdO1xyXG4gICAgdGhpcy5pdGVtc1tmcm9tSW5kZXhdID0gdGVtcDtcclxuICB9XHJcblxyXG4gIGdldEl0ZW1zQXNBcnJheSgpOiBpdGVtLkl0ZW1bXSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLml0ZW1zKTtcclxuICB9XHJcblxyXG4gIGdldFJhdygpIHt9XHJcblxyXG4gIGluaXRGcm9tUmF3KCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBUYWdTeXN0ZW0gfSBmcm9tICcuLi8uLi8nO1xyXG5pbXBvcnQgdHlwZSB7IENUWCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzLyc7XHJcblxyXG5leHBvcnQgY29uc3QgaXRlbVpvbmVzID0gW1xyXG4gIHsgem9uZXM6IDEsIGtleTogJ25lY2snIH0sXHJcbiAgeyB6b25lczogMiwga2V5OiAnbGVmdCBoYW5kJyB9LFxyXG4gIHsgem9uZXM6IDMsIGtleTogJ3JpZ2h0IGhhbmQnIH0sXHJcbl07XHJcblxyXG5leHBvcnQgdHlwZSBJdGVtUHJvcHMgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgaW1nOiBzdHJpbmc7XHJcbiAgd2VpZ2h0OiBudW1iZXI7XHJcblxyXG4gIHpvbmVzOiBudW1iZXJbXTtcclxuICB0YWdzOiBUYWdTeXN0ZW07XHJcblxyXG4gIGNvc3Q6IG51bWJlcjtcclxuICBtb2RzOiBhbnk7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbSB7XHJcbiAgcHJvcHM6IEl0ZW1Qcm9wcztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHM6IEl0ZW1Qcm9wcykge1xyXG4gICAgY29uc3QgdGFncyA9IHByb3BzLnRhZ3MgYXMgYW55IGFzIHN0cmluZztcclxuICAgIGNvbnN0IHRhZ1N5c3RlbSA9IG5ldyBUYWdTeXN0ZW0odGFncyk7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICB0aGlzLnByb3BzLnRhZ3MgPSB0YWdTeXN0ZW07XHJcbiAgfVxyXG5cclxuICBnZXRSYXcoKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaW5pdEZyb21SYXcocmF3OiBzdHJpbmcpOiBJdGVtIHtcclxuICAgIGNvbnN0IHByb3BzID0gSlNPTi5wYXJzZShyYXcpO1xyXG4gICAgcmV0dXJuIG5ldyBJdGVtKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBpbml0QnlOYW1lKFxyXG4gICAgZGF0YVNvdXJjZTogQ1RYWydkYXRhU291cmNlJ10sXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICApOiBQcm9taXNlPEl0ZW0+IHtcclxuICAgIGNvbnN0IHsgZGF0YWxvYWRlcnMgfSA9IGRhdGFTb3VyY2U7XHJcbiAgICBjb25zdCBpdGVtRGF0YSA9IGF3YWl0IGRhdGFsb2FkZXJzLmdldEl0ZW0obmFtZSk7XHJcbiAgICByZXR1cm4gbmV3IEl0ZW0oaXRlbURhdGEpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBhdHRyaWJ1dGVzLCBhdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9pbmRleCc7XHJcbmltcG9ydCB7IFNraWxsIH0gZnJvbSAnLi9za2lsbCc7XHJcblxyXG5leHBvcnQgdHlwZSBTa2lsbElucHV0UHJvcHMgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29kZTogc3RyaW5nO1xyXG4gIHBhcmVudEF0dHJDb2RlOiBzdHJpbmc7XHJcbiAgZGlmZmljdWx0eTogJ2Vhc3knIHwgJ21lZGl1bScgfCAnaGFyZCcgfCAndmVyeSBoYXJkJztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFNraWxsUHJvcHMgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgY29kZTogc3RyaW5nO1xyXG4gIGV4cDogbnVtYmVyO1xyXG4gIHBhcmVudEF0dHI6IGF0dHJpYnV0ZS5BdHRyaWJ1dGU7XHJcbiAgcGFyZW50QXR0ckNvZGU6IHN0cmluZztcclxuICBkaWZmaWN1bHR5OiAnZWFzeScgfCAnbWVkaXVtJyB8ICdoYXJkJyB8ICd2ZXJ5IGhhcmQnO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgSW5wdXRTa2lsbHNQcm9wcyA9IHtcclxuICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLkF0dHJpYnV0ZXM7XHJcbiAgc2tpbGxzPzogSW5wdXRTa2lsbFByb3BzW107XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJbnB1dFNraWxsUHJvcHMgPSB7XHJcbiAgc2tpbGxQcm9wczogU2tpbGxJbnB1dFByb3BzO1xyXG4gIGV4cD86IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIENoZWNrUmVzdWx0cyA9IHtcclxuICByYW5kOiBudW1iZXI7XHJcbiAgdmFsdWU6IG51bWJlcjtcclxuICByZXN1bHQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxzIHtcclxuICBjb2xsZWN0aW9uOiB7IFtpbmRleDogc3RyaW5nXTogU2tpbGwgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXQ/OiBJbnB1dFNraWxsc1Byb3BzKSB7XHJcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSB7fTtcclxuICAgIGlmIChpbnB1dCkgdGhpcy5hZGRTa2lsbHMoaW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2soa2V5OiBzdHJpbmcsIGRpZmZpY3VsdHk6IG51bWJlcik6IENoZWNrUmVzdWx0cyB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uW2tleV0uY2hlY2soZGlmZmljdWx0eSk7XHJcbiAgfVxyXG5cclxuICBhZGRTa2lsbCh7XHJcbiAgICBza2lsbElucHV0UHJvcHMsXHJcbiAgICBhdHRyaWJ1dGVzLFxyXG4gICAgZXhwLFxyXG4gIH06IHtcclxuICAgIHNraWxsSW5wdXRQcm9wczogSW5wdXRTa2lsbFByb3BzO1xyXG4gICAgYXR0cmlidXRlczogYXR0cmlidXRlcy5BdHRyaWJ1dGVzO1xyXG4gICAgZXhwPzogbnVtYmVyO1xyXG4gIH0pIHtcclxuICAgIGxldCBwYXJlbnRBdHRyOiBhdHRyaWJ1dGUuQXR0cmlidXRlID1cclxuICAgICAgYXR0cmlidXRlcy5jb2xsZWN0aW9uW3NraWxsSW5wdXRQcm9wcy5za2lsbFByb3BzLnBhcmVudEF0dHJDb2RlXTtcclxuICAgIGNvbnN0IHNraWxsUHJvcHMgPSB7XHJcbiAgICAgIC4uLnNraWxsSW5wdXRQcm9wcy5za2lsbFByb3BzLFxyXG4gICAgICBwYXJlbnRBdHRyLFxyXG4gICAgICAuLi4oZXhwID8geyBleHAgfSA6IHsgZXhwOiAwIH0pLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKHNraWxsUHJvcHMpO1xyXG4gICAgdGhpcy5jb2xsZWN0aW9uW3NraWxsLnByb3BzLmNvZGVdID0gc2tpbGw7XHJcbiAgfVxyXG5cclxuICBhZGRTa2lsbHMoeyBhdHRyaWJ1dGVzLCBza2lsbHMgfTogSW5wdXRTa2lsbHNQcm9wcykge1xyXG4gICAgaWYgKCFza2lsbHMpIHJldHVybjtcclxuICAgIGZvciAoY29uc3Qgc2tpbGwgb2Ygc2tpbGxzKSB7XHJcbiAgICAgIHRoaXMuYWRkU2tpbGwoeyBza2lsbElucHV0UHJvcHM6IHNraWxsLCBleHA6IHNraWxsLmV4cCwgYXR0cmlidXRlcyB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2tpbGxQcm9wcywgU2tpbGxJbnB1dFByb3BzLCBDaGVja1Jlc3VsdHMgfSBmcm9tICcuLyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGwge1xyXG4gIHByb3BzOiBTa2lsbFByb3BzO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wczogU2tpbGxQcm9wcykge1xyXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xyXG4gIH1cclxuXHJcbiAgY2hlY2soZGlmZmljdWx0eTogbnVtYmVyKTogQ2hlY2tSZXN1bHRzIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRFZmZlY3RpdmVWYWx1ZSgpO1xyXG4gICAgY29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCkgKiA1ICsgTWF0aC5yYW5kb20oKSAqIDUgKyBNYXRoLnJhbmRvbSgpICogNSArIDM7XHJcbiAgICBjb25zdCByZXN1bHQgPSByYW5kIDw9IHZhbHVlIC0gZGlmZmljdWx0eTtcclxuICAgIHJldHVybiB7IHJhbmQsIHZhbHVlLCByZXN1bHQgfTtcclxuICB9XHJcblxyXG4gIGdldEVmZmVjdGl2ZVZhbHVlKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBleHBNb2QgPSB0aGlzLmNhbGN1bGF0ZUV4cE1vZCgpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMucGFyZW50QXR0ci5nZXRWYWx1ZSgpICsgZXhwTW9kIC0gdGhpcy5kaWZmTW9kKCkudmFsdWU7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVFeHBNb2QoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGV4cCA9IHRoaXMucHJvcHMuZXhwO1xyXG4gICAgaWYgKGV4cCA8PSAwKSByZXR1cm4gLTQ7XHJcbiAgICBpZiAoZXhwID49IDEgJiYgZXhwIDwgMikgcmV0dXJuIDA7XHJcbiAgICBpZiAoZXhwID49IDIgJiYgZXhwIDwgMykgcmV0dXJuIDE7XHJcbiAgICBpZiAoZXhwID49IDMgJiYgZXhwIDwgNCkgcmV0dXJuIDEuNTtcclxuICAgIHJldHVybiAzICsgKGV4cCAtIDQpIC8gNDtcclxuICB9XHJcblxyXG4gIGRpZmZNb2QoKTogeyBkaWZmaWN1bHR5OiBzdHJpbmc7IHZhbHVlOiBudW1iZXIgfSB7XHJcbiAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLmRpZmZpY3VsdHkpIHtcclxuICAgICAgY2FzZSAnZWFzeSc6XHJcbiAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnbWVkaXVtJzpcclxuICAgICAgICB2YWx1ZSA9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdoYXJkJzpcclxuICAgICAgICB2YWx1ZSA9IDI7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICd2ZXJ5IGhhcmQnOlxyXG4gICAgICAgIHZhbHVlID0gMztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB7IGRpZmZpY3VsdHk6IHRoaXMucHJvcHMuZGlmZmljdWx0eSwgdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREZWZhdWx0UHJvcHMoKTogU2tpbGxJbnB1dFByb3BzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdEZWZhdWx0JyxcclxuICAgICAgZGVzY3JpcHRpb246ICdEZWZhdWx0JyxcclxuICAgICAgY29kZTogJ2RlZicsXHJcbiAgICAgIHBhcmVudEF0dHJDb2RlOiAnZGV4JyxcclxuICAgICAgZGlmZmljdWx0eTogJ2Vhc3knLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFJhdygpIHt9XHJcblxyXG4gIGluaXRGcm9tUmF3KCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBtb2RlbENsYXNzZXMgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmltcG9ydCB0eXBlIHsgRGVmYXVsdE1vZGVsIH0gZnJvbSAnLi9tb2RlbCc7XHJcbmltcG9ydCB0eXBlIHsgZGF0YVNvdXJjZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xyXG4gIGRhdGFzb3VyY2VzPzogZGF0YVNvdXJjZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLmJ1aWxkRnJvbVJhd0RhdGEoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBidWlsZEZyb21SYXdEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgIHRoaXMuZGF0YXNvdXJjZXMgPSB7IGRhdGEgfTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGFzb3VyY2VzOiBkYXRhU291cmNlID0ge1xyXG4gICAgICBkYXRhOiB7IG5vZGVzOiBbXSwgYWN0aW9uczogW10sIGluZm86IFtdLCBldmVudHM6IFtdIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbW9kZWxWYXJpYW50cyA9IFsnbm9kZXMnLCAnaW5mbycsICdhY3Rpb25zJywgJ2V2ZW50cyddO1xyXG5cclxuICAgIGZvciAoY29uc3QgdmFyaWFudCBvZiBtb2RlbFZhcmlhbnRzKSB7XHJcbiAgICAgIGNvbnN0IG1vZGVsczogRGVmYXVsdE1vZGVsW10gPSBbXTtcclxuICAgICAgZm9yIChjb25zdCBtb2RlbERhdGFLZXkgaW4gZGF0YVt2YXJpYW50XSkge1xyXG4gICAgICAgIGNvbnN0IG1vZGVsRGF0YSA9IHtcclxuICAgICAgICAgIC4uLmRhdGFbdmFyaWFudF1bbW9kZWxEYXRhS2V5XSxcclxuICAgICAgICAgIGlkOiBtb2RlbERhdGFLZXksXHJcbiAgICAgICAgICB0eXBlOiB2YXJpYW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgbm9kZU1vZGVsOiBEZWZhdWx0TW9kZWwgPSBuZXcgbW9kZWxDbGFzc2VzW3ZhcmlhbnRdKG1vZGVsRGF0YSk7XHJcbiAgICAgICAgbW9kZWxzLnB1c2gobm9kZU1vZGVsKTtcclxuICAgICAgfVxyXG4gICAgICBkYXRhc291cmNlcy5kYXRhW3ZhcmlhbnRdID0gWy4uLm1vZGVsc107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kYXRhc291cmNlcyA9IGRhdGFzb3VyY2VzO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9kZWwgPSAoe1xyXG4gICAgdHlwZSxcclxuICAgIGlkLFxyXG4gIH06IHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgfSk6IERlZmF1bHRNb2RlbCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFzb3VyY2VzPy5kYXRhKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB0aGlzLmRhdGFzb3VyY2VzLmRhdGFbdHlwZV0uZmluZChtb2RlbCA9PiB7XHJcbiAgICAgIHJldHVybiBtb2RlbC5pZCA9PT0gaWQ7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBzZXRNb2RlbCA9ICh7XHJcbiAgICB0eXBlLFxyXG4gICAgaWQsXHJcbiAgICBkYXRhLFxyXG4gIH06IHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgfSk6IERlZmF1bHRNb2RlbCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmRhdGFzb3VyY2VzPy5kYXRhKSByZXR1cm4gbnVsbDtcclxuICAgIC8qY29uc3Qgbm9kZSA9IHRoaXMuZGF0YXNvdXJjZXMuZGF0YVt0eXBlXS5maW5kKG1vZGVsID0+IHtcclxuICAgICAgcmV0dXJuIG1vZGVsLmlkID09PSBpZDtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kZWxEYXRhID0ge1xyXG4gICAgICAuLi5kYXRhLFxyXG4gICAgICBpZCxcclxuICAgICAgdHlwZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBub2RlTW9kZWw6IERlZmF1bHRNb2RlbCA9IG5ldyBtb2RlbENsYXNzZXNbdHlwZV0obW9kZWxEYXRhKTsqL1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBnZXRUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfTtcclxuXHJcbiAgc2V0VGV4dCA9ICh0ZXh0OiBzdHJpbmcpOiB2b2lkID0+IHt9O1xyXG4gIGdldFJhdyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZU1vZGVsLCBJbmZvTW9kZWwsIEFjdGlvbk1vZGVsIH0gZnJvbSAnLi4vJztcclxuXHJcbmV4cG9ydCB0eXBlIGRhdGFTb3VyY2UgPSB7XHJcbiAgZGF0YToge1xyXG4gICAgbm9kZXM6IE5vZGVNb2RlbFtdO1xyXG4gICAgYWN0aW9uczogQWN0aW9uTW9kZWxbXTtcclxuICAgIGluZm86IEluZm9Nb2RlbFtdO1xyXG4gICAgZXZlbnRzOiBOb2RlTW9kZWxbXTtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGVsQ2xhc3NlcyA9IHtcclxuICBub2RlczogTm9kZU1vZGVsLFxyXG4gIGluZm86IEluZm9Nb2RlbCxcclxuICBhY3Rpb25zOiBBY3Rpb25Nb2RlbCxcclxuICBldmVudHM6IE5vZGVNb2RlbCxcclxufTtcclxuIiwiaW1wb3J0IHsgY2FsbEFQSUVuZHBvaW50IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFsb2FkZXJzKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBnZXRJdGVtOiBhc3luYyAobmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBjYWxsQVBJRW5kcG9pbnQoeyBlbmRwb2ludDogJ2dldEl0ZW0nLCBkYXRhOiB7IGl0ZW1OYW1lOiBuYW1lIH0gfSk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEVtcHR5IHtcclxuICAgIFxyXG59IiwiaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NoYXJhY3RlcnMnO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NoYXJhY3RlcnMvaW52ZW50b3J5L2l0ZW0nO1xyXG5pbXBvcnQgdHlwZSB7IENUWCB9IGZyb20gJy4uLy4uL3R5cGVzLyc7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZURhdGEge1xyXG4gIHBsYXllckNoYXJhY3RlcjogQ2hhcmFjdGVyO1xyXG4gIGRhdGFTb3VyY2U6IENUWFsnZGF0YVNvdXJjZSddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhU291cmNlOiBDVFhbJ2RhdGFTb3VyY2UnXSkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcclxuICAgIHRoaXMucGxheWVyQ2hhcmFjdGVyID0gbmV3IENoYXJhY3Rlcih7XHJcbiAgICAgIG5hbWU6ICdUZXN0IE5hbWUnLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQbGF5ZXJDaGFyYWN0ZXIoKTogQ2hhcmFjdGVyIHtcclxuICAgIHJldHVybiB0aGlzLnBsYXllckNoYXJhY3RlcjtcclxuICB9XHJcblxyXG4gIGFzeW5jIGluaXRpYWxMb2FkaW5nKCkge1xyXG4gICAgY29uc3QgaXRlbSA9IGF3YWl0IEl0ZW0uaW5pdEJ5TmFtZSh0aGlzLmRhdGFTb3VyY2UsICdwYWRkZWRfbWl0dGVucycpO1xyXG4gICAgYXdhaXQgdGhpcy5wbGF5ZXJDaGFyYWN0ZXIuaW52ZW50b3J5LmFkZEl0ZW0oaXRlbSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgKiBhcyBxdWVzdCBmcm9tICcuL3F1ZXN0JztcclxuaW1wb3J0IHsgRGVmYXVsdE1vZGVsIH0gZnJvbSAnLi9jb250ZXh0L21vZGVsJztcclxuaW1wb3J0IHsgTm9kZU1vZGVsIH0gZnJvbSAnLi9ub2RlJztcclxuaW1wb3J0IHsgSW5mb01vZGVsIH0gZnJvbSAnLi9ub2RlL2luZm8nO1xyXG5pbXBvcnQgeyBBY3Rpb25Nb2RlbCB9IGZyb20gJy4vbm9kZS9hY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xyXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcclxuaW1wb3J0IHsgR2FtZURhdGEgfSBmcm9tICcuL2dhbWVEYXRhJztcclxuaW1wb3J0IHsgVGFnU3lzdGVtIH0gZnJvbSAnLi90YWcnO1xyXG5pbXBvcnQgeyBnZXREYXRhbG9hZGVycyB9IGZyb20gJy4vZGF0YWxvYWRlcnMnO1xyXG5pbXBvcnQgKiBhcyBjaGFyYWN0ZXJzIGZyb20gJy4vY2hhcmFjdGVycyc7XHJcbmltcG9ydCAqIGFzIGF0dHJpYnV0ZXMgZnJvbSAnLi9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgKiBhcyBhdHRyaWJ1dGUgZnJvbSAnLi9jaGFyYWN0ZXJzL2F0dHJpYnV0ZXMvYXR0cmlidXRlJztcclxuaW1wb3J0ICogYXMgc2tpbGxzIGZyb20gJy4vY2hhcmFjdGVycy9za2lsbHMnO1xyXG5pbXBvcnQgKiBhcyBza2lsbCBmcm9tICcuL2NoYXJhY3RlcnMvc2tpbGxzL3NraWxsJztcclxuaW1wb3J0ICogYXMgaW52ZW50b3J5IGZyb20gJy4vY2hhcmFjdGVycy9pbnZlbnRvcnknO1xyXG5pbXBvcnQgKiBhcyBkb2xsIGZyb20gJy4vY2hhcmFjdGVycy9pbnZlbnRvcnkvZG9sbCc7XHJcbmltcG9ydCAqIGFzIGl0ZW0gZnJvbSAnLi9jaGFyYWN0ZXJzL2ludmVudG9yeS9pdGVtJztcclxuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xyXG5cclxuZXhwb3J0IHtcclxuICBzY2VuZSxcclxuICBxdWVzdCxcclxuICBEZWZhdWx0TW9kZWwsXHJcbiAgTm9kZU1vZGVsLFxyXG4gIEluZm9Nb2RlbCxcclxuICBBY3Rpb25Nb2RlbCxcclxuICBpbnZlbnRvcnksXHJcbiAgZXZlbnRzLFxyXG4gIENvbnRleHQsXHJcbiAgY2hhcmFjdGVycyxcclxuICBkb2xsLFxyXG4gIGl0ZW0sXHJcbiAgYXR0cmlidXRlcyxcclxuICBhdHRyaWJ1dGUsXHJcbiAgc2tpbGwsXHJcbiAgc2tpbGxzLFxyXG4gIGFjdGlvbnMsXHJcbiAgR2FtZURhdGEsXHJcbiAgVGFnU3lzdGVtLFxyXG4gIGdldERhdGFsb2FkZXJzLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi8nO1xyXG5cclxudHlwZSBBY3Rpb24gPSB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uTW9kZWwgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICB0ZXh0Pzogc3RyaW5nO1xyXG4gIGFjdGlvbj86IEFjdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgc3VwZXIoeyBpZDogZGF0YS5pZCB9KTtcclxuICAgIHRoaXMudGV4dCA9IGRhdGEudGV4dDtcclxuICAgIHRoaXMuYWN0aW9uID0geyB0eXBlOiBkYXRhLmFjdGlvblR5cGUsIHZhbHVlOiBkYXRhLmFjdGlvblZhbHVlIH07XHJcbiAgICB0aGlzLnR5cGUgPSAnYWN0aW9ucyc7XHJcbiAgfVxyXG5cclxuICBzZXRUZXh0ID0gKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIGdldFRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiB0aGlzLnRleHQgfHwgJyc7XHJcbiAgfTtcclxuXHJcbiAgZ2V0QWN0aW9uID0gKCk6IEFjdGlvbiB8IG51bGwgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uIHx8IG51bGw7XHJcbiAgfTtcclxuXHJcbiAgc2F2ZSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRGVmYXVsdE1vZGVsIH0gZnJvbSAnLi4vJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlTW9kZWwgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICBzdXBlcih7IGlkOiBkYXRhLmlkIH0pO1xyXG4gICAgdGhpcy50ZXh0ID0gZGF0YS50ZXh0O1xyXG4gICAgdGhpcy50eXBlID0gJ25vZGVzJztcclxuICB9XHJcblxyXG4gIHNldFRleHQgPSAodGV4dDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgZ2V0VGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dCB8fCAnJztcclxuICB9O1xyXG5cclxuICBzYXZlID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UmF3ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi8nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZm9Nb2RlbCBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIGltYWdlPzogc3RyaW5nO1xyXG4gIHR5cGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgc3VwZXIoeyBpZDogZGF0YS5pZCB9KTtcclxuICAgIHRoaXMudGV4dCA9IGRhdGEudGV4dDtcclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5pbWFnZSA9IGRhdGEuaW1hZ2U7XHJcbiAgICB0aGlzLnR5cGUgPSAnaW5mbyc7XHJcbiAgfVxyXG5cclxuICBzZXRUZXh0ID0gKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIGdldFRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiB0aGlzLnRleHQgfHwgJyc7XHJcbiAgfTtcclxuXHJcbiAgZ2V0RGVzY3JpcHRpb24gPSAoKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uIHx8ICcnO1xyXG4gIH07XHJcblxyXG4gIGdldE5hbWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyc7XHJcbiAgfTtcclxuXHJcbiAgc2F2ZSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEVtcHR5IHtcclxuICAgIFxyXG59IiwiZXhwb3J0IGNsYXNzIEVtcHR5IHtcclxuICAgIFxyXG59IiwiZXhwb3J0IGNsYXNzIFRhZ1N5c3RlbSB7XHJcbiAgcmVxdWlyZWQ6IHRhZ05vZGU7XHJcbiAgaW5oZXJpdGVkOiB0YWdOb2RlO1xyXG4gIGFwcGxpZWQ6IHRhZ05vZGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVxdWlyZWQgPSB7fTtcclxuICAgIHRoaXMuaW5oZXJpdGVkID0ge307XHJcbiAgICB0aGlzLmFwcGxpZWQgPSB7fTtcclxuICB9XHJcbn1cclxuXHJcbnR5cGUgdGFnTm9kZSA9IHsgW2luZGV4OiBzdHJpbmddOiB0YWdOb2RlIHwgc3RyaW5nIH07XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYWxsQVBJRW5kcG9pbnQoe1xyXG4gIGVuZHBvaW50LFxyXG4gIGRhdGEsXHJcbn06IHtcclxuICBlbmRwb2ludDogc3RyaW5nO1xyXG4gIGRhdGE6IGFueTtcclxufSk6IFByb21pc2U8YW55PiB7XHJcbiAgcmV0dXJuIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2VuZHBvaW50Jywge1xyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbmRwb2ludCwgZGF0YSB9KSxcclxuICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgIH0pLFxyXG4gIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gIH0pO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0ICB7XCJzcmNcIjpcIi9fbmV4dC9zdGF0aWMvaW1hZ2UvQXNzZXRzL2RvbGwuZWY0MWIyYzI1NzhmM2MwZDk0OWZmZDNlMzA0YjFmYzIucG5nXCIsXCJoZWlnaHRcIjo1MDksXCJ3aWR0aFwiOjIxMSxcImJsdXJEYXRhVVJMXCI6XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFNQUFBQUlDQVFBQUFDVzVvMzNBQUFBUTBsRVFWUjQybU40enZ1NjlnRUR3eTNWQjVzdTJERGNESHY2NHBvOXc3WDJSMWVPOHpNODFucTY3eXdQdzBPeGV6TXZjek84RUw3ZXYxbVE0UlRIS2N2WERBQXFEaHVPNnFEcjZnQUFBQUJKUlU1RXJrSmdnZz09XCJ9OyIsIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkhvbWVfY29udGFpbmVyX18xRWNzVVwiLFxuXHRcInNldHRpbmdzXCI6IFwiSG9tZV9zZXR0aW5nc19fMmE5XzlcIixcblx0XCJjb250ZW50XCI6IFwiSG9tZV9jb250ZW50X18yZnFPelwiLFxuXHRcInBsYXllckNvbnRhaW5lclwiOiBcIkhvbWVfcGxheWVyQ29udGFpbmVyX18xcHZBZlwiLFxuXHRcInRleHRDb250YWluZXJcIjogXCJIb21lX3RleHRDb250YWluZXJfXzN4SVJZXCIsXG5cdFwidmlld0NvbnRhaW5lclwiOiBcIkhvbWVfdmlld0NvbnRhaW5lcl9fMjlnSjhcIixcblx0XCJpbnRlcmFjdGlvbnNcIjogXCJIb21lX2ludGVyYWN0aW9uc19fZlAtZC1cIixcblx0XCJjb25kaXRpb25cIjogXCJIb21lX2NvbmRpdGlvbl9fMnk3cWFcIixcblx0XCJvYmplY3RcIjogXCJIb21lX29iamVjdF9fMXM3NjJcIixcblx0XCJpbmZvcm1hdGlvblwiOiBcIkhvbWVfaW5mb3JtYXRpb25fXzNPOFFnXCIsXG5cdFwiaW50ZXJhY3Rpb25cIjogXCJIb21lX2ludGVyYWN0aW9uX18yY1AtdFwiLFxuXHRcInRleHROb2RlQ29udGFpbmVyXCI6IFwiSG9tZV90ZXh0Tm9kZUNvbnRhaW5lcl9fMUcxZTVcIixcblx0XCJ0ZXh0Tm9kZVwiOiBcIkhvbWVfdGV4dE5vZGVfXzFKWDByXCIsXG5cdFwiYWN0aW9uXCI6IFwiSG9tZV9hY3Rpb25fXzNCMTZtXCIsXG5cdFwiaW5mb1wiOiBcIkhvbWVfaW5mb19fMzM3RjJcIixcblx0XCJpbmZvRHJvcGRvd25IZWFkZXJcIjogXCJIb21lX2luZm9Ecm9wZG93bkhlYWRlcl9fMjBwVFBcIixcblx0XCJpbmZvRHJvcGRvd25cIjogXCJIb21lX2luZm9Ecm9wZG93bl9fMlE0VDVcIixcblx0XCJkcm9wZG93blwiOiBcIkhvbWVfZHJvcGRvd25fXzFiSXhUXCIsXG5cdFwiaW5mb0Ryb3Bkb3duUG9pbnRlclwiOiBcIkhvbWVfaW5mb0Ryb3Bkb3duUG9pbnRlcl9fMW9QQ0dcIixcblx0XCJkcm9wZG93blBvaW50ZXJcIjogXCJIb21lX2Ryb3Bkb3duUG9pbnRlcl9fMTUyUEVcIixcblx0XCJlZGl0UGFuZWxcIjogXCJIb21lX2VkaXRQYW5lbF9fMWtaWGpcIixcblx0XCJlZGl0QXJlYVwiOiBcIkhvbWVfZWRpdEFyZWFfX3ZMZmNQXCJcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvaW1hZ2UnKVxuIiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2U7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9oZWFkLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3RvLWJhc2UtNjQuanNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzd3JcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=