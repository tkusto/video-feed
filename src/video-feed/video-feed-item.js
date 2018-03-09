const SOURCES = {
    "youtube": {
        buildUrl: ({ videoId }) => `https://www.youtube.com/embed/${videoId}`,
        template: "tk-video-feed-item/youtube"
    },
    "facebook": {
        buildUrl: ({ videoId }) => `https://www.facebook.com/video.php?v=${videoId}`,
        template: "tk-video-feed-item/facebook"
    }
};

class VideoFeedItem {
    static get $inject() { return ["$sce"]; }
    constructor($sce) {
        this.$sce = $sce;
        this.template = undefined;
    }

    $onChanges({ item }) {
        if (item && item.currentValue) {
            const { source } = item.currentValue;
            if (source && SOURCES.hasOwnProperty(source)) {
                const { buildUrl, template } = SOURCES[source];
                const videoUrl = buildUrl(item.currentValue);
                this.template = template;
                this.videoUrl = this.$sce.trustAsResourceUrl(videoUrl);
            }
        }
    }    
}

registerTemplates.$inject = ["$templateCache"];
export function registerTemplates($templatesCache) {
    $templatesCache.put("tk-video-feed-item/youtube", `
        <iframe ng-src="{{$videoFeedItem.videoUrl}}"
                width="420"
                height="315"></iframe>
    `);
    $templatesCache.put("tk-video-feed-item/facebook", `
        <div class="fb-video"
             ng-attr-data-href="{{$videoFeedItem.videoUrl}}"
             data-width="420"
             data-allowfullscreen="true"></div>
    `);
}

export default {
    bindings: {
        item: "<"
    },
    controller: VideoFeedItem,
    controllerAs: "$videoFeedItem",
    template: `
        <section>
            <header>
                <span class="title" ng-bind="$videoFeedItem.item.title"></span>
                <span class="views" ng-bind="$videoFeedItem.item.views | tkVideoViewsCount"></span>
            </header>
            <div class="video" ng-if="$videoFeedItem.template" ng-include="$videoFeedItem.template"></div>
        </section>
    `
}
