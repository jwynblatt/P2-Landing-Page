/* Funtion get the section titles to be used in navigation bar */
function getNavTitles() {
    let navSections = [...document.querySelectorAll('h2')].map(node => node.textContent);
    return (navSections);
}

/* Functions gets the section anchor names */
function getSectionAnchors() {
    let sectionParts = [...document.querySelectorAll('section')]
    let sectionAnchor = sectionParts.map(node => node.id);
    return (sectionAnchor);
}

/* Function determines section then scrolls to it and highlights it */
function clickedOn(event) {

    /* Set the object to be of type MouseEvent */
    let mEvent = new MouseEvent("click");
    mEvent = event;
    let sectClicked = mEvent.target.textContent;

    /* Identify array index of sectClicked and scroll to it*/
    for (i = 0; i < navTitles.length; i++) {
        if (navTitles[i] === sectClicked) {
            let sectID = "#" + sectionAnchors[i];
            document.querySelector(sectID).scrollIntoView({
                behavior: 'smooth'
            });

            /* Remove active class from old active section */
            let oldActive = document.querySelector('.your-active-class');
            oldActive.removeAttribute('style', 'background-color: rgb(0, 0, 0); opacity: 75%');
            oldActive.classList.remove('your-active-class');

            /* Add active class to new active section */
            let currentActive = document.querySelector(sectID);
            currentActive.classList.add('your-active-class');
            document.querySelector('.your-active-class').setAttribute('style', 'background-color: rgb(0, 0, 0); opacity: 75%');

            break;
        }
    }
}


/* Create global constants */
const navTitles = getNavTitles();
const navLocation = document.querySelector('#navbar__list');
const sectionAnchors = getSectionAnchors();

/* Add sections names to navigation bar */
for (i = 0; i < navTitles.length; i++) {
    const linkTitle = "<li>" + navTitles[i] + "</li>";
    navLocation.insertAdjacentHTML('beforeend', linkTitle);
}

/* Determines location of the section clicked on in navigation bar and adds event listener to each */
/* then calls function clickedOn to scroll to the appropriate section                              */
const linkList = document.querySelectorAll('li');

for (i = 0; i < linkList.length; i++) {
    linkList[i].addEventListener('click', clickedOn);
}

/* Style active class */