import angular from "angular";
import videoFeed from "./video-feed";
import {
    default as videoFeedItem,
    registerTemplates as regVideoFeedItemTemplates
} from "./video-feed-item";
import videoViewsCount from './video-views-count';

const MODULE_NAME = "tk.VideoFeed";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    run(regVideoFeedItemTemplates).
    filter("tkVideoViewsCount", videoViewsCount).
    component("tkVideoFeed", videoFeed).
    component("tkVideoFeedItem", videoFeedItem);
