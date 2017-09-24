window.onload = function () {
  var good = document.querySelectorAll('.good');

  var addGoodModal = document.querySelector('.add-good-modal');
  var addGoodModalContent = document.querySelector('.add-good-modal-content');
  var addGoodBtn = document.querySelector('.add-good-btn');
  var addGoodCloseBtn = document.querySelector('.add-good-close');

  var editGoodModal = document.querySelector('.edit-good-modal');
  var editGoodModalContent = document.querySelector('.edit-good-modal-content');
  var editGoodBtns = document.querySelectorAll('.edit-good-btn');
  var editGoodCloseBtns = document.querySelectorAll('.edit-good-close');

  var editGoodModal = document.querySelector('.edit-good-modal');
  var editGoodModalContent = document.querySelector('.edit-good-modal-content');
  var editGoodBtns = document.querySelectorAll('.edit-good-btn');
  var editGoodCloseBtns = document.querySelectorAll('.edit-good-close');

  // var chartModal = document.querySelector('.chart-modal');
  // var chartContent = document.querySelector('.chart-modal-content');
  // var chartBtn = document.querySelector('.chartBtntn');
  // var chartCloseBtn = document.querySelector('.chart-close');

  addGoodBtn.addEventListener('click', function () {
    addGoodModal.classList.add('show-modal');
    addGoodModalContent.classList.add('show-modal-content');
  });

  addGoodCloseBtn.addEventListener('click', function () {
    addGoodModal.classList.remove('show-modal');
    addGoodModalContent.classList.remove('show-modal-content');
  });

//   chartBtn.addEventListener('click', function () {
//     chartModal.classList.add('show-modal');
//     chartContent.classList.add('show-modal-content');
//   });
//
//   chartCloseBtn.addEventListener('click', function () {
//     chartModal.classList.remove('show-modal');
//     chartContent.classList.remove('show-modal-content');
//   });
// };

  window.onclick = function (event) {
    if (event.target === addGoodModal) {
      addGoodModal.classList.remove('show-modal');
      addGoodModalContent.classList.remove('show-modal-content');
    } else if (event.target === editGoodModal) {
      editGoodModal.classList.remove('show-modal');
      editGoodModalContent.classList.remove('show-modal-content');
    }
  };

  // editGoodBtn.addEventListener('click', function () {
  //   editGoodModal.classList.add('show-modal');
  //   editGoodModalContent.classList.add('show-modal-content');
  // });
  //
  // editGoodCloseBtn.addEventListener('click', function () {
  //   editGoodModal.classList.remove('show-modal');
  //   editGoodModalContent.classList.remove('show-modal-content');
  // });

  Array.from(editGoodBtns).map(function (element) {
    element.addEventListener('click', function () {
      editGoodModal.classList.add('show-modal');
      editGoodModalContent.classList.add('show-modal-content');
    });
  });

  Array.from(editGoodCloseBtns).map(function (element) {
    element.addEventListener('click', function () {
      editGoodModal.classList.remove('show-modal');
      editGoodModalContent.classList.remove('show-modal-content');
    });
  });

  Array.from(good).map(function (element) {
    element.addEventListener('mouseover', function (event) {
      this.classList.add('add-background');
    });

    element.addEventListener('mouseleave', function (event) {
      this.classList.remove('add-background');
    });
  });
};
