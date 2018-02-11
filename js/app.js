// 
//  INIT FUNCTIONALITIES
//  

//  Functionalities from Event, DragDrop adn RulersGuides
var evt = new Event();
var dragdrop = new Dragdrop(evt);
var rg = new RulersGuides(evt, dragdrop, {
    container: document.getElementById('container'),
    saveOpenOptionEnable: true,
    detailsOptionEnable: true,
    optionsMenuEnable: true,
    autoResizeOnScale: true,
    unitLabel: 'px',
    rulerMilestoneStep: 50,
    rulerMajorStep: 10,
    pixelToUnitScale: 1.9
});



//  Griddin' Library Properties and Methods
var Griddin = {
    version: '0.1',
    debug: true,
    music_element: $('.music_element'),
    colors: {
        even: ['blue', 'red'],
        odd: ['green', 'purple']
    },
    autoBorders: false,
    fonts: {
        randDruk: [
            'Druk XXCondensed',
            'Druk XCondensed',
            'Druk XCondensed',
            'Druk XCondensed',
            // 'Druk Medium', 
            // 'Druk Bold', 
            'Druk Heavy',
            // 'Druk Super', 
            // 'DrukText Medium', 
            // 'DrukText Bold', 
            // 'DrukText Heavy', 
            // 'DrukText Super', 
            // 'DrukTextWide Medium', 
            // 'DrukTextWide Bold', 
            // 'DrukTextWide Heavy', 
            // 'DrukTextWide Super', 
            // 'DrukWide Medium', 
            // 'DrukWide Bold', 
            'DrukWide Heavy',
            'DrukWide Heavy',
            'DrukWide Heavy',
            'DrukWide Heavy',
            'DrukWide Heavy',
            // 'DrukWide Super'    
        ],
        randNeueHaas: [
            'Neue Haas Grotesk Medium',
            // 'Neue Haas Grotesk Black',
            // 'Neue Haas Grotesk Black Italic'
        ],
        randHelvetica: [
            'Helvetica Neue Medium',
            // 'Helvetica Neue Bold Outline',
            // 'Helvetica Neue Heavy Extended',
            // 'Helvetica Neue Heavy Condensed'
        ]
    },

    images: {
        name: 'image_$!.jpg',
        route: 'ressources/images/',
        amount: 10
    },
    video: {
        name: 'video_$!.mp4',
        route: 'ressources/video/',
        amount: 2
    },
    audio: {
        name: 'audio_$!.mp3',
        route: 'ressources/audio/',
        amount: 1
    },

    block_types: [
        'uppercase',
        'lowercase',
        'blank',
        'solid_random',
        'solid_black',
        'image',
        'video'
    ],
    text_content_lower: [
        'It is partly planned and partly spontaneous; that is, as the musicians perform a pre-determined tune, they have the opportunity to create their own interpretations within that tune in response to the other musicians\' performances and whatever else may occur \"in the moment\", this is called improvisation and is the defining element of jazz. in everything from regular conversation, to basketball, to everyday life, americans are constantly improvising.',
        'John coltrane was an american jazz saxophonist and composer. working in the bebop and hard bop idioms early in his career, coltrane helped pioneer the use of modes in jazz and was later at the forefront of free jazz. he led at least fifty recording sessions during his career, and appeared as a sideman on many albums by other musicians, including trumpeter miles davis and pianist thelonious monk',
        'When jazz musicians improvise, they are playing the notes that they hear in their mind; they hear these notes just a split second before they play them',
        'Tempo is the speed of the beat. jazz tunes can be played at any tempo from extremely slow to extremely fast. most styles of jazz keep a steady beat.',
        'Swing rhythm is notated as a two-element beat with a lead-in note leading into the accented main note. the length of the lead-in note may vary. in the shuffle example shown below, the lead-in and the main note are of the same length.',
        'Improvisation is the key element of jazz.',
        'Jazz was born in the united states.',
        'Ragtime is primarily an african american invention and was a source of pride to african american composers, musicians, and listeners.',
        'Improvisation is inventing something on the spur of the moment and in response to a certain situation; in jazz, it is when musicians perform a different interpretation each time they play the same tune, a tune is never played the exact same way twice, whether played by the same musicians or an entirely different group; the improvisation becomes its own musical dialogue between band members without any preconceived notion of what the final outcome will be.',
        'Playing their instruments is as natural as skating.',
        'With jazz, because of its improvisational aspect, the musicians are communicating the emotion of the moment; that is, the emotion they are feeling while they are performing. remember, when improvising they are deciding what notes to play as they respond to the music of the moment and of the other musicians',
        'Jazz is life, is fire and freedom.',
        'Jazz musicians do the same with their instruments, but rather than using words to communicate, they use music; it\'s kind of like musical conversation.',
        'Jazz developed in the united states in the very early part of the 20th century. new orleans, near the mouth of the mississippi river, played a key role in this development. the city\'s population was more diverse than anywhere else in the south, and people of african, french, caribbean, italian, german, mexican, and american indian, as well as english, descent interacted with one another. african-american musical traditions mixed with others and gradually jazz emerged from a blend of ragtime, marches, blues, and other kinds of music. at first jazz was mostly for dancing. (in later years, people would sit and listen to it.) after the first recordings of jazz were made in 1917, the music spread widely and developed rapidly. the evolution of jazz was led by a series of brilliant musicians such as louis armstrong, duke ellington (listen to ellington in duke\'s music class), charlie parker, and miles davis.',
        'Jazz can be seen as a personal language.',
        'It possesses a forward momentum and uses expressive notes that are slightly lower in pitch than those on the major scale.',
        'They play solos that they make up on the fly as they play.',
        'The musical traditions of african-americans mixed with other styles.',
        'Some of the greatest musical minds of all-time were jazz artists. they were able to master their instruments, redefine music theory and repeatedly innovate the already formidable body of work present before them. many of them did so while navigating through the tumultuous social climate from which the music was birthed.',
        'To be a part of this tradition means that you are challenged to transform other people with the sound of your instrument. you are challenged to swing. you are challenged to contribute to the body of work established by some of the greatest artistic minds of all time',
        '\“Don\'t play what\'s there; play what\'s not there.\”',
        '\“What is my definition of jazz? safe sex of the highest order.\”',
        '\“if you have to ask what jazz is, you\'ll never know.\”'
    ],
    text_content_upper: [
        'Miles Davis',
        'John Coltrane',
        'Charlie Parker',
        'Louis Armstrong',
        'Thelonius Monk',
        'Blue Note',
        'Swing'
    ]
};

