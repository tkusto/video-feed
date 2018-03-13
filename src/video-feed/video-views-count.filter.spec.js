describe("tk.VideoFeed/tkVideoViewsCount filter", function () {
    let injector = undefined;
    let tkVideoViewsCount = undefined;

    beforeAll(function () {
        injector = angular.injector(["ng", "ngMock", "tk.VideoFeed"]);
    });

    beforeEach(() => {
        injector.invoke(["$filter", function ($filter) {
            tkVideoViewsCount = $filter("tkVideoViewsCount");
        }]);
    });

    it("should accept number or string, that contain number", function () {
        expect(tkVideoViewsCount(100)).toBe("100");
        expect(tkVideoViewsCount("100")).toBe("100");
    });

    it("should return fallback value if the first argument is not a number", function () {
        expect(tkVideoViewsCount(undefined, "fallback")).toBe("fallback");
        expect(tkVideoViewsCount(NaN, "fallback")).toBe("fallback");
        expect(tkVideoViewsCount("foobar", "fallback")).toBe("fallback");
    });

    it("should return empty string in case when first argument isn't a number and fallback value not specified", function () {
        expect(tkVideoViewsCount(undefined)).toBe("");
        expect(tkVideoViewsCount("abcdef")).toBe("");
        expect(tkVideoViewsCount(NaN)).toBe("");
        expect(tkVideoViewsCount()).toBe("");
    });

    it("should add suffix \"k\" for thousands", function () {
        expect(tkVideoViewsCount(1000)).toBe("1k");
        expect(tkVideoViewsCount(999900)).toBe("999.9k");
    });

    it("should add suffix \"M\" for millions", function () {
        expect(tkVideoViewsCount(1000000)).toBe("1M");
        expect(tkVideoViewsCount(150000000)).toBe("150M");
        expect(tkVideoViewsCount(1500000)).toBe("1.5M");
    });

    it("should handle fraction", function () {
        expect(tkVideoViewsCount(1001)).toBe("1k");
        expect(tkVideoViewsCount(1010)).toBe("1k");
        expect(tkVideoViewsCount(1100)).toBe("1.1k");
        expect(tkVideoViewsCount(1500)).toBe("1.5k");
        expect(tkVideoViewsCount(1900)).toBe("1.9k");
        expect(tkVideoViewsCount(1999)).toBe("2k");
        expect(tkVideoViewsCount(999900)).toBe("999.9k");
        expect(tkVideoViewsCount(999990)).toBe("1M");
        expect(tkVideoViewsCount(999999)).toBe("1M");
    });
});
