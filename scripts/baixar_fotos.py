"""Baixa até 3 fotos candidatas do Wikimedia Commons para cada local.

Roda no GitHub Actions (que tem acesso à internet). As fotos vão para
fotos/candidatas/<id>-<n>.jpg e os créditos para fotos/candidatas/creditos.json.
"""
import json
import os
import re
import time
import urllib.parse
import urllib.error
import urllib.request

UA = "viagem-gramado/1.0 (roteiro pessoal; github.com/guilherme29gomes-rgb/viagem-gramado)"
API = "https://commons.wikimedia.org/w/api.php"
SAIDA = "fotos/candidatas"


def get(url):
    # A Wikimedia responde 429 quando há pedidos demais: espera e tenta de novo.
    for espera in (0, 10, 30, 60):
        time.sleep(espera)
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
    raise RuntimeError("muitos pedidos (429)")


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


def buscar_openverse(termo):
    # Openverse reúne imagens de licença livre (Flickr, museus etc.).
    params = {"q": termo, "page_size": "8"}
    dados = json.loads(get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params)))
    for r in dados.get("results", []):
        lic = (r.get("license") or "").upper()
        versao = r.get("license_version") or ""
        yield {
            "url": r.get("url"),
            "pagina": r.get("foreign_landing_url") or "",
            "titulo": r.get("title") or "",
            "autor": r.get("creator") or "",
            "licenca": f"CC {lic} {versao}".strip() if lic not in ("CC0", "PDM") else lic,
            "fonte": r.get("source") or "openverse",
        }


def main():
    os.makedirs(SAIDA, exist_ok=True)
    locais = json.load(open("scripts/fotos.json", encoding="utf-8"))
    caminho_creditos = os.path.join(SAIDA, "creditos.json")
    creditos = json.load(open(caminho_creditos, encoding="utf-8")) if os.path.exists(caminho_creditos) else {}
    for local in locais:
        if local.get("pronta"):
            continue
        time.sleep(2)
        achadas = []
        try:
            if local.get("fonte") == "openverse":
                for termo in local["buscas"]:
                    achadas += list(buscar_openverse(termo))[:3]
                    time.sleep(2)
            else:
                achadas = list(buscar(local["busca"]))[:3]
        except Exception as e:  # segue para o próximo local
            print("erro na busca", local["id"], e)
        prefixo = "o" if local.get("fonte") == "openverse" else ""
        for n, foto in enumerate(achadas, 1):
            nome = f"{local['id']}-{prefixo}{n}.jpg"
            try:
                with open(os.path.join(SAIDA, nome), "wb") as f:
                    f.write(get(foto["url"]))
                creditos[nome] = foto
                print("ok", nome, foto["titulo"])
            except Exception as e:
                print("erro ao baixar", nome, e)
            time.sleep(1.5)
    with open(caminho_creditos, "w", encoding="utf-8") as f:
        json.dump(creditos, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
