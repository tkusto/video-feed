const MIN_WIDTH = 480;

class VideoPlayer {
    static get $inject() { return ["$sce"]; }
    constructor($sce) {
        this.$sce = $sce;
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
}

export default {
    bindings: {
        src: "<",
        _width: "<width"
    },
    controller: VideoPlayer,
    controllerAs: "$videoPlayer",
    template: `
        <video ng-if="!!$videoPlayer.trustedSrc"
               ng-src="{{$videoPlayer.trustedSrc}}"
               ng-attr-width="{{$videoPlayer.width}}"
               ng-attr-height="{{$videoPlayer.height}}"
               controls></video>
    `
};
