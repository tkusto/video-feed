import angular from "angular";
import tkYouTube from "../youtube";
import videoFeed from "./video-feed";
import videoFeedItem from "./video-feed-item";
import videoViewsCount from './video-views-count';

const MODULE_NAME = "tk.VideoFeed";
export default MODULE_NAME;

angular.module(MODULE_NAME, [tkYouTube]).
    filter("tkVideoViewsCount", videoViewsCount).
    component("tkVideoFeed", videoFeed).
    component("tkVideoFeedItem", videoFeedItem);
