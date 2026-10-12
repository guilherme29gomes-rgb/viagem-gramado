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
            "url": r.get("thumbnail") or r.get("url"),
            "pagina": r.get("foreign_landing_url") or "",
            "titulo": r.get("title") or "",
            "autor": r.get("creator") or "",
            "licenca": f"CC {lic} {versao}".strip() if lic not in ("CC0", "PDM") else lic,
            "fonte": r.get("source") or "openverse",
        }


UA_NAVEGADOR = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"


def buscar_site(site):
    # Pega a imagem de divulgação (og:image) e as primeiras fotos grandes da página.
    req = urllib.request.Request(site, headers={"User-Agent": UA_NAVEGADOR})
    with urllib.request.urlopen(req, timeout=30) as r:
        html = r.read().decode("utf-8", "ignore")
    urls = re.findall(r'<meta[^>]+(?:property|name)=["\'](?:og:image|twitter:image)["\'][^>]+content=["\']([^"\']+)', html)
    urls += re.findall(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\'](?:og:image|twitter:image)', html)
    urls += re.findall(r'(?:src|data-src|href)=["\']([^"\']+\.(?:jpe?g|webp|png))["\']', html, re.I)
    vistos = []
    for u in urls:
        u = urllib.parse.urljoin(site, u.replace("&amp;", "&"))
        if u in vistos or re.search(r"logo|icon|favicon|sprite|whats|selo|banner-mobile", u, re.I):
            continue
        vistos.append(u)
    for u in vistos[:10]:
        yield {"url": u, "pagina": site, "titulo": "Imagem do site oficial", "autor": "Divulgação", "licenca": "site oficial"}


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
            if local.get("fonte") == "url":
                achadas = [{"url": u, "pagina": "https://grupowish.com/", "titulo": "Imagem do site oficial",
                            "autor": "Divulgação", "licenca": "site oficial"} for u in local["urls"]]
            elif local.get("fonte") == "site":
                for site in local["sites"]:
                    try:
                        achadas += list(buscar_site(site))
                    except Exception as e:
                        print("site indisponível", site, e)
            elif local.get("fonte") == "openverse":
                for termo in local["buscas"]:
                    achadas += list(buscar_openverse(termo))[:3]
                    time.sleep(2)
            else:
                achadas = list(buscar(local["busca"]))[:3]
        except Exception as e:  # segue para o próximo local
            print("erro na busca", local["id"], e)
        prefixo = {"openverse": "o", "site": "s", "url": "u"}.get(local.get("fonte"), "")
        for n, foto in enumerate(achadas, 1):
            nome = f"{local['id']}-{prefixo}{n}.jpg"
            try:
                req = urllib.request.Request(foto["url"], headers={"User-Agent": UA_NAVEGADOR})
                with urllib.request.urlopen(req, timeout=30) as r, open(os.path.join(SAIDA, nome), "wb") as f:
                    f.write(r.read())
                creditos[nome] = foto
                print("ok", nome, foto["titulo"])
            except Exception as e:
                print("erro ao baixar", nome, e)
            time.sleep(1.5)
    with open(caminho_creditos, "w", encoding="utf-8") as f:
        json.dump(creditos, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
