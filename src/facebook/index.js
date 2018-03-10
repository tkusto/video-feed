import angular from "angular";
import FbSdkService from "./fb-sdk.service";
import FbPlayer from "./fb-player.component";

const MODULE_NAME = "tk.Facebook";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    service("tkFbSdk", FbSdkService).
    component("tkFbPlayer", FbPlayer);
