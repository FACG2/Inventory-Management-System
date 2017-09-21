window.onload = function () {
  var good = document.querySelectorAll('.good');

  var addGoodModal = document.querySelector('.add-good-modal');
  var addGoodModalContent = document.querySelector('.add-good-modal-content');
  var addGoodBtn = document.querySelector('.add-good-btn');
  var addGoodCloseBtn = document.querySelector('.add-good-close');

  addGoodBtn.addEventListener('click', function () {
    addGoodModal.classList.add('show-modal');
    addGoodModalContent.classList.add('show-modal-content');
  });

  addGoodCloseBtn.addEventListener('click', function () {
    addGoodModal.classList.remove('show-modal');
    addGoodModalContent.classList.remove('show-modal-content');
  });

  window.onclick = function (event) {
    if (event.target === addGoodModal) {
      addGoodModal.classList.remove('show-modal');
      addGoodModalContent.classList.remove('show-modal-content');
    }
  };

  Array.from(good).map(function (element) {
    element.addEventListener('mouseover', function (event) {
      this.classList.add('add-background');
    });

    element.addEventListener('mouseleave', function (event) {
      this.classList.remove('add-background');
    });
  });
};
