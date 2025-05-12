function redirigirADashboard(event) {
  event.preventDefault();
  window.location.href = "dashboard.html";
}
document.querySelector(".preferences").addEventListener("submit", function(event) {
  event.preventDefault(); 

  function getCheckedValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
    return null;
  }

  const tiempo = getCheckedValue("tiempo");
  const nivel = getCheckedValue("nivel");
  const estado = getCheckedValue("estado");
  const tipo = getCheckedValue("tipo");

  
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach(group => group.classList.remove("missing"));

 
  if (tiempo && nivel && estado && tipo) {
    const params = new URLSearchParams({
      tiempo,
      nivel,
      estado,
      tipo
    });
    window.location.href = `rutina.html?${params.toString()}`;
  } else {
    if (!tiempo) document.querySelector('input[name="tiempo"]').closest(".form-group").classList.add("missing");
    if (!nivel) document.querySelector('input[name="nivel"]').closest(".form-group").classList.add("missing");
    if (!estado) document.querySelector('input[name="estado"]').closest(".form-group").classList.add("missing");
    if (!tipo) document.querySelector('input[name="tipo"]').closest(".form-group").classList.add("missing");

    alert("Por favor, selecciona una opción en cada categoría.");
  }
});
document.addEventListener('DOMContentLoaded', () => {
  let lastPractice = localStorage.getItem('lastPractice');
  let totalMinutes = parseInt(localStorage.getItem('totalMinutes')) || 0;
  let streak = parseInt(localStorage.getItem('streak')) || 1;

  const today = new Date().toLocaleDateString('es-ES');
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('es-ES');

  if (lastPractice !== today) {
    if (lastPractice === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }
    lastPractice = today;
    localStorage.setItem('lastPractice', lastPractice);
    localStorage.setItem('streak', streak);
  }

  totalMinutes += 30;
  localStorage.setItem('totalMinutes', totalMinutes);

  document.querySelector('.stat-box:nth-child(1) h3').textContent = streak;
  document.querySelector('.stat-box:nth-child(2) h3').textContent = lastPractice;
  document.querySelector('.stat-box:nth-child(3) h3').textContent = Math.floor(totalMinutes / 60);
});
