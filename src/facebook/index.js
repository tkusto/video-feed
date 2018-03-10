import angular from "angular";
import FbSdkService from "./fb-sdk.service";

const MODULE_NAME = "tk.Facebook";
export default MODULE_NAME;

angular.module(MODULE_NAME, []).
    service("tkFbSdk", FbSdkService);
