"use strict"

/*
    COPYRIGHT BY YUKI ARIMO
    KAWAI FRAMEWORK
*/

var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'assets/css/kawai.css';
    link.media = 'all';
    head.appendChild(link);
}

// Variables and sub-processes
let getsideid = 'sidebar'
let checkSide = localStorage.getItem('side');
const toggleButton = document.getElementsByClassName('toggle-menu-block')[0]
const navbarLinks = document.getElementsByClassName('top-tab-block')[0]
const addclosers = document.querySelectorAll('.block-popup');
if (checkSide == '1') {
    SideDisabler();
}
let checkMode = localStorage.getItem('mode');
if (checkMode == '1') {
    DarkEnabler();
}

// Functions
function SideBarSwitch(idSide) {
    if (checkSide == 0) {
        SideDisabler(idSide);
    } else {
        localStorage.setItem('side', '0');
        document.location.reload(true);
    }
}

function SideDisabler(idSide) {
    document.getElementById(idSide).style = "display: none";
    document.getElementsByClassName('block-o')[0].classList.remove('uside')
    localStorage.setItem('side', '1');
    checkSide = 1
}

function PopupClose() {
    const howmanyclosers = document.querySelectorAll('.block-button-close');
    if (howmanyclosers.length) {
        for (let step = 0; step < howmanyclosers.length; step++) {
            const element = howmanyclosers[step].parentElement;
            element.style.display = 'none'
        }
    }
}

function OpenLink(getlink) {
    window.open(getlink, '_self');
}

function OpenPopup(getid) {
    document.getElementById(getid).style.display = 'flex';
}

function OpenTablo(tablo) {
    var tablos = document.querySelectorAll('.block-dropdown-tab-lo');

    if (tablos.length) {
        for (let step = 0; step < tablos.length; step++) {
            var element = tablos[step];
            element.style = "display: none";
        }
    }

    for (let step = 0; step < tablos.length; step++) {
        let element = tablos[step];
        if (element.get)
            element.style = "display: none";
    }

    if (getComputedStyle(document.getElementById(tablo)).display == 'flex') {
        document.getElementById(tablo).style = "display: none"
    } else if (getComputedStyle(document.getElementById(tablo)).display == 'none') {
        document.getElementById(tablo).style = "display: flex"
    }
}

function OpenTab(gettab) {
    const howmanytabs = document.querySelectorAll('.tab-o');
    if (howmanytabs.length) {
        for (let step = 0; step < howmanytabs.length; step++) {
            const element = howmanytabs[step];
            element.style.display = 'none'
        }
    }
    document.getElementById(gettab).style.display = 'flex';
}

function DarkEnabler() {
    var body = document.querySelectorAll('body');
    var topbarO = document.querySelectorAll('.topbar-o');
    var sidebarO = document.querySelectorAll('.sidebar-o');

    var text = document.querySelectorAll('.block-text');
    var textLa = document.querySelectorAll('.la');
    var textLb = document.querySelectorAll('.lb');
    var textLc = document.querySelectorAll('.lc');
    var blocksidetabse = document.querySelectorAll('.side-tab-block-e');
    var blockinput = document.querySelectorAll('.block-input');
    var blockL = document.querySelectorAll('.block-l');
    var blockCard = document.querySelectorAll('.block-card');
    var blockButton = document.querySelectorAll('.block-button');
    var blockliste = document.querySelectorAll('.block-list-e');
    var blockdropdowntab = document.querySelectorAll('.block-dropdown-tab')

    if (body.length) {
        for (let step = 0; step < body.length; step++) {
            var element = body[step];
            element.style = "background: rgb(30, 30, 30)";
        }
    }

    if (topbarO.length) {
        for (let step = 0; step < topbarO.length; step++) {
            var element = topbarO[step];
            element.style = "color: white";
        }
    }

    if (sidebarO.length) {
        for (let step = 0; step < sidebarO.length; step++) {
            var element = sidebarO[step];
            element.style = "background: rgb(30, 30, 30)";
        }
    }

    if (text.length) {
        for (let step = 0; step < text.length; step++) {
            var element = text[step];
            element.style = "color: white";
        }
    }

    if (textLa.length) {
        for (let step = 0; step < textLa.length; step++) {
            var element = textLa[step];
            element.style = "color: white";
        }
    }

    if (textLb.length) {
        for (let step = 0; step < textLb.length; step++) {
            var element = textLb[step];
            element.style = "color: white";
        }
    }

    if (textLc.length) {
        for (let step = 0; step < textLc.length; step++) {
            var element = textLc[step];
            element.style = "color: white";
        }
    }

    if (blockL.length) {
        for (let step = 0; step < blockL.length; step++) {
            var element = blockL[step];
            element.style = "background: rgb(30, 30, 30)";
        }
    }

    if (blockCard.length) {
        for (let step = 0; step < blockCard.length; step++) {
            var element = blockCard[step];
            element.style = "background: rgb(30, 30, 30)";
        }
    }

    if (blockButton.length) {
        for (let step = 0; step < blockButton.length; step++) {
            var element = blockButton[step];
            element.style = "color: white";
        }
    }

    if (blocksidetabse.length) {
        for (let step = 0; step < blocksidetabse.length; step++) {
            var element = blocksidetabse[step];
            element.style = "background-color: rgb(60, 62, 63); color: white";
        }
    }
    if (blockinput.length) {
        for (let step = 0; step < blockinput.length; step++) {
            var element = blockinput[step];
            element.style = "background-color: rgb(40, 40, 40); color: white";
        }
    }
    if (blockliste.length) {
        for (let step = 0; step < blockliste.length; step++) {
            var element = blockliste[step];
            element.style = "color: white";
        }
    }
    if (blockdropdowntab.length) {
        for (let step = 0; step < blockdropdowntab.length; step++) {
            var element = blockdropdowntab[step];
            element.style = "color: white";
        }
    }
}

function ThemeSwitch() {
    if (checkMode == '0') {
        DarkEnabler();
        localStorage.setItem('mode', '1');
        document.location.reload(true);
    } else {
        localStorage.setItem('mode', '0');
        document.location.reload(true);
    }
}



document.getElementsByClassName("block-button-close-e").onclick = function (e) {
    location.reload(true);
}

if (addclosers.length) {
    for (let step = 0; step < addclosers.length; step++) {
        const element = addclosers[step];
        let test = document.createElement("div")
        test.setAttribute('class', 'block-button-close')
        test.setAttribute('onclick', 'PopupClose()')
        test.textContent = 'X'
        element.appendChild(test);
    }
}

/*
    COPYRIGHT BY YUKI ARIMO
    KAWAI FRAMEWORK
*/