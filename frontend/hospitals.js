const btn = document.getElementById('btnBuscar');
const results = document.getElementById('results');
const statusBar = document.getElementById('statusBar');
const cityInput = document.getElementById('cityInput');

btn.addEventListener('click', buscarHospitais);

async function buscarHospitais() {
  const city = (cityInput.value || 'arapiraca').trim();
  if (!city) return;

  statusBar.textContent = 'Buscando hospitais…';
  results.innerHTML = '';
  btn.disabled = true;

  try {
    const resp = await fetch(`http://localhost:3000/properties/hospitals?city=${encodeURIComponent(city)}`);
    if (!resp.ok) throw new Error(`Erro ${resp.status}`);

    const hospitais = await resp.json();

    statusBar.textContent = `${hospitais.length} resultado(s) encontrados.`;

    if (!Array.isArray(hospitais) || hospitais.length === 0) {
      results.innerHTML = `<div class="empty">Nenhum hospital encontrado para <strong>${escapeHtml(city)}</strong>.</div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    hospitais.forEach(h => {
      const card = document.createElement('article');
      card.className = 'card';

      const name = h.name || 'Sem nome';
      const addr = h.address_line1 || h.formatted || (h.street ? `${h.street}, ${h.housenumber || ''}` : 'Endereço não disponível');
      const phone = h.phone || h.phone_number || '';
      const dist = h.distance ? formatDistance(h.distance) : null;

      card.innerHTML = `
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(addr)}</p>

        <div class="meta">
          <div class="tag">${escapeHtml(h.city || h.municipality || h.county || '—')}</div>
          <div class="actions">
            ${phone ? `<button class="action-btn" onclick="window.open('tel:${encodeURIComponent(phone)}')">📞</button>` : ''}
            <button class="action-btn" onclick="openInMaps(${h.lat || h.latitude}, ${h.lon || h.longitude})">🗺 Ver mapa</button>
            ${dist ? `<div class="tag">${escapeHtml(dist)}</div>` : ''}
          </div>
        </div>
      `;

      fragment.appendChild(card);
    });

    results.appendChild(fragment);
  } catch (err) {
    console.error(err);
    statusBar.textContent = 'Erro ao buscar hospitais. Ver console.';
    results.innerHTML = `<div class="empty">Erro ao buscar dados. Tente novamente mais tarde.</div>`;
  } finally {
    btn.disabled = false;
  }
}

function openInMaps(lat, lon) {
  if (!lat || !lon) {
    alert('Coordenadas não disponíveis para esse local.');
    return;
  }
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  window.open(url, '_blank');
}

function formatDistance(d) {
  if (typeof d === 'number') {
    if (d >= 1000) return (d / 1000).toFixed(1) + ' km';
    return Math.round(d) + ' m';
  }
  return d;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  return str.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
