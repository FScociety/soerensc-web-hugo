(() => {
  // <stdin>
  console.log("Youtube Lite Loader succesfully loaded");
  var LiteYTEmbed = class _LiteYTEmbed extends HTMLElement {
    connectedCallback() {
      this.videoId = this.getAttribute("videoid");
      let playBtnEl = this.querySelector(".lty-playbtn");
      this.playLabel = playBtnEl && playBtnEl.textContent.trim() || this.getAttribute("playlabel") || "Play";
      if (!this.style.backgroundImage) {
        this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
      }
      if (!playBtnEl) {
        playBtnEl = document.createElement("button");
        playBtnEl.type = "button";
        playBtnEl.classList.add("lty-playbtn");
        this.append(playBtnEl);
      }
      if (!playBtnEl.textContent) {
        const playBtnLabelEl = document.createElement("span");
        playBtnLabelEl.className = "lyt-visually-hidden";
        playBtnLabelEl.textContent = this.playLabel;
        playBtnEl.append(playBtnLabelEl);
      }
      playBtnEl.removeAttribute("href");
      this.addEventListener("pointerover", _LiteYTEmbed.warmConnections, { once: true });
      this.addEventListener("click", this.addIframe);
      this.needsYTApiForAutoplay = navigator.vendor.includes("Apple") || navigator.userAgent.includes("Mobi");
    }
    /**
     * Add a <link rel={preload | preconnect} ...> to the head
     */
    static addPrefetch(kind, url, as) {
      const linkEl = document.createElement("link");
      linkEl.rel = kind;
      linkEl.href = url;
      if (as) {
        linkEl.as = as;
      }
      document.head.append(linkEl);
    }
    /**
     * Begin pre-connecting to warm up the iframe load
     * Since the embed's network requests load within its iframe,
     *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
     * So, the best we can do is warm up a few connections to origins that are in the critical path.
     *
     * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
     * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
     */
    static warmConnections() {
      if (_LiteYTEmbed.preconnected)
        return;
      _LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
      _LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
      _LiteYTEmbed.addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
      _LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");
      _LiteYTEmbed.preconnected = true;
    }
    fetchYTPlayerApi() {
      if (window.YT || window.YT && window.YT.Player)
        return;
      this.ytApiPromise = new Promise((res, rej) => {
        var el = document.createElement("script");
        el.src = "https://www.youtube.com/iframe_api";
        el.async = true;
        el.onload = (_) => {
          YT.ready(res);
        };
        el.onerror = rej;
        this.append(el);
      });
    }
    async addYTPlayerIframe(params) {
      this.fetchYTPlayerApi();
      await this.ytApiPromise;
      const videoPlaceholderEl = document.createElement("div");
      this.append(videoPlaceholderEl);
      const paramsObj = Object.fromEntries(params.entries());
      new YT.Player(videoPlaceholderEl, {
        width: "100%",
        videoId: this.videoId,
        playerVars: paramsObj,
        events: {
          "onReady": (event) => {
            event.target.playVideo();
          }
        }
      });
    }
    async addIframe() {
      if (this.classList.contains("lyt-activated"))
        return;
      this.classList.add("lyt-activated");
      const params = new URLSearchParams(this.getAttribute("params") || []);
      params.append("autoplay", "1");
      params.append("playsinline", "1");
      if (this.needsYTApiForAutoplay) {
        return this.addYTPlayerIframe(params);
      }
      const iframeEl = document.createElement("iframe");
      iframeEl.width = 560;
      iframeEl.height = 315;
      iframeEl.title = this.playLabel;
      iframeEl.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframeEl.allowFullscreen = true;
      iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${params.toString()}`;
      this.append(iframeEl);
      iframeEl.focus();
    }
  };
  customElements.define("lite-youtube", LiteYTEmbed);
})();
