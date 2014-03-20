$(function() {
    // console.log('page ready..');

    function analyseText(text) {
        // console.log('analyse text: ' + text);
        if (text.toLowerCase().indexOf('code-review+2') != -1)
            return 'hell-yes';
        if (text.toLowerCase().indexOf('code-review+1') != -1)
            return 'yes';
        if (text.toLowerCase().indexOf('tc-compile-and-test+1') != -1)
            return 'yes';
        if (text.toLowerCase().indexOf('tc-compile-and-test-1') != -1)
            return 'no';
        if (text.toLowerCase().indexOf('code-review-1') != -1)
            return 'no';
        return '';
    }

    function appendImageUrl(el, inline, type, url) {
        var d = $(inline ? '<span />' : '<div />');
        var i = $('<img />');
        i.attr({width: inline ? '30px' : '400px'});
        i.attr({alt: type});
        i.attr({src: url});
        d.append(i);
        el.appendChild(d[0]);
    }

    function appendImageType(el, inline, type) {
        // console.log('find image for \"'+type+'\"...');
        $.ajax('http://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(type) + '&api_key=dc6zaTOxFJmzC').then(function(r, r2) {
            console.log('got data', r, r2);
            if (r.data.length > 0) {
                var img = r.data[Math.floor(Math.random() * r.data.length)];
                if (img.images.original.url) {
                    console.log('pick image', img.images.original);
                    appendImageUrl(el, inline, type, img.images.original.url);
                }
            }
        });
    }

    function checkAndAlterElement(el, inline) {
        // console.log('check element:', el);
        var t = analyseText(el.innerText);
        if (t != '') {
            appendImageType(el, inline, t);
        }
    }

    setTimeout(function() {
        // console.log('finding review scores...');
        $('.commentPanelSummary').each(function(r, e) {
            // console.log('found summary:', r, e);
            checkAndAlterElement(e, true);
        });
        $('.commentPanelMessage p').each(function(r, e) {
            // console.log('found message:', r, e);
            checkAndAlterElement(e, false);
        });
    }, 1000);
});
