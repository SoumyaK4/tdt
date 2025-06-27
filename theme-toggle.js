const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Set default to dark
if (!localStorage.getItem('theme')) {
  root.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
} else {
  root.setAttribute('data-theme', localStorage.getItem('theme'));
}

toggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
