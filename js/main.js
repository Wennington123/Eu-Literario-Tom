(() => {
  'use strict';

  function esc(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });

    // ── Tabs for livro.html ──
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + tabId).classList.add('active');
      });
    });

    // ── Load poems JSON for livro.html (reader) ──
    const poemasContainer = document.getElementById('poemas-container');
    if (poemasContainer) {
      fetch('assets/poemas.json')
        .then(r => r.json())
        .then(poemas => {
          poemas.forEach(p => {
            const div = document.createElement('div');
            div.className = 'poem';
            div.innerHTML = '<h3>' + esc(p.titulo) + '</h3><p>' + esc(p.texto) + '</p>';
            poemasContainer.appendChild(div);
          });
        })
        .catch(err => console.error('Erro ao carregar poemas:', err));
    }

    // ── Load poems JSON for poemas.html (cards) ──
    const poemsList = document.getElementById('poems-list');
    if (poemsList) {
      fetch('assets/poemas.json')
        .then(r => r.json())
        .then(poemas => {
          poemas.forEach(p => {
            const card = document.createElement('div');
            card.className = 'poem-card';
            card.innerHTML = '<h3>' + esc(p.titulo) + '</h3><div class="poem-body">' + esc(p.texto) + '</div>';
            poemsList.appendChild(card);
          });
        })
        .catch(err => console.error('Erro ao carregar poemas:', err));
    }

    // ── Load seções (Apresentação + Biografia) ──
    const apresentacaoEl = document.getElementById('apresentacao');
    const biografiaEl = document.getElementById('biografia');
    if (apresentacaoEl || biografiaEl) {
      fetch('assets/secoes.json')
        .then(r => r.json())
        .then(secoes => {
          if (apresentacaoEl && secoes.apresentacao) {
            apresentacaoEl.innerHTML = '<h3>Apresentação</h3>' + esc(secoes.apresentacao);
          }
          if (biografiaEl && secoes.bio) {
            biografiaEl.innerHTML = '<h3>Biografia do Autor</h3>' + esc(secoes.bio);
          }
        })
        .catch(err => console.error('Erro ao carregar seções:', err));
    }
  });
})();
