function classify() {
  let names = Object.getOwnPropertyNames(window).filter(n => n !== 'classify');

  const ECMA = 'ECMA';
  const WhatWg = 'WhatWg';
  const W3C = 'W3C';
  const WICG = 'WICG';
  const WebGL = 'WebGL';
  const Private = 'Private';

  let collections = {
    ECMA: 0,
    WhatWg: 0,
    WICG: 0,
    W3C: 0,
    WebGL: 0,
    Private: 0,
  };

  const filterOut = (names, props, standard) => {
    if (standard) {
    } else {
      console.log(props);
    }
    const set = new Set();
    props.forEach(p => set.add(p));
    collections[standard] += props.length;
    return names.filter(n => !set.has(n));
  };

  // **************************************************************  ECMA Javascript ********************************************************************************

  /**
   * 58
   * ECMA 262 Reference from below
   * https://tc39.es/ecma262/#sec-global-object
   * https://tc39.es/ecma262/#sec-additional-properties-of-the-global-object
   * */

  const ECMA262 = [
    'escape',
    'unescape',
    'globalThis',
    'undefined',
    'Infinity',
    'NaN',
    'eval',
    'parseInt',
    'parseFloat',
    'isNaN',
    'isFinite',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Object',
    'Function',
    'Array',
    'ArrayBuffer',
    'BigInt',
    'BigInt64Array',
    'BigUint64Array',
    'String',
    'Boolean',
    'Number',
    'DataView',
    'Date',
    'RegExp',
    'Error',
    'EvalError',
    'FinalizationRegistry',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Map',
    'Promise',
    'Proxy',
    'Set',
    'RangeError',
    'SharedArrayBuffer',
    'Symbol',
    'ReferenceError',
    'SyntaxError',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'URIError',
    'TypeError',
    'WeakMap',
    'WeakRef',
    'WeakSet',
    'Atomics',
    'Reflect',
    'Math',
    'JSON',
  ];
  const ESNEXT = ['AggregateError'];
  names = filterOut(names, ECMA262, ECMA);
  names = filterOut(names, ESNEXT, ECMA);

  /**
   * ECMA International
   * https://ecma-international.org/ecma-402/
   */
  names = filterOut(names, ['Intl'], ECMA);

  /************************************************************** whatwg ******************************************************************************** /
   *
   **************************************************************  DOM API  ********************************************************************************
   * whatwg
   * https://dom.spec.whatwg.org/
   */

  /**
   * DOM NODEs
   * https://dom.spec.whatwg.org/#nodes
   *
   *
   * DOM Node
   * https://dom.spec.whatwg.org/#interface-node
   */
  /**
   * HTML filter from all inheritance from Node
   */
  const DOM_NodeAPI = [];
  for (const name of names) {
    try {
      if (window[name].prototype instanceof Node) {
        DOM_NodeAPI.push(name);
      }
    } catch (e) {}
  }
  names = filterOut(names, DOM_NodeAPI, WhatWg);
  names = filterOut(
    names,
    [
      'Node',
      'NodeList',
      'RadioNodeList',
      'HTMLAllCollection',
      'HTMLCollection',
      'HTMLOptionsCollection',
      'HTMLFormControlsCollection',
    ],
    WhatWg
  );
  /**
   * Document
   * https://dom.spec.whatwg.org/#interface-document
   */
  names = filterOut(names, ['DOMImplementation', 'NamedNodeMap'], WhatWg);
  /**
   * DOM Events
   * https://dom.spec.whatwg.org/#events
   */
  names = filterOut(names, ['Event', 'EventTarget', 'CustomEvent'], WhatWg);
  names = filterOut(
    names,
    [
      'PopStateEvent',
      'PointerEvent',
      'UIEvent',
      'TextEvent',
      'WheelEvent',
      'BeforeInstallPromptEvent',
      'PageTransitionEvent',
      'FocusEvent',
      'MouseEvent',
      'HashChangeEvent',
      'ErrorEvent',
      'DragEvent',
      'CompositionEvent',
      'BeforeUnloadEvent',
      'ClipboardEvent',
      'SecurityPolicyViolationEvent',
      'KeyboardEvent',
      'InputEvent',
    ],
    WhatWg
  );
  /**
   * Aborting
   * https://dom.spec.whatwg.org/#aborting-ongoing-activities
   */
  names = filterOut(names, ['AbortController', 'AbortSignal'], WhatWg);
  /**
   * mutation
   * https://dom.spec.whatwg.org/#mutation-observers
   */
  names = filterOut(names, ['MutationObserver', 'MutationRecord'], WhatWg);
  /**
   * XPath
   * https://dom.spec.whatwg.org/#xpath
   */
  names = filterOut(
    names,
    ['XPathResult', 'XPathExpression', 'XPathEvaluator'],
    WhatWg
  );
  /**
   * Range
   * https://dom.spec.whatwg.org/#ranges
   */
  names = filterOut(
    names,
    ['Range', 'StaticRange', 'Selection', 'getSelection'],
    WhatWg
  );
  /**
   * DOMTokenList
   * https://dom.spec.whatwg.org/#interface-domtokenlist
   */
  names = filterOut(names, ['DOMTokenList'], WhatWg);
  /**
   * URL
   * https://url.spec.whatwg.org/
   */
  names = filterOut(names, ['URL', 'URLSearchParams'], WhatWg);
  /**
   * Traversal
   * https://dom.spec.whatwg.org/#traversal
   */
  names = filterOut(
    names,
    ['NodeIterator', 'TreeWalker', 'NodeFilter'],
    WhatWg
  );

  // 废弃， DOMStringMap 查不到
  names = filterOut(
    names,
    [
      'DOMStringList',
      'DOMStringMap',
      'DOMError',
      'MutationEvent',
      'captureEvents',
      'releaseEvents',
      'external',
      'External',
    ],
    WhatWg
  );

  /************************************************************** HTML API ******************************************************************************** /
    
    /**
     * 40
     * webapi
     * https://html.spec.whatwg.org/multipage/#toc-webappapis
     */
  names = filterOut(
    names,
    [
      'atob',
      'btoa',
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      'Plugin',
      'PluginArray',
      'MimeType',
      'MimeTypeArray',
      'Image',
      'Blob',
      'Animation',
      'AnimationEffect',
      'AnimationEvent',
      'AnimationPlaybackEvent',
      'AnimationTimeline',
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'MessageEvent',
      'MessagePort',
      'MessageChannel',
      'EventSource',
      'CloseEvent',
      'BroadcastChannel',
      'PromiseRejectionEvent',
    ],
    WhatWg
  );
  /**
   * Canvas
   * https://html.spec.whatwg.org/multipage/canvas.html
   */
  names = filterOut(
    names,
    [
      'CanvasRenderingContext2D',
      'OffscreenCanvasRenderingContext2D',
      'Path2D',
      'ImageBitmap',
      'ImageData',
      'TextMetrics',
      'CanvasGradient',
      'CanvasPattern',
      'OffscreenCanvas',
      'ImageBitmapRenderingContext',
      'createImageBitmap',
    ],
    WhatWg
  );

  /**
   * Worker
   * https://html.spec.whatwg.org/multipage/workers.html
   * https://w3c.github.io/ServiceWorker/
   * https://drafts.css-houdini.org/worklets/
   */
  names = filterOut(
    names,
    [
      'Worker',
      'SharedWorker',
      'ServiceWorker',
      'ServiceWorkerContainer',
      'Cache',
      'caches',
      'CacheStorage',
      'Worklet',
      'NavigationPreloadManager',
    ],
    WhatWg
  );

  /**
   * window object
   * https://html.spec.whatwg.org/multipage/window-object.html#window
   */
  names = filterOut(
    names,
    [
      'window',
      'self',
      'document',
      'name',
      'location',
      'history',
      'event',
      'customElements',
      'locationbar',
      'menubar',
      'personalbar',
      'scrollbars',
      'statusbar',
      'toolbar',
      'status',
      'close',
      'closed',
      'stop',
      'focus',
      'blur',
      'frames',
      'length',
      'top',
      'opener',
      'parent',
      'frameElement',
      'open',
      'navigator',
      'clientInformation',
      'applicationCache',
      'originIsolated',
      'alert',
      'confirm',
      'prompt',
      'print',
      'postMessage',
      'find',
      'offscreenBuffering',
      'styleMedia',
      'queueMicrotask',
    ],
    WhatWg
  );
  names = filterOut(
    names,
    [
      'Navigator',
      'BarProp',
      'Window',
      'History',
      'Location',
      'ApplicationCache',
      'Notification',
      'ElementInternals',
      'CustomElementRegistry',
    ],
    WhatWg
  );

  /**
   * window global event handlers
   * https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
   */
  const Global_Event_Handlers = [];
  for (const name of names) {
    if (/^on/.test(name)) {
      Global_Event_Handlers.push(name);
    }
  }
  names = filterOut(names, Global_Event_Handlers, WhatWg);

  /**
   * origin
   * https://html.spec.whatwg.org/multipage/origin.html#origin
   */
  names = filterOut(names, ['origin'], WhatWg);

  /**
   * 4
   * whatwg webstorage
   * https://html.spec.whatwg.org/multipage/#toc-webstorage
   */
  names = filterOut(
    names,
    [
      'Storage',
      'sessionStorage',
      'localStorage',
      'StorageEvent',
      'StorageManager',
    ],
    WhatWg
  );

  /**
   * xhr
   * https://xhr.spec.whatwg.org/
   */
  names = filterOut(
    names,
    [
      'XMLHttpRequestUpload',
      'XMLHttpRequestEventTarget',
      'XMLHttpRequest',
      'FormData',
      'ProgressEvent',
    ],
    WhatWg
  );

  /**
   * fetch
   * https://fetch.spec.whatwg.org/
   */
  names = filterOut(names, ['fetch', 'Request', 'Response', 'Headers'], WhatWg);

  /**
   * streams
   * https://streams.spec.whatwg.org/
   */
  names = filterOut(
    names,
    [
      'ReadableStream',
      'ReadableStreamDefaultReader',
      'WritableStream',
      'WritableStreamDefaultWriter',
      'CountQueuingStrategy',
      'ByteLengthQueuingStrategy',
    ],
    WhatWg
  );

  /**
   * Drag And Drop
   * https://html.spec.whatwg.org/multipage/dnd.html
   */
  names = filterOut(
    names,
    ['DragEvent', 'DataTransfer', 'DataTransferItemList', 'DataTransferItem'],
    WhatWg
  );

  /**
   * console
   * https://console.spec.whatwg.org/
   */
  names = filterOut(names, ['console'], WhatWg);

  /**
   * Encoding
   * https://encoding.spec.whatwg.org/
   */
  const EncodingAPI = [
    'TextEncoderStream',
    'TextEncoder',
    'TextDecoderStream',
    'TextDecoder',
  ];
  names = filterOut(names, EncodingAPI, WhatWg);

  /**
   * Others
   */
  names = filterOut(
    names,
    [
      'ValidityState',
      'SubmitEvent',
      'FormDataEvent',
      'defaultStatus',
      'defaultstatus',
    ],
    WhatWg
  );

  /************************************************************** W3C ******************************************************************************** /
     * 
    
    /**************************************************************  CSS/SVG WG ******************************************************************************** /
    /**
     * csswg
     * CSSOM
     * https://drafts.csswg.org/cssom/
     * https://drafts.css-houdini.org/css-typed-om-1/
     * https://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSview-getComputedStyle
     */
  const CSSOMAPI = [];
  for (const name of names) {
    if (/^CSS/.test(name)) {
      CSSOMAPI.push(name);
    }
  }
  names = filterOut(names, CSSOMAPI, W3C);
  names = filterOut(
    names,
    [
      'getComputedStyle',
      'matchMedia',
      'MediaQueryListEvent',
      'MediaQueryList',
      'MediaList',
      'StyleSheetList',
      'StyleSheet',
      'StylePropertyMapReadOnly',
      'StylePropertyMap',
    ],
    W3C
  );
  // https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface
  names = filterOut(
    names,
    [
      'moveTo',
      'moveBy',
      'resizeTo',
      'resizeBy',
      'scroll',
      'scrollTo',
      'scrollBy',
      'scrollX',
      'scrollY',
      'screenX',
      'screenY',
      'innerHeight',
      'innerWidth',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'devicePixelRatio',
      'screenLeft',
      'screenTop',
    ],
    W3C
  );

  /**
   * CSS Transitions
   * https://drafts.csswg.org/css-transitions/
   */
  names = filterOut(names, ['TransitionEvent', 'TransformStream'], W3C);

  /**
   * Web Animations
   * https://drafts.csswg.org/web-animations-1/
   */
  names = filterOut(
    names,
    [
      'Animation',
      'KeyframeEffect',
      'AnimationEffect',
      'AnimationPlaybackEvent',
      'DocumentTimeline',
      'AnimationTimeline',
    ],
    W3C
  );

  /**
   * Font Face
   * https://drafts.csswg.org/css-font-loading
   */
  names = filterOut(names, ['FontFaceSetLoadEvent', 'FontFace'], W3C);

  //https://drafts.csswg.org/resize-observer/
  names = filterOut(
    names,
    ['ResizeObserverEntry', 'ResizeObserverSize', 'ResizeObserver'],
    W3C
  );

  /**
   * SVG WG
   * https://www.w3.org/TR/SVG2/
   * https://svgwg.org/svg2-draft/
   */
  const SVGAPI = [];
  for (const name of names) {
    if (/^SVG/.test(name)) {
      SVGAPI.push(name);
    }
  }
  names = filterOut(names, SVGAPI, W3C);

  /**************************************************************  W3C Others  ******************************************************************************** /
    /**
     * W3C WebRTC
     * https://w3c.github.io/webrtc-pc/
     */
  const WebRTCAPI = [];
  for (const name of names) {
    if (/^RTC/.test(name)) {
      WebRTCAPI.push(name);
    }
  }
  names = filterOut(names, WebRTCAPI, W3C);

  /**
   * w3c mediacapture-main
   * https://w3c.github.io/mediacapture-main/
   */
  names = filterOut(
    names,
    [
      'ImageCapture',
      'MediaStream',
      'MediaStreamTrackEvent',
      'MediaStreamTrack',
      'MediaStreamEvent',
      'MediaSettingsRange',
      'MediaRecorder',
      'MediaEncryptedEvent',
      'MediaCapabilities',
      'BlobEvent',
      'PhotoCapabilities',
      'OverconstrainedError',
      'InputDeviceInfo',
      'CanvasCaptureMediaStreamTrack',
    ],
    W3C
  );

  /**
   * webaudio
   * https://webaudio.github.io/web-audio-api/
   */
  const WEB_AUDIOAPI = [
    'BaseAudioContext',
    'AudioNode',
    'AudioBuffer',
    'AudioParam',
    'AudioParamMap',
    'AudioListener',
    'AudioProcessingEvent',
    'PeriodicWave',
    'AudioWorklet',
    'OfflineAudioCompletionEvent',
    'MediaDeviceInfo',
    'MediaDevices',
    'MediaKeyMessageEvent',
    'MediaKeys',
    'MediaKeySession',
    'MediaKeyStatusMap',
    'MediaKeySystemAccess',
  ];
  for (const name of names) {
    try {
      if (
        window[name].prototype instanceof BaseAudioContext ||
        window[name].prototype instanceof AudioNode
      ) {
        WEB_AUDIOAPI.push(name);
      }
    } catch (e) {}
  }
  names = filterOut(names, WEB_AUDIOAPI, W3C);

  /**
   * Web Midi
   * https://webaudio.github.io/web-midi-api/
   */
  const WebMidiAPI = [];
  for (const name of names) {
    if (/^MIDI/.test(name)) {
      WebMidiAPI.push(name);
    }
  }
  names = filterOut(names, WebMidiAPI, W3C);

  /**
   * GamePad
   * https://w3c.github.io/gamepad/extensions.htm
   */
  const GamepadAPI = [];
  for (const name of names) {
    if (/^Gamepad/.test(name)) {
      GamepadAPI.push(name);
    }
  }
  names = filterOut(names, GamepadAPI, W3C);

  /**
   * Geolocation
   * https://w3c.github.io/geolocation-api/
   */
  const GeolocationAPI = [];
  for (const name of names) {
    if (/^Geolocation/.test(name)) {
      GeolocationAPI.push(name);
    }
  }
  names = filterOut(names, GeolocationAPI, W3C);

  // https://w3c.github.io/battery/
  names = filterOut(names, ['BatteryManager'], W3C);

  // https://w3c.github.io/deviceorientation/
  names = filterOut(
    names,
    [
      'DeviceMotionEvent',
      'DeviceMotionEventAcceleration',
      'DeviceMotionEventRotationRate',
      'DeviceOrientationEvent',
    ],
    W3C
  );

  /**
   * W3C screen-orientation
   * https://w3c.github.io/screen-orientation/
   */
  const Screen_orientation = ['screen', 'Screen', 'ScreenOrientation'];
  names = filterOut(names, Screen_orientation, W3C);

  /**
   * Web Authentication
   * https://w3c.github.io/webauthn/
   * Authenticator
   */
  const WebAuthnAPI = [];
  for (const name of names) {
    if (/^Authenticator/i.test(name)) {
      WebAuthnAPI.push(name);
    }
  }
  names = filterOut(names, WebAuthnAPI, W3C);

  /**
   * trusted types
   * https://w3c.github.io/webappsec-trusted-types/dist/spec/
   */
  const TrustedAPI = [];
  for (const name of names) {
    if (/^Trusted/i.test(name)) {
      TrustedAPI.push(name);
    }
  }
  names = filterOut(names, TrustedAPI, W3C);

  /**
   * w3c persentation
   * https://w3c.github.io/presentation-api/
   */
  const WebPresentationAPI = [];
  for (const name of names) {
    if (/^Presentation/.test(name)) {
      WebPresentationAPI.push(name);
    }
  }
  names = filterOut(names, WebPresentationAPI, W3C);

  /**
   * Web VTT
   * https://w3c.github.io/webvtt/
   */
  names = filterOut(names, ['VTTCue'], W3C);

  /**
   * Clipboard
   * https://w3c.github.io/clipboard-apis/
   */

  names = filterOut(names, ['Clipboard', 'ClipboardItem'], W3C);

  /**
   * Push
   * https://w3c.github.io/push-api/
   */
  names = filterOut(
    names,
    ['PushManager', 'PushSubscription', 'PushSubscriptionOptions'],
    W3C
  );

  /**
   * WakeLock
   * https://w3c.github.io/screen-wake-lock
   */
  names = filterOut(
    names,
    ['WakeLock', 'WakeLockSentinel', 'PushSubscriptionOptions'],
    W3C
  );

  /**
   * IntersectionObserver
   * https://w3c.github.io/IntersectionObserver/
   */

  names = filterOut(
    names,
    ['IntersectionObserver', 'IntersectionObserverEntry'],
    W3C
  );
  /**
    https://w3c.github.io/permissions/
    */
  names = filterOut(names, ['Permissions', 'PermissionStatus'], W3C);
  /**
   * https://w3c.github.io/webappsec-credential-management/
   */
  names = filterOut(
    names,
    [
      'Credential',
      'CredentialsContainer',
      'FederatedCredential',
      'PasswordCredential',
      'PublicKeyCredential',
    ],
    W3C
  );

  /**
   * FeaturePolicy
   * https://w3c.github.io/webappsec-permissions-policy/
   */

  names = filterOut(names, ['FeaturePolicy'], W3C);

  /**
   * Reporting
   * https://w3c.github.io/reporting/
   */
  names = filterOut(names, ['ReportingObserver'], W3C);

  /**
   * Secure Contexts
   * https://w3c.github.io/webappsec-secure-contexts/
   */
  names = filterOut(names, ['isSecureContext'], W3C);

  /**
   * Remote Playback
   * https://w3c.github.io/remote-playback/
   */
  names = filterOut(names, ['RemotePlayback'], W3C);

  /**
   * SensorAPI
   * https://www.w3.org/TR/generic-sensor
   */
  const SensorAPI = ['Sensor', 'SensorErrorEvent'];
  for (const name of names) {
    try {
      if (window[name].prototype instanceof Sensor) {
        SensorAPI.push(name);
      }
    } catch (e) {}
  }
  names = filterOut(names, SensorAPI, W3C);
  /**
   * w3 IndexedDB
   * https://www.w3.org/TR/IndexedDB/
   */
  const IndexedDBAPI = [];
  for (const name of names) {
    if (/^IDB/.test(name)) {
      IndexedDBAPI.push(name);
    }
  }
  names = filterOut(names, IndexedDBAPI, W3C);
  names = filterOut(names, ['openDatabase', 'indexedDB'], W3C);

  /**
   * w3 navigation-timing
   * https://www.w3.org/TR/navigation-timing/
   */
  const PerformanceAPI = [];
  for (const name of names) {
    if (/^Performance/i.test(name)) {
      PerformanceAPI.push(name);
    }
  }
  names = filterOut(names, PerformanceAPI, W3C);
  names = filterOut(names, ['TaskAttributionTiming'], W3C);

  // https://www.w3.org/TR/payment-handler/
  const PaymentAPI = [];
  for (const name of names) {
    if (/^Payment/i.test(name)) {
      PaymentAPI.push(name);
    }
  }
  names = filterOut(names, PaymentAPI, W3C);

  /**
   * Crypto API
   * https://www.w3.org/TR/WebCryptoAPI/
   */

  names = filterOut(
    names,
    ['Crypto', 'crypto', 'CryptoKey', 'SubtleCrypto'],
    W3C
  );

  /**
   * Idle Callback
   * https://www.w3.org/TR/requestidlecallback/
   */
  names = filterOut(
    names,
    ['requestIdleCallback', 'cancelIdleCallback', 'IdleDeadline'],
    W3C
  );

  /**
   * immersive-web webxr
   * https://www.w3.org/TR/webxr/
   * https://immersive-web.github.io/webxr/
   */
  const WebXRAPI = [];
  for (const name of names) {
    if (/^XR/.test(name)) {
      WebXRAPI.push(name);
    }
  }
  names = filterOut(names, WebXRAPI, W3C);

  /**
   * WebAssembly
   * https://www.w3.org/TR/wasm-js-api-1/
   * https://webassembly.github.io/spec/js-api/
   */
  names = filterOut(names, ['WebAssembly'], W3C);

  /**
   * W3C Media Source
   * https://html.spec.whatwg.org/multipage/media.html
   * https://w3c.github.io/media-source/
   */
  names = filterOut(
    names,
    [
      'MediaError',
      'SourceBuffer',
      'SourceBufferList',
      'VideoPlaybackQuality',
      'VideoTrackList',
      'AudioTrackList',
      'AudioTrack',
      'VideoTrack',
      'TextTrackList',
      'TextTrack',
      'TextTrackCueList',
      'TextTrackCue',
      'TimeRanges',
      'TrackEvent',
    ],
    W3C
  );
  names = filterOut(
    names,
    ['MediaSource', 'SourceBuffer', 'SourceBufferList', 'VideoPlaybackQuality'],
    W3C
  );

  // https://drafts.fxtf.org/geometry/
  names = filterOut(
    names,
    [
      'DOMRectReadOnly',
      'DOMRectList',
      'DOMRect',
      'DOMPointReadOnly',
      'DOMPoint',
      'DOMMatrixReadOnly',
      'DOMMatrix',
      'DOMQuad',
    ],
    W3C
  );

  // https://heycam.github.io/webidl/#idl-DOMException
  names = filterOut(names, ['DOMException'], W3C);
  /**
   * W3c Media Session
   * https://w3c.github.io/mediasession/
   */
  names = filterOut(names, ['MediaMetadata', 'MediaSession'], W3C);
  /**
   *
   * https://w3c.github.io/picture-in-picture/
   */
  names = filterOut(
    names,
    ['PictureInPictureEvent', 'PictureInPictureWindow'],
    W3C
  );

  /**
   * Touch
   * https://www.w3.org/TR/touch-events/
   */
  names = filterOut(
    names,
    ['Touch', 'TouchEvent', 'TouchList', 'InputDeviceCapabilities'],
    W3C
  );

  /**
   * WebSocket
   * https://www.w3.org/TR/websockets/
   */
  names = filterOut(names, ['WebSocket'], W3C);

  /************************************************************** WICG ******************************************************************************** /
    
    /**
     * Web Speech API
     * https://wicg.github.io/speech-api/
     */
  const WebSpeechAPI = [];
  for (const name of names) {
    if (/^Speech/i.test(name)) {
      WebSpeechAPI.push(name);
    }
  }
  names = filterOut(names, WebSpeechAPI, WICG);

  /**
   * wicg Web USB
   * https://wicg.github.io/webusb
   */
  const WebUSBAPI = [];
  for (const name of names) {
    if (/^USB/.test(name)) {
      WebUSBAPI.push(name);
    }
  }
  names = filterOut(names, WebUSBAPI, WICG);

  /**
   * background-sync
   * https://wicg.github.io/background-sync/spec/
   */
  const BackgroundAPI = ['ServiceWorkerRegistration', 'SyncManager'];
  names = filterOut(names, BackgroundAPI, WICG);
  /**
   * wicg Event timing
   * https://github.com/WICG/event-timing
   */
  names = filterOut(names, ['EventCounts'], WICG);

  // https://wicg.github.io/compression/
  names = filterOut(names, ['DecompressionStream', 'CompressionStream'], WICG);

  /**
   * https://wicg.github.io/web-locks/
   */
  names = filterOut(names, ['Lock', 'LockManager'], WICG);

  /**
   * https://wicg.github.io/keyboard-map/
   */
  names = filterOut(names, ['Keyboard', 'KeyboardLayoutMap'], WICG);

  /**
   * Layout instability
   * https://wicg.github.io/layout-instability/
   */
  names = filterOut(names, ['LayoutShift', 'LayoutShiftAttribution'], WICG);

  /**
   * LCP
   * https://wicg.github.io/largest-contentful-paint/
   */

  names = filterOut(names, ['LargestContentfulPaint'], WICG);

  /**
   * NetworkInformation
   * https://wicg.github.io/netinfo/
   */
  names = filterOut(names, ['NetworkInformation'], WICG);

  /**
   * Background Sync
   * https://wicg.github.io/background-sync/spec/PeriodicBackgroundSync-index.html
   */
  names = filterOut(names, ['PeriodicSyncManager'], WICG);

  /**
   * FragmentDirective
   * Move to document.fragmentDirective
   * https://wicg.github.io/scroll-to-text-fragment/
   * https://github.com/WICG/scroll-to-text-fragment/pull/134
   * https://www.chromestatus.com/feature/5679640498667520
   */
  names = filterOut(names, ['FragmentDirective'], WICG);

  /**
   * Web Bluetooth
   * https://webbluetoothcg.github.io/web-bluetooth/
   */
  const WebBleAPI = [];
  for (const name of names) {
    if (/^Bluetooth/.test(name)) {
      WebBleAPI.push(name);
    }
  }
  names = filterOut(names, WebBleAPI, WICG);

  // https://wicg.github.io/visual-viewport/
  names = filterOut(names, ['VisualViewport', 'visualViewport'], WICG);

  /**
   * background fetch
   * https://wicg.github.io/background-fetch/
   */
  names = filterOut(
    names,
    [
      'BackgroundFetchManager',
      'BackgroundFetchRecord',
      'BackgroundFetchRegistration',
    ],
    WICG
  );

  /**
   * File API
   * https://w3c.github.io/FileAPI/
   */
  names = filterOut(names, ['FileReader', 'FileList', 'File'], WICG);

  /**************************************************************  WebGL  ******************************************************************************** /
    /**
     * khronos WebGL
     * https://www.khronos.org/registry/webgl/specs/latest/2.0/
     */
  const WebGL_Prefix = [];
  for (const name of names) {
    if (/^WebGL/.test(name)) {
      WebGL_Prefix.push(name);
    }
  }
  names = filterOut(names, WebGL_Prefix, WebGL);

  /**************************************************************  Private  ******************************************************************************** /
    /**
     * 13
     * Webkit Private
     */
  const Webkit_Private = [];
  for (const name of names) {
    if (/^webkit/i.test(name)) {
      Webkit_Private.push(name);
    }
  }
  names = filterOut(names, Webkit_Private, Private);

  // https://developer.mozilla.org/en-US/docs/Web/API/XSLTProcessor
  names = filterOut(names, ['XSLTProcessor'], Private);

  /**
   * chrome
   * https://www.chromestatus.com/feature/4757990523535360
   */
  names = filterOut(names, ['BarcodeDetector'], Private);

  /**
   * UserActivation V2
   * https://mustaqahmed.github.io/user-activation-v2/
   */
  names = filterOut(names, ['UserActivation'], Private);

  names = filterOut(names, ['chrome'], Private);

  /**
   * DOM Parser
   * https://w3c.github.io/DOM-Parsing/
   */
  names = filterOut(names, ['DOMParser', 'XMLSerializer'], Private);

  /************************************************************** Experiment Feature ********************************************************************************/
  /**
   * Enable chrome://flags/#experimental-web-platform-features
   */

  /**
   * W3C/WICG origin
   * https://html.spec.whatwg.org/multipage/origin.html
   * https://github.com/wicg/origin-policy
   */
  names = filterOut(
    names,
    ['originIsolationRestricted', 'crossOriginIsolated', 'originPolicyIds'],
    WICG
  );

  /**
   * Web Serial API
   * https://wicg.github.io/serial/
   */
  names = filterOut(
    names,
    ['SerialPortInfo', 'Serial', 'SerialPort', 'SerialConnectionEvent'],
    WICG
  );

  /**
   * Native File System
   * https://wicg.github.io/native-file-system/
   */
  names = filterOut(
    names,
    [
      'FileSystemDirectoryHandle',
      'FileSystemFileHandle',
      'FileSystemHandle',
      'FileSystemWritableFileStream',
      'showDirectoryPicker',
      'showOpenFilePicker',
      'showSaveFilePicker',
      'chooseFileSystemEntries',
      'getOriginPrivateDirectory',
    ],
    WICG
  );

  /**
   * Web HID
   * https://wicg.github.io/webhid/
   */
  names = filterOut(
    names,
    [
      'HID',
      'HIDCollectionInfo',
      'HIDConnectionEvent',
      'HIDDevice',
      'HIDInputReportEvent',
      'HIDReportInfo',
      'HIDReportItem',
    ],
    WICG
  );

  /**
   * Web NFC
   * https://w3c.github.io/web-nfc/
   */
  names = filterOut(
    names,
    [
      'NDEFMessage',
      'NDEFReader',
      'NDEFReadingEvent',
      'NDEFRecord',
      'NDEFWriter',
    ],
    WICG
  );

  /**
   * Web Transport
   * https://wicg.github.io/web-transport/
   */
  names = filterOut(
    names,
    ['SendStream', 'ReceiveStream', 'QuicTransport', 'BidirectionalStream'],
    WICG
  );

  /**
   * Cookie Store API
   * https://wicg.github.io/cookie-store/
   */
  names = filterOut(
    names,
    ['CookieChangeEvent', 'CookieStore', 'CookieStoreManager', 'cookieStore'],
    WICG
  );

  /**
   * WebSocketStream
   * https://chromestatus.com/feature/5189728691290112
   * https://web.dev/websocketstream/
   */
  names = filterOut(names, ['WebSocketStream'], WICG);
  /************************************************************** End ********************************************************************************/
  console.log(names, collections);
  return {
    names,
    collections,
  };
}
