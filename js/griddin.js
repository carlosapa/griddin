var RulersGuides = function(evt, dragdrop, options) {


    /* var resizeText = function(text) {
         var elements = $(text);
         if(elements.length < 0) {
             return;
         }
         elements.each(function(i, element) {
             while(element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight) {
                 var newFontSize = (parseFloat($(element).css('font-size').slice(0, -2)) * 0.95) + 'px';
                 $(element).css('font-size', newFontSize);

         }
         console.log(newFontSize);
          console.log('HOLA');
        });
   
     };

     resizeText('.prueba'); */


    var resizeText = function(selector) {
        var elements = $(selector);
        if (elements.length < 0) {
            return false;
        }

        elements.each(function(i, element) {
            var $el = $(element);
            console.log($el);

            //while (element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight) {

            var font_size = $el.css('font-size') || window.getComputedStyle(element, null).getPropertyValue("font-size");
            var font_size_n = function() {
                var strings = ['px', 'em', 'rem', '%', 'vh', 'vw', 'vmax', 'vmin', 'cm', 'mm', 'pt'];
                var unit = '';
                var string_l = 0;
                var font_size_s = font_size.replace(' ', '');
                strings.forEach(function(e, i, a) {
                    if (font_size_s.indexOf(e) >= 0) {
                        string_l = e.length;
                        unit = e;
                    }
                });
                return {
                    size: font_size_s.slice(0, string_l * -1),
                    unit: unit
                };
            }();

            var newFontSize = font_size_n.size + font_size_n.unit;
            $(element).css('font-size', newFontSize);
            //}

            console.log(newFontSize);
        });
    };

    resizeText('.prueba');

    /////////////////////////////////////////////////

    bwidth_name = ['poster', 'square', 'magazine', 'screen'];

    $(function() {
        $("#slider_bwidth").slider({
            value: 3,
            min: 0,
            max: 3,
            step: 1,
            slide: function(event, ui) {
                $("#bwidth").val(bwidth_name[ui.value]);
            }
        });
        $("#bwidth").val(bwidth_name[$("#slider_bwidth").slider("value")]);
    });


    var resizeBox = function() {
        $("#slider_bwidth").slider().on({
            slidechange: function() {
                var output = $("#slider_bwidth").slider("value");

                var poster = $('.box').height() / 1.35;
                var square = $('.box').height();
                var magazine = $('.box').height() / 0.75;
                var screen = $(window).width();

                bwidth = [poster, square, magazine, screen];

                var b_width = bwidth[output];
                var b_left = ($(window).width() - b_width) / 2;
                $('.box').css('width', b_width);
                $('.box').css('left', b_left);

                $('.slider_info').css('color', 'black');
            }
        });
    }

    resizeBox();

    /*var b_width = $('.box').width();
    var b_left = ($(window).width()-b_width)/2;
    $('.box').css('width', b_width); 
    $('.box').css('left', b_left);*/



    $(function() {
        $("#slider_fsize").slider({
            range: true,
            min: 1,
            max: 39,
            step: 2,
            values: [1, 39],
            slide: function(event, ui) {
                $("#fsize").val((ui.values[0] + 1) + "em - " + (ui.values[1] + 1) + "em");
            }
        });
        $("#fsize").val(($("#slider_fsize").slider("values", 0) + 1) + "em - " + ($("#slider_fsize").slider("values", 1) + 1) + "em");
    });

    fwidth_name = ['supercond', 'cond', 'cond', 'cond', 'normal', 'wide', 'wide', 'wide', 'wide', 'wide'];
    var fwidth_max = $(fwidth_name).length - 1;

    $(function() {
        $("#slider_fwidth").slider({
            range: true,
            min: 0,
            max: fwidth_max,
            step: 1,
            values: [0, fwidth_max],
            slide: function(event, ui) {
                $("#fwidth").val(fwidth_name[ui.values[0]] + " - " + fwidth_name[ui.values[1]]);
            }
        });
        $("#fwidth").val(fwidth_name[$("#slider_fwidth").slider("values", 0)] + " - " + fwidth_name[$("#slider_fwidth").slider("values", 1)]);
    });


    /////////////////////////////////////////////////


    'use strict';

    options = (options !== undefined) ? options : {
        container: document.body,
        unitLabel: 'px',
        saveOpenOptionEnable: false,
        detailsOptionEnable: false,
        optionsMenuEnable: true,
        autoResizeOnScale: true,
        rulerMilestoneStep: 50,
        rulerMajorStep: 10,
        pixelToUnitScale: 1
    };

    var doc = document.documentElement,
        body = options.container,
        wrapper = null,
        hRuler = null,
        vRuler = null,
        menu = null,
        dialogs = [],
        openGridDialog = null,
        mode = 2,
        guides = {},
        guidesCnt = 0,
        gUid = '',
        rulerStatus = 1,
        guideStatus = 1,
        hBoundStart = 0,
        hBoundStop = 0,
        vBoundStart = 0,
        vBoundStop = 0,
        gridList = null,
        gridListLen = 0,
        menuBtn = null,
        gInfoBlockWrapper = null,
        detailsStatus = 0,
        unitLabel = (options.unitLabel !== undefined) ? options.unitLabel : 'px',
        saveOpen = (options.saveOpenOptionEnable !== undefined) ? options.saveOpenOptionEnable : false,
        showDetails = (options.detailsOptionEnable !== undefined) ? options.detailsOptionEnable : false,
        milestoneStep = (options.rulerMilestoneStep !== undefined) ? options.rulerMilestoneStep : 50,
        majorStep = (options.rulerMajorStep !== undefined) ? options.rulerMajorStep : 10,
        scaleValue = (options.pixelToUnitScale !== undefined) ? options.pixelToUnitScale : 1,
        menuEnable = (options.optionsMenuEnable !== undefined) ? options.optionsMenuEnable : true,
        autoResize = (options.autoResizeOnScale !== undefined) ? options.autoResizeOnScale : true,


        Ruler = function(type, size) {
            var ruler = document.createElement('div'),
                i = 0,
                span = document.createElement('span'),
                label = null,
                labelTxt = null,
                spanFrag = document.createDocumentFragment(),
                cnt = Math.floor(size / 2);

            ruler.className = 'ruler ' + type + ' unselectable';

            for (i; i < cnt; i = i + 1) {
                span = span.cloneNode(false);

                if (i % ((milestoneStep / 2) * scaleValue) < 1) {
                    span.className = 'milestone';

                    if (i > 0) {
                        label = span.cloneNode(false);
                        label.className = 'label';

                        if (i < 50) {
                            label.className += ' l10';
                        } else if (i >= 50 && i < 500) {
                            label.className += ' l100';
                        } else if (i >= 500) {
                            label.className += ' l1000';
                        }

                        labelTxt = document.createTextNode(parseInt((i * 2) / scaleValue));
                        label.appendChild(labelTxt);
                        span.appendChild(label);
                    }

                    span.className = 'milestone';
                } else if (i % ((majorStep / 2) * scaleValue) < 1) {
                    span.className = 'major';
                } else {
                    span.className = '';
                    span.removeAttribute('class');
                }

                spanFrag.appendChild(span);
            }

            ruler.appendChild(spanFrag);

            return ruler;
        },
        getWindowSize = function() {
            var w = Math.min(
                    body.scrollWidth,
                    body.offsetWidth
                ),
                h = Math.min(
                    body.scrollHeight,
                    body.offsetHeight
                );

            return [w, h];
        },
        getScrollPos = function() {
            var t = body.scrollTop,
                l = body.scrollLeft;

            return [t, l];
        },
        getScrollSize = function() {
            var w = body.scrollWidth,
                h = body.scrollHeight;

            return [w, h];
        },
        closeAllDialogs = function() {
            var i = 0;

            for (i; i < dialogs.length; i = i + 1) {
                dialogs[i].close();
            }
        },
        removeInboundGuide = function(guide, gUid) {
            var scrollPos = getScrollPos();

            if (
                rulerStatus === 1 && guideStatus === 1 && (
                    (guide.className === 'guide h draggable' && guide.offsetTop < Math.abs(guide.parentElement.offsetTop) + scrollPos[0]) ||
                    (guide.className === 'guide v draggable' && guide.offsetLeft < Math.abs(guide.parentElement.offsetLeft) + scrollPos[1])
                )
            ) {
                wrapper.removeChild(guide);
                delete guides[gUid];
                guidesCnt = guidesCnt - 1;
            }
        },
        removeInboundGuides = function() {
            var i;

            for (i in guides) {
                if (guides.hasOwnProperty(i)) {
                    removeInboundGuide(guides[i], i);
                }
            }
        },
        toggleGuides = function() {
            var i;

            guideStatus = 1 - guideStatus;

            for (i in guides) {
                if (guides.hasOwnProperty(i)) {
                    guides[i].style.display = (guideStatus === 1) ? 'block' : 'none';
                }
            }

            if (guideStatus === 1) {
                wrapper.style.display = 'block';
            }
        },
        toggleRulers = function() {
            rulerStatus = 1 - rulerStatus;

            if (rulerStatus === 1) {
                vRuler.style.display = 'block';
                hRuler.style.display = 'block';
                wrapper.style.display = 'block';
                removeInboundGuides();
            } else {
                vRuler.style.display = 'none';
                hRuler.style.display = 'none';
            }
        },
        removeGrid = function(gridName) {
            if (gridList[gridName] !== undefined) {
                delete gridList[gridName];
                window.localStorage.setItem('RulersGuides', JSON.stringify(gridList));
                gridListLen = gridListLen - 1;
            }
        },
        deleteGuides = function() {
            var i;

            if (guidesCnt > 0) {
                for (i in guides) {
                    if (guides.hasOwnProperty(i)) {
                        wrapper.removeChild(guides[i]);
                        delete guides[i];
                        guidesCnt = guidesCnt - 1;
                    }
                }

                gInfoBlockWrapper.style.display = 'none';
            }
        },
        renderGrid = function(gridName) {
            if (gridList[gridName] !== undefined) {
                var grid = gridList[gridName],
                    guideId = null,
                    guideElem = null;

                deleteGuides();

                for (guideId in grid) {
                    if (grid.hasOwnProperty(guideId)) {
                        guideElem = document.createElement('div');
                        guideElem.id = guideId;
                        guideElem.className = grid[guideId].cssClass;
                        guideElem.style.cssText = grid[guideId].style;

                        wrapper.appendChild(guideElem);

                        guides[guideId] = guideElem;

                        guidesCnt = guidesCnt + 1;
                    }
                }
            }
        },
        OpenGridDialog = function() {
            var dialog = null,
                self = this,
                select = null,
                renderSelect = function(insertOrUpdate) {
                    var gridName,
                        options = '',
                        i;

                    gridListLen = 0;

                    if (window.localStorage) {
                        gridList = JSON.parse(window.localStorage.getItem('RulersGuides'));

                        for (i in gridList) {
                            if (gridList.hasOwnProperty(i)) {
                                gridListLen = gridListLen + 1;
                            }
                        }
                    }

                    if (insertOrUpdate === 0) {
                        select = document.createElement('select');
                        select.id = 'grid-list';
                    }

                    if (gridListLen > 0) {
                        for (gridName in gridList) {
                            if (gridList.hasOwnProperty(gridName)) {
                                options += '<option>' + gridName + '</option>';
                            }
                        }

                        select.innerHTML = options;
                    }

                    return select;
                };

            this.render = function() {
                if (dialog === null) {
                    dialog = document.createElement('div');
                    select = renderSelect(0);

                    var text = document.createTextNode(''),
                        titleBar = dialog.cloneNode(false),
                        dialogWrapper = dialog.cloneNode(false),
                        okBtn = document.createElement('button'),
                        cancelBtn = okBtn.cloneNode(false),
                        delBtn = okBtn.cloneNode(false),
                        titleBarTxt = text.cloneNode(false),
                        okBtnTxt = text.cloneNode(false),
                        cancelBtnTxt = text.cloneNode(false),
                        delBtnTxt = text.cloneNode(false);

                    titleBarTxt.nodeValue = 'Open grid';
                    okBtnTxt.nodeValue = 'OK';
                    cancelBtnTxt.nodeValue = 'Cancel';
                    delBtnTxt.nodeValue = 'Delete';

                    dialog.className = 'dialog open-dialog';
                    titleBar.className = 'title-bar';
                    dialogWrapper.className = 'wrapper';

                    okBtn.className = 'ok-btn';
                    cancelBtn.className = 'cancel-btn';
                    delBtn.className = 'del-btn';

                    titleBar.appendChild(titleBarTxt);
                    okBtn.appendChild(okBtnTxt);
                    cancelBtn.appendChild(cancelBtnTxt);
                    delBtn.appendChild(delBtnTxt);

                    dialogWrapper.appendChild(select);
                    dialogWrapper.appendChild(delBtn);
                    dialogWrapper.appendChild(okBtn);
                    dialogWrapper.appendChild(cancelBtn);

                    dialog.appendChild(titleBar);
                    dialog.appendChild(dialogWrapper);

                    body.appendChild(dialog);

                    evt.attach('click', delBtn, function() {
                        if (window.confirm('Are you sure ?')) {
                            if (select.options.length > 0) {
                                removeGrid(select.options[select.selectedIndex].value);

                                select.removeChild(
                                    select.options[select.selectedIndex]
                                );
                            }

                            if (select.options.length === 0) {
                                self.close();
                            }
                        }
                    });

                    evt.attach('click', okBtn, function() {
                        renderGrid(select.value);
                        self.close();
                    });

                    evt.attach('click', cancelBtn, function() {
                        self.close();
                    });
                }
            };

            this.render();

            this.open = function() {
                closeAllDialogs();

                renderSelect(1);

                if (gridListLen > 0) {
                    dialog.style.display = 'block';
                    dialog.style.left = ((doc.clientWidth - dialog.clientWidth) / 2) + 'px';
                    dialog.style.top = ((doc.clientHeight - dialog.clientHeight) / 2) + 'px';
                }
            };

            this.close = function() {
                dialog.style.display = 'none';
            };
        },
        saveGrid = function() {
            if (saveOpen) {
                var data = {},
                    gridData = {},
                    i,
                    gridName = '';

                while (gridName === '' && guidesCnt > 0) {
                    gridName = window.prompt('Save grid as');

                    if (gridName !== '' && gridName !== false && gridName !== null && window.localStorage) {
                        for (i in guides) {
                            if (guides.hasOwnProperty(i)) {
                                gridData[i] = {
                                    'cssClass': guides[i].className,
                                    'style': guides[i].style.cssText
                                };
                            }
                        }

                        if (window.localStorage.getItem('RulersGuides') !== null) {
                            data = JSON.parse(window.localStorage.getItem('RulersGuides'));
                        }

                        data[gridName] = gridData;
                        window.localStorage.setItem('RulersGuides', JSON.stringify(data));

                        gridListLen = gridListLen + 1;
                    }
                }
            }
        },
        showDetailedInfo = function() {

            /////////////////////////////////////////////////

var utils = {
    music_element: $('.music_element'), 
    colors: {
        even: [], 
        odd: []
    }, 
    randDruk: {

    }
};


            $('.guide.h').css('border-bottom', 'solid 1px white');
            $('.guide.v').css('border-right', 'solid 1px white');

            //$('.slider_info').css('color', 'white');

            $('.button').css('visibility', 'visible');
            //$('#animate').css('visibility', 'hidden');



            /*
            INIT music functions
            */
            $('#play').click(function() {
                var music = document.getElementById("music");

                function playMusic() {
                    music.play();
                }

                function pauseMusic() {
                    music.pause();
                }

                var clicks = $(this).data('clicks');
                
                if (clicks) {
                    pauseMusic();
                    $('#play').html('PLAY');
                    for (var i = 1; i < 99999; i++) {
                        window.clearInterval(i);
                    }
                } else {
                    playMusic();
                    music.loop = true;
                    $('#play').html('STOP');
                    var change = setInterval(showDetailedInfo, 3000); /*490*/
                }
                $(this).data("clicks", !clicks);
            });





//            var music_element = $('.music_element');
//            console.log(music_element);

            var randElement = new Array(
                $('#text_1').html(),
                $('#text_2').html(),
                $('#text_3').html(),
                $('#text_4').html(),
                $('#text_5').html(),
                $('#text_6').html(),
                $('#text_7').html(),

                $('#text_8').html(),
                $('#text_9').html(),
                $('#text_10').html(),
                $('#text_11').html(),
                $('#text_12').html(),
                $('#text_13').html(),
                $('#text_14').html(),
                $('#text_15').html(),
                $('#text_16').html(),
                $('#text_17').html(),
                $('#text_18').html(),
                $('#text_19').html(),
                $('#text_20').html(),
                $('#text_21').html(),
                $('#text_22').html(),
                $('#text_23').html(),
                $('#text_24').html(),
                $('#text_25').html(),
                $('#text_26').html(),
                $('#text_27').html(),
                $('#text_28').html(),
                $('#text_29').html(),
                $('#text_30').html(),

                $('#image_1').html(),
                $('#image_2').html(),
                $('#image_3').html(),
                $('#image_4').html(),
                $('#image_5').html(),
                $('#image_6').html(),
                $('#image_7').html(),
                $('#image_8').html(),
                $('#image_9').html(),
                $('#image_10').html(),

                //$('#saxo').html(),

                $('#video_1').html(),
                $('#video_2').html(),

                $('#solid_black').html(),

                $('#blank_1').html(),
                $('#blank_2').html(),
                $('#blank_3').html(),
                $('#blank_4').html(),
                $('#blank_5').html(),
                $('#blank_6').html(),
                $('#blank_7').html(),
                $('#blank_8').html(),
                $('#blank_9').html(),
                $('#blank_10').html(),
            );

            var colors_1 = ["blue", "red"];
            var colors_2 = ["green", "purple"];

            var randDruk = [
                'Druk XXCondensed',
                'Druk XCondensed',
                'Druk XCondensed',
                'Druk XCondensed',
                //'Druk Medium', 
                //'Druk Bold', 
                'Druk Heavy',
                //'Druk Super', 
                //'DrukText Medium', 
                //'DrukText Bold', 
                //'DrukText Heavy', 
                //'DrukText Super', 
                //'DrukTextWide Medium', 
                //'DrukTextWide Bold', 
                //'DrukTextWide Heavy', 
                //'DrukTextWide Super', 
                //'DrukWide Medium', 
                //'DrukWide Bold', 
                'DrukWide Heavy',
                'DrukWide Heavy',
                'DrukWide Heavy',
                'DrukWide Heavy',
                'DrukWide Heavy'
                //'DrukWide Super'
            ];

            var randNeueHaas = ['Neue Haas Grotesk Medium', /*'Neue Haas Grotesk Black', 'Neue Haas Grotesk Black Italic'*/ ];

            var randHelvetica = ['Helvetica Neue Medium', /*'Helvetica Neue Bold Outline', 'Helvetica Neue Heavy Extended', 'Helvetica Neue Heavy Condensed'*/ ];

            var fmin = $("#slider_fsize").slider("values", 0);
            var fmax = $("#slider_fsize").slider("values", 1);

            var wmin = $("#slider_fwidth").slider("values", 0);
            var wmax = $("#slider_fwidth").slider("values", 1);


            /////////////////////////////////////////////////


            if (showDetails) {
                var i,
                    j = 0,
                    hGuides = [],
                    vGuides = [],
                    scrollSize = getScrollSize(),
                    /////////////////////////////////////////////////
                    userText = document.createElement('div'),
                    /////////////////////////////////////////////////
                    infoBlockWrapper = document.createElement('div'),
                    infoFrag = document.createDocumentFragment(),
                    infoBlock = infoBlockWrapper.cloneNode(false),
                    infoBlockTxt = infoBlockWrapper.cloneNode(false),
                    infoData1 = document.createTextNode(''),
                    infoData2 = infoData1.cloneNode(false),
                    text = '',
                    br = document.createElement('br');

                for (i in guides) {
                    if (guides.hasOwnProperty(i)) {
                        if (guides[i].type === 'h') {
                            hGuides.push(parseInt(guides[i].y) * scaleValue);
                        } else {
                            vGuides.push(parseInt(guides[i].x) * scaleValue);
                        }
                    }
                }

                vGuides.unshift(0);
                vGuides.push(scrollSize[0]);

                hGuides.unshift(0);
                hGuides.push(scrollSize[1]);

                vGuides = vGuides.sort(function(a, b) {
                    return a - b;
                });

                hGuides = hGuides.sort(function(a, b) {
                    return a - b;
                });

                for (i = 0; i < hGuides.length - 1; i = i + 1) {
                    j = 0;

                    for (j; j < vGuides.length - 1; j = j + 1) {

                        /////////////////////////////////////////////////

                        userText.className = 'user_text';
                        userText = userText.cloneNode(false);
                        userText.innerHTML = randElement[Math.floor(Math.random() * randElement.length)];
                        
                        var randImage = Math.floor(Math.random() * 10) + 1;
                        var randVideo = Math.floor(Math.random() * 2) + 1;

                        if (userText.innerHTML == '') {
                            userText.style.backgroundImage = 'url(img/image_' + randImage + '.jpg)';
                            userText.style.backgroundSize = 'cover';
                            userText.style.backgroundBlendMode = 'multiply';
                            /*$('#layer').css('display', 'none');
                            $('#saxo').css('display', 'none');*/
                        } else {
                            userText.style.backgroundImage = 'none';
                            /*$('#layer').css('display', 'block');
                            $('#saxo').css('display', 'block');               
                            $('#saxo').css('top', Math.floor(Math.random() * 0) + 1);
                            $('#saxo').css('left', Math.floor(Math.random() * 25) + 1);
                            $('#saxo img').css('width', Math.floor(Math.random() * 1000) + 500);*/
                        }

                        var randColors_1 = colors_1[Math.floor(Math.random() * colors_1.length)]
                        var randColors_2 = colors_2[Math.floor(Math.random() * colors_2.length)]

                        if (userText.innerHTML == 'solid black') {
                            userText.style.backgroundColor = 'black';
                            //$('#saxo').css('display', 'none');
                        } else {
                            userText.style.backgroundColor = randColors_1;
                            $('#colors').on('click', function() {
                                var clicks = $(this).data('clicks');
                                if (clicks) {
                                    userText.style.backgroundColor = randColors_1 /*2*/ ;
                                } else {
                                    userText.style.backgroundColor = randColors_1;
                                }
                                $(this).data("clicks", !clicks);
                            })
                        }

                        if (userText.innerHTML == 'blank') {
                            $(userText).html('');
                            //$('#saxo').css('display', 'none');
                        }

                        if (userText.innerHTML == 'video') {
                            $(userText).html('<video autoplay loop id="video_jazz" muted plays-inline> <source src="video/video_' + randVideo + '.mp4" type="video/mp4"></video>');
                            //$('#saxo').css('display', 'none');
                        }


                        /*if (userText.innerHTML == 'over') {
                            userText.style.backgroundImage = 'url("img/saxo.png")';
                            userText.style.backgroundSize = 300;
                            userText.style.backgroundBlendMode = 'multiply';
                            userText.style.backgroundRepeat = 'no-repeat';
                            userText.style.color = 'rgba(0,0,0,0)';
                        }*/


                        /*var randHover = ['padding-left', 'padding-top'];

                        $(userText).hover(function(){
                            $(this).css(randHover[Math.floor(Math.random() * randHover.length)], '500px');
                        }, function(){
                            $(this).css('padding', '10px');
                        });*/


                        var randAnimation = ['padding_left', 'padding_top' /*, 'padding_right', 'padding_bottom', 'stretch_h', 'stretch_v','scale'*/ , 'none'];

                        /*$('#animate').click(function() {
                            var clicks = $(this).data('clicks');
                            if (clicks) {       
                            }else {
                            }
                            $(this).data("clicks", !clicks);
                        })*/

                        /*if(userText.innerHTML == '' || userText.innerHTML == 'video'){
                            $(userText, this).css('animation-name', 'none')
                        } else {
                            $(userText, this).css('animation-name', randAnimation[Math.floor(Math.random() * randAnimation.length)]);
                               /*if($(userText).css('animation-name', 'scale')){
                                $(userText).css('white-space', 'nowrap');
                            } else {
                                $(userTexts).css('white-space', 'wrap');
                            }*/
                        //}

                        //$(userText, this).css('animation-delay', (Math.floor(Math.random() * (0.1 - 0 + 1)) + 0) + 's');
                        //$(userText, this).css('animation-duration', (Math.floor(Math.random() * (1 - 0.8 + 1)) + 0.8) + 's');


                        //userText.style.fontSize = Math.floor(Math.abs(Math.random() - Math.random()) * (1 + fmax - fmin) + fmin) * 2 + "em";

                        userText.style.fontSize = Math.round(fmin + (fmax - fmin) * Math.pow(Math.random(), 3)) * 2 + "em";


                        //resizeText(userText);

                        console.log(userText.style.fontSize);


                        userText.style.lineHeight = 93 + "%";
                        //userText.style.lineHeight = (Math.floor(Math.random()*100) + 97) + "%";
                        //userText.style.lineHeight = (Math.floor(Math.random()*200) + 80) + "%";

                        userText.style.fontFamily = randDruk[Math.floor(Math.random() * (wmax - wmin + 1)) + wmin];
                        //userText.style.fontFamily = randNeueHaas [Math.floor( Math.random() * randNeueHaas.length)]
                        //userText.style.fontFamily = randHelvetica [Math.floor( Math.random() * randHelvetica.length)]
                        //userText.style.fontFamily = "Neue Haas Grotesk Roman";//


                        /*if (userText.style.fontFamily = randDruk[0]) {
                            console.log('HOLA');
                        }*/

                        /////////////////////////////////////////////////

                        infoBlock = infoBlock.cloneNode(false);
                        infoBlockTxt = infoBlockTxt.cloneNode(false);
                        infoData1 = infoData1.cloneNode(false);
                        infoData2 = infoData2.cloneNode(false);
                        br = br.cloneNode();

                        infoBlockWrapper.className = 'info-block-wrapper';
                        infoBlock.className = 'info-block';
                        infoBlockTxt.className = 'info-block-txt';

                        infoBlock.style.top = (hGuides[i]) + 'px';
                        infoBlock.style.left = (vGuides[j]) + 'px';
                        infoBlock.style.width = ((vGuides[j + 1] - vGuides[j])) + 'px';
                        infoBlock.style.height = ((hGuides[i + 1] - hGuides[i])) + 'px';

                        text = parseInt((vGuides[j + 1] - vGuides[j]) / scaleValue) + ' x ' + parseInt((hGuides[i + 1] - hGuides[i]) / scaleValue);

                        infoData1.nodeValue = text;

                        text = parseInt(hGuides[i] / scaleValue) + ' : ' + parseInt(vGuides[j] / scaleValue);

                        infoData2.nodeValue = text;

                        infoBlockTxt.appendChild(infoData1);
                        infoBlockTxt.appendChild(br);
                        infoBlockTxt.appendChild(infoData2);

                        infoBlock.appendChild(infoBlockTxt);
                        infoFrag.appendChild(infoBlock);

                        /////////////////////////////////////////////////
                        infoBlock.appendChild(userText);
                        /////////////////////////////////////////////////
                    }
                }

                infoBlockWrapper.appendChild(infoFrag);

                if (detailsStatus === 1) {
                    wrapper.replaceChild(infoBlockWrapper, gInfoBlockWrapper);
                    gInfoBlockWrapper = infoBlockWrapper;
                } else {
                    gInfoBlockWrapper.style.display = 'none';
                }
            }

        },
        Menu = function() {
            var menuList = null,
                status = 0,
                toggles = {},
                menuItemsList = [{
                    'text': 'Hide rulers',
                    'hotkey': 'Ctrl + Alt + R',
                    'alias': 'rulers'
                }, {
                    'text': 'Hide guides',
                    'hotkey': 'Ctrl + Alt + G',
                    'alias': 'guides'
                }, {
                    'text': 'Hide all',
                    'hotkey': 'Ctrl + Alt + A',
                    'alias': 'all'
                }, {
                    'text': 'Clear all guides',
                    'hotkey': 'Ctrl + Alt + D',
                    'alias': 'clear'
                }],
                i = 0;

            if (saveOpen) {
                menuItemsList.push({
                    'text': 'Open grid',
                    'hotkey': 'Ctrl + Alt + O',
                    'alias': 'open'
                });

                menuItemsList.push({
                    'text': 'Save grid',
                    'hotkey': 'Ctrl + Alt + G',
                    'alias': 'save'
                });
            }

            if (showDetails) {
                menuItemsList.push({
                    'text': 'Generate',
                    'hotkey': 'Ctrl + Alt + I',
                    'alias': 'details'
                });
            }

            this.render = function() {
                menuBtn = document.createElement('div');
                menuBtn.className = (menuEnable) ? 'menu-btn unselectable' : 'menu-btn unselectable hide';
                menuBtn.appendChild(document.createTextNode('\u250C'));

                menuList = document.createElement('ul');
                menuList.className = 'rg-menu';

                var menuItems = document.createDocumentFragment(),
                    li = document.createElement('li'),
                    liLink = document.createElement('a'),
                    liDesc = document.createElement('span'),
                    liHotKey = liDesc.cloneNode(false),
                    liDescTxt = document.createTextNode(''),
                    liHotKeyTxt = liDescTxt.cloneNode(false);

                liLink.href = '';
                liDesc.className = 'desc';
                liHotKey.className = 'hotkey';

                for (i; i < menuItemsList.length; i = i + 1) {
                    li = li.cloneNode(false);
                    liLink = liLink.cloneNode(false);
                    liDesc = liDesc.cloneNode(false);
                    liHotKey = liHotKey.cloneNode(false);
                    liDescTxt = liDescTxt.cloneNode(false);
                    liHotKeyTxt = liHotKeyTxt.cloneNode(false);

                    liDescTxt.nodeValue = menuItemsList[i].text;
                    liHotKeyTxt.nodeValue = menuItemsList[i].hotkey;

                    liDesc.appendChild(liDescTxt);
                    liHotKey.appendChild(liHotKeyTxt);

                    liLink.appendChild(liDesc);
                    liLink.appendChild(liHotKey);

                    li.appendChild(liLink);

                    menuItems.appendChild(li);

                    toggles[menuItemsList[i].alias] = {
                        obj: liLink,
                        txt: liDescTxt
                    };
                }

                evt.attach('mousedown', toggles.rulers.obj, function() {
                    toggleRulers();
                });

                evt.attach('mousedown', toggles.guides.obj, function() {
                    toggleGuides();
                });

                evt.attach('mousedown', toggles.all.obj, function() {
                    if (rulerStatus === 1 || guideStatus === 1) {
                        rulerStatus = guideStatus = 1;
                        wrapper.style.display = 'none';
                    } else {
                        rulerStatus = guideStatus = 0;
                        wrapper.style.display = 'block';
                    }

                    toggleRulers();
                    toggleGuides();
                });

                evt.attach('mousedown', toggles.clear.obj, function() {
                    deleteGuides();
                });

                if (showDetails) {
                    evt.attach('mousedown', toggles.details.obj, function() {
                        detailsStatus = 1 - detailsStatus;
                        showDetailedInfo();
                    });
                }

                if (saveOpen) {
                    evt.attach('mousedown', toggles.open.obj, function() {
                        openGridDialog.open();
                    });

                    evt.attach('mousedown', toggles.save.obj, function() {
                        saveGrid();
                    });
                }

                menuList.appendChild(menuItems);

                body.appendChild(menuBtn);
                body.appendChild(menuList);

                evt.attach('mousedown', menuBtn, function() {
                    toggles.rulers.txt.nodeValue = (rulerStatus === 1) ? 'Hide rulers' : 'Show rulers';

                    if (guidesCnt > 0) {
                        toggles.guides.obj.className = '';
                        toggles.clear.obj.className = '';

                        if (saveOpen) {
                            toggles.save.obj.className = '';
                        }

                        toggles.guides.txt.nodeValue = (guideStatus === 1) ? 'Hide guides' : 'Show guides';
                    } else {
                        toggles.guides.obj.className = 'disabled';
                        toggles.clear.obj.className = 'disabled';

                        if (saveOpen) {
                            toggles.save.obj.className = 'disabled';
                        }
                    }

                    toggles.all.txt.nodeValue = (rulerStatus === 1 || guideStatus === 1) ? 'Hide all' : 'Show all';

                    if (showDetails) {
                        toggles.details.txt.nodeValue = (detailsStatus === 0) ? 'Generate' : 'Clear';
                    }

                    if (saveOpen) {
                        toggles.open.obj.className = (gridListLen > 0) ? '' : 'disabled';
                    }

                    menuList.style.display = (status === 0) ? 'inline-block' : 'none';

                    status = 1 - status;
                });
            };

            this.render();

            this.close = function() {
                if (menuList !== null) {
                    menuList.style.display = 'none';
                    status = 0;
                }
            };
        },
        prepare = function() {
            var size = getWindowSize();

            setTimeout(function() {
                hRuler = new Ruler('h', size[0]);
                vRuler = new Ruler('v', size[1]);

                wrapper = document.createElement('div');
                gInfoBlockWrapper = wrapper.cloneNode(false);

                wrapper.className = 'rg-overlay';
                gInfoBlockWrapper.className = 'info-block-wrapper';

                wrapper.appendChild(hRuler);
                wrapper.appendChild(vRuler);
                wrapper.appendChild(gInfoBlockWrapper);

                body.appendChild(wrapper);

                menu = new Menu();
                openGridDialog = new OpenGridDialog();

                dialogs = [openGridDialog];
            }, 10);
        };

    prepare();

    this.status = 1;

    this.disable = function() {
        if (vRuler !== null) {
            deleteGuides();

            vRuler.style.display = 'none';
            hRuler.style.display = 'none';
            wrapper.style.display = 'none';
            menuBtn.style.display = 'none';
        }

        rulerStatus = 0;
        this.status = 0;
    };

    this.enable = function() {
        if (vRuler !== null) {
            vRuler.style.display = 'block';
            hRuler.style.display = 'block';
            wrapper.style.display = 'block';
            menuBtn.style.display = 'block';
        }

        rulerStatus = 1;
        this.status = 1;
    };

    this.changeRulersScale = function(newScale) {
        var size = getWindowSize();
        deleteGuides();

        wrapper.removeChild(vRuler);
        wrapper.removeChild(hRuler);

        scaleValue = newScale;

        hRuler = new Ruler('h', size[0]);
        vRuler = new Ruler('v', size[1]);

        wrapper.appendChild(hRuler);
        wrapper.appendChild(vRuler);
    };

    evt.attach('mousedown', document, function(e, src) {
        var x = e.clientX,
            y = e.clientY,
            xOffset = Math.abs(vRuler.parentElement.offsetLeft) - 2,
            yOffset = Math.abs(vRuler.parentElement.offsetTop) - 2,
            scrollPos = getScrollPos(),
            boxOffset = $('.box').offset(),
            relX = e.pageX - boxOffset.left,
            relY = e.pageY - boxOffset.top,
            guide = null,
            guideInfo = null,
            guideInfoText = null;

        if (src.className.indexOf('menu-btn') === -1) {
            menu.close();
        }

        //if (vBoundStart === 0) {
        vBoundStart = vRuler.parentElement.offsetParent.offsetLeft + vRuler.parentElement.offsetLeft;
        vBoundStop = vBoundStart + vRuler.offsetWidth;
        hBoundStart = hRuler.parentElement.offsetParent.offsetTop + hRuler.parentElement.offsetTop;
        hBoundStop = hBoundStart + hRuler.offsetHeight;
        // }

        if (((x > vBoundStart && x < vBoundStop && y > hBoundStop) ||
                (y > hBoundStart && y < hBoundStop && x > vBoundStop)) && rulerStatus === 1) {

            guide = document.createElement('div');
            guideInfo = guide.cloneNode(false);
            guideInfoText = document.createTextNode('');

            gUid = 'guide-' + guidesCnt;

            guideInfo.className = 'info';

            guideInfo.appendChild(guideInfoText);
            guide.appendChild(guideInfo);

            if (x > vBoundStop && y < hBoundStop) {
                guide.className = 'guide h draggable';
                guide.style.top = relY + 'px';
                guide.type = 'h';
                mode = 2;
            } else if (y > hBoundStop && x < vBoundStop) {
                guide.className = 'guide v draggable';
                guide.style.left = relX + 'px';
                guide.type = 'v';
                mode = 1;
            }

            guide.id = gUid;
            guide.info = guideInfo;
            guide.text = guideInfoText;
            guide.x = 0;
            guide.y = 0;

            guides[gUid] = guide;

            wrapper.appendChild(guide);

            dragdrop.set(guide, {
                mode: mode,
                onstart: function(elem) {
                    elem.text.nodeValue = 0 + ' ' + unitLabel;

                    if (elem.over !== undefined) {
                        evt.detach('mouseover', elem, elem.over);
                        evt.detach('mouseout', elem, elem.out);
                    }
                },
                onmove: function(elem) {
                    var text, pos, negativeRule;

                    pos = (elem.mode === 1) ? elem.style.left : elem.style.top;
                    pos = parseInt(pos, 10);
                    negativeRule = (elem.mode === 1) ? pos - xOffset < 0 : pos - yOffset < 0;

                    if (!negativeRule) {
                        elem.style.display = 'block';
                        text = pos = (elem.mode === 1) ? parseInt((pos - xOffset) / scaleValue) + ' ' + unitLabel : parseInt((pos - yOffset) / scaleValue) + ' ' + unitLabel;

                        if (elem.mode === 1) {
                            elem.style.left = pos + 'px';
                            elem.x = pos;
                        } else {
                            elem.style.top = pos + 'px';
                            elem.y = pos;
                        }

                        elem.text.nodeValue = text;
                    } else {
                        elem.style.display = 'none';
                    }
                },
                onstop: function(elem) {
                    elem.over = evt.attach('mouseover', elem, function() {
                        elem.info.style.display = 'block';
                    });

                    elem.out = evt.attach('mouseout', elem, function() {
                        elem.info.style.display = 'none';
                    });
                }
            });

            dragdrop.start(e, guide);

            guidesCnt = guidesCnt + 1;
        }
    });

    evt.attach('mouseup', document, function(e, src) {
        removeInboundGuide(src, src.id);

        if (detailsStatus === 1) {
            showDetailedInfo();
        }
    });

    evt.attach('keyup', document, function(e) {
        if (e.ctrlKey === true && e.altKey === true) {
            switch (e.keyCode) {
                case 83:
                    saveGrid();
                    break;
                case 82:
                    toggleRulers();
                    break;
                case 79:
                    if (saveOpen) {
                        openGridDialog.open();
                    }
                    break;
                case 73:
                    detailsStatus = 1 - detailsStatus;
                    showDetailedInfo();
                    break;
                case 71:
                    toggleGuides();
                    break;
                case 68:
                    deleteGuides();
                    break;
                case 65:
                    if (rulerStatus === 1 || guideStatus === 1) {
                        rulerStatus = guideStatus = 1;
                        wrapper.style.display = 'none';
                    } else {
                        rulerStatus = guideStatus = 0;
                        wrapper.style.display = 'block';
                    }

                    toggleRulers();
                    toggleGuides();

                    break;
            }
        }
    });

    if (autoResize) {
        evt.attach('resize', window, function() {
            var size = getWindowSize();

            wrapper.removeChild(vRuler);
            wrapper.removeChild(hRuler);

            hRuler = new Ruler('h', size[0]);
            vRuler = new Ruler('v', size[1]);

            wrapper.appendChild(hRuler);
            wrapper.appendChild(vRuler);
        });
    }
};
