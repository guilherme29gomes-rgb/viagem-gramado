"""Abre o site de cada local e anota os links de Instagram e WhatsApp que ele mostra.

Roda no GitHub Actions. Resultado em contatos/encontrados.json para revisão.
"""
import json
import re
import time
import urllib.request

UA = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36"
GENERICOS = {"p", "reel", "reels", "explore", "accounts", "stories", "tv", "share", "direct", "about", "legal"}

PAGINAS = {
    "wish": ["https://grupowish.com/", "https://grupowish.com/en/wish-serrano-programacao"],
    "galeto": ["https://www.galetoitalia.com.br/"],
    "garfo": ["https://www.garfoebombacha.com.br/", "https://www.essemundoenosso.com.br/churrascaria-garfo-e-bombacha-em-canela"],
    "hector": ["https://www.hectorgramado.com.br/", "https://hector.com.br/", "https://quantocustaviajar.com/blog/pizzaria-hector-gramado/"],
    "belavista": ["https://www.belavista.tur.br/"],
    "bondinhos": ["https://www.parquebondinhos.com.br/", "https://www.bondinhoscanela.com.br/"],
    "skyglass": ["https://www.skyglasscanela.com.br/"],
    "prawer": ["https://www.prawer.com.br/"],
    "acquamotion": ["https://www.acquamotion.com.br/"],
    "minimundo": ["https://www.minimundo.com.br/"],
    "aldeia": ["https://www.aldeiadopapainoel.com.br/", "https://saopauloparacriancas.com.br/?p=160270"],
    "parada": ["https://www.natalluzdegramado.com.br/"],
    "fornos": ["https://wanderlog.com/place/details/7244812/fornos-de-gramado"],
    "carrinho": ["https://casadoviajante.com.br/"],
    "x-supercarros": ["https://www.supercarros.com.br/"],
    "x-olivas": ["https://www.olivasdegramado.com.br/"],
    "x-snowland": ["https://www.snowland.com.br/"],
}


def abrir(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")


def main():
    resultado = {}
    for id_local, paginas in PAGINAS.items():
        achados = {"instagram": {}, "whatsapp": {}}
        for url in paginas:
            try:
                html = abrir(url)
            except Exception as e:
                print("falhou", url, e)
                continue
            for perfil in re.findall(r"instagram\.com/([A-Za-z0-9_.]{2,30})", html):
                perfil = perfil.rstrip(".")
                if perfil.lower() not in GENERICOS:
                    achados["instagram"].setdefault(perfil, url)
            for num in re.findall(r"(?:wa\.me/|api\.whatsapp\.com/send\?phone=|whatsapp\.com/send/\?phone=)\+?(\d{10,13})", html):
                achados["whatsapp"].setdefault(num, url)
            time.sleep(1)
        resultado[id_local] = achados
        print(id_local, achados)
    with open("contatos/encontrados.json", "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
