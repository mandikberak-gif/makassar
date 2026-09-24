/**
 * JURAGAN 77 — Admin Auth (Login Handler)
 * Stores session in localStorage
 */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  passwords: ['sarappo4788', 'juragan77']
};

// Redirect to dashboard if already logged in
if (localStorage.getItem('j77_admin_session') === 'active') {
  window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorBox = document.getElementById('login-error');
  const errorText = document.getElementById('error-text');
  const btnLogin = document.getElementById('btn-login');
  const btnText = btnLogin.querySelector('.btn-text');
  const btnLoader = document.getElementById('btn-loader');
  const togglePass = document.getElementById('toggle-pass');
  const passInput = document.getElementById('admin-pass');

  // Toggle password visibility
  togglePass.addEventListener('click', () => {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    document.getElementById('eye-icon').innerHTML = isPass
      ? '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
      : '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('admin-user').value.trim();
    const pass = passInput.value;

    // Show loading
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    errorBox.style.display = 'none';

    setTimeout(() => {
      const customPass = localStorage.getItem('j77_admin_pass');
      const isPassValid = ADMIN_CREDENTIALS.passwords.includes(pass) || (customPass && pass === customPass);
      if (user === ADMIN_CREDENTIALS.username && isPassValid) {
        localStorage.setItem('j77_admin_session', 'active');
        localStorage.setItem('j77_admin_user', user);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        errorText.textContent = 'Username atau password tidak valid. Coba lagi.';
        errorBox.style.display = 'flex';
        // Shake animation
        form.style.animation = 'none';
        form.offsetHeight; // reflow
        form.style.animation = 'shake 0.4s ease';
      }
    }, 900); // Simulate auth delay
  });
});
