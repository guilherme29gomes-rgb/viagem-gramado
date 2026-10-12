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
  const ICONES = {
    aviao: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>',
    carro: '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><path d="M5 12h14M7 17v2M17 17v2"/><circle cx="8.5" cy="14.5" r=".8"/><circle cx="15.5" cy="14.5" r=".8"/>',
    hotel: '<path d="M3 20V8l9-5 9 5v12"/><path d="M9.5 20v-5h5v5"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
    arvore: '<path d="M12 2.5l5 7h-3l4.5 6.5h-13L10 9.5H7z"/><path d="M12 16v5"/>',
    estrela: '<path d="M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.4l-5.3 2.9 1.1-5.9-4.4-4.1 6-.8z"/>',
    presente: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11"/><path d="M12 9C10.5 5.5 7 5 7 7.2 7 9 12 9 12 9s5 0 5-1.8C17 5 13.5 5.5 12 9z"/>',
    garfo: '<path d="M6 3v6a2 2 0 0 0 4 0V3M8 11v10"/><path d="M17 21V3c-2 1.5-3 4-3 8h3"/>',
    bondinho: '<path d="M3 5.5L21 3"/><path d="M12 4.3V8"/><rect x="6" y="8" width="12" height="11" rx="2"/><path d="M6 13h12M12 13v6"/>',
    montanha: '<path d="M2.5 20l6.5-12 4 6.5 3-4 5.5 9.5z"/>',
    lago: '<path d="M3 15c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M3 19c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M9 11c0-2.5 1.5-4 3.5-4S16 8.5 16 11"/>',
    cafe: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3.5v3M12 3.5v3"/>',
    onda: '<path d="M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/><path d="M8 14c-1-2 1-3 0-6M12 14c-1-2 1-3 0-6M16 14c-1-2 1-3 0-6"/>',
    castelo: '<path d="M4 20V9h3V6h2v3h2V6h2v3h2V6h2v3h3v11z"/><path d="M10 20v-4h4v4"/>',
    pin: '<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
    igreja: '<path d="M12 2v4M10 4h4"/><path d="M6 21V11l6-5 6 5v10z"/><path d="M10 21v-4h4v4"/>',
    flor: '<circle cx="12" cy="8.5" r="2.2"/><path d="M12 6.3c0-3 3.5-3 2.5-.3M14.2 8.5c3 0 3 3.5.3 2.5M12 10.7c0 3-3.5 3-2.5.3M9.8 8.5c-3 0-3-3.5-.3-2.5"/><path d="M12 11v10M12 17c-2-2-4.5-1.5-4.5-1.5M12 18c2-2 4.5-1.5 4.5-1.5"/>',
    museu: '<path d="M3 9l9-5 9 5"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    trem: '<rect x="5" y="3.5" width="14" height="13" rx="3"/><path d="M5 10.5h14M9 19.5l-2 2M15 19.5l2 2"/><circle cx="9" cy="13.5" r=".8"/><circle cx="15" cy="13.5" r=".8"/>',
    neve: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5"/>',
  };
  // Fotos salvas junto com o app (fotos.js). Onde não houver, fica o ícone.
  const FOTOS_LOCAIS = window.FOTOS_LOCAIS || {};
  Object.entries(LOCAIS).forEach(([id, l]) => { l.id = id; });
  const fotoDe = (l) => FOTOS_LOCAIS[l.id];
  const icone = (l) => fotoDe(l)
    ? `<span class="icone-local foto" aria-hidden="true"><img src="${esc(fotoDe(l).src)}" alt=""></span>`
    : `<span class="icone-local" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONES[l.tipo] || ICONES.pin}</svg></span>`;
  // Capa grande: foto salva; senão, busca online (quando permitido).
  const capaHTML = (l, id) => {
    if (fotoDe(l) && fotoDe(l).pequena) return "";
    if (fotoDe(l)) return `<div class="capa" data-galeria="${id}"><img src="${esc(fotoDe(l).src)}" alt="${esc(l.nome)}"><span class="ver-fotos">${ICO_FOTO} fotos</span></div>`;
    if (fotosOnline && l.foto) return `<div class="capa" data-foto="${esc(l.foto)}" data-galeria="${id}">${icone(l)}<span class="ver-fotos">${ICO_FOTO} fotos</span></div>`;
    return "";
  };
  const ICO_FOTO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`;
  const ICO_PINO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/></svg>`;
  const ICO_ZAP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/></svg>`;
  const ICO_SITE = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>`;
  const ICO_INSTA = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>`;
  const ICO_FONE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>`;
  // Botões de contato (site, WhatsApp, telefone) de um local, quando houver.
  function contatoHTML(id) {
    const c = (typeof CONTATOS !== "undefined" && CONTATOS[id]) || null;
    if (!c) return "";
    const tel = c.telefone ? c.telefone.replace(/\D/g, "") : "";
    return [
      c.site ? `<a class="pill" href="${esc(c.site)}" target="_blank" rel="noopener">${ICO_SITE} Site</a>` : "",
      c.instagram ? `<a class="pill insta" href="https://www.instagram.com/${esc(c.instagram)}/" target="_blank" rel="noopener">${ICO_INSTA} @${esc(c.instagram)}</a>` : "",
      c.whatsapp ? `<a class="pill zap" href="https://wa.me/55${esc(c.whatsapp)}" target="_blank" rel="noopener">${ICO_ZAP} WhatsApp</a>` : "",
      tel ? `<a class="pill" href="tel:+55${tel}">${ICO_FONE} ${esc(c.telefone)}</a>` : "",
    ].join("") + (c.obs || c.confirmar ? `<p class="contato-obs">${esc(c.obs || "Contato tirado de matéria de turismo: confirme antes de pagar.")}</p>` : "");
  }
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
    const salva = fotoDe(lugar);
    const figura = (src, link, credito) => `<figure><img src="${esc(src)}" alt="${esc(lugar.nome)}" loading="lazy"><figcaption>${link ? `<a href="${esc(link)}" target="_blank" rel="noopener">${link.includes("wikimedia") ? "Wikimedia Commons" : link.includes("flickr") ? "Flickr" : "Fonte"}</a>` : ""}${credito ? " · " + esc(credito) : ""}</figcaption></figure>`;
    const primeira = salva ? figura(salva.src, salva.pagina, salva.credito) : "";
    box.innerHTML = primeira || (lugar.foto ? `<p class="vazio">Carregando fotos…</p>` : "");
    $("#galeria-links").innerHTML = `
      <a class="pill" href="${urlGoogleFotos(lugar.mapa || lugar.nome)}" target="_blank" rel="noopener">${ICO_FOTO} Mais fotos no Google</a>
      <a class="pill" href="${urlMapa(lugar.mapa || lugar.nome)}" target="_blank" rel="noopener">${ICO_PINO} Abrir no mapa</a>`;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    if (!lugar.foto || !fotosOnline) {
      if (!primeira) box.innerHTML = `<p class="vazio">Toque em "Mais fotos no Google" para ver este lugar.</p>`;
      return;
    }
    buscarFotos(lugar.foto).then((fotos) => {
      const outras = fotos.filter((f) => !salva || f.pagina !== salva.pagina);
      box.innerHTML = primeira + outras.map((f) => figura(f.src, f.pagina, f.credito)).join("")
        || `<p class="vazio">Não encontrei fotos agora (sem internet?). Tente o botão abaixo.</p>`;
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
    const extrasDoDia = store.get("extras", {});
    const meus = EXTRAS.filter((x) => extrasDoDia[x.id] === dia.data);

    sec.innerHTML = `
      <div class="dias" role="group" aria-label="Dias da viagem">
        ${ROTEIRO.map((d, i) => `<button class="dia-btn" data-dia="${i}" aria-pressed="${i === diaAtual}">
          <small>${d.titulo.split(" ")[0].slice(0, 3)}</small><b>${d.titulo.split(" ")[1].slice(0, 2)}</b></button>`).join("")}
      </div>
      <header class="dia-topo">
        <p class="dia-sub">${esc(dia.subtitulo)}</p>
        <h2>${esc(dia.titulo)}</h2>
      </header>
      <ol class="blocos">
        ${dia.itens.map(itemHTML).join("")}
        ${meus.map((x) => blocoHTML({ hora: "Extra", texto: x.nome, extra: true }, x, x.id, true)).join("")}
      </ol>`;

    sec.querySelectorAll("[data-dia]").forEach((b) => b.addEventListener("click", () => {
      diaAtual = Number(b.dataset.dia);
      store.set("dia", diaAtual);
      renderRoteiro();
    }));
    const ativo = sec.querySelector('[aria-pressed="true"]');
    if (ativo && ativo.scrollIntoView) ativo.scrollIntoView({ inline: "center", block: "nearest" });
    ativarFotos(sec);
  }

  let vistos = new Set();
  function itemHTML(it, i) {
    if (i === 0) vistos = new Set();
    const l = it.local && LOCAIS[it.local];
    const comFoto = l && !vistos.has(it.local);
    if (l) vistos.add(it.local);
    return blocoHTML(it, l, it.local, comFoto);
  }

  function blocoHTML(it, l, id, comFoto) {
    const capa = l && comFoto ? capaHTML(l, id) : "";
    return `<li class="bloco${l ? "" : " simples"}">
      ${capa}
      <div class="bloco-corpo">
        <p class="hora">${esc(it.hora)}${it.extra ? ` <span class="tag kids">adicionado</span>` : ""}</p>
        ${l ? `<div class="titulo-local">${capa ? "" : icone(l)}<h3 class="bloco-local">${esc(l.nome)}</h3></div>` : ""}
        <p class="item-texto">${esc(it.texto)}</p>
        ${l ? `<div class="links">
          <button class="pill" data-galeria="${id}">${ICO_FOTO} Fotos</button>
          <a class="pill" href="${urlMapa(l.mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a>
          ${comFoto ? contatoHTML(id) : ""}</div>` : ""}
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
            ${g.editavel ? `<button class="remover" data-remover="${esc(i.id)}" aria-label="Remover">✕</button>` : ""}</label>
            ${i.local ? `<div class="links pend-links">${contatoHTML(i.local)}<a class="pill" href="${urlMapa(LOCAIS[i.local].mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a></div>` : ""}</li>`).join("")}
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
            ${capaHTML(l, i.local)}
            <div class="corpo">
              <div class="titulo-local">${capaHTML(l, i.local) ? "" : icone(l)}<h3>${esc(l.nome)}</h3></div>
              <div class="meta"><span class="tag">${esc(i.dia)}</span>
                <span class="tag ${ok ? "ok" : "status"}">${ok ? "Garantido" : esc(i.status)}</span></div>
              <p>${esc(i.dica)}</p>
              <div class="acoes">
                <a class="btn" href="${(CONTATOS[i.local] && CONTATOS[i.local].site) || urlBusca(i.busca)}" target="_blank" rel="noopener">${CONTATOS[i.local] && CONTATOS[i.local].site ? "Comprar no site" : "Onde comprar"}</a>
                ${CONTATOS[i.local] && CONTATOS[i.local].whatsapp ? `<a class="pill zap" href="https://wa.me/55${esc(CONTATOS[i.local].whatsapp)}" target="_blank" rel="noopener">${ICO_ZAP} WhatsApp</a>` : ""}
                ${CONTATOS[i.local] && CONTATOS[i.local].instagram ? `<a class="pill insta" href="https://www.instagram.com/${esc(CONTATOS[i.local].instagram)}/" target="_blank" rel="noopener">${ICO_INSTA} Instagram</a>` : ""}
                <button class="pill" data-galeria="${i.local}">${ICO_FOTO} Fotos</button>
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
          ${capaHTML(x, x.id)}
          <div class="corpo">
            <div class="titulo-local">${capaHTML(x, x.id) ? "" : icone(x)}<h3>${esc(x.nome)}</h3></div>
            <div class="meta"><span class="tag">${esc(x.cidade)}</span>${x.kids ? `<span class="tag kids">bom com criança</span>` : ""}</div>
            <p>${esc(x.dica)}</p>
            <div class="acoes">
              <select data-extra="${x.id}" aria-label="Incluir ${esc(x.nome)} no roteiro" class="pill">
                <option value="">Incluir no dia…</option>${opcoesDia}
              </select>
              <button class="pill" data-galeria="${x.id}">${ICO_FOTO} Fotos</button>
              <a class="pill" href="${urlMapa(x.mapa)}" target="_blank" rel="noopener">${ICO_PINO} Mapa</a>
              ${contatoHTML(x.id)}
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

  // ---------- Mala ----------
  let malaAtual = store.get("mala-secao", MALA[0].id);
  function renderMala() {
    const sec = $("#aba-mala");
    const feito = store.get("mala", {});
    const atual = MALA.find((m) => m.id === malaAtual) || MALA[0];
    const contar = (m) => {
      let total = 0, ok = 0;
      m.grupos.forEach((g, gi) => g.itens.forEach((_, ii) => { total++; if (feito[`${m.id}-${gi}-${ii}`]) ok++; }));
      return { total, ok };
    };
    const c = contar(atual);

    sec.innerHTML = `
      <h2 class="secao">Mala</h2>
      <p class="intro">Sugestão para 6 dias na serra em novembro: noites por volta de 10°C, dias até 25°C e chance de chuva.</p>
      <div class="segmentos" role="group" aria-label="Seção da mala">
        ${MALA.map((m) => { const n = contar(m); return `<button data-mala="${m.id}" aria-pressed="${m.id === atual.id}">
          ${esc(m.nome)}<small>${n.ok}/${n.total}</small></button>`; }).join("")}
      </div>
      <div class="progresso"><div style="width:${c.total ? (c.ok / c.total) * 100 : 0}%"></div></div>
      <p class="progresso-txt">${c.ok} de ${c.total} itens na mala</p>
      ${atual.grupos.map((g, gi) => `
        <h3 class="subsecao">${esc(g.titulo)}</h3>
        <div class="card"><ul class="check-lista">
          ${g.itens.map((t, ii) => { const id = `${atual.id}-${gi}-${ii}`; return `<li><label>
            <input type="checkbox" data-id="${id}" ${feito[id] ? "checked" : ""}><span>${esc(t)}</span></label></li>`; }).join("")}
        </ul></div>`).join("")}`;

    sec.querySelectorAll("[data-mala]").forEach((b) => b.addEventListener("click", () => {
      malaAtual = b.dataset.mala;
      store.set("mala-secao", malaAtual);
      renderMala();
    }));
    sec.querySelectorAll("input[type=checkbox]").forEach((cb) => cb.addEventListener("change", () => {
      feito[cb.dataset.id] = cb.checked;
      store.set("mala", feito);
      renderMala();
    }));
  }

  // ---------- Descontos ----------
  function renderDescontos() {
    const lista = (itens) => `<div class="app-lista">
        ${itens.map((a) => `<a class="card app-item" href="${esc(a.link)}" target="_blank" rel="noopener">
          <div><h3>${esc(a.nome)} <span class="tag">${esc(a.cat)}</span></h3><p>${esc(a.desc)}</p></div></a>`).join("")}
      </div>`;
    $("#aba-descontos").innerHTML = `
      <h2 class="secao">Dicas para pagar menos</h2>
      <div class="card"><ul class="dicas">${DICAS_DESCONTO.map((d) => `<li><b>${esc(d.titulo)}.</b> ${esc(d.texto)}</li>`).join("")}</ul></div>
      <h2 class="secao">Usar seus pontos</h2>
      <div class="app-lista">
        ${PONTOS.map((a) => `<a class="card app-item" href="${esc(a.link)}" target="_blank" rel="noopener">
          <div><h3>${esc(a.nome)} <span class="tag ${a.ok ? "ok" : "status"}">${esc(a.status)}</span></h3><p>${esc(a.desc)}</p></div></a>`).join("")}
      </div>
      <p class="aviso">${esc(DICA_PONTOS)}</p>
      <h2 class="secao">Grupos</h2>
      ${lista(GRUPOS)}
      <h2 class="secao">Apps e sites de desconto</h2>
      ${lista(APPS)}
      <p class="aviso">Cupons e preços mudam o tempo todo; os valores citados são de 2025 e servem só de referência. Confira as condições na hora da compra.</p>`;
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
  renderMala();
  renderDescontos();
  mostrarAba(store.get("aba", "roteiro"));

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
