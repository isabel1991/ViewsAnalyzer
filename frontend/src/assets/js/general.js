
$(document).ready(function () {
    $.map($("div.collapsable-component"), function (component) {
        const father = $(component),
            componentContent = father.find(".container");
        let titleComponent = $(document.createElement("div")).addClass("title").html(father.attr("title"));
        father.prepend(titleComponent);

        console.log(typeof father.attr("collapse"));
        if(typeof father.attr("collapse") === "string") {
            titleComponent.attr("close","");
            componentContent.hide();
        }

        titleComponent.on("click", function() {

            if($(this).attr("close") != null) {
                $(this).removeAttr("close");
                componentContent.slideDown();
            }
            else {
                $(this).attr("close","");
                componentContent.slideUp();

            }
        });
        
    });
});