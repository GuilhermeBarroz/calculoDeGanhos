(() => {
  'use strict';

  const measurementId = 'G-RVTLBH84P5';
  const storageKey = 'ganhos-analytics-consent';
  const production = location.hostname === 'calculadoradeganhos.conexo.app.br';
  const panel = document.getElementById('analytics-preferences');
  const status = document.getElementById('analytics-status');
  let consent = null;
  let loaded = false;

  try {
    consent = localStorage.getItem(storageKey);
  } catch {
    // Consent still works for this page when storage is unavailable.
  }

  function enableAnalytics() {
    if (!production || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  function updateStatus() {
    status.textContent =
      consent === 'granted'
        ? 'Estatísticas permitidas. Você pode alterar sua escolha abaixo.'
        : 'Estatísticas não autorizadas. A calculadora funciona normalmente.';
  }

  function choose(value) {
    consent = value;
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* Optional persistence. */
    }
    window[`ga-disable-${measurementId}`] = value !== 'granted';
    if (value === 'granted') {
      if (loaded) window.gtag('consent', 'update', { analytics_storage: 'granted' });
      enableAnalytics();
    } else if (loaded) {
      // Disable future collection immediately, including queued events.
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    updateStatus();
    panel.open = false;
  }

  window.GanhosAnalytics = {
    track(event, calculator) {
      if (consent !== 'granted' || !production || !loaded) return;
      if (!['calculator_selected', 'calculation_completed'].includes(event)) return;
      if (!['shift', 'ride', 'trip'].includes(calculator)) return;
      window.gtag('event', event, { calculator_type: calculator });
    },
  };

  document.getElementById('analytics-accept').addEventListener('click', () => choose('granted'));
  document.getElementById('analytics-decline').addEventListener('click', () => choose('denied'));
  panel.open = !['granted', 'denied'].includes(consent);
  updateStatus();
  if (consent === 'granted') enableAnalytics();
})();
