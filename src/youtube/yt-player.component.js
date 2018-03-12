import { element } from "angular";

class YTPlayer {
    static get $inject() { return ["$scope", "$element", "$q", "tkYouTubeIframeApi"]; }
    constructor($scope, $element, $q, tkYouTubeIframeApi) {
        this.$scope = $scope;
        this.$element = $element;
        this.$q = $q;
        this.tkYouTubeIframeApi = tkYouTubeIframeApi;
        this.playerId = `tk-yt-player-${$scope.$id}`;
    }

    $onInit() {
        this.$scope.$on("tk-yt-player:stop", this.stop.bind(this));
    }

    $onChanges({ videoId }) {
        if (videoId) {
            if (videoId.currentValue) {
                this.initPlayer(videoId.currentValue);
            } else {
                this.errorCode = 1000;
            }
        }
    }

    $onDestroy() {
        this.destroyPlayer();
    }

    initPlayer(videoId) {
        this.destroyPlayer();
        return this.tkYouTubeIframeApi.ready.then(YT => {
            const readyDeferred = this.$q.defer();
            const videoContainer = element(this.$element[0].querySelector(".video"));
            videoContainer.html(`<div id="${this.playerId}"></div>`);
            this.player = new YT.Player(this.playerId, {
                width: Math.max(480, this.width),
                height: Math.max(270, Math.ceil(this.width / 16 * 9)),
                videoId,
                events: {
                    onReady: () => { readyDeferred.resolve(); },
                    onError: event => { this.$scope.$applyAsync(() => { this.errorCode = event.data; }) }
                }
            });
            return readyDeferred.promise;
        });
    }

    destroyPlayer() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
            this.errorCode = undefined;
        }
    }

    stop() {
        if (this.player) {
            this.player.pauseVideo();
        }
    }
}

export default {
    bindings: {
        videoId: "@",
        width: "<"
    },
    controller: YTPlayer,
    controllerAs: "$ytPlayer",
    template: `
        <div class="video" ng-show="!$ytPlayer.errorCode"></div>
        <p class="error" ng-show="!!$ytPlayer.errorCode" ng-switch="$ytPlayer.errorCode">
            <span ng-switch-when="2">Wrong videoId specified</span>
            <span ng-switch-when="5">Playback error</span>
            <span ng-switch-when="100">Video not found</span>
            <span ng-switch-when="101|150" ng-switch-when-separator="|">Video cannot be embed</span>
            <span ng-switch-when="1000"></span>
        </p>
    `
};
