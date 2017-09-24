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


  var graphModal = document.querySelector('.graph-modal');
  var graphModalContent = document.querySelector('.graph-modal-content');
  var graphBtn = document.querySelector('.btn-show-graph');
  var graphCloseBtn = document.querySelector('.graph-close');

  var deleteGoodModal = document.querySelector('.delete-good-modal');
  var deleteGoodModalContent = document.querySelector('.delete-good-modal-content');
  var deleteGoodCloseBtn = document.querySelector('.delete-good-close');
  var deleteBtns = document.querySelectorAll('.delete-good-btn');

  var selectedGood = {};

  Array.from(deleteBtns).map(function (btn) {
    btn.addEventListener('click', function (event) {
      deleteGoodModal.classList.add('show-modal');
      deleteGoodModalContent.classList.add('show-modal-content');
      deleteGoodModalContent.classList.add('delete-good');
      // get the good id from event object ?
      console.log(event.target.parentNode.parentNode.children[0].children);
      selectedGood = {

      };
    });
  });

  deleteGoodCloseBtn.addEventListener('click', function () {
    deleteGoodModal.classList.remove('show-modal');
    deleteGoodModalContent.classList.remove('show-modal-content');
    deleteGoodModalContent.classList.remove('delete-good');
    selectedGood = {};
  });

  graphBtn.addEventListener('click', function () {
    graphModal.classList.add('show-modal');
    graphModalContent.classList.add('show-modal-content');
    graphModalContent.classList.add('show-graph-modal');
  });

  graphCloseBtn.addEventListener('click', function () {
    graphModal.classList.remove('show-modal');
    graphModalContent.classList.remove('show-modal-content');
    graphModalContent.classList.remove('show-graph-modal');
  });


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
      selectedGood = {};
    } else if (event.target === editGoodModal) {
      editGoodModal.classList.remove('show-modal');
      editGoodModalContent.classList.remove('show-modal-content');
      selectedGood = {};
    } else if (event.target === graphModal) {
      graphModal.classList.remove('show-modal');
      graphModalContent.classList.remove('show-modal-content');
      graphModalContent.classList.remove('show-graph-modal');
    } else if (event.target === deleteGoodModal) {
      deleteGoodModal.classList.remove('show-modal');
      deleteGoodModalContent.classList.remove('show-modal-content');
      deleteGoodModalContent.classList.remove('delete-good');
      selectedGood = {};
    }
  };

  Array.from(editGoodBtns).map(function (element) {
    element.addEventListener('click', function (event) {
      editGoodModal.classList.add('show-modal');
      editGoodModalContent.classList.add('show-modal-content');
      // get good data from event object
      selectedGood = {

      };
    });
  });

  Array.from(editGoodCloseBtns).map(function (element) {
    element.addEventListener('click', function () {
      editGoodModal.classList.remove('show-modal');
      editGoodModalContent.classList.remove('show-modal-content');
      // selectedGood = {};
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
