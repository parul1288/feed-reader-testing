/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function (feed) {
                var url = feed.url;
                expect(url).toBeDefined();
                expect(url).not.toEqual('');
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function (feed) {
                var name = feed.name;
                expect(name).toBeDefined();
                expect(name).not.toEqual('');
            });
        });
    });


    /* "The menu" test suites - This test suite tests that the
     * menu is hidden by default and the visibility of the menu
     * can be toggled by clicking the menu icon button */
    describe('The Menu', function() {

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            var body = document.getElementsByTagName("body")[0];
            expect(body).toHaveClass('menu-hidden');
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should change visibility on toggling menu icon', function() {
             var menu_icon = document.getElementsByClassName("menu-icon-link")[0];
             var body = document.getElementsByTagName("body")[0];
             //click first time toggleClass
             menu_icon.click();
             expect(body).not.toHaveClass('menu-hidden');
             //click second time
             menu_icon.click();
             expect(body).toHaveClass('menu-hidden');
         });
    });

    /* "Initial Entries" test suite - This test suite contains tests related
    * to the loading of the feeds. It ensures that atleast one entry is loaded for
    * the feed */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('should have atleast a single .entry element within the .feed container', function (done) {
            var entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).not.toBe(0);
            done();
        });
    });

        /* "New Feed Selection" test suite - This test suite ensures that
         * the feed changes the content of the page everytime a new feed is loaded */
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */

        beforeEach(function (done) {
            loadFeed(1, function () {
                firstFeed = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(2, function() {
                   secondFeed = document.getElementsByClassName('feed')[0].innerHTML;
                   done();
                })
            });
        });

        it('should change content whenever loadFeed function is called', function () {
            expect(firstFeed).not.toEqual(secondFeed);
        });

    });

}());
