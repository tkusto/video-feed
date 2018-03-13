describe("tk.VideoFeed/tkVideoViewsCount filter", function () {
    let injector = undefined;
    let tkVideoViewsCount = undefined;

    beforeAll(() => {
        injector = angular.injector(["ng", "ngMock", "tk.VideoFeed"]);
    });

    beforeEach(() => {
        injector.invoke(["$filter", function ($filter) {
            tkVideoViewsCount = $filter("tkVideoViewsCount");
        }]);
    });

    it("should add suffix \"k\" for thousands", function () {
        expect(tkVideoViewsCount(1001)).toBe("1k");
        expect(tkVideoViewsCount(999001)).toBe("999k");
        expect(tkVideoViewsCount(1100)).toBe("1.1k");
    });
});