// Griddin Methods

//Griddin Testing Unit, only showing if Griddin.debug == true;
Griddin.test = function(string_in) {
    if (this.debug) {
        console.log(string_in);
    }
};

//Get each block when is created by external Library and expands and populates it
Griddin.expandBlock = function(infoBlock, position, id) {
    var b = $(infoBlock);
    var b_content = $(document.createElement('div'));

    // Remove Guides Text
    b.find('.info-block-txt').remove();

    //Change CSS Info of Block
    b.css({
        backgroundColor: b.hasClass('even') ? '#fff' : '#eee',
        border: (this.autoBorders) ? '1px solid #aaa' : ''
    });

    //B_content Structure and stuff...
    b.addClass('griddin_element');
    b.addClass('griddin_element_' + id);
    b.addClass((id % 2 == 0) ? 'griddin_element_even' : 'griddin_element_odd');
    b.attr({
        'position-i': position[0],
        'position-j': position[1],
        'grid-id': id
    });

    b_content.addClass('griddin_content');
    b.append(b_content);

    // Populate Block with Random Content Type
    b_content.html(this.populateBlock(b_content));
};


//Determinates content type by random function
//Create HTML Stuff for each block based on content type
//Split functions to create content
//Returns HTML for each block
Griddin.populateBlock = function(element) {
    var random_index = Math.floor(Math.random() * this.block_types.length);
    var block_type = this.block_types[random_index];
    var b_content = element;
    var b = element.parent();
    var populate_content = null;

    //B_content Structure and stuff based on content type
    b.addClass('griddin_element_' + block_type);
    b.attr({
        'content-type': block_type
    });
    b_content.addClass('griddin_content_' + block_type);
    b_content.attr({
        'content-type': block_type
    });

    //Populate based on Content Type
    populate_content = function() {
        switch (block_type) {
            case 'uppercase':
                return Griddin.getUppercaseContent();
                break;
            case 'lowercase':
                return Griddin.getLowercaseContent();
                break;
            case 'blank':
                return Griddin.getBlankContent();
                break;
            case 'solid_random':
                return Griddin.getSolidRandomContent(b.hasClass('even'));
                break;
            case 'solid_black':
                return Griddin.getSolidBlackContent();
                break;
            case 'image':
                return Griddin.getImageContent();
                break;
            case 'video':
                return Griddin.getVideoContent();
                break;
        }
    }

    return populate_content;
};


