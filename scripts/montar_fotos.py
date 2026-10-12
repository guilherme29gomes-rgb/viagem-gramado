"""Monta as fotos escolhidas para o app.

Lê fotos/escolhidas.json ({id_do_local: "arquivo-candidato.jpg"}), reduz cada
foto para fotos/<id>.jpg e gera fotos.js com o caminho e o crédito.

    python3 scripts/montar_fotos.py              # fotos.js com caminhos (site)
    python3 scripts/montar_fotos.py --embutir X  # gera X com as fotos embutidas
"""
import base64
import io
import json
import os
import sys

from PIL import Image

PASTA = "fotos"
CANDIDATAS = os.path.join(PASTA, "candidatas")


def reduzir(caminho, largura, qualidade):
    im = Image.open(caminho).convert("RGB")
    if im.width > largura:
        im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=qualidade, optimize=True, progressive=True)
    return buf.getvalue()


def credito(c):
    return " · ".join(p for p in (c.get("autor", ""), c.get("licenca", "")) if p)


def main():
    escolhidas = json.load(open(os.path.join(PASTA, "escolhidas.json"), encoding="utf-8"))
    creditos = json.load(open(os.path.join(CANDIDATAS, "creditos.json"), encoding="utf-8"))
    embutir = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--embutir" else None

    fotos = {}
    for id_local, arquivo in escolhidas.items():
        origem = os.path.join(CANDIDATAS, arquivo)
        c = creditos.get(arquivo, {})
        if embutir:
            dados = base64.b64encode(reduzir(origem, 640, 70)).decode()
            src = "data:image/jpeg;base64," + dados
        else:
            destino = os.path.join(PASTA, f"{id_local}.jpg")
            with open(destino, "wb") as f:
                f.write(reduzir(origem, 800, 72))
            src = destino
        fotos[id_local] = {"src": src, "pagina": c.get("pagina", ""), "credito": credito(c)}
        # Foto pequena demais para capa: aparece só como miniatura.
        if Image.open(origem).width < 500:
            fotos[id_local]["pequena"] = True

    js = "// Gerado por scripts/montar_fotos.py. Fotos livres do Wikimedia Commons e do Flickr (via Openverse).\n"
    js += "window.FOTOS_LOCAIS = " + json.dumps(fotos, ensure_ascii=False, indent=1) + ";\n"
    with open(embutir or "fotos.js", "w", encoding="utf-8") as f:
        f.write(js)
    print(len(fotos), "fotos")


if __name__ == "__main__":
    main()
