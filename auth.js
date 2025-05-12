document.addEventListener('DOMContentLoaded', () => {
  // Registro
  const formRegistro = document.querySelector('.form-registro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', function(event) {
      event.preventDefault();
      window.location.href = "dashboard.html";
    });
  }

  // Login
  const formLogin = document.querySelector('.form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
      event.preventDefault();
      window.location.href = "dashboard.html";
    });
  }
});
