import angular from "angular";
// modules
import tkYouTube from "../youtube";
import tkFacebook from "../facebook";
import tkHtml5Media from "../html5-media";
// module items
import videoFeed from "./video-feed.component";
import videoFeedItem from "./video-feed-item.component";
import videoViewsCount from './video-views-count.filter';

const MODULE_NAME = "tk.VideoFeed";
export default MODULE_NAME;

angular.module(MODULE_NAME, [tkYouTube, tkFacebook, tkHtml5Media]).
    filter("tkVideoViewsCount", videoViewsCount).
    component("tkVideoFeed", videoFeed).
    component("tkVideoFeedItem", videoFeedItem);
