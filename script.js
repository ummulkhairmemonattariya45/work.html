// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ===== Dropdown submenu toggle (mobile) =====
  document.querySelectorAll('.dropdown-toggle').forEach((toggleLink) => {
    toggleLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        const parent = toggleLink.closest('.nav-item-dropdown');
        if (parent) parent.classList.toggle('open');
      }
    });
  });

  // ===== Case card selection (istihaza scenarios) =====
  const caseCards = document.querySelectorAll('.case-card');
  const caseSelectBtns = document.querySelectorAll('.case-select-btn');
  const qTypeSelect = document.querySelector('#q-type');

  caseSelectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const caseValue = btn.getAttribute('data-case');

      caseCards.forEach((card) => {
        card.classList.toggle('selected', card.getAttribute('data-case') === caseValue);
      });

      if (qTypeSelect) {
        qTypeSelect.value = caseValue;
      }

      const form = document.querySelector('#question-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Question form handling (fiqh pages) =====
  const form = document.querySelector('#question-form');
  const status = document.querySelector('#form-status');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameField = form.querySelector('#q-name');
      const typeField = form.querySelector('#q-type');
      const textField = form.querySelector('#q-text');

      const name = nameField ? nameField.value.trim() : '';
      const type = typeField ? typeField.value : null;
      const question = textField ? textField.value.trim() : '';

      const typeOk = typeField ? !!type : true;

      if (!name || !typeOk || (textField && textField.hasAttribute('required') && !question)) {
        status.textContent = 'براہ کرم تمام لازمی خانے پُر کریں۔';
        status.className = 'form-status error';
        return;
      }

      // Placeholder submission — replace with real endpoint when available
      status.textContent = 'آپ کا سوال موصول ہوگیا۔ جلد جواب دیا جائے گا، جزاک اللہ۔';
      status.className = 'form-status success';
      form.reset();
    });
  }
});