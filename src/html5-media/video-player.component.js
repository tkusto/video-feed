const MIN_WIDTH = 480;

class VideoPlayer {
    static get $inject() { return ["$scope", "$element", "$sce"]; }
    constructor($scope, $element, $sce) {
        this.$scope = $scope;
        this.$sce = $sce;
        this.$video = $element[0].querySelector("video");
        this.onVideoError = () => { $scope.$applyAsync() };
    }

    $onInit() {
        this.$video.addEventListener("error", this.onVideoError);
        this.$scope.$on("tk-video-player:stop", this.stop.bind(this));
    }

    $onChanges({ src, _width }) {
        if (src) {
            this.trustedSrc = src.currentValue ? this.$sce.trustAsResourceUrl(src.currentValue) : undefined;
        }
        if (_width) {
            const isWidthValid = typeof _width.currentValue === "number" && !isNaN(_width.currentValue);
            this.width = isWidthValid ? Math.max(MIN_WIDTH, _width.currentValue) : MIN_WIDTH;
            this.height = Math.ceil(this.width / 16 * 9);
        }
    }

    $onDestroy() {
        this.$video.removeEventListener("error", this.onVideoError);
    }

    stop() {
        this.$video.pause();
    }
}

export default {
    bindings: {
        src: "<",
        _width: "<width"
    },
    controller: VideoPlayer,
    controllerAs: "$videoPlayer",
    template: `
        <video ng-show="!!$videoPlayer.trustedSrc && !$videoPlayer.$video.error"
               ng-src="{{$videoPlayer.trustedSrc}}"
               ng-attr-width="{{$videoPlayer.width}}"
               ng-attr-height="{{$videoPlayer.height}}"
               controls></video>
        <p class="error" ng-show="!!$videoPlayer.$video.error">
            Video unavailable due to<br/>
            <span ng-bind="$videoPlayer.$video.error.message"></span>
        </p>
    `
};
