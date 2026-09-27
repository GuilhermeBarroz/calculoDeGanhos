/* Apply before styles load to avoid a flash of the wrong theme. */
(() => {
  const key = 'ganhos-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const modes = ['system', 'light', 'dark'];
  const names = { system: 'Sistema', light: 'Claro', dark: 'Escuro' };
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (['system', 'light', 'dark'].includes(saved)) preference = saved;
  } catch {
    /* Storage is optional. */
  }
  function apply() {
    document.documentElement.dataset.bsTheme =
      preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
  }
  apply();
  media.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme');
    function updateButton() {
      const next = modes[(modes.indexOf(preference) + 1) % modes.length];
      const label = `Tema: ${names[preference]}. Alterar para ${names[next]}.`;
      button.dataset.preference = preference;
      button.setAttribute('aria-label', label);
      button.title = label;
      document.getElementById('theme-caption').textContent = names[preference];
      button.querySelectorAll('[data-theme-icon]').forEach((icon) => {
        icon.toggleAttribute('hidden', icon.dataset.themeIcon !== preference);
      });
    }
    updateButton();
    button.addEventListener('click', () => {
      preference = modes[(modes.indexOf(preference) + 1) % modes.length];
      apply();
      updateButton();
      document.getElementById('theme-status').textContent =
        `Tema ${names[preference]} selecionado.`;
      try {
        localStorage.setItem(key, preference);
      } catch {
        /* Keep working without persistence. */
      }
    });
  });
})();
