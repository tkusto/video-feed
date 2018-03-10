const FB_SDK_SRC = "https://connect.facebook.net/en_US/sdk.js";

function loadSdk(document) {
    const script = document.createElement("script");
    const firstScriptTag = document.scripts[0];
    script.src = FB_SDK_SRC;
    script.id = "facebook-jssdk";
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
}

export default class FbSdkService {
    static get $inject() { return ["$window", "$document", "$q"]; }
    constructor($window, $document, $q) {
        const readyDeferred = $q.defer();
        $window.fbAsyncInit = () => {
            FB.init({
                xfbml: true,
                version: "v2.5"
            });
            readyDeferred.resolve($window.FB);
        };
        this.ready = readyDeferred.promise;
        if (typeof Object.freeze === "function") {
            Object.freeze(this);
        }
        loadSdk($document[0]);
    }
}