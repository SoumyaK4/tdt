let deferredPrompt;
const popup = document.getElementById('install-popup');
const installBtn = document.getElementById('install-btn');
const dismissBtn = document.getElementById('dismiss-btn');

// Service: PWA install popup logic
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installed = localStorage.getItem('tdt_installed');
  const dismissedUntil = localStorage.getItem('tdt_dismissed_until');
  const now = new Date().getTime();

  if (!installed && (!dismissedUntil || now > parseInt(dismissedUntil))) {
    setTimeout(() => popup.classList.remove('hidden'), 5000);
  }
});

installBtn?.addEventListener('click', () => {
  popup.classList.add('hidden');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        localStorage.setItem('tdt_installed', 'true');
      }
      deferredPrompt = null;
    });
  }
});

dismissBtn?.addEventListener('click', () => {
  popup.classList.add('hidden');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  localStorage.setItem('tdt_dismissed_until', tomorrow.getTime().toString());
});

// Protocol Handler Registration
if ('registerProtocolHandler' in navigator) {
  try {
    navigator.registerProtocolHandler(
      'web+tdt',
      `${location.origin}/?web+tdt=%s`,
      'TDT Protocol'
    );
    console.log('Registered web+tdt handler');
  } catch (err) {
    console.warn('Protocol handler registration failed:', err);
  }
}
