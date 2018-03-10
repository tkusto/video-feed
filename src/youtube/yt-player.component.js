class YTPlayer {
    static get $inject() { return ["$scope", "$element", "$q", "tkYouTubeIframeApi"]; }
    constructor($scope, $element, $q, tkYouTubeIframeApi) {
        this.$element = $element;
        this.$q = $q;
        this.tkYouTubeIframeApi = tkYouTubeIframeApi;
        this.playerId = `tk-yt-player-${$scope.$id}`;
    }

    $onChanges({ videoId }) {
        if (videoId && videoId.currentValue) {
            this.destroyPlayer();
            this.initPlayer(videoId.currentValue);
        }
    }

    $onDestroy() {
        this.destroyPlayer();
    }

    initPlayer(videoId) {
        return this.tkYouTubeIframeApi.ready.then(YT => {
            const readyDeferred = this.$q.defer();
            this.$element.html(`<div id="${this.playerId}"></div>`);
            this.player = new YT.Player(this.playerId, {
                width: Math.max(480, this.width),
                height: Math.max(270, Math.ceil(this.width / 16 * 9)),
                videoId,
                events: {
                    onReady: () => { readyDeferred.resolve(); }
                }
            });
            return readyDeferred.promise;
        });
    }

    destroyPlayer() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
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
    template: ``
};
