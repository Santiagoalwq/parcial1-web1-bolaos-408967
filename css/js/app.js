// SPA simple: cambia secciones al hacer click en nav
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  function showSection(name){
    pages.forEach(p => {
      if(p.dataset.section === name) p.classList.add('active');
      else p.classList.remove('active');
    });
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.section === name));
    history.replaceState({section:name}, '', `#${name}`);
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  // soporta back/forward del navegador
  window.addEventListener('popstate', (ev) => {
    const section = (ev.state && ev.state.section) || location.hash.replace('#','') || 'muro';
    showSection(section);
  });

  // Inicial: lee hash o default muro
  const initial = location.hash.replace('#','') || 'muro';
  showSection(initial);

  // Ejemplo simple de compartir post (no persistente)
  document.getElementById('post').addEventListener('click', () => {
    const ta = document.querySelector('.post-box textarea');
    const text = ta.value.trim();
    if(!text) { alert('Escribe algo antes de compartir'); return; }
    const postsContainer = document.querySelector('.posts');
    const postEl = document.createElement('article');
    postEl.className = 'post';
    postEl.innerHTML = `
      <div class="post-left"><div class="small-avatar"></div></div>
      <div class="post-body">
        <h4 class="post-author">Nombre</h4>
        <p class="post-time">Ahora</p>
        <p>${escapeHtml(text)}</p>
        <div class="post-actions">
          <button>Me gusta</button>
          <button>Compartir</button>
        </div>
      </div>
    `;
    postsContainer.insertBefore(postEl, postsContainer.firstChild);
    ta.value = '';
  });

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  }
});
