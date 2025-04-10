package com.example.talenttinder

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        setupWebView()
    }

    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false
            allowFileAccess = true
            allowContentAccess = true
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView?,
                request: WebResourceRequest
            ): WebResourceResponse? {
                val url = request.url.toString()
                if (url.startsWith("file:///android_res/")) {
                    val resourcePath = url.replace("file:///android_res/", "")
                    val resourceId = resources.getIdentifier(
                        resourcePath,
                        null,
                        packageName
                    )
                    if (resourceId != 0) {
                        val inputStream = resources.openRawResource(resourceId)
                        return WebResourceResponse(
                            "image/jpeg",
                            "UTF-8",
                            inputStream
                        )
                    }
                }
                return super.shouldInterceptRequest(view, request)
            }
        }

        webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
} 