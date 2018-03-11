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
        this.handlePlayerInstance = this.handlePlayerInstance.bind(this);
    }

    $onInit() {
        this.tkFbSdk.ready.then(FB => {
            FB.Event.subscribe("xfbml.ready", this.handlePlayerInstance);
        });
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

    $onDestroy() {
        this.destroyPlayer();
        this.tkFbSdk.ready.then(FB => {
            FB.Event.unsubscribe("xfbml.ready", this.handlePlayerInstance);
        });
    }

    initPlayer(videoId) {
        this.destroyPlayer();
        return this.$q((resolve, reject) => {
            const document = this.$document[0];
            const fbVideo = element(document.createElement("div"));
            const videoContainer = element(this.$element[0].querySelector(".video"));
            fbVideo.addClass("fb-video").
                attr("id", this.playerId).
                attr("data-href", `https://www.facebook.com/video.php?v=${videoId}`).
                attr("data-width", this.width);
            videoContainer.empty().append(fbVideo);
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

    destroyPlayer() {
        if (this.playerErrorHandler) {
            this.playerErrorHandler.release();
            this.playerErrorHandler = undefined;
            this.error = undefined;
        }
    }

    handlePlayerInstance(msg) {
        if (msg.type === "video" && msg.id === this.playerId) {
            this.playerErrorHandler = msg.instance.subscribe("error", err => {
                this.error = err;
            });
        }
    }
}

export default {
    bindings: {
        videoId: "@",
        _width: "<width"
    },
    controller: FbPlayer,
    controllerAs: "$fbPlayer",
    template: `
        <div class="video" ng-show="!$fbPlayer.error"></div>
        <p class="error" ng-show="!!$fbPlayer.error" ng-bind="$fbPlayer.error"></p>
    `
};
