'use strict';

(() => {
  const root = document.documentElement;
  const readPreference = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  const themeButton = document.querySelector('#theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#161d19' : '#f4f3ec';
  };
  const storedTheme = readPreference('ck-theme');
  applyTheme(['light', 'dark'].includes(storedTheme) ? storedTheme : systemTheme.matches ? 'dark' : 'light');
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    savePreference('ck-theme', next);
  });
  systemTheme.addEventListener('change', (event) => {
    if (!['light', 'dark'].includes(readPreference('ck-theme'))) applyTheme(event.matches ? 'dark' : 'light');
  });

  const motionButton = document.querySelector('#motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = readPreference('ck-motion') === 'paused';
  const applyMotion = () => {
    const paused = reducedMotion.matches || userPaused;
    root.dataset.motion = paused ? 'paused' : 'running';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = reducedMotion.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motionButton.disabled = reducedMotion.matches;
    motionButton.title = reducedMotion.matches ? 'Motion is disabled by your device accessibility preference.' : 'Pause or resume decorative animation';
  };
  applyMotion();
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    userPaused = !userPaused;
    savePreference('ck-motion', userPaused ? 'paused' : 'running');
    applyMotion();
  });
  reducedMotion.addEventListener('change', applyMotion);

  const layers = {
    edge: ['01 / SECURE EDGE', 'Connection without unnecessary exposure.', 'Private connectivity, controlled egress and network policy define how workloads reach services across cloud and tenant boundaries.'],
    control: ['02 / CONTROL PLANE', 'Guardrails that scale with teams.', 'Identity, GitOps and policy establish a consistent operating model across shared and dedicated environments.'],
    data: ['03 / DATA PLANE', 'Isolation is an architectural choice.', 'Shared namespaces and dedicated clusters offer different cost and isolation trade-offs. Workload execution belongs behind explicit resource and access boundaries.'],
    observe: ['04 / OBSERVABILITY', 'Signals that lead to a next step.', 'SLOs, metrics and traces connect service behavior to operational action, with deliberate tenant context and sensitive-data controls.']
  };
  const layerButtons = [...document.querySelectorAll('[data-layer]')];
  layerButtons.forEach((button) => button.addEventListener('click', () => {
    const [number, title, copy] = layers[button.dataset.layer];
    document.querySelector('#layer-number').textContent = number;
    document.querySelector('#layer-title').textContent = title;
    document.querySelector('#layer-copy').textContent = copy;
    layerButtons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
  }));

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  document.querySelector('.filters').hidden = false;
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
    let count = 0;
    projects.forEach((project) => {
      const visible = filter === 'all' || project.dataset.category === filter;
      project.hidden = !visible;
      project.classList.remove('just-shown');
      if (visible) { count += 1; project.classList.add('just-shown'); }
    });
    document.querySelector('#filter-status').textContent = `${count} projects shown.`;
  }));

  document.querySelectorAll('.print-button').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
  const copyButton = document.querySelector('.copy-email');
  if (navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      const status = document.querySelector('#copy-status');
      try {
        await navigator.clipboard.writeText('chitenderkumar.16@gmail.com');
        status.textContent = 'Email copied.';
      } catch {
        status.textContent = 'Copy unavailable. Select the email address above.';
      }
    });
  }
})();
