import angular from "angular";
// modules
import tkYouTube from "../youtube";
import tkFacebook from "../facebook";
// module items
import videoFeed from "./video-feed";
import videoFeedItem from "./video-feed-item";
import videoViewsCount from './video-views-count';

const MODULE_NAME = "tk.VideoFeed";
export default MODULE_NAME;

angular.module(MODULE_NAME, [tkYouTube, tkFacebook]).
    filter("tkVideoViewsCount", videoViewsCount).
    component("tkVideoFeed", videoFeed).
    component("tkVideoFeedItem", videoFeedItem);
