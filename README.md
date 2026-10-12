# Roteiro Gramado 🎄

App de roteiro da viagem a Gramado e Canela (07 a 12/11/2026). Funciona no navegador do celular e pode ser instalado na tela inicial.

**Abas**

- **Roteiro** — dia a dia, com fotos de cada lugar (Wikimedia Commons), link para o mapa e mais fotos no Google.
- **Pendências** — checklist do que resolver antes e durante a viagem. Dá para adicionar itens próprios.
- **Mala** — sugestão de mala separada em Bebês, Pais e Bagagem de mão, com checklist.
- **Ingressos** — o que comprar/reservar antecipado, com marcação de "comprado".
- **Extras** — lugares fora do roteiro; escolha um dia e eles entram no roteiro.
- **Descontos** — apps e sites para economizar.

As marcações ficam salvas no próprio celular (localStorage).

## Como abrir

Abra `index.html` no navegador, ou publique com GitHub Pages:
*Settings → Pages → Branch: esta branch / root*. Depois, no celular, use "Adicionar à tela inicial".

Para testar localmente: `python3 -m http.server` e acesse http://localhost:8000.

## Editar

Tudo que aparece no app está em `data.js` (roteiro, pendências, ingressos, extras e apps).
