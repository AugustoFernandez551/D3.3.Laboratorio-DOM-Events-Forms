// Referenciamos el formulario y todos sus campos
const form = document.getElementById('formRegistro');
const campos = form.querySelectorAll('input, select');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Muestra el estado (error o éxito) de un campo
function validarCampo(campo) {
  const spanError = document.getElementById('error-' + campo.id);
  if (!spanError) return; // seguridad: si no existe el span, no hacemos nada

  if (campo.checkValidity()) {
    campo.classList.remove('input-error');
    campo.classList.add('input-success');
    spanError.textContent = '';
  } else {
    campo.classList.remove('input-success');
    campo.classList.add('input-error');
    spanError.textContent = campo.validationMessage;
  }
}

// Compara password y confirmPassword (validación cruzada)
function validarPasswords() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Las contraseñas no coinciden');
  } else {
    confirmPassword.setCustomValidity(''); // limpia el error personalizado
  }
}

// Evento 1: input -> valida mientras el usuario escribe
campos.forEach(campo => {
  campo.addEventListener('input', () => {
    if (campo === password || campo === confirmPassword) {
      validarPasswords();
    }
    validarCampo(campo);
  });
});

// Evento 2: focusout -> valida al salir del campo
campos.forEach(campo => {
  campo.addEventListener('focusout', () => {
    if (campo === password || campo === confirmPassword) {
      validarPasswords();
    }
    validarCampo(campo);
  });
});

// Evento 3: submit -> intercepta el envío y arma el objeto final
const resultado = document.getElementById('resultado');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validarPasswords();
  campos.forEach(validarCampo);

  if (form.checkValidity()) {
    const formData = {};
    campos.forEach(campo => {
      formData[campo.name] = campo.type === 'checkbox' ? campo.checked : campo.value;
    });

    console.table(formData);
    resultado.textContent = '✅ Formulario enviado correctamente. Revisa la consola (F12).';
    resultado.className = 'resultado exito';
  } else {
    resultado.textContent = '❌ Corrige los campos marcados en rojo.';
    resultado.className = 'resultado fallo';
  }
});