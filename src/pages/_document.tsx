import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <Script id="register-sw" strategy="afterInteractive">
          {`
                    if ('serviceWorker' in navigator) {
                      window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/sw.js').then(
                          function(registration) {
                            console.log('Service Worker registration successful with scope: ', registration.scope);
                          },
                          function(err) {
                            console.log('Service Worker registration failed: ', err);
                          }
                        );
                      });
                    }
                  `}
        </Script>
      </body>
    </Html>
  );
}
