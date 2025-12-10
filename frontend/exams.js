const btnBuscarExames = document.getElementById("btnBuscarExames");
const statusBar = document.getElementById("statusBar");
const results = document.getElementById("results");

btnBuscarExames.addEventListener("click", async () => {
  statusBar.textContent = "Buscando exames...";
  results.innerHTML = "";

  try {
    const response = await fetch("http://localhost:3000/exames");
    const exames = await response.json();

    if (!Array.isArray(exames) || exames.length === 0) {
      statusBar.textContent = "Nenhum exame encontrado.";
      results.innerHTML = `<div class="empty">Nenhum exame registrado.</div>`;
      return;
    }

    statusBar.textContent = `${exames.length} exame(s) encontrado(s).`;

    exames.forEach((exame) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${exame.nome}</h3>
        <p>${exame.descricao ?? "Sem descrição"}</p>

        <div class="meta">
          <span class="tag">Exame</span>
          <div class="actions">
            <button class="action-btn">Detalhes</button>
          </div>
        </div>
      `;

      results.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    statusBar.textContent = "Erro ao buscar exames.";
    results.innerHTML = `<div class="empty">Falha na conexão com a API.</div>`;
  }
});
