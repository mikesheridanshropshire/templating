$(document).ready(function () {

    if ($("#shrop-menu").length > 0) {
        $("#shrop-menu").load("https://shropshire.gov.uk/menu-html", function () {
            /* ********************************************************************************************
            * main menu / dropdown menu
            */

            // click menu
            $("#menu").click(function (event) {
                event.stopPropagation();

                if ($("#menu").hasClass("closed")) {
                    $(this).removeClass("closed").addClass("open");
                }
                else if ($("#menu").hasClass("open")) {
                    $(this).removeClass("open").addClass("closed");
                }
                $("#menu-dropdown").slideToggle();
            });

            //close menu on click out
            $(document).click(function (e) {
                if ($(e.target).closest("#menu-dropdown").length === 0) {
                    if ($("#menu").hasClass("open")) {
                        $("#menu").removeClass("open").addClass("closed");

                        $("#menu-dropdown").slideUp("fast");
                    }
                }
            });

            // keypress - 27 is the keycode for the Escape key
            $("body").keyup(function (e) {

                if (e.which === 27) {
                    // hide
                    if ($("#menu").hasClass("open")) {
                        $("#menu").removeClass("open").addClass("closed");
                    }

                    if ($("#menu-dropdown").is(":visible")) {
                        $("#menu-dropdown").slideUp("fast");
                    }
                    return false;
                }

            });


            function reveal(i) {
                $(i).removeClass("hidden");
            }
            function hide(i) {
                $(i).addClass("hidden");
            }

            var startWidth = $(window).width();

            if (startWidth <= 640) {
                hide($("#back-button"));
            }

            $("#back-button").click(function (e) {

                reveal($("#menu-category li"));

                hide($("#menu-service-area li"));

                hide($(this));
                $(this).removeAttr("href");
                hide($("#menu-content li"));

                $("#menu-dropdown li").removeClass("active");

            });

            function mobile(width) {

                $("#menu-category li").unbind("click");
                $("#menu-service-area li").unbind("click");

                $("#menu-category li").each(function () { //loop through the category list

                    $(this).click(function (e) { //on mouse up do this
                        var indexer = $(this).index();

                        reveal($("#back-button"));
                        $("#back-button").attr("href", "#");
                        hide($("#menu-content li")); //hide third list when selecting first list
                        $("#menu-service-area li a").attr("tabindex", -1);
                        $("#menu-content li a").attr("tabindex", -1);
                        $("#menu-service-area li.menu-service-area a").removeAttr("href");

                        if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                            reveal($("#menu-service-area li"));
                            hide($("#menu-category li").not($(this)));

                            $("#menu-service-area li").removeClass("active");
                            $("#menu-category li").removeClass("active");
                            var classes = $(this).attr("class").toString().split(" "); //get id to array for each category list item
                            var indexes = [];


                            $("#menu-service-area li").each(function (index) { //loop through middle list

                                for (i = 0; i < classes.length; i++) { //get classes of middle list
                                    if ($(this).hasClass(classes[i])) { //match category id to classes
                                        reveal($(this)); //reveal if matching class/id
                                        $("a", this).attr("tabindex", 0);
                                        $("a.internal", this).attr("href", "#");

                                        indexes.push(index);

                                        if (index === indexes[0]) {
                                            $("a", this).focus();
                                        }
                                    }
                                    else {
                                        hide($(this)); //hide the rest
                                        $("a.internal", this).removeAttr("href");
                                        $("a", this).removeAttr("tabindex");
                                        $("a.external", this).attr("tabindex", -1);
                                    }
                                }

                            });
                            $(this).addClass("active");
                        }

                    });
                });


                $("#menu-service-area li").each(function () { //loop through middle list

                    $(this).click(function (e) { //on mouse up do this


                        if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item
                            $("#menu-content li a").attr("tabindex", -1);

                            hide($("#menu-service-area li").not($(this)));

                            $("#menu-service-area li").removeClass("active");

                            var classes = $(this).attr("class").toString().split(" "); //get classes to array for each service-area item

                            var contentIndexes = [];

                            $("#menu-content li").each(function (index) { //loop through last list

                                for (i = 0; i < classes.length; i++) { //get classes of last list
                                    if ($(this).hasClass(classes[i])) { //match content class to service-area class
                                        reveal($(this));
                                        $("a", this).attr("tabindex", 0);
                                        contentIndexes.push(index);

                                        if (index === contentIndexes[0]) {
                                            $("a", this).focus();
                                        }
                                    }
                                    else {
                                        hide($(this));
                                        $("a", this).attr("tabindex", -1);
                                    }
                                }

                            });
                            $(this).addClass("active");
                        }

                    });
                });
            }
            function desktop(width) {

                $("#menu-category li").unbind("click");
                $("#menu-service-area li").unbind("click");

                hide($("#back-button"));
                reveal($("#menu-category li"));

                $("#menu-category li").each(function () { //loop through the category list

                    $(this).click(function (e) { //on mouse up do this
                        var indexer = $(this).index();
                        hide($("#menu-content li")); //hide third list when selecting first list
                        $("#menu-service-area li a").attr("tabindex", -1);
                        $("#menu-content li a").attr("tabindex", -1);
                        $("#menu-service-area li.menu-service-area a").removeAttr("href");

                        if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                            $("#menu-service-area li").removeClass("active");
                            $("#menu-category li").removeClass("active");

                            var classes = $(this).attr("class").toString().split(" "); //get id to array for each category list item
                            var indexes = [];

                            $("#menu-service-area li").each(function (index) { //loop through middle list

                                for (i = 0; i < classes.length; i++) { //get classes of middle list
                                    if ($(this).hasClass(classes[i])) { //match category id to classes
                                        reveal($(this)); //reveal if matching class/id

                                        $("a", this).attr("tabindex", 0);
                                        $("a.internal", this).attr("href", "#");

                                        indexes.push(index);

                                        if (index === indexes[0]) {
                                            $("a", this).focus();
                                        }
                                    }
                                    else {
                                        hide($(this)); //hide the rest
                                        $("a.internal", this).removeAttr("href");
                                        $("a", this).removeAttr("tabindex");
                                        $("a.external", this).attr("tabindex", -1);
                                    }
                                }
                            });
                            $(this).addClass("active");
                        }

                    });
                });


                $("#menu-service-area li").each(function () { //loop through middle list

                    $(this).click(function (e) { //on mouse up do this
                        $("#menu-content li a").attr("tabindex", -1);

                        if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                            $("#menu-service-area li").removeClass("active");

                            var classes = $(this).attr("class").toString().split(" "); //get classes to array for each service-area item

                            var contentIndexes = [];

                            $("#menu-content li").each(function (index) { //loop through last list

                                for (i = 0; i < classes.length; i++) { //get classes of last list
                                    if ($(this).hasClass(classes[i])) { //match content class to service-area class
                                        reveal($(this));
                                        $("a", this).attr("tabindex", 0);
                                        contentIndexes.push(index);

                                        if (index === contentIndexes[0]) {
                                            $("a", this).focus();
                                        }
                                    }
                                    else {
                                        hide($(this));
                                        $("a", this).attr("tabindex", -1);
                                    }
                                }

                            });
                            $(this).addClass("active");
                        }
                    });
                });
            }

            //close/open menu on resize
            $(window).resize(function () {
                var width = $(window).width();

                if (width <= 640) {
                    mobile(width);
                }
                else if (width > 640) {
                    desktop(width);
                }
            }).resize();
        });
    } else if ($("div#navbar-wrapper").length > 0) {
        /* ********************************************************************************************
        * main menu / dropdown menu
        */

        // click menu
        $("#menu").click(function (event) {
            event.stopPropagation();

            if ($("#menu").hasClass("closed")) {
                $(this).removeClass("closed").addClass("open");
            }
            else if ($("#menu").hasClass("open")) {
                $(this).removeClass("open").addClass("closed");
            }
            $("#menu-dropdown").slideToggle();
        });

        //close menu on click out
        $(document).click(function (e) {
            if ($(e.target).closest("#menu-dropdown").length === 0) {
                if ($("#menu").hasClass("open")) {
                    $("#menu").removeClass("open").addClass("closed");

                    $("#menu-dropdown").slideUp("fast");
                }
            }
        });

        // keypress - 27 is the keycode for the Escape key
        $("body").keyup(function (e) {

            if (e.which === 27) {
                // hide
                if ($("#menu").hasClass("open")) {
                    $("#menu").removeClass("open").addClass("closed");
                }

                if ($("#menu-dropdown").is(":visible")) {
                    $("#menu-dropdown").slideUp("fast");
                }
                return false;
            }

        });


        function reveal(i) {
            $(i).removeClass("hidden");
        }
        function hide(i) {
            $(i).addClass("hidden");
        }

        var startWidth = $(window).width();

        if (startWidth <= 640) {
            hide($("#back-button"));
        }

        $("#back-button").click(function (e) {

            reveal($("#menu-category li"));

            hide($("#menu-service-area li"));

            hide($(this));
            $(this).removeAttr("href");
            hide($("#menu-content li"));

            $("#menu-dropdown li").removeClass("active");

        });

        function mobile(width) {

            $("#menu-category li").unbind("click");
            $("#menu-service-area li").unbind("click");

            $("#menu-category li").each(function () { //loop through the category list

                $(this).click(function (e) { //on mouse up do this
                    var indexer = $(this).index();

                    reveal($("#back-button"));
                    $("#back-button").attr("href", "#");
                    hide($("#menu-content li")); //hide third list when selecting first list
                    $("#menu-service-area li a").attr("tabindex", -1);
                    $("#menu-content li a").attr("tabindex", -1);
                    $("#menu-service-area li.menu-service-area a").removeAttr("href");

                    if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                        reveal($("#menu-service-area li"));
                        hide($("#menu-category li").not($(this)));

                        $("#menu-service-area li").removeClass("active");
                        $("#menu-category li").removeClass("active");
                        var classes = $(this).attr("class").toString().split(" "); //get id to array for each category list item
                        var indexes = [];


                        $("#menu-service-area li").each(function (index) { //loop through middle list

                            for (i = 0; i < classes.length; i++) { //get classes of middle list
                                if ($(this).hasClass(classes[i])) { //match category id to classes
                                    reveal($(this)); //reveal if matching class/id
                                    $("a", this).attr("tabindex", 0);
                                    $("a.internal", this).attr("href", "#");

                                    indexes.push(index);

                                    if (index === indexes[0]) {
                                        $("a", this).focus();
                                    }
                                }
                                else {
                                    hide($(this)); //hide the rest
                                    $("a.internal", this).removeAttr("href");
                                    $("a", this).removeAttr("tabindex");
                                    $("a.external", this).attr("tabindex", -1);
                                }
                            }

                        });
                        $(this).addClass("active");
                    }

                });
            });


            $("#menu-service-area li").each(function () { //loop through middle list

                $(this).click(function (e) { //on mouse up do this


                    if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item
                        $("#menu-content li a").attr("tabindex", -1);

                        hide($("#menu-service-area li").not($(this)));

                        $("#menu-service-area li").removeClass("active");

                        var classes = $(this).attr("class").toString().split(" "); //get classes to array for each service-area item

                        var contentIndexes = [];

                        $("#menu-content li").each(function (index) { //loop through last list

                            for (i = 0; i < classes.length; i++) { //get classes of last list
                                if ($(this).hasClass(classes[i])) { //match content class to service-area class
                                    reveal($(this));
                                    $("a", this).attr("tabindex", 0);
                                    contentIndexes.push(index);

                                    if (index === contentIndexes[0]) {
                                        $("a", this).focus();
                                    }
                                }
                                else {
                                    hide($(this));
                                    $("a", this).attr("tabindex", -1);
                                }
                            }

                        });
                        $(this).addClass("active");
                    }

                });
            });
        }
        function desktop(width) {

            $("#menu-category li").unbind("click");
            $("#menu-service-area li").unbind("click");

            hide($("#back-button"));
            reveal($("#menu-category li"));

            $("#menu-category li").each(function () { //loop through the category list

                $(this).click(function (e) { //on mouse up do this
                    var indexer = $(this).index();
                    hide($("#menu-content li")); //hide third list when selecting first list
                    $("#menu-service-area li a").attr("tabindex", -1);
                    $("#menu-content li a").attr("tabindex", -1);
                    $("#menu-service-area li.menu-service-area a").removeAttr("href");

                    if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                        $("#menu-service-area li").removeClass("active");
                        $("#menu-category li").removeClass("active");

                        var classes = $(this).attr("class").toString().split(" "); //get id to array for each category list item
                        var indexes = [];

                        $("#menu-service-area li").each(function (index) { //loop through middle list

                            for (i = 0; i < classes.length; i++) { //get classes of middle list
                                if ($(this).hasClass(classes[i])) { //match category id to classes
                                    reveal($(this)); //reveal if matching class/id

                                    $("a", this).attr("tabindex", 0);
                                    $("a.internal", this).attr("href", "#");

                                    indexes.push(index);

                                    if (index === indexes[0]) {
                                        $("a", this).focus();
                                    }
                                }
                                else {
                                    hide($(this)); //hide the rest
                                    $("a.internal", this).removeAttr("href");
                                    $("a", this).removeAttr("tabindex");
                                    $("a.external", this).attr("tabindex", -1);
                                }
                            }
                        });
                        $(this).addClass("active");
                    }

                });
            });


            $("#menu-service-area li").each(function () { //loop through middle list

                $(this).click(function (e) { //on mouse up do this
                    $("#menu-content li a").attr("tabindex", -1);

                    if (e.target.id !== $(this).attr("id")) { //check id"s of clicked item

                        $("#menu-service-area li").removeClass("active");

                        var classes = $(this).attr("class").toString().split(" "); //get classes to array for each service-area item

                        var contentIndexes = [];

                        $("#menu-content li").each(function (index) { //loop through last list

                            for (i = 0; i < classes.length; i++) { //get classes of last list
                                if ($(this).hasClass(classes[i])) { //match content class to service-area class
                                    reveal($(this));
                                    $("a", this).attr("tabindex", 0);
                                    contentIndexes.push(index);

                                    if (index === contentIndexes[0]) {
                                        $("a", this).focus();
                                    }
                                }
                                else {
                                    hide($(this));
                                    $("a", this).attr("tabindex", -1);
                                }
                            }

                        });
                        $(this).addClass("active");
                    }
                });
            });
        }

        //close/open menu on resize
        $(window).resize(function () {
            var width = $(window).width();

            if (width <= 640) {
                mobile(width);
            }
            else if (width > 640) {
                desktop(width);
            }
        }).resize();
    }

    

});