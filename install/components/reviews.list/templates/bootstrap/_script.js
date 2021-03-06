
/**
 * reviews.list component
 * 
 * @author dimabresky 
 * @copyright 2018, travelsoft
 */

(function (window) {

    "use strict";

    var document = window.document;
    var $ = window.jQuery;
    var initReady = [];

    /**
     * @param {$} elements
     * @returns {undefined}
     */
    function __initFancybox(elements) {
        
        var gallery = $(elements.get(0)).data("fancybox");
        if ($.inArray(gallery, initReady) === -1) {
            elements.fancybox({
                buttons: ['thumbs', 'close']
            });
            initReady.push(gallery);
        }

    }

    /**
     * @param {$} elements
     * @param {Object} messages
     * @returns {undefined}
     */
    function __initReadmore(elements, messages) {
        elements.each(function () {
            if ($.inArray($(this).attr("id"), initReady) === -1) {
                $(this).readmore({
                    speed: 75,
                    moreLink: '<a href="#">'+messages.showMore+'</a>',
                    lessLink: '<a href="#">'+messages.less+'</a>'
                });
                initReady.push($(this).attr("id"));
            }
        });
    }

    /**
     * @param {$} elements
     * @param {Number} total_stars_count
     * @returns {undefined}
     */
    function __initRaty(elements, total_stars_count) {

        elements.each(function () {
            if ($.inArray($(this).attr("id"), initReady) === -1) {
                $(this).raty({
                    readOnly: true,
                    number: total_stars_count,
                    halfShow: true,
                    score: $(this).data("stars"),
                    path: '/local/modules/travelsoft.reviews/plugins/raty/img'
                });
                initReady.push($(this).attr("id"));
            }
        });
    }

    function __initPlugins(parameters) {
        __initRaty($(".review-rating"), parameters.total_stars_count);

        __initFancybox($('[data-fancybox^="gallery-"]'));

        __initReadmore($(".review-text"), parameters.messages);
    }

    /**
     * @param {$} btn
     * @param {Number} page
     * @param {Number} pageCount
     * @returns {Number|@var;page}
     */
    function __changeLoadBehavior(btn, page, pageCount) {
        btn.prop("disabled", false);
        page = page + 1;
        if (page > pageCount) {
            btn.remove();
        }
        return page;
    }

    $(document).ready(function () {

        var __parameters = window.reviewsListJsParameters;
        var pageCount = Number(__parameters.pageCount);
        var page = Number(__parameters.page) + 1;

        __initPlugins(__parameters);

        if (pageCount > 0 && page > 0 && page <= pageCount) {
            $("#show-more-reviews").on("click", function () {

                var $this = $(this);

                $this.prop("disabled", true);

                $.ajax({
                    url: "/local/components/travelsoft/reviews.list/ajax.php",
                    data: {PAGEN_1: page},
                    success: function (resp) {


                        if (resp !== "") {
                            $("#reviews-list").append(resp);
                            __initPlugins(__parameters);
                        }

                        page = __changeLoadBehavior($this, page, pageCount);
                    },
                    error: function () {

                        page = __changeLoadBehavior($this, page, pageCount);
                    }
                });
            });

        }

    });

})(window);