// Create content based on Upper case type
Griddin.getUppercaseContent = function() {
    var random_index = Math.floor(Math.random() * this.text_content_upper.length);
    var text = this.text_content_upper[random_index];

    //Create HTML
    var text_container = $(document.createElement('span'));
    text_container.html(text);

    //Set font size
    text_container.css({
        fontSize: '40px'
    });

    return text_container;
};

// Create content based on Lower case type
Griddin.getLowercaseContent = function() {
    var random_index = Math.floor(Math.random() * this.text_content_lower.length);
    var text = this.text_content_lower[random_index];

    return text;
};

// Create content based on Blank type
Griddin.getBlankContent = function() {
    return 'Aquí viene un texto vacío...';
};

// Create content based on Solid Random type
Griddin.getSolidRandomContent = function(even) {
    var color = (even) ? this.colors.even : this.colors.odd;
    var color_random = Math.floor(Math.random() * color.length);

    //Create HTML
    var solid_container = $(document.createElement('span'));

    //Set font size
    solid_container.css({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: color[color_random]
    });

    return solid_container;
};

// Create content based on Solid Block type
Griddin.getSolidBlackContent = function() {
    //Create HTML
    var solid_container = $(document.createElement('span'));

    //Set font size
    solid_container.css({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#333'
    });

    return solid_container;
};

// Create content based on Image type
Griddin.getImageContent = function() {
    var image_random = Math.floor((Math.random() * this.images.amount) + 1);
    var src = (this.images.route + this.images.name).replace('$!', image_random);

    //Create HTML
    var image_container = $(document.createElement('img'));
    image_container.attr({
        src: src
    });

    //Set font size
    image_container.css({
        width: '100%',
        height: '100%',
        objectPosition: 'center',
        objectFit: 'cover',
    });

    return image_container;
};

// Create content based on Video type
Griddin.getVideoContent = function() {
    var video_random = Math.floor((Math.random() * this.video.amount) + 1);
    var src = (this.video.route + this.video.name).replace('$!', video_random);

    //Create HTML
    var video_container = $(document.createElement('video'));
    video_container.attr({
        src: src,
        autoplay: true,
        muted: true
    });

    //Set font size
    video_container.css({
        width: '100%',
        height: '100%',
        objectPosition: 'center',
        objectFit: 'cover',
    });

    return video_container;
};










// Griddin.changeBlocks = function() {

//     // Change CSS of Grid Elements
//     // 
//     $('.guide.h').css('border-bottom', 'solid 1px white');
//     $('.guide.v').css('border-right', 'solid 1px white');
//     // $('.slider_info').css('color', 'white');
//     $('.button').css('visibility', 'visible');
//     // $('#animate').css('visibility', 'hidden');


//     // Init Music Functions
//     // 
//     $('#play').click(function() {
//         var music = document.getElementById("music");

//         function playMusic() {
//             music.play();
//         }

//         function pauseMusic() {
//             music.pause();
//         }

//         var clicks = $(this).data('clicks');

//         if (clicks) {
//             pauseMusic();
//             $('#play').html('PLAY');
//             for (var i = 1; i < 99999; i++) {
//                 window.clearInterval(i);
//             }
//         } else {
//             playMusic();
//             music.loop = true;
//             $('#play').html('STOP');
//             var change = setInterval(showDetailedInfo, 3000); /*490*/
//         }
//         $(this).data("clicks", !clicks);
//     });


//     var fmin = $("#slider_fsize").slider("values", 0);
//     var fmax = $("#slider_fsize").slider("values", 1);
//     var wmin = $("#slider_fwidth").slider("values", 0);
//     var wmax = $("#slider_fwidth").slider("values", 1);
// }G