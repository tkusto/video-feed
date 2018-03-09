const NO_SRC_ERROR = {
    status: -1,
    statusText: "Specify source to see a feed"
};

class VideoFeed {
    static get $inject() { return ["$http"]; }
    constructor($http) {
        this.$http = $http;
        this.status = "error";
        this.items = undefined;
        this.error = NO_SRC_ERROR;
    }

    $onChanges({ src }) {
        if (src) {
            if (src.currentValue) {
                this.loadItems(src.currentValue);
            } else {
                this.items = undefined;
                this.error = NO_SRC_ERROR;
            }
        }
    }

    loadItems(url) {
        if (this.status !== "pending") {
            this.status = "pending";
            this.$http.get(url).then(res => res.data).
                then(
                    res => {
                        this.items = res.items.filter(item => item.type === "video");
                        this.error = undefined;
                        this.status = "success";
                    },
                    err => {
                        this.error = err;
                        this.items = undefined;
                        this.status = "error";
                    }
                );
        }
    }
}

export default {
    bindings: {
        src: "@"
    },
    controller: VideoFeed,
    controllerAs: "$videoFeed",
    template: `
        <div ng-switch="$videoFeed.status">
            <!-- PENDING -->
            <div ng-switch-when="pending">Please wait...</div>
            
            <!-- SUCCESS -->
            <div ng-switch-when="success">
                <tk-video-feed-item ng-repeat="item in $videoFeed.items"
                                    item="item"/>
            </div>
            
            <!-- ERROR -->
            <div ng-switch-when="error">
                <p class="error">
                    <strong>Error {{$videoFeed.error.status}}:</strong>
                    {{$videoFeed.error.statusText}}
                </p>
            </div>
        </div>
    `
};
