// insert <script type="text/javascript">
//   window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
//   heap.load("765739241");
// </script>


function deepgramGlobalStyles() {
  const styles = document.createElement("style");
  styles.innerHTML = `
:root {
  --deepgram-primary: #13ef95;
  --deepgram-secondary: #201cff;
  --deepgram-background: #0b0b0c;
  --deepgram-modal-background: #1A1A1F;
  --deepgram-translucent-background: rgba(0, 0, 0, 0.5);
  --deepgram-header-background: #1A1A1F;
  --deepgram-sidebar-background: #0B0B0C;
  --deepgram-card-background: #1A1A1F;
  --deepgram-border: #2C2C33;
  --deepgram-text: #fbfbff;
  --deepgram-muted: #949498;
}`;
  document.head.appendChild(styles);
}

function insertHeap() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
    window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
    heap.load("765739241");
  `;
  document.head.appendChild(script);
}

function insertKapaWidget() {
  const gradientBorder = document.createElement("div");
  gradientBorder.style.position = "fixed";
  gradientBorder.style.bottom = "18px";
  gradientBorder.style.right = "18px";
  gradientBorder.style.height = "89px";
  gradientBorder.style.width = "89px";
  gradientBorder.style.background =
    "linear-gradient(90deg, #201CFF -91.5%, #13EF95 80.05%)";
  gradientBorder.style.borderRadius = "100rem";
  gradientBorder.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

  const script = document.createElement("script");

  script.async = true;
  script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";

  script.setAttribute("data-user-analytics-fingerprint-enabled", "true");
  script.setAttribute(
    "data-website-id",
    "f5c1c9d4-b072-4c91-8da2-231cc5ea31d2"
  );
  script.setAttribute("data-project-name", "Deepgram");
  script.setAttribute("data-modal-title", "Get AI Powered Help Using Deepgram");
  script.setAttribute("data-button-text", "✦ Ask AI");
  script.setAttribute("data-project-color", "#2C2C33");
  script.setAttribute("data-button-bg-color", "#1A1A1F");
  script.setAttribute("data-button-image-height", "0");
  script.setAttribute("data-button-image-width", "0");
  script.setAttribute("data-button-height", "85px");
  script.setAttribute("data-button-width", "85px");
  script.setAttribute("data-button-border-radius", "100rem");
  script.setAttribute("data-button-border", "0px solid #fff");
  script.setAttribute(
    "data-project-logo",
    "https://media.licdn.com/dms/image/D560BAQEaRN1vSzE2Ng/company-logo_200_200/0/1680904416780/deepgram_logo?e=2147483647&v=beta&t=YFDv1MdWVSsq1yknvJ0cD3Acvvi02d6pV1IDiUzA5MA"
  );
  script.setAttribute(
    "data-modal-disclaimer",
    "This is a custom LLM for answering questions about Deepgram. Answers are based on the contents of Deepgram's: Documentation, API reference, Code Samples, Help Center and SDKs."
  );

  document.body.appendChild(gradientBorder);
  document.head.appendChild(script);
}

async function startAlgolia() {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = "https://cdn.jsdelivr.net/npm/@docsearch/css@3.9.0/dist/style.min.css";
//   document.head.appendChild(link);

//   const styles = document.createElement("style");
//   styles.innerHTML = `
// :root {
//   --docsearch-primary-color: var(--deepgram-primary);
//   --docsearch-text-color: var(--deepgram-text);
//   --docsearch-spacing: 12px;
//   --docsearch-icon-stroke-width: 1.4;
//   --docsearch-highlight-color: var(--docsearch-primary-color);
//   --docsearch-muted-color: var(--deepgram-muted);
//   --docsearch-container-background: var(--deepgram-translucent-background);
//   --docsearch-logo-color: var(--deepgram-primary);

//   /* modal */
//   --docsearch-modal-width: 720px;
//   --docsearch-modal-height: 800px;
//   --docsearch-modal-background: var(--deepgram-modal-background);
//   --docsearch-modal-shadow: inset 1px 1px 0 0 var(--deepgram-translucent-background),
//     0 3px 8px 0 var(--deepgram-background);

//   /* searchbox */
//   --docsearch-searchbox-height: 56px;
//   --docsearch-searchbox-background: var(--deepgram-background);
//   --docsearch-searchbox-focus-background: var(--deepgram-background);
//   --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);

//   /* hit */
//   --docsearch-hit-height: 56px;
//   --docsearch-hit-color: var(--deepgram-text);
//   --docsearch-hit-active-color: var(--deepgram-background);
//   --docsearch-hit-background: var(--deepgram-background);
//   --docsearch-hit-shadow: 0 1px 3px 0 var(--deepgram-modal-background);

