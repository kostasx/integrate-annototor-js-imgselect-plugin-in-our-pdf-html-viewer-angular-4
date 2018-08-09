(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"left\">\n    <div id=\"left-controls\">\n        <button id=\"btnThumbnails\" title=\"Thumbnails\" class=\"btn\">\n            <i class=\"fa fa-picture-o fa-lg\" aria-hidden=\"true\"></i>\n        </button>\n        <button id=\"btnOutlines\" title=\"Bookmarks\" class=\"btn\">\n            <i class=\"fa fa-list-ul fa-lg\" aria-hidden=\"true\"></i>\n        </button>\n        <button id=\"btnSearch\" title=\"Search\" class=\"btn\">\n            <i class=\"fa fa-search fa-lg\" aria-hidden=\"true\"></i>\n        </button>\n    </div>\n    <div id=\"leftContent\">\n        <div id=\"thumbnailPanel\"></div>\n        <div id=\"outlinePanel\"></div>\n        <div id=\"searchPanel\">\n            <input id=\"searchInput\" title=\"Search\" type=\"text\">\n            <label class=\"searchOption\">\n                <input type=\"checkbox\" id=\"cbMatchCase\"> Match case</label>\n            <label class=\"searchOption\">\n                <input type=\"checkbox\" id=\"cbLimitResults\"> Limit results 1 per page</label>\n            <hr>\n            <span id=\"searchResultsCount\"></span>\n            <div id=\"searchResults\"></div>\n        </div>\n    </div>\n</div>\n\n<div id=\"main\">\n    <div id=\"controls\">\n        <div id=\"controls-left\">\n            <button id=\"btnSideToggle\" title=\"Sidebar\" class=\"btn\">\n                <i class=\"fa fa-th fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n            <button id=\"btnThemeToggle\" title=\"Theme Toggle\" class=\"btn\">\n                <i class=\"fa fa-lightbulb-o fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n        </div>\n\n        <div id=\"controls-center\">\n            <button id=\"btnPrev\" title=\"Previous Page\" class=\"btn\">\n                <i class=\"fa fa-caret-left fa-2x\" aria-hidden=\"true\"></i>\n            </button>\n            <select id=\"goBtn\">\n\n            </select>\n            <span id=\"pgCount\"></span>\n            <button id=\"btnNext\" title=\"Next Page\" class=\"btn\">\n                <i class=\"fa fa-caret-right fa-2x\" aria-hidden=\"true\"></i>\n            </button>\n\n            <button id=\"btnSelect\" title=\"Select\" class=\"btn\">\n                <i class=\"fa fa-i-cursor fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n            <button id=\"btnMove\" title=\"Pan\" class=\"btn\">\n                <i class=\"fa fa-arrows fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n\n            <button id=\"btnZoomOut\" title=\"Zoom Out\" class=\"btn\">\n                <i class=\"fa fa-minus fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n            <select id=\"zoomBtn\">\n                <option value=\"specific\">100%</option>\n                <option value=\"actualsize\">Actual Size</option>\n                <option value=\"fitwidth\">Fit Width</option>\n                <option value=\"fitheight\">Fit Height</option>\n                <option value=\"fitpage\">Fit Page</option>\n                <option value=\"auto\">Automatic</option>\n\n            </select>\n            <button id=\"btnZoomIn\" title=\"Zoom In\" class=\"btn\">\n                <i class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n        </div>\n        <div id=\"controls-right\">\n            <button id=\"btnFullScreen\" title=\"Fullscreen\" class=\"btn\">\n                <i class=\"fa fa-arrows-alt fa-lg\" aria-hidden=\"true\"></i>\n            </button>\n        </div>\n    </div>\n\n    <div id=\"idrviewer\"></div>\n\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = "my-app";
    }
    AppComponent.prototype.init = function () {
        // console.log("init...");
        var Button = {}, pgCount, curPg;
        // * Shorthand helper function to getElementById
        var d = function (id) {
            return document.getElementById(id);
        };
        var ClassHelper = (function () {
            return {
                addClass: function (ele, name) {
                    var classes = ele.className.length !== 0 ? ele.className.split(" ") : [];
                    var index = classes.indexOf(name);
                    if (index === -1) {
                        classes.push(name);
                        ele.className = classes.join(" ");
                    }
                },
                removeClass: function (ele, name) {
                    var classes = ele.className.length !== 0 ? ele.className.split(" ") : [];
                    var index = classes.indexOf(name);
                    if (index !== -1) {
                        classes.splice(index, 1);
                    }
                    ele.className = classes.join(" ");
                },
                toggleClass: function (ele, name) {
                    var classes = ele.className.length !== 0 ? ele.className.split(" ") : [];
                    var index = classes.indexOf(name);
                    var wasClassAdded;
                    if (index === -1) {
                        classes.push(name);
                        wasClassAdded = true;
                    }
                    else {
                        classes.splice(index, 1);
                        wasClassAdded = false;
                    }
                    ele.className = classes.join(" ");
                    return wasClassAdded;
                }
            };
        })();
        // Encapsulation of sidebar functionality
        var Sidebar = (function () {
            var Sidebar = {}, loadedThumbsArray = [], lastScroll = 0, sidebar, thumbnailBar, imageType, scrollSidebar = true, thumbnailPanel, bookmarkPanel, searchPanel, isSearchLoaded, searchInput;
            /**
             * Performs the setup for the sidebar
             * @param bounds Page bounds array
             * @param thumbnailType Image type used for thumbnails
             * @param bookmarks Object containing any bookmarks
             */
            Sidebar.setup = function (bounds, thumbnailType, bookmarks) {
                Button.outlines = d("btnOutlines");
                Button.thumbnails = d("btnThumbnails");
                Button.search = d("btnSearch");
                d("btnSideToggle").onclick = function () {
                    Sidebar.toggleSidebar();
                };
                Button.outlines.onclick = function () {
                    Sidebar.switchToBookmarks();
                };
                Button.thumbnails.onclick = function () {
                    Sidebar.switchToThumbnails();
                };
                Button.search.onclick = function () {
                    Sidebar.switchToSearch();
                };
                thumbnailBar = d("leftContent");
                sidebar = d("left");
                thumbnailPanel = d("thumbnailPanel");
                bookmarkPanel = d("outlinePanel");
                searchPanel = d("searchPanel");
                searchInput = d("searchInput");
                imageType = thumbnailType;
                loadThumbnailFrames(bounds);
                // Initialise loaded array
                for (var i = 0; i < pgCount; i++) {
                    loadedThumbsArray[i] = false;
                }
                Sidebar.switchToThumbnails();
                thumbnailBar.addEventListener("scroll", handleThumbnailBarScroll);
                if (bookmarks.length > 0) {
                    Sidebar.setBookmarks(bookmarks);
                }
            };
            Sidebar.openSidebar = function () {
                if (sidebar.className.indexOf("open") === -1) {
                    Sidebar.toggleSidebar();
                }
            };
            /**
             * Toggle the sidebar open and closed
             */
            Sidebar.toggleSidebar = function () {
                if (ClassHelper.toggleClass(sidebar, "open")) {
                    loadVisibleThumbnails();
                }
            };
            /**
             * Display the thumbnail panel in the sidebar
             */
            Sidebar.switchToThumbnails = function () {
                thumbnailPanel.className = "visible";
                bookmarkPanel.className = "hidden";
                searchPanel.className = "hidden";
                Sidebar.scrollToPage(curPg);
                Button.thumbnails.className = "disabled btn";
                Button.outlines.className = "btn";
                Button.search.className = "btn";
            };
            /**
             * Display the bookmarks panel in the sidebar
             */
            Sidebar.switchToBookmarks = function () {
                thumbnailPanel.className = "hidden";
                bookmarkPanel.className = "visible";
                searchPanel.className = "hidden";
                Button.thumbnails.className = "btn";
                Button.outlines.className = "disabled btn";
                Button.search.className = "btn";
            };
            Sidebar.switchToSearch = function () {
                thumbnailPanel.className = "hidden";
                bookmarkPanel.className = "hidden";
                searchPanel.className = "visible";
                Button.thumbnails.className = "btn";
                Button.outlines.className = "btn";
                Button.search.className = "disabled btn";
                var loadListener = function (loaded) {
                    if (loaded) {
                        searchInput.value = "";
                        searchInput.disabled = "";
                        searchInput.focus();
                    }
                    else {
                        searchInput.value = "Search not available.";
                    }
                };
                var progressListener = function (percentageLoaded) {
                    searchInput.value = "Loading (" + percentageLoaded + "%)";
                };
                if (!isSearchLoaded) {
                    IDRViewer.loadSearch(loadListener, progressListener);
                }
                searchInput.focus();
            };
            /**
             * Load the frames for all the thumbnails
             * @param bounds Page bound array
             */
            var loadThumbnailFrames = function (bounds) {
                var heights = [];
                var MAXWIDTH = 160;
                var MAXHEIGHT = 200;
                // Calculate height for max width of 160px and max height of 200px
                for (var i = 0; i < bounds.length; i++) {
                    var height = Math.floor(bounds[i][1] * (MAXWIDTH / bounds[i][0]));
                    heights[i] =
                        bounds[i][0] > bounds[i][1] || height <= MAXHEIGHT
                            ? height
                            : MAXHEIGHT;
                }
                function makeThumbnailClickHandler(pg) {
                    return function () {
                        scrollSidebar = false;
                        IDRViewer.goToPage(pg);
                        return false;
                    };
                }
                for (var page = 1; page <= bounds.length; page++) {
                    var ele = document.createElement("a");
                    ele.style.height = heights[page - 1] + "px";
                    ele.className = "thumbnail";
                    ele.href = "?page=" + page;
                    ele.id = "thumb" + page;
                    ele.onclick = makeThumbnailClickHandler(page);
                    ele.setAttribute("title", "Page " + page);
                    ele.innerHTML = '<img src="assets/loading.gif"/>';
                    thumbnailPanel.appendChild(ele);
                }
            };
            var handleThumbnailBarScroll = function () {
                var scrollTop = thumbnailBar.scrollTop;
                lastScroll = scrollTop;
                setTimeout(function () {
                    loadVisibleThumbnails(scrollTop);
                }, 500);
            };
            var loadVisibleThumbnails = function (scrollTop) {
                if (scrollTop === void 0) { scrollTop = null; }
                if (typeof scrollTop !== "undefined" && scrollTop != lastScroll)
                    return;
                // load thumbs in view
                for (var thumbIndex = 0; thumbIndex < pgCount; thumbIndex++) {
                    if (!loadedThumbsArray[thumbIndex]) {
                        var curThumb = thumbnailPanel.children[thumbIndex];
                        // Bails out of the loop when the next thumbnail is below the viewable area
                        if (curThumb.offsetTop >
                            thumbnailBar.scrollTop + thumbnailBar.clientHeight) {
                            break;
                        }
                        if (curThumb.offsetTop + curThumb.clientHeight >
                            thumbnailBar.scrollTop) {
                            curThumb.children[0].setAttribute("src", "thumbnails/" + (thumbIndex + 1) + "." + imageType);
                            loadedThumbsArray[thumbIndex] = true;
                        }
                    }
                }
            };
            /**
             * Scrolls the thumbnail bar to a specific page and adds currentPageThumbnail class.
             * @param page Page to scroll to
             * @param page2 Optional second page
             */
            Sidebar.scrollToPage = function (page, page2) {
                var curThumb = thumbnailPanel.children[page - 1];
                if (curThumb.className != "thumbnail currentPageThumbnail") {
                    for (var i = 0; i < pgCount; i++) {
                        thumbnailPanel.children[i].className = "thumbnail";
                    }
                    curThumb.className = "thumbnail currentPageThumbnail";
                    if (scrollSidebar) {
                        thumbnailBar.scrollTop =
                            thumbnailBar.scrollTop +
                                curThumb.getBoundingClientRect().top -
                                d("leftContent").getBoundingClientRect().top;
                    }
                }
                if (typeof page2 != "undefined") {
                    thumbnailPanel.children[page2 - 1].className =
                        "thumbnail currentPageThumbnail";
                }
                scrollSidebar = true;
            };
            Sidebar.setBookmarks = function (bookmarks) {
                ClassHelper.addClass(sidebar, "hasBookmarks");
                addBookmark(bookmarkPanel, bookmarks);
            };
            var addBookmark = function (container, bookmarks) {
                var outer = document.createElement("ul");
                var makeBookmarkClickHandler = function (pg, zoom) {
                    return function () {
                        IDRViewer.goToPage(parseInt(pg), zoom);
                    };
                };
                for (var i = 0; i < bookmarks.length; i++) {
                    var bookmark = bookmarks[i];
                    var li = document.createElement("li");
                    li.setAttribute("title", "Page " + bookmark.page);
                    li.innerHTML = bookmark.title;
                    li.onclick = makeBookmarkClickHandler(bookmark.page, bookmark.zoom);
                    outer.appendChild(li);
                    if (typeof bookmark.children != "undefined") {
                        addBookmark(outer, bookmark.children);
                    }
                }
                container.appendChild(outer);
            };
            return Sidebar;
        })();
        var populateGoBtn = function () {
            Button.go.className = "";
            Button.go.innerHTML = "";
            for (var i = 1; i <= pgCount; i++) {
                var opt = document.createElement("option");
                opt.value = i.toString();
                opt.innerHTML = pageLabels.length ? pageLabels[i - 1] : String(i);
                Button.go.appendChild(opt);
            }
            Button.go.selectedIndex = curPg - 1;
        };
        var handleGoBtn = function () {
            IDRViewer.goToPage(parseInt(Button.go.options[Button.go.selectedIndex].value));
            this.blur();
        };
        var updateSelectionButtons = function (mode) {
            switch (mode) {
                case IDRViewer.SELECT_PAN:
                    Button.select.className = "btn";
                    Button.move.className = "disabled btn";
                    break;
                case IDRViewer.SELECT_SELECT:
                    Button.select.className = "disabled btn";
                    Button.move.className = "btn";
                    break;
            }
        };
        var handlePageChange = function (data) {
            d("pgCount").innerHTML = getPageString(data.page, data.pagecount);
            Sidebar.scrollToPage(data.page);
            Button.go.selectedIndex = data.page - 1;
            Button.prev.className = data.isFirstPage ? "disabled btn" : "btn";
            Button.next.className = data.isLastPage ? "disabled btn" : "btn";
        };
        var handleZoomUpdate = function (data) {
            Button.zoom.value = data.zoomType;
            Button.zoom.options[0].innerHTML = Math.floor(data.zoomValue * 100) + "%";
            Button.zoomOut.className = data.isMinZoom ? "disabled btn" : "btn";
            Button.zoomIn.className = data.isMaxZoom ? "disabled btn" : "btn";
        };
        var handleSelectionChange = function (data) {
            updateSelectionButtons(data.type);
        };
        var handleZoomBtn = function () {
            var zoomType = Button.zoom.value;
            if (zoomType != IDRViewer.ZOOM_SPECIFIC) {
                IDRViewer.setZoom(zoomType);
            }
            this.blur();
        };
        var handleViewBtn = function () {
            IDRViewer.setLayout(Button.View.value);
            this.blur();
        };
        var setupLayoutSwitching = function (layout, availableLayouts, isMobile) {
            if (!isMobile) {
                if (availableLayouts.length > 1 && pgCount > 1) {
                    Button.View = document.createElement("select");
                    Button.View.id = "viewBtn";
                    var temp = document.createElement("option");
                    temp.innerHTML = "Presentation";
                    temp.value = IDRViewer.LAYOUT_PRESENTATION;
                    Button.View.appendChild(temp);
                    if (availableLayouts.indexOf(IDRViewer.LAYOUT_MAGAZINE) != -1) {
                        temp = document.createElement("option");
                        temp.innerHTML = "Magazine";
                        temp.value = IDRViewer.LAYOUT_MAGAZINE;
                        Button.View.appendChild(temp);
                    }
                    if (availableLayouts.indexOf(IDRViewer.LAYOUT_CONTINUOUS) != -1) {
                        temp = document.createElement("option");
                        temp.innerHTML = "Continuous";
                        temp.value = IDRViewer.LAYOUT_CONTINUOUS;
                        Button.View.appendChild(temp);
                    }
                    Button.View.onchange = handleViewBtn;
                    d("controls-center").appendChild(Button.View);
                    Button.View.value = layout;
                }
            }
            else {
                Button.zoom.parentNode.removeChild(Button.zoom);
                Button.move.parentNode.removeChild(Button.move);
                Button.select.parentNode.removeChild(Button.select);
                Button.zoomIn.parentNode.removeChild(Button.zoomIn);
                Button.zoomOut.parentNode.removeChild(Button.zoomOut);
            }
        };
        var handleFullscreenChange = function (data) {
            if (data.isFullscreen) {
                Button.fullscreen.className = "btn open";
            }
            else {
                Button.fullscreen.className = "btn closed";
            }
        };
        var pageLabels = [];
        function getPageString(page, pageCount) {
            var result = "/ " + pageCount;
            if (pageLabels.length) {
                result = "(" + page + " / " + pageCount + ")";
            }
            return result;
        }
        var doSearch = function () {
            var resultDiv = document.getElementById("searchResults");
            resultDiv.innerHTML = "";
            var $searchInput = d("searchInput");
            var searchTerm = $searchInput.value;
            var $cbMatchCase = d("cbMatchCase");
            var matchCase = $cbMatchCase.checked;
            var $cbLimitResults = d("cbLimitResults");
            var limitOnePerPage = $cbLimitResults.checked;
            var results = IDRViewer.search(searchTerm, matchCase, limitOnePerPage);
            d("searchResultsCount").innerHTML = String(results.length) + " results";
            var docFrag = document.createDocumentFragment();
            for (var i = 0; i < results.length && i < 500; i++) {
                var pg = results[i].page;
                var link = document.createElement("a");
                link.href = "?page=" + pg;
                link.innerHTML = results[i].snippet;
                link.className = "result";
                (function (page) {
                    link.onclick = function () {
                        IDRViewer.goToPage(page);
                        return false;
                    };
                })(pg);
                docFrag.appendChild(link);
            }
            if (results.length >= 500) {
                var element = document.createElement("span");
                element.innerHTML = "Limited to first 500 results.";
                element.className = "result";
                docFrag.appendChild(element);
            }
            resultDiv.appendChild(docFrag);
        };
        /**
         * Main setup function that runs on load
         */
        IDRViewer.on("ready", function (data) {
            // Grab buttons
            Button.go = d("goBtn");
            Button.zoom = d("zoomBtn");
            Button.fullscreen = d("btnFullScreen");
            Button.prev = d("btnPrev");
            Button.next = d("btnNext");
            Button.move = d("btnMove");
            Button.select = d("btnSelect");
            Button.zoomIn = d("btnZoomIn");
            Button.zoomOut = d("btnZoomOut");
            Button.prev.className = data.isFirstPage ? "disabled btn" : "btn";
            Button.next.className = data.isLastPage ? "disabled btn" : "btn";
            // Set button actions
            Button.go.onchange = handleGoBtn;
            Button.zoom.onchange = handleZoomBtn;
            Button.prev.onclick = function (e) {
                IDRViewer.prev();
                e.preventDefault();
            };
            Button.next.onclick = function (e) {
                IDRViewer.next();
                e.preventDefault();
            };
            Button.move.onclick = function (e) {
                IDRViewer.setSelectMode(IDRViewer.SELECT_PAN);
                e.preventDefault();
            };
            Button.select.onclick = function (e) {
                IDRViewer.setSelectMode(IDRViewer.SELECT_SELECT);
                e.preventDefault();
            };
            Button.zoomIn.onclick = function (e) {
                IDRViewer.zoomIn();
                e.preventDefault();
            };
            Button.zoomOut.onclick = function (e) {
                IDRViewer.zoomOut();
                e.preventDefault();
            };
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 33: // Page Up
                    case 37:// Left Arrow
                        IDRViewer.prev();
                        e.preventDefault();
                        break;
                    case 34: // Page Down
                    case 39:// Right Arrow
                        IDRViewer.next();
                        e.preventDefault();
                        break;
                    case 36:// Home
                        IDRViewer.goToPage(1);
                        e.preventDefault();
                        break;
                    case 35:// End
                        IDRViewer.goToPage(data.pagecount);
                        e.preventDefault();
                        break;
                }
            };
            // Misc setup
            document.title = data.title ? data.title : data.fileName;
            curPg = data.page;
            updateSelectionButtons(data.selectMode);
            pageLabels = data.pageLabels;
            pgCount = data.pagecount;
            populateGoBtn();
            Sidebar.setup(data.bounds, data.thumbnailType, data.bookmarks);
            d("pgCount").innerHTML = getPageString(data.page, data.pagecount);
            if (IDRViewer.isFullscreenEnabled()) {
                Button.fullscreen.onclick = function () {
                    IDRViewer.toggleFullScreen();
                };
                IDRViewer.on("fullscreenchange", handleFullscreenChange);
            }
            else {
                Button.fullscreen.parentNode.removeChild(Button.fullscreen);
            }
            setupLayoutSwitching(data.layout, data.availableLayouts, data.isMobile);
            Button.zoom.value = IDRViewer.ZOOM_AUTO;
            // Add event listeners
            IDRViewer.on("selectchange", handleSelectionChange);
            IDRViewer.on("pagechange", handlePageChange);
            IDRViewer.on("zoomchange", handleZoomUpdate);
            var themeToggle = false;
            d("btnThemeToggle").addEventListener("click", function () {
                ClassHelper.removeClass(document.body, "light-theme");
                ClassHelper.removeClass(document.body, "dark-theme");
                ClassHelper.addClass(document.body, themeToggle ? "light-theme" : "dark-theme");
                themeToggle = !themeToggle;
            });
            var searchInput = d("searchInput");
            searchInput.value = "Loading";
            searchInput.disabled = "disabled";
            searchInput.oninput = doSearch;
            d("cbMatchCase").onclick = doSearch;
            d("cbLimitResults").onclick = doSearch;
            document.addEventListener("keydown", function (event) {
                if (event.keyCode == 70 && (event.ctrlKey || event.metaKey)) {
                    Sidebar.openSidebar();
                    Sidebar.switchToSearch();
                    event.preventDefault();
                }
            });
        });
    };
    // <script src="config.js">
    AppComponent.prototype.config = function () {
        IDRViewer.config = {
            pagecount: 18,
            // pagecount: 90,
            title: "April 2017 NFIP Flood Insurance Manual, 07 Lowest Floor Guide section",
            author: "DHS/FEMA/NFIP",
            fileName: "07_lowest_floor_guide_508_oct2017_2.pdf",
            bounds: [
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210],
                [935, 1210]
            ],
            bookmarks: [
                {
                    title: "07_lowest_floor_guide_508_apr2017_pp8-11_alt txt.pdf",
                    page: 8,
                    zoom: "FitH 1216"
                },
                {
                    title: "07_lowest_floor_guide_508_apr2017",
                    page: 1,
                    zoom: "FitH 1216",
                    children: [
                        {
                            title: "07_lowest_floor_guide_508_apr2017_1n2",
                            page: 1,
                            zoom: "FitH 1216",
                            children: [
                                {
                                    title: "LOWEST FLOOR GUIDE",
                                    page: 1,
                                    zoom: "Fit",
                                    children: [
                                        {
                                            title: "I. LOWEST FLOOR DETERMINATION",
                                            page: 1,
                                            zoom: "Fit",
                                            children: [
                                                {
                                                    title: "A. Non-Elevated Buildings",
                                                    page: 1,
                                                    zoom: "Fit"
                                                },
                                                {
                                                    title: "B. Elevated Buildings in A Zones",
                                                    page: 1,
                                                    zoom: "Fit"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "07_LowestFloorGuide_pp3-4",
                            page: 3,
                            zoom: "FitH 1216",
                            children: [
                                {
                                    title: "LOWEST FLOOR GUIDE",
                                    page: -1,
                                    zoom: "",
                                    children: [
                                        {
                                            title: "I. LOWEST FLOOR DETERMINATION",
                                            page: -1,
                                            zoom: "",
                                            children: [
                                                {
                                                    title: "C. Elevated Buildings in V Zones",
                                                    page: 3,
                                                    zoom: "Fit"
                                                },
                                                {
                                                    title: "D. Hanging Floors (A Zones and V Zones)",
                                                    page: 4,
                                                    zoom: "Fit"
                                                }
                                            ]
                                        },
                                        {
                                            title: "II. USE OF ELEVATION CERTIFICATE",
                                            page: 4,
                                            zoom: "Fit",
                                            children: [
                                                {
                                                    title: "A. Mandatory Use of Elevation Certificate",
                                                    page: 4,
                                                    zoom: "Fit"
                                                },
                                                {
                                                    title: "B. Optional Rating Using the Elevation Certificate",
                                                    page: 4,
                                                    zoom: "Fit"
                                                },
                                                {
                                                    title: "C. Guidelines for Determining the Conversion from NGVD 1929 to NAVD 1988",
                                                    page: 4,
                                                    zoom: "Fit"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: "07_lowest_floor_guide_508_apr2017_last",
                            page: 5,
                            zoom: "FitH 1216",
                            children: [
                                {
                                    title: "LOWEST FLOOR GUIDE",
                                    page: -1,
                                    zoom: "",
                                    children: [
                                        {
                                            title: "III. SPECIFIC BUILDING DRAWINGS, Table of Contents",
                                            page: 13,
                                            zoom: "Fit"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            thumbnailType: "jpg",
            pageType: "html",
            pageLabels: [
                "LFG 1",
                "LFG 2",
                "LFG 3",
                "LFG 4",
                "LFG 5",
                "LFG 6",
                "LFG 7",
                "LFG 8",
                "LFG 9",
                "LFG 10",
                "LFG 11",
                "LFG 12",
                "LFG 13",
                "LFG 14",
                "LFG 15",
                "LFG 16",
                "LFG 17",
                "LFG 18",
                "LFG 19",
                "LFG 20",
                "LFG 21",
                "LFG 22",
                "LFG 23",
                "LFG 24",
                "LFG 25",
                "LFG 26",
                "LFG 27",
                "LFG 28",
                "LFG 29",
                "LFG 30",
                "LFG 31",
                "LFG 32",
                "LFG 33",
                "LFG 34",
                "LFG 35",
                "LFG 36",
                "LFG 37",
                "LFG 38",
                "LFG 39",
                "LFG 40",
                "LFG 41",
                "LFG 42",
                "LFG 43",
                "LFG 44",
                "LFG 45",
                "LFG 46",
                "LFG 47",
                "LFG 48",
                "LFG 49",
                "LFG 50",
                "LFG 51",
                "LFG 52",
                "LFG 53",
                "LFG 54",
                "LFG 55",
                "LFG 56",
                "LFG 57",
                "LFG 58",
                "LFG 59",
                "LFG 60",
                "LFG 61",
                "LFG 62",
                "LFG 63",
                "LFG 64",
                "LFG 65",
                "LFG 66",
                "LFG 67",
                "LFG 68",
                "LFG 69",
                "LFG 70",
                "LFG 71",
                "LFG 72",
                "LFG 73",
                "LFG 74",
                "LFG 75",
                "LFG 76",
                "LFG 77",
                "LFG 78",
                "LFG 79",
                "LFG 80",
                "LFG 81",
                "LFG 82",
                "LFG 83",
                "LFG 84",
                "LFG 85",
                "LFG 86",
                "LFG 87",
                "LFG 88",
                "LFG 89",
                "LFG 90"
            ]
        };
    };
    AppComponent.prototype.ngOnInit = function () {
        // console.log("ngOnInit...");
        this.init();
        this.config();
        IDRViewer.setup();
        // Make sure we don't initialize the annotator for the same page twice
        var pageAnnotations = {
            pages: {},
            states: {}
        };
        var annotatePage = function (pageNum, event) {
            var $pg = $("#pg" + pageNum);
            var timer = 500;
            console.warn("annotatePage...");
            // CHECK IF PAGE IS READY (RESOURCES LOADED)
            if (!pageAnnotations.states["page" + pageNum] && pageAnnotations.states["page" + pageNum] != "READY") {
                console.log("Page #" + pageNum + " not in READY state.");
                return setTimeout(function () {
                    annotatePage(pageNum, event);
                }, timer);
            }
            console.log("Annotation initialized in page #" + pageNum, ' [Event]: ' + event);
            function handleCreatedAnnotations(options) {
                return {
                    annotationCreated: function (annotation) {
                        // console.log(annotation);
                        // Handling Storage of Annotations via LocalStorage
                        var storageKey = "page" + pageNum;
                        if (!localStorage.getItem(storageKey)) {
                            localStorage.setItem(storageKey, JSON.stringify([annotation]));
                        }
                        else {
                            var prevStorage = localStorage.getItem(storageKey);
                            prevStorage = JSON.parse(prevStorage);
                            prevStorage.push(annotation);
                            localStorage.setItem(storageKey, JSON.stringify(prevStorage));
                        }
                    }
                };
            }
            // Handle creation of annotation with extra img tag overlayed on top of original image
            $("#page" + pageNum).css("position", "relative");
            console.log("Object:", $pg.find("object").length);
            if ($pg.find("object").length > 0) {
                var obj = $pg.find("object")[0].contentDocument;
                var image = obj.querySelector("image");
                if (obj.readyState != "complete") {
                    console.warn("Page #" + pageNum + " Object not in complete readystate. Reloading...");
                    return setTimeout(function () {
                        annotatePage(pageNum, event);
                    }, timer);
                }
                if (!image)
                    return false;
                console.log("Image(s) to be annotated found.");
                if (!pageAnnotations.pages["page" + pageNum]) {
                    pageAnnotations.pages["page" + pageNum] = [];
                }
                else {
                    return false;
                }
                var coords = image.getBBox();
                var anot = document.createElement("img");
                var container = document.createElement("div");
                anot.setAttribute("class", "annotateme");
                var imgSrc = document.location.origin + "/integrate-annototor-js-imgselect-plugin-in-our-pdf-html-viewer-angular-4/dist/my-app/" + pageNum + "/" + image.getAttribute("xlink:href");
                anot.setAttribute("src", imgSrc );
                container.setAttribute("style", "position:absolute; width: " + coords.width + "px; height: " +
                    coords.height + "px; top: " + coords.y + "px; left:" +
                    coords.x + "px; background:black; z-index: 10001;");
                container.appendChild(anot);
                $pg.append(container);
                var app = new annotator.App();
                app
                    .include(annotator.ui.main)
                    .include(handleCreatedAnnotations)
                    .include(annotatorImageSelect, { pageNum: pageNum, element: $("img.annotateme") });
                app.start();
            }
        };
        IDRViewer.on('pageload', function (data) {
            pageAnnotations.states["page" + data.page] = "READY";
        });
        IDRViewer.on('pagechange', function (data) {
            annotatePage(data.page, 'pagechange');
        });
        window.addEventListener("load", function () {
            var page = document.location.search.split("=");
            if (page) {
                page = page[1];
                annotatePage(page, "window:load");
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kostasx/WebServer/plethoralabs/BOUNTIFY/integrate-annototor-js-imgselect-plugin-in-our-pdf-html-viewer-angular-4--100/my-app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
