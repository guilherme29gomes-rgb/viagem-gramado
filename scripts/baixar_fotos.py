"""Baixa até 3 fotos candidatas do Wikimedia Commons para cada local.

Roda no GitHub Actions (que tem acesso à internet). As fotos vão para
fotos/candidatas/<id>-<n>.jpg e os créditos para fotos/candidatas/creditos.json.
"""
import json
import os
import re
import time
import urllib.parse
import urllib.request

UA = "viagem-gramado/1.0 (roteiro pessoal; github.com/guilherme29gomes-rgb/viagem-gramado)"
API = "https://commons.wikimedia.org/w/api.php"
SAIDA = "fotos/candidatas"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def buscar(termo):
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": f"filetype:bitmap {termo}", "gsrnamespace": "6", "gsrlimit": "6",
        "prop": "imageinfo", "iiprop": "url|extmetadata", "iiurlwidth": "720",
    }
    dados = json.loads(get(API + "?" + urllib.parse.urlencode(params)))
    paginas = sorted((dados.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in paginas:
        info = (p.get("imageinfo") or [{}])[0]
        if not info.get("thumburl"):
            continue
        meta = info.get("extmetadata") or {}
        autor = re.sub(r"<[^>]+>", "", (meta.get("Artist") or {}).get("value", "")).strip()
        yield {
            "url": info["thumburl"],
            "pagina": info.get("descriptionurl", ""),
            "titulo": p.get("title", ""),
            "autor": autor,
            "licenca": (meta.get("LicenseShortName") or {}).get("value", ""),
        }


def main():
    os.makedirs(SAIDA, exist_ok=True)
    locais = json.load(open("scripts/fotos.json", encoding="utf-8"))
    creditos = {}
    for local in locais:
        try:
            achadas = list(buscar(local["busca"]))[:3]
        except Exception as e:  # segue para o próximo local
            print("erro na busca", local["id"], e)
            continue
        for n, foto in enumerate(achadas, 1):
            nome = f"{local['id']}-{n}.jpg"
            try:
                with open(os.path.join(SAIDA, nome), "wb") as f:
                    f.write(get(foto["url"]))
                creditos[nome] = foto
                print("ok", nome, foto["titulo"])
            except Exception as e:
                print("erro ao baixar", nome, e)
            time.sleep(0.5)
    with open(os.path.join(SAIDA, "creditos.json"), "w", encoding="utf-8") as f:
        json.dump(creditos, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
