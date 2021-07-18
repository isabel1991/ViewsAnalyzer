function _init() {
    $.map($("div.collapsable-component"), function (component) {
        const father = $(component),
            componentContent = father.find(".container");
        let titleComponent = $(document.createElement("div")).addClass("title").html(father.attr("title"));
        father.prepend(titleComponent);

        if (typeof father.attr("collapse") === "string") {
            titleComponent.attr("close", "");
            componentContent.hide();
        }
        titleComponent.on("click", function () {
            if ($(this).attr("close") != null) {
                $(this).removeAttr("close");
                componentContent.slideDown();
            }
            else {
                $(this).attr("close", "");
                componentContent.slideUp();
            }
        });
    });

    $.map($("input[type |= 'checkbox'][togglebutton]"),function(component) {
        const checkbox = $(component);
        checkbox.wrap($(document.createElement('div')).addClass('toggle-button-container'));
        checkbox.parent().append($(document.createElement('span')).addClass('toggle-span'));
    })
}

function showContainer(container, animation) {
    console.log(animation);
    if(animation !== false) {
        $(container).slideDown();
    }
    else {
        $(container).show();
    }
}

function hideContainer(container, animation) {
    if(animation !== false) {
        $(container).slideUp();
    }
    else {
        $(container).hide();
    }
}