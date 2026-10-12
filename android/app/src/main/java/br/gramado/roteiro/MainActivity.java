package br.gramado.roteiro;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** Abre o roteiro (arquivos em assets/www) numa tela cheia. */
public class MainActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle estado) {
        super.onCreate(estado);
        web = new WebView(this);
        setContentView(web);

        WebSettings ajustes = web.getSettings();
        ajustes.setJavaScriptEnabled(true);
        ajustes.setDomStorageEnabled(true); // guarda as marcações (pendências, mala, ingressos)
        ajustes.setAllowFileAccess(true);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest pedido) {
                Uri endereco = pedido.getUrl();
                if ("file".equals(endereco.getScheme())) return false;
                // Mapa, WhatsApp, sites e telefone abrem nos apps do celular.
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, endereco));
                } catch (Exception ignorado) {
                    // nenhum app para abrir este link
                }
                return true;
            }
        });

        web.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
