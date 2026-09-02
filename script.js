// ===== MODAL CONTROLS =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function closeModalOnOuter(event, id) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal(id);
  }
}

// ===== DYNAMIC CERTIFICATE MODAL =====
function openCertModal(title, pdfPath) {
  const titleEl = document.getElementById('cert-modal-title');
  const iframe = document.getElementById('cert-iframe');

  if (titleEl) titleEl.textContent = title;
  if (iframe) iframe.src = pdfPath + '#toolbar=0&navpanes=0&scrollbar=0';

  openModal('cert-modal');
}

// ===== DISABLE RIGHT-CLICK ON PROTECTED VIEWERS =====
document.addEventListener('contextmenu', function (e) {
  if (e.target.classList.contains('pdf-frame') || e.target.closest('.modal-content')) {
    e.preventDefault();
  }
});
