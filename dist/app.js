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

  const canTrackPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.addEventListener('pointermove', (event) => {
    if (!canTrackPointer.matches || root.dataset.motion === 'paused') return;
    root.style.setProperty('--pointer-x', `${event.clientX}px`);
    root.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });

  const panel = document.querySelector('.system-panel');
  panel.addEventListener('pointermove', (event) => {
    if (!canTrackPointer.matches || root.dataset.motion === 'paused') return;
    const rect = panel.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -3;
    const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 3;
    panel.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    panel.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
  }, { passive: true });
  panel.addEventListener('pointerleave', () => {
    panel.style.setProperty('--tilt-x', '0deg');
    panel.style.setProperty('--tilt-y', '0deg');
  });

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
  const search = document.querySelector('#project-search');
  const showMore = document.querySelector('#show-more');
  const pageSize = 6;
  let activeFilter = 'all';
  let visibleLimit = pageSize;
  const searchable = new Map(projects.map(project => [project, project.textContent.toLocaleLowerCase()]));
  const renderProjects = () => {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = projects.filter(project =>
      (activeFilter === 'all' || project.dataset.category.split(' ').includes(activeFilter)) &&
      terms.every(term => searchable.get(project).includes(term)));
    const shown = new Set(matches.slice(0, visibleLimit));
    projects.forEach(project => {
      const wasHidden = project.hidden;
      project.hidden = !shown.has(project);
      project.classList.remove('just-shown');
      if (wasHidden && !project.hidden) project.classList.add('just-shown');
    });
    document.querySelector('#catalog-count').textContent = `Showing ${shown.size} of ${matches.length} projects.`;
    document.querySelector('#empty-results').hidden = matches.length > 0;
    showMore.hidden = visibleLimit >= matches.length;
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
  };
  document.querySelector('.catalog-controls').hidden = false;
  document.querySelector('.catalog-footer').hidden = false;
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    visibleLimit = pageSize;
    renderProjects();
  }));
  search.addEventListener('input', () => {
    visibleLimit = pageSize;
    renderProjects();
  });
  showMore.addEventListener('click', () => {
    visibleLimit += pageSize;
    renderProjects();
  });
  renderProjects();

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
