const reUrlTitle = /\/([^/]+?)(?:\.[^/]+)?$/;
/** @TODO: move definitions below to separate file/files */
const SOURCES = {
    "youtube": {
        getUrl: ({ videoId }) => `https://www.youtube.com/embed/${videoId}`,
        getTitle: ({ title }) => title
    },
    "facebook": {
        getUrl: ({ videoId }) => `https://www.facebook.com/video.php?v=${videoId}`,
        getTitle: ({ title }) => title,
        init: () => setTimeout(() => {
            try {
                FB.XFBML.parse();
            } catch (e) {
                console.error(e);
            }
        }, 0)
    },
    "url": {
        getUrl: ({ url }) => url,
        getTitle: ({ url }) => {
            const match = url.match(reUrlTitle);
            return match ? match[1] : "Video";
        }
    }
};

class VideoFeedItem {
    static get $inject() { return ["$sce"]; }
    constructor($sce) {
        this.$sce = $sce;
    }

    $onChanges({ item }) {
        if (item && item.currentValue) {
            const { source } = item.currentValue;
            if (source && SOURCES.hasOwnProperty(source)) {
                const { getUrl, getTitle, template, init } = SOURCES[source];
                this.videoUrl = this.$sce.trustAsResourceUrl(getUrl(item.currentValue));
                this.videoTitle = getTitle(item.currentValue);
                if (typeof init === "function") {
                    init(item);
                }
            }
        }
    }    
}

export default {
    bindings: {
        item: "<"
    },
    controller: VideoFeedItem,
    controllerAs: "$videoFeedItem",
    template: `
        <section class="item" ng-switch="$videoFeedItem.item.source">
            <header class="item-header">
                <span class="item-title" ng-bind="$videoFeedItem.videoTitle"></span>
                <span class="item-views" ng-bind="$videoFeedItem.item.views | tkVideoViewsCount"></span>
            </header>
            <!-- YOUTUBE -->
            <div class="item-video" ng-switch-when="youtube">
                <tk-yt-player video-id="{{$videoFeedItem.item.videoId}}" width="480"/>
            </div>
            <!-- FACEBOOK -->
            <div class="item-video" ng-switch-when="facebook">
                <div class="fb-video"
                        ng-attr-data-href="{{$videoFeedItem.videoUrl}}"
                        data-width="480"
                        data-allowfullscreen="true"></div>
            </div>
            <!-- VIDEO URL -->
            <div class="item-video" ng-switch-when="url">
                <video ng-src="{{$videoFeedItem.videoUrl}}"
                        width="480"
                        heihgt="270"
                        controls></video>
            </div>
        </section>
    `
}
