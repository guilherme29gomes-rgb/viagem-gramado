(() => {
  "use strict";

  // ---------- utilidades ----------
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(chave, padrao) {
      try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch { return padrao; }
    },
    set(chave, valor) {
      try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* sem armazenamento */ }
    },
  };

  const urlMapa = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const urlGoogleFotos = (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`;
  const marca = (l) => `<span class="monograma" aria-hidden="true">${esc(l.nome.charAt(0))}</span>`;
  const ICO_FOTO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`;
  const ICO_PINO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/></svg>`;
  const urlBusca = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

  // ---------- fotos (Wikimedia Commons, carregadas no navegador) ----------
  const CACHE_FOTOS = "fotos-v1";
  const cacheFotos = store.get(CACHE_FOTOS, {});
  const pedidos = {};

  // Na versão publicada como página do Claude, fotos externas são bloqueadas.
  const fotosOnline = window.FOTOS_ONLINE !== false;

  function buscarFotos(termo) {
    if (!termo || !fotosOnline) return Promise.resolve([]);
    if (cacheFotos[termo]) return Promise.resolve(cacheFotos[termo]);
    if (pedidos[termo]) return pedidos[termo];
    const params = new URLSearchParams({
      action: "query", format: "json", origin: "*",
      generator: "search", gsrsearch: `filetype:bitmap ${termo}`, gsrnamespace: "6", gsrlimit: "8",
      prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "900",
    });
    pedidos[termo] = fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
      .then((r) => r.json())
      .then((j) => {
        const paginas = Object.values((j.query && j.query.pages) || {}).sort((a, b) => a.index - b.index);
        const fotos = paginas
          .map((p) => {
            const info = p.imageinfo && p.imageinfo[0];
            if (!info || !info.thumburl) return null;
            const meta = info.extmetadata || {};
            const autor = meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, "").trim() : "";
            const lic = meta.LicenseShortName ? meta.LicenseShortName.value : "";
            return { src: info.thumburl, pagina: info.descriptionurl, credito: [autor, lic].filter(Boolean).join(" · ") };
          })
          .filter(Boolean);
        cacheFotos[termo] = fotos;
        store.set(CACHE_FOTOS, cacheFotos);
        return fotos;
      })
      .catch(() => []);
    return pedidos[termo];
  }

  // Preenche elementos com data-foto quando ficam visíveis.
  const observador = "IntersectionObserver" in window
    ? new IntersectionObserver((entradas) => {
        entradas.forEach((e) => { if (e.isIntersecting) { observador.unobserve(e.target); carregarFoto(e.target); } });
      }, { rootMargin: "200px" })
    : null;

  function carregarFoto(el) {
    buscarFotos(el.dataset.foto).then((fotos) => {
      if (!fotos.length) return;
      const img = new Image();
      img.alt = "";
      img.loading = "lazy";
      img.onload = () => el.prepend(img);
      img.src = fotos[0].src;
    });
  }

  function ativarFotos(raiz) {
    raiz.querySelectorAll("[data-foto]").forEach((el) => {
      if (!el.dataset.foto) return;
      observador ? observador.observe(el) : carregarFoto(el);
    });
  }

  // ---------- galeria ----------
  const dlg = $("#galeria");
  $(".fechar", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  function abrirGaleria(lugar) {
    $("#galeria-titulo").textContent = lugar.nome;
    const box = $("#galeria-fotos");
    box.innerHTML = lugar.foto ? `<p class="vazio">Carregando fotos…</p>` : "";
    $("#galeria-links").innerHTML = `
      <a class="pill" href="${urlGoogleFotos(lugar.mapa || lugar.nome)}" target="_blank" rel="noopener">${ICO_FOTO} Mais fotos no Google</a>
      <a class="pill" href="${urlMapa(lugar.mapa || lugar.nome)}" target="_blank" rel="noopener">${ICO_PINO} Abrir no mapa</a>`;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    if (!lugar.foto || !fotosOnline) {
      box.innerHTML = `<p class="vazio">Toque em "Mais fotos no Google" para ver este lugar.</p>`;
      return;
    }
    buscarFotos(lugar.foto).then((fotos) => {
      box.innerHTML = fotos.length
        ? fotos.map((f) => `<figure><img src="${esc(f.src)}" alt="${esc(lugar.nome)}" loading="lazy"><figcaption><a href="${esc(f.pagina)}" target="_blank" rel="noopener">Wikimedia Commons</a>${f.credito ? " · " + esc(f.credito) : ""}</figcaption></figure>`).join("")
        : `<p class="vazio">Não encontrei fotos agora (sem internet?). Tente o botão abaixo.</p>`;
    });
  }

  // Cliques em qualquer [data-galeria] abrem as fotos.
  document.addEventListener("click", (e) => {
    const alvo = e.target.closest("[data-galeria]");
    if (!alvo) return;
    const id = alvo.dataset.galeria;
    const lugar = LOCAIS[id] || EXTRAS.find((x) => x.id === id);
    if (lugar) abrirGaleria(lugar);
  });

  // ---------- contagem regressiva ----------
  function contagem() {
    const dias = Math.ceil((new Date(VIAGEM.inicio) - new Date()) / 86400000);
    const fim = new Date("2026-11-12T23:59:00-03:00");
    let txt;
    if (dias > 1) txt = `Faltam ${dias} dias`;
    else if (dias === 1) txt = "É amanhã!";
    else if (new Date() <= fim) txt = "Boa viagem!";
    else txt = "Viagem concluída";
    $("#contagem").textContent = txt;
  }

  // ---------- Roteiro ----------
  function diaInicial() {
    const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
    const i = ROTEIRO.findIndex((d) => d.data === hoje);
    return i >= 0 ? i : store.get("dia", 0);
  }
  let diaAtual = Math.min(diaInicial(), ROTEIRO.length - 1);

  function renderRoteiro() {
    const sec = $("#aba-roteiro");
    const dia = ROTEIRO[diaAtual];
    const capa = LOCAIS[dia.capa];
    const extrasDoDia = store.get("extras", {});
    const meus = EXTRAS.filter((x) => extrasDoDia[x.id] === dia.data);

    sec.innerHTML = `
      <div class="dias" role="group" aria-label="Dias da viagem">
        ${ROTEIRO.map((d, i) => `<button class="dia-btn" data-dia="${i}" aria-pressed="${i === diaAtual}">
          <small>${d.titulo.split(" ")[0].slice(0, 3)}</small><b>${d.titulo.split(" ")[1].slice(0, 2)}</b></button>`).join("")}
      </div>
      <article class="card">
        <div class="capa" data-foto="${esc(capa.foto || "")}" data-galeria="${dia.capa}">
          ${marca(capa)}
          <span class="ver-fotos">${ICO_FOTO} fotos</span>
          <div class="legenda"><h3>${esc(dia.titulo)}</h3><p>${esc(dia.subtitulo)}</p></div>
        </div>
        <ol class="timeline">
          ${dia.itens.map(itemHTML).join("")}
          ${meus.map((x) => `<li><span class="hora">Extra</span><div><p class="item-texto">${esc(x.nome)} <span class="tag kids">adicionado</span></p>
            <div class="item-local">${miniHTML(x, x.id)}<div class="links">
              <a class="pill" href="${urlMapa(x.mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a></div></div></div></li>`).join("")}
        </ol>
      </article>`;

    sec.querySelectorAll("[data-dia]").forEach((b) => b.addEventListener("click", () => {
      diaAtual = Number(b.dataset.dia);
      store.set("dia", diaAtual);
      renderRoteiro();
    }));
    const ativo = sec.querySelector('[aria-pressed="true"]');
    if (ativo && ativo.scrollIntoView) ativo.scrollIntoView({ inline: "center", block: "nearest" });
    ativarFotos(sec);
  }

  function miniHTML(lugar, id) {
    return `<button class="mini" data-foto="${esc(lugar.foto || "")}" data-galeria="${id}" aria-label="Fotos de ${esc(lugar.nome)}">${marca(lugar)}</button>`;
  }

  function itemHTML(it) {
    const l = it.local && LOCAIS[it.local];
    return `<li><span class="hora">${esc(it.hora)}</span><div>
      <p class="item-texto">${esc(it.texto)}</p>
      ${l ? `<div class="item-local">${miniHTML(l, it.local)}<div class="links">
        <button class="pill" data-galeria="${it.local}">${ICO_FOTO} ${esc(l.nome)}</button>
        <a class="pill" href="${urlMapa(l.mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a></div></div>` : ""}
    </div></li>`;
  }

  // ---------- Pendências ----------
  function renderPendencias() {
    const sec = $("#aba-pendencias");
    const feito = store.get("pendencias", {});
    const minhas = store.get("minhas-pendencias", []);
    const grupos = PENDENCIAS.concat(minhas.length ? [{ grupo: "Minhas pendências", itens: minhas, editavel: true }] : []);
    const total = grupos.reduce((n, g) => n + g.itens.length, 0);
    const ok = grupos.reduce((n, g) => n + g.itens.filter((i) => feito[i.id]).length, 0);

    sec.innerHTML = `
      <h2 class="secao">Pendências</h2>
      <div class="progresso"><div style="width:${total ? (ok / total) * 100 : 0}%"></div></div>
      <p class="progresso-txt">${ok} de ${total} resolvidas</p>
      ${grupos.map((g) => `
        <h2 class="secao">${esc(g.grupo)}</h2>
        <div class="card"><ul class="check-lista">
          ${g.itens.map((i) => `<li><label><input type="checkbox" data-id="${esc(i.id)}" ${feito[i.id] ? "checked" : ""}><span>${esc(i.texto)}</span>
            ${g.editavel ? `<button class="remover" data-remover="${esc(i.id)}" aria-label="Remover">✕</button>` : ""}</label></li>`).join("")}
        </ul></div>`).join("")}
      <form class="add-form" id="form-pendencia">
        <input id="nova-pendencia" placeholder="Adicionar pendência…" autocomplete="off" aria-label="Nova pendência">
        <button class="btn" type="submit">Adicionar</button>
      </form>`;

    sec.querySelectorAll("input[type=checkbox]").forEach((c) => c.addEventListener("change", () => {
      feito[c.dataset.id] = c.checked;
      store.set("pendencias", feito);
      renderPendencias();
    }));
    sec.querySelectorAll("[data-remover]").forEach((b) => b.addEventListener("click", (e) => {
      e.preventDefault();
      store.set("minhas-pendencias", minhas.filter((m) => m.id !== b.dataset.remover));
      renderPendencias();
    }));
    $("#form-pendencia").addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = $("#nova-pendencia").value.trim();
      if (!txt) return;
      minhas.push({ id: "m-" + Date.now(), texto: txt });
      store.set("minhas-pendencias", minhas);
      renderPendencias();
    });
  }

  // ---------- Ingressos ----------
  function renderIngressos() {
    const sec = $("#aba-ingressos");
    const comprados = store.get("ingressos", {});
    sec.innerHTML = `
      <h2 class="secao">Ingressos e reservas</h2>
      <p class="intro">O que dá para comprar ou reservar antes. Marque quando garantir. Preços mudam — confira sempre no site oficial.</p>
      <div class="grade">
        ${INGRESSOS.map((i) => {
          const l = LOCAIS[i.local];
          const ok = comprados[i.id];
          return `<article class="card">
            <div class="capa" data-foto="${esc(l.foto || "")}" data-galeria="${i.local}">${marca(l)}<span class="ver-fotos">${ICO_FOTO} fotos</span></div>
            <div class="corpo">
              <h3>${esc(l.nome)}</h3>
              <div class="meta"><span class="tag">${esc(i.dia)}</span>
                <span class="tag ${ok ? "ok" : "status"}">${ok ? "Garantido" : esc(i.status)}</span></div>
              <p>${esc(i.dica)}</p>
              <div class="acoes">
                <a class="btn" href="${urlBusca(i.busca)}" target="_blank" rel="noopener">Onde comprar</a>
                <button class="btn sec" data-ingresso="${i.id}">${ok ? "Desmarcar" : "Marcar como comprado"}</button>
              </div>
            </div></article>`;
        }).join("")}
      </div>
      <p class="aviso">Gratuitos no roteiro: Parada de Natal, Vila de Natal, Palco Rua Coberta, Lago Negro (pedalinho é pago à parte) e show de luzes do Palácio dos Festivais.</p>`;

    sec.querySelectorAll("[data-ingresso]").forEach((b) => b.addEventListener("click", () => {
      comprados[b.dataset.ingresso] = !comprados[b.dataset.ingresso];
      store.set("ingressos", comprados);
      renderIngressos();
    }));
    ativarFotos(sec);
  }

  // ---------- Extras ----------
  let filtroExtras = "todos";
  function renderExtras() {
    const sec = $("#aba-extras");
    const escolhidos = store.get("extras", {});
    const lista = EXTRAS.filter((x) =>
      filtroExtras === "todos" ? true : filtroExtras === "kids" ? x.kids : x.cidade === filtroExtras);
    const opcoesDia = ROTEIRO.slice(0, -1).map((d) => `<option value="${d.data}">${esc(d.titulo)}</option>`).join("");

    sec.innerHTML = `
      <h2 class="secao">Lugares fora do roteiro</h2>
      <p class="intro">Ideias para encaixar. Escolha um dia e o lugar aparece no roteiro daquele dia.</p>
      <div class="filtros">
        ${[["todos", "Todos"], ["kids", "Bom com criança"], ["Gramado", "Gramado"], ["Canela", "Canela"]]
          .map(([v, t]) => `<button class="pill" data-filtro="${v}" aria-pressed="${filtroExtras === v}">${t}</button>`).join("")}
      </div>
      <div class="grade">
        ${lista.map((x) => `<article class="card">
          <div class="capa" data-foto="${esc(x.foto)}" data-galeria="${x.id}">${marca(x)}<span class="ver-fotos">${ICO_FOTO} fotos</span></div>
          <div class="corpo">
            <h3>${esc(x.nome)}</h3>
            <div class="meta"><span class="tag">${esc(x.cidade)}</span>${x.kids ? `<span class="tag kids">bom com criança</span>` : ""}</div>
            <p>${esc(x.dica)}</p>
            <div class="acoes">
              <select data-extra="${x.id}" aria-label="Incluir ${esc(x.nome)} no roteiro" class="pill">
                <option value="">Incluir no dia…</option>${opcoesDia}
              </select>
              <a class="pill" href="${urlMapa(x.mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a>
            </div>
          </div></article>`).join("")}
      </div>`;

    sec.querySelectorAll("[data-extra]").forEach((s) => {
      s.value = escolhidos[s.dataset.extra] || "";
      s.addEventListener("change", () => {
        if (s.value) escolhidos[s.dataset.extra] = s.value; else delete escolhidos[s.dataset.extra];
        store.set("extras", escolhidos);
        renderRoteiro();
      });
    });
    sec.querySelectorAll("[data-filtro]").forEach((b) => b.addEventListener("click", () => {
      filtroExtras = b.dataset.filtro;
      renderExtras();
    }));
    ativarFotos(sec);
  }

  // ---------- Descontos ----------
  function renderDescontos() {
    $("#aba-descontos").innerHTML = `
      <h2 class="secao">Apps e sites de desconto</h2>
      <div class="app-lista">
        ${APPS.map((a) => `<a class="card app-item" href="${esc(a.link)}" target="_blank" rel="noopener">
          <span class="app-ico">${marca(a)}</span>
          <div><h3>${esc(a.nome)} <span class="tag">${esc(a.cat)}</span></h3><p>${esc(a.desc)}</p></div></a>`).join("")}
      </div>
      <h2 class="secao">Dicas para economizar</h2>
      <div class="card"><ul class="dicas">${DICAS_DESCONTO.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
      <p class="aviso">Descontos e parcerias mudam com frequência; confira as condições na hora da compra.</p>`;
  }

  // ---------- abas ----------
  const abas = document.querySelectorAll(".abas [data-aba]");
  function mostrarAba(nome) {
    abas.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.aba === nome)));
    document.querySelectorAll(".aba").forEach((s) => s.classList.toggle("ativa", s.id === "aba-" + nome));
    store.set("aba", nome);
    window.scrollTo(0, 0);
  }
  abas.forEach((b) => b.addEventListener("click", () => mostrarAba(b.dataset.aba)));

  contagem();
  renderRoteiro();
  renderPendencias();
  renderIngressos();
  renderExtras();
  renderDescontos();
  mostrarAba(store.get("aba", "roteiro"));

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
