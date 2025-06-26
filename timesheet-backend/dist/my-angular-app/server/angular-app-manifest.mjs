
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/landing"
  },
  {
    "renderMode": 2,
    "route": "/signup"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/table"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 27877, hash: '6e028e0879e1a7b807bf97dbc0ce74d6684d9e9fb2610983635ecbff5812e009', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17081, hash: 'd3f9f3b57e6edd9d77eac60ae3fb0bdf5452b296280f20ef74a69e1372d152b7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 37098, hash: '30b80cfbeb0194f14c26fbd62578ff5636078c5ba91b902185a1e2e1a16dedce', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 34886, hash: '362b985833f8cf3dd5188f9039060b1b076f3beed3dedd2e98d6d53059f29dcd', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'table/index.html': {size: 43824, hash: '43e2b77a348508a951a03438750b5c7a01d9f83b9fd3a8a1fcda58902074bda2', text: () => import('./assets-chunks/table_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 34588, hash: 'd40b3f5b4a64ff9c39437ee583f38aa5ac96eb99cacf21fd5bf18929e55946e8', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'landing/index.html': {size: 37098, hash: '30b80cfbeb0194f14c26fbd62578ff5636078c5ba91b902185a1e2e1a16dedce', text: () => import('./assets-chunks/landing_index_html.mjs').then(m => m.default)},
    'styles-PDYZ3TDF.css': {size: 322570, hash: 'dae5gg9SA5A', text: () => import('./assets-chunks/styles-PDYZ3TDF_css.mjs').then(m => m.default)}
  },
};
