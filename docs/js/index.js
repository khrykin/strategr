/**
 * Loads script for github buttons
 */

function loadGithubButtonsScript() {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "https://buttons.github.io/buttons.js");
  document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Loads latest release tag from github API
 */

function loadTagName() {
  let req = new XMLHttpRequest();
  let url =
    "https://api.github.com/repos/khrykin/StrategrDesktop/releases/latest";
  req.open("GET", url);
  req.send();
  req.onreadystatechange = e => {
    if (req.readyState == 4 && req.status == 200) {
      let json = JSON.parse(req.responseText);
      let tag = json.tag_name;

      let asset = json.assets.filter(a => a.name.includes(".dmg"))[0];

      macOS.getElementsByTagName("A")[0].setAttribute("href", asset.browser_download_url);

      if (window.tagName) {
        tagName.innerText = " " + tag;
      }
    }

    if (req.readyState == 4) {
      // Load script only when all DOM edits finished
      loadGithubButtonsScript();
    }
  };
}

/**
 * Removes macOS button on Windows
 */

function handleWindows() {
  if (navigator.appVersion.indexOf("Win") == -1) {
    win.parentNode.removeChild(win);
  }
}

const scrollDuration = 300;
const scrollIterations = 20;
const iterationDuration = scrollDuration / scrollIterations;

function animateScrollTo(targetElement) {
  if (!targetElement) {
    return;
  }

  let targetOffset = targetElement.offsetTop;
  let initalScrollY = window.scrollY;
  let diff = targetOffset - initalScrollY;

  let i = 1;
  let timer = setTimeout(function scroll() {
    let percentage = i / scrollIterations;
    let cos = Math.cos((Math.PI * percentage) / 2 - Math.PI / 2);
    let scrollToY = initalScrollY + diff * Math.pow(cos, 4);
    window.scrollTo(0, scrollToY);

    i++;
    if (i <= scrollIterations) {
      timer = setTimeout(scroll, iterationDuration);
    }
  }, iterationDuration);
}

function scrollDown(e) {
  e.preventDefault();
  const article = document.getElementsByTagName("article")[0];
  animateScrollTo(article);
}

document.getElementById("scrollDown").addEventListener("click", scrollDown);

handleWindows();
loadTagName();
