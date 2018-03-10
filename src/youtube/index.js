import angular from "angular";
import YouTubeIframeApiService from "./yt-iframe-api.service";
import YTPlayer from "./yt-player.component";

const MODULE_NAME = "tk.YouTube";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    service("tkYouTubeIframeApi", YouTubeIframeApiService).
    component("tkYtPlayer", YTPlayer);
