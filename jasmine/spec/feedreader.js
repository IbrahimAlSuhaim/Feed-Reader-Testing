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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('Each feed has a URL', function() {
           for(feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
             expect(feed.url).not.toBeNull();
           }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Each feed has a name', function() {
           for(feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
             expect(feed.name).not.toBeNull();
           }
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {


        /* A test that ensures the menu element is
         * hidden by default.
         */
         it('is by default hidden', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('visibility is changable', function() {
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
          loadFeed(0,function() {
            done();
          });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('loadFeed function is called and completes its work', function() {
           const entries = $('.feed .entry');
           expect(entries.length).toBeGreaterThan(0);
         });
    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      let feedAfterFirstLoad,
            feedAfterSecondLoad;

        beforeEach(function(done) {
          loadFeed(0,function() {
            feedAfterFirstLoad = $('.feed').html();
            loadFeed(1,function() {
              feedAfterSecondLoad = $('.feed').html();
              done();
            });
          });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         it('is loaded', function() {
           expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
         });
    });
}());
