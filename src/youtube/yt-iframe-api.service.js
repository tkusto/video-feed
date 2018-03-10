const YT_IFRAME_API_SRC = "https://www.youtube.com/iframe_api";

function loadApi(document) {
    const script = document.createElement("script");
    const firstScriptTag = document.scripts[0];
    script.src = YT_IFRAME_API_SRC;
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
}

export default class YouTubeIframeApiService {
    static get $inject() { return ["$window", "$document", "$q"]; }
    constructor($window, $document, $q) {
        const readyDeferred = $q.defer();
        $window.onYouTubeIframeAPIReady = () => { readyDeferred.resolve($window.YT); };
        this.ready = readyDeferred.promise;
        if (typeof Object.freeze === "function") {
            Object.freeze(this);
        }
        loadApi($document[0]);
    }
}