//   /* key */
//   --docsearch-key-gradient: linear-gradient(
//     -225deg,
//     var(--deepgram-deepgram-modal-background) 0%,
//     var(--deepgram-background) 100%
//   );
//   --docsearch-key-shadow: inset 0 -2px 0 0 var(--deepgram-deepgram-modal-background),
//     inset 0 0 1px 1px var(--deepgram-deepgram-modal-background),
//     0 1px 2px 1px var(--deepgram-translucent-background);
//   --docsearch-key-pressed-shadow: inset 0 -2px 0 0 var(--deepgram-deepgram-modal-background),
//     inset 0 0 1px 1px var(--deepgram-deepgram-modal-background),
//     0 1px 1px 0 var(--deepgram-translucent-background);

//   /* footer */
//   --docsearch-footer-height: 44px;
//   --docsearch-footer-background: var(--deepgram-modal-background);
//   --docsearch-footer-shadow: 0 -1px 0 0 var(--deepgram-border),
//     0 -3px 6px 0 var(--deepgram-translucent-background);
// }

// /* Darkmode */

// html[data-theme="dark"] {
//   --docsearch-text-color: var(--deepgram-text);
//   --docsearch-container-background: var(--deepgram-translucent-background);
//   --docsearch-modal-background: var(--deepgram-modal-background);
//   --docsearch-modal-shadow: inset 1px 1px 0 0 var(--deepgram-translucent-background),
//     0 3px 8px 0 var(--deepgram-background);
//   --docsearch-searchbox-background: var(--deepgram-background);
//   --docsearch-searchbox-focus-background: var(--deepgram-background);
//   --docsearch-hit-color: var(--deepgram-text);
//   --docsearch-hit-background: var(--deepgram-background);
//   --docsearch-hit-shadow: 0 1px 3px 0 var(--deepgram-modal-background);
//   --docsearch-key-gradient: linear-gradient(
//     -225deg,
//     var(--deepgram-deepgram-modal-background) 0%,
//     var(--deepgram-background) 100%
//   );
//   --docsearch-key-shadow: inset 0 -2px 0 0 var(--deepgram-deepgram-modal-background),
//     inset 0 0 1px 1px var(--deepgram-deepgram-modal-background),
//     0 1px 2px 1px var(--deepgram-translucent-background);
//   --docsearch-key-pressed-shadow: inset 0 -2px 0 0 var(--deepgram-deepgram-modal-background),
//     inset 0 0 1px 1px var(--deepgram-deepgram-modal-background),
//     0 1px 1px 0 var(--deepgram-translucent-background);
//   --docsearch-footer-background: var(--deepgram-modal-background);
//   --docsearch-footer-shadow: 0 -1px 0 0 var(--deepgram-border),
//     0 -3px 6px 0 var(--deepgram-translucent-background);
//   --docsearch-muted-color: var(--deepgram-muted);
//   --docsearch-logo-color: var(--deepgram-primary);
// }

//   `;
//   document.head.appendChild(styles);

//   const { default: docsearch } = await import(
//     "https://cdn.jsdelivr.net/npm/@docsearch/js@3.9.0/+esm"
//   );

//   const appId = "SKG3CU3YQM";
//   const indexName = "crawler_unified";
//   const apiKey = "e50ef768d9ac1a2b80ac6101639df429";

//   const mobileSearch = document.createElement("span");
//   mobileSearch.id = "mobile-search";

//   const desktopSearch = document.createElement("span");
//   desktopSearch.id = "desktop-search";

//   const fernMobileSearchButton = document.querySelector(".fern-header-right-menu #fern-search-button");
//   fernMobileSearchButton.parentNode.insertBefore(mobileSearch, fernMobileSearchButton);

//   const fernDesktopSearchButton = document.querySelector(".fern-header-searchbar #fern-search-button");
//   fernDesktopSearchButton.parentNode.insertBefore(desktopSearch, fernDesktopSearchButton);

//   fernMobileSearchButton.remove();
//   fernDesktopSearchButton.remove();

//   docsearch({ container: "#desktop-search", appId, indexName, apiKey });
//   docsearch({ container: "#mobile-search", appId, indexName, apiKey });
}

document.addEventListener("DOMContentLoaded", async () => {
  deepgramGlobalStyles();
  insertKapaWidget();
  await startAlgolia();
  insertHeap();
});

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  deepgramGlobalStyles();
  insertKapaWidget();
  await startAlgolia();
  insertHeap();
}