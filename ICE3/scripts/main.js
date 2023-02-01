(function () {
  function DisplayButton() {
    let randomButton = document.getElementById('RandomButton');
    randomButton.addEventListener('click', function () {
      location.href = '/projects.html';
    });

    let mainContent = document.getElementsByTagName('main')[0];
    mainContent.setAttribute('class', 'container');
    let mainParagraph = document.createElement('p');
    mainParagraph.setAttribute('id', 'MainParagraph');
    mainParagraph.setAttribute('class', 'mt-3');

    let firstString = 'this is a ';
    let secondString = `${firstString} main paragraph that we added through javascript`;
    mainParagraph.textContent = secondString;

    mainContent.appendChild(mainParagraph);
    randomButton.remove();

    //let documentBody = document.body;

    // documentBody.innerHTML = `
    // <div class="container">
    //     <h1 class="display-1">Hello WEBD6201</h1>
    // </div>
    // `;
  }

  function Start() {
    console.log('App Started!');

    switch (document.title) {
      case 'Home - WEBD6201 Demo':
        DisplayButton();
        break;
      case 'Projects - WEBD6201 Demo':
        DisplayButton();
        break;
    }
  }

  window.addEventListener('load', Start);
})();
