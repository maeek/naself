import type { BackendModule, CallbackError, ResourceKey } from 'i18next';

export default {
  type: 'backend',
  init: (_services, _backedOptions, _i18nextOptions) => {
    // empty
  },
  read: (language, namespace, callback) => {
    import(
      /* webpackMode: "lazy", webpackChunkName: "locale/[request]" */
      `./locales/${language}/${namespace}.json`
    )
      .then(({ default: data }: { default: ResourceKey }) => callback(null, data))
      .catch((error: CallbackError) => callback(error, {}));
  }
} as BackendModule;
