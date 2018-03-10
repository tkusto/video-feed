import { element } from "angular";

const MIN_WIDTH = 480;

class FbPlayer {
    static get $inject() { return ["$scope", "$element", "$document", "$q", "tkFbSdk"]; }
    constructor($scope, $element, $document, $q, tkFbSdk) {
        this.$element = $element;
        this.$document = $document;
        this.$q = $q;
        this.tkFbSdk = tkFbSdk;
        this.playerId = `tk-fb-player-${$scope.$id}`;
        this.width = MIN_WIDTH;
    }

    $onChanges({ videoId, _width }) {
        if (videoId && videoId.currentValue) {
            this.initPlayer(videoId.currentValue);
        } else {
            this.ready = false;
        }
        if (_width) {
            this.width = isNaN(_width.currentValue) ? MIN_WIDTH : Math.max(MIN_WIDTH, _width.currentValue);
        }
    }

    initPlayer(videoId) {
        return this.$q((resolve, reject) => {
            const [document] = this.$document;
            const fbVideo = element(document.createElement("div"));
            fbVideo.addClass("fb-video").
                attr("data-href", `https://www.facebook.com/video.php?v=${videoId}`).
                attr("data-width", this.width);
            this.$element.empty().append(fbVideo);
            // we need wait till the digest is done
            setTimeout(() => {
                this.tkFbSdk.ready.then(FB => {
                    FB.XFBML.parse(fbVideo[0], (...args) => {
                        resolve();
                    });
                });
            }, 0);
        });
    }
}

export default {
    bindings: {
        videoId: "@",
        _width: "<"
    },
    controller: FbPlayer,
    controllerAs: "$fbPlayer"
};
