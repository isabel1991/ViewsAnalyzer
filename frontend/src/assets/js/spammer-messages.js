function showMessage(message, type) {
    console.log(message,type);
    let container = $("#message-global-content");
    if(container.length) {
        console.log("hola");
    }
    else {
        container = $(document.createElement("div")).id("message-global-content");
        $("body").prepend(container);
    }
}