import angular from "angular";
import videoFeed from "./video-feed";

const MODULE_NAME = "tk.VideoFeed";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    component('tkVideoFeed', videoFeed);
