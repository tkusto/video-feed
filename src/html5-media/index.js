import angular from "angular";
import VideoPlayer from "./video-player.component";

const MODULE_NAME = "tk.Html5Media";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    component("tkVideoPlayer", VideoPlayer);
