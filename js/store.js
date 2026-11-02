/* ═══════════════════════════════════════════════════════════
   VIREON — STORE.JS  (VireonStore global)
   Foundation layer: persistent key/value store for all
   content keys shared between dashboard and storefront.
   ═══════════════════════════════════════════════════════════ */
'use strict';

var VireonStore = (function () {
  var DEFAULTS = {
    vireon_products: [],
    vireon_categories: [],
    vireon_lookbook: [],
    vireon_limited_edition: null,
    vireon_brand_settings: null,
  };

  function get(key) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) {
        return key in DEFAULTS ? DEFAULTS[key] : null;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('VireonStore.get error for key "' + key + '":', e);
      return key in DEFAULTS ? DEFAULTS[key] : null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'SecurityError' || e.code === 22) {
        console.error('VireonStore.save failed (storage full/blocked) for key "' + key + '":', e);
      } else {
        console.error('VireonStore.save error for key "' + key + '":', e);
      }
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('VireonStore.remove error for key "' + key + '":', e);
      return false;
    }
  }

  return { get: get, save: save, remove: remove, DEFAULTS: DEFAULTS };
})();

window.VireonStore = VireonStore;
