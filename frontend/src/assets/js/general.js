
function showHideUserConfig() {
    const menu = $("header div.config-menu div.user-nav");

    menu.slideDown();

    menu.off("mouseout");

    $(menu).on("mouseout", function (event) {
        let elem = $(event.toElement || event.relatedTarget);
        if (elem.hasClass("user-nav")) {
            menu.slideUp();
        }
    });
}