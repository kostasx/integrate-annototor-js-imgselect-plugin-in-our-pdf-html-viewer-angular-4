import { Component, OnInit } from "@angular/core";

declare var IDRViewer: any;
declare var $: any;
declare var annotator: any;
declare var annotatorImageSelect: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "my-app";

  constructor() { }

  init() {

    // console.log("init...");
    var Button = <any>{},
      pgCount,
      curPg;
    // * Shorthand helper function to getElementById
    var d = function (id) {
      return document.getElementById(id);
    };

    var ClassHelper = (function () {
      return {
        addClass: function (ele, name) {
          var classes =
            ele.className.length !== 0 ? ele.className.split(" ") : [];
          var index = classes.indexOf(name);
          if (index === -1) {
            classes.push(name);
            ele.className = classes.join(" ");
          }
        },

        removeClass: function (ele, name) {
          var classes =
            ele.className.length !== 0 ? ele.className.split(" ") : [];
          var index = classes.indexOf(name);
          if (index !== -1) {
            classes.splice(index, 1);
          }
          ele.className = classes.join(" ");
        },

        toggleClass: function (ele, name) {
          var classes =
            ele.className.length !== 0 ? ele.className.split(" ") : [];
          var index = classes.indexOf(name);
          var wasClassAdded;
          if (index === -1) {
            classes.push(name);
            wasClassAdded = true;
          } else {
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
      var Sidebar = <any>{},
        loadedThumbsArray = [],
        lastScroll = 0,
        sidebar,
        thumbnailBar,
        imageType,
        scrollSidebar = true,
        thumbnailPanel,
        bookmarkPanel,
        searchPanel,
        isSearchLoaded,
        searchInput;

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
          } else {
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

      var loadVisibleThumbnails = function (scrollTop = null) {
        if (typeof scrollTop !== "undefined" && scrollTop != lastScroll) return;

        // load thumbs in view
        for (var thumbIndex = 0; thumbIndex < pgCount; thumbIndex++) {
          if (!loadedThumbsArray[thumbIndex]) {
            var curThumb = thumbnailPanel.children[thumbIndex];
            // Bails out of the loop when the next thumbnail is below the viewable area
            if (
              curThumb.offsetTop >
              thumbnailBar.scrollTop + thumbnailBar.clientHeight
            ) {
              break;
            }
            if (
              curThumb.offsetTop + curThumb.clientHeight >
              thumbnailBar.scrollTop
            ) {
              curThumb.children[0].setAttribute(
                "src",
                "thumbnails/" + (thumbIndex + 1) + "." + imageType
              );
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
      IDRViewer.goToPage(
        parseInt(Button.go.options[Button.go.selectedIndex].value)
      );
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
      } else {
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
      } else {
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

      var $searchInput: any = d("searchInput");
      var searchTerm = $searchInput.value;

      var $cbMatchCase: any = d("cbMatchCase");
      var matchCase = $cbMatchCase.checked;

      var $cbLimitResults: any = d("cbLimitResults");
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
          case 37: // Left Arrow
            IDRViewer.prev();
            e.preventDefault();
            break;
          case 34: // Page Down
          case 39: // Right Arrow
            IDRViewer.next();
            e.preventDefault();
            break;
          case 36: // Home
            IDRViewer.goToPage(1);
            e.preventDefault();
            break;
          case 35: // End
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
      } else {
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
        ClassHelper.addClass(
          document.body,
          themeToggle ? "light-theme" : "dark-theme"
        );
        themeToggle = !themeToggle;
      });

      var searchInput: any = d("searchInput");
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
  }

  // <script src="config.js">
  config() {
    IDRViewer.config = {
      pagecount: 18, // For debugging purposes...
      // pagecount: 90,
      title:
        "April 2017 NFIP Flood Insurance Manual, 07 Lowest Floor Guide section",
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
                          title:
                            "B. Optional Rating Using the Elevation Certificate",
                          page: 4,
                          zoom: "Fit"
                        },
                        {
                          title:
                            "C. Guidelines for Determining the Conversion from NGVD 1929 to NAVD 1988",
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
                      title:
                        "III. SPECIFIC BUILDING DRAWINGS, Table of Contents",
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
  }

  ngOnInit() {
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
            let storageKey = "page" + pageNum;
            if (!localStorage.getItem(storageKey)) {
              localStorage.setItem(storageKey, JSON.stringify([annotation]))
            } else {
              let prevStorage: any = localStorage.getItem(storageKey);
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

        if (!image) return false;
        console.log("Image(s) to be annotated found.");
        if (!pageAnnotations.pages["page" + pageNum]) {
          pageAnnotations.pages["page" + pageNum] = [];
        } else {
          return false;
        }
        var coords = image.getBBox();
        var anot = document.createElement("img");
        var container = document.createElement("div");
        anot.setAttribute("class", "annotateme");
        anot.setAttribute("src", document.location.origin + "/" + pageNum + "/" + image.getAttribute("xlink:href"));
        container.setAttribute(
          "style",
          "position:absolute; width: " + coords.width + "px; height: " +
          coords.height + "px; top: " + coords.y + "px; left:" +
          coords.x + "px; background:black; z-index: 10001;"
        );
        container.appendChild(anot);
        $pg.append(container);

        var app = new annotator.App();
        app
          .include(annotator.ui.main)
          .include(handleCreatedAnnotations)
          .include(annotatorImageSelect, { pageNum: pageNum, element: $("img.annotateme") });
        app.start();

      }

    }

    IDRViewer.on('pageload', function (data) {
      pageAnnotations.states["page" + data.page] = "READY";
    });
    IDRViewer.on('pagechange', function (data) {
      annotatePage(data.page, 'pagechange');
    });
    window.addEventListener("load", function () {
      var page: any = document.location.search.split("=");
      if (page) {
        page = page[1];
        annotatePage(page, "window:load");
      }
    });

  }
}
