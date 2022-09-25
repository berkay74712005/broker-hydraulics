var i = 0,
    timeOut = 0;
var count = 0;
$(function() {

    window.addEventListener("message", function(event) {
        var item = event.data
        if (item.message == 'OpenSuspension') {
            $("body").css("display", "block");
            i = Math.round(item.CurrentHeight);
            if (i > 0) {
                count = i * -1
            } else {
                count = i * -1
            }
            $("#suspension-height").html(count);
        }
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $("body").css("display", "none");
            $.post(`https://${GetParentResourceName()}/quit`, JSON.stringify({}));
        }
    });
});

$('#button-up-fast').on('mousedown touchstart', function(e) {
    timeOut = setInterval(function() {
        if (i >= -65) {
            if (i > -65) {
                i--;
            }
            if (i > -65) {
                i--;
            }
            NewHeight(i)
        }
    }, 100);
}).bind('mouseup mouseleave touchend', function() {
    clearInterval(timeOut);
});

$('#button-up-normal').on('click', function(e) {
    if (i >= -65) {
        if (i > -65) {
            i--;
        }
        NewHeight(i)
    }
})

$('#button-low-normal').on('click', function(e) {
    if (i <= 65) {
        if (i < 65) {
            i++;
        }
        NewHeight(i)
    }
})

$('#button-low-fast').on('mousedown touchstart', function(e) {
    timeOut = setInterval(function() {
        if (i <= 65) {
            if (i < 65) {
                i++;
            }
            if (i < 65) {
                i++;
            }
            NewHeight(i)
        }
    }, 100);
}).bind('mouseup mouseleave touchend', function() {
    clearInterval(timeOut);
});

function NewHeight(height) {
    $.post(`https://${GetParentResourceName()}/NewSuspension`, JSON.stringify({
        NewHeight: Math.round(height) / 1000
    }));
    if (i > 0) {
        count = i * -1
    } else {
        count = i * -1
    }
    $("#suspension-height").html(count);
}