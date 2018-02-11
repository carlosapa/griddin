/*
 * INIT FUNCTIONALITIES
 */

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