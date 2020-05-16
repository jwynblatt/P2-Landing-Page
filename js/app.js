/* Funtion get the section titles to be used in navigation bar */
function getNavTitles() {
    const navSections = [...document.querySelectorAll('h2')].map(node => node.textContent)
    return (navSections)
}

/* Functions gets the section anchor names */
function getSectionAnchors() {
    const sectionParts = [...document.querySelectorAll('section')]
    const sectionAnchor = sectionParts.map(node => node.id)
    return (sectionAnchor)
}

/* Function creates and array of section ids */
function getSectionIDs() {
    let sectAnchors = sectionAnchors

    let indivID = ''
    let allSectIDS = []
    for (sectAnchor of sectAnchors) {
        indivID = '#' + sectAnchor
        allSectIDS.push(indivID)
    }
    return (allSectIDS)
}

/* Function remove active class from old active section */
function removeOldActive() {
    const oldActive = document.querySelector('.your-active-class')
    oldActive.removeAttribute('style', 'background-color: rgb(0, 0, 0); opacity: 75%')
    oldActive.classList.remove('your-active-class')
}

/* Function adds active class to new active section */
function addNewActive(sectID) {
    const currentActive = document.querySelector(sectID)
    currentActive.classList.add('your-active-class')
    document.querySelector('.your-active-class').setAttribute('style', 'background-color: rgb(0, 0, 0); opacity: 75%')
}

/* Function highlights the section which is closest to the top of the window */
function hiLite(event) {

    /* Gets the location of each section relative to the top of the window */
    sectIDS = getSectionIDs()

    let sectLocs = []
    for (sectID of sectIDS) {
        sectLocs.push(document.querySelector(sectID).getBoundingClientRect().top)
    }

    /* Changes the relative location to absolute number for comparison */
    let absNum = null
    let sectLocAbs = []
    for (sectLoc of sectLocs) {
        absNum = Math.abs(sectLoc)
        sectLocAbs.push(absNum)
    }

    /* The section with the smallest relative location number after the */
    /* absolute value has been taken is the section closest to top -    */
    /* Set it as the active section.                                    */
    let activeSectInd = 0
    let activeSect = sectIDS[activeSectInd]
    for (i = 0; i < (sectIDS.length - 1); i++) {
        if (sectLocAbs[i] >= sectLocAbs[i + 1]) {
            activeSect = sectIDS[i + 1]
            activeSectInd = (i + 1)
        }
    }

    removeOldActive()

    addNewActive(activeSect)
}

/* Function determines section then scrolls to it */
function clickedOn(event) {
    /* Set the object to be of type MouseEvent */
    // eslint-disable-next-line no-undef
    let mEvent = new MouseEvent('click')
    mEvent = event
    const sectClicked = mEvent.target.textContent

    /* Identify array index of sectClicked and scroll to it */
    let i = 0
    for (i = 0; i < navTitles.length; i++) {
        if (navTitles[i] === sectClicked) {
            const sectID = '#' + sectionAnchors[i]
            document.querySelector(sectID).scrollIntoView({
                behavior: 'smooth'
            })
            break
        }
    }
}

/* Create global constants */
const navTitles = getNavTitles()
const navLocation = document.querySelector('#navbar__list')
const sectionAnchors = getSectionAnchors()

/* Add sections names to navigation bar */
let i = 0
for (i = 0; i < navTitles.length; i++) {
    const linkTitle = '<li>' + navTitles[i] + '</li>'
    navLocation.insertAdjacentHTML('beforeend', linkTitle)
}

/* Determines location of the section clicked on in navigation bar and adds event listener to each */
/* then calls function clickedOn to scroll to the appropriate section                              */
const linkList = document.querySelectorAll('li')

i = 0
for (i = 0; i < linkList.length; i++) {
    linkList[i].addEventListener('click', clickedOn)
}

/* Identifies scrolling then calls function that highlights the section at the top of window */
document.addEventListener('scroll', hiLite)