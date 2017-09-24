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

  var incrementModal = document.querySelector('.increment-modal');
  var incrementModalContent = document.querySelector('.increment-modal-content');
  var incrementModalClosebtn = document.querySelector('.increment-close');
  var incrementBtns = document.querySelectorAll('.incr-btn');

  var decrementModal = document.querySelector('.decrement-modal');
  var decrementModalContent = document.querySelector('.decrement-modal-content');
  var decrementModalCloseBtn = document.querySelector('.decrement-close');
  var decrementBtns = document.querySelectorAll('.decr-btn');

  var yesBtn = document.querySelector('.yes-btn');
  var noBtn = document.querySelector('.no-btn');
  var selectedGood = {};

  Array.from(decrementBtns).map(function (btn) {
    btn.addEventListener('click', function () {
      addClasses([decrementModal, decrementModalContent], ['show-modal', 'show-modal-content']);
    });
  });

  Array.from(incrementBtns).map(function (btn) {
    btn.addEventListener('click', function (event) {
      addClasses([incrementModal, incrementModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {
        id: event.target.parentNode.children[2].children[0].id,
        name: event.target.parentNode.children[2].children[1].children[0].textContent,
        type: event.target.parentNode.children[2].children[2].children[0].textContent,
        transaction_date: shortDateFormat(event.target.parentNode.children[2].children[3].children[0].textContent),
        quantity: event.target.parentNode.children[2].children[5].children[0].textContent
      };
      document.querySelector('#increment-transaction-id').value = selectedGood.id;
      document.querySelector('#transaction-good-name').value = selectedGood.name;
      document.querySelector('#transaction-good-type').value = selectedGood.type;
      document.querySelector('#transaction-good-quantity').value = selectedGood.quantity;
      document.querySelector('#transaction-good-date').value = selectedGood.transaction_date;
    });
  });

  incrementModalClosebtn.addEventListener('click', function () {
    removeClasses([incrementModal, incrementModalContent], ['show-modal', 'show-modal-content']);
  });

  decrementModalCloseBtn.addEventListener('click', function () {
    removeClasses([decrementModal, decrementModalContent], ['show-modal', 'show-modal-content']);
  });

  Array.from(deleteBtns).map(function (btn) {
    btn.addEventListener('click', function (event) {
      addClasses([deleteGoodModal, deleteGoodModalContent, deleteGoodModalContent], ['show-modal', 'show-modal-content', 'delete-good']);
      selectedGood = {id: event.target.parentNode.children[2].children[0].id};
    });
  });

  yesBtn.addEventListener('click', function () {
    if (selectedGood.hasOwnProperty('id')) {
      xhrRequest('POST', '/goods/' + selectedGood.id);
    }
  });

  noBtn.addEventListener('click', function () {
    removeClasses([deleteGoodModal, deleteGoodModalContent, deleteGoodModalContent], ['show-modal', 'show-modal-content', 'delete-good']);
    selectedGood = {};
  });

  deleteGoodCloseBtn.addEventListener('click', function () {
    removeClasses([deleteGoodModal, deleteGoodModalContent, deleteGoodModalContent], ['show-modal', 'show-modal-content', 'delete-good']);
    selectedGood = {};
  });

  graphBtn.addEventListener('click', function () {
    addClasses([graphModal, graphModalContent, graphModalContent], ['show-modal', 'show-modal-content', 'show-graph-modal']);
  });

  graphCloseBtn.addEventListener('click', function () {
    removeClasses([graphModal, graphModalContent, graphModalContent], ['show-modal', 'show-modal-content', 'show-graph-modal']);
  });

  addGoodBtn.addEventListener('click', function () {
    addClasses([addGoodModal, addGoodModalContent], ['show-modal', 'show-modal-content']);
  });

  addGoodCloseBtn.addEventListener('click', function () {
    removeClasses([addGoodModal, addGoodModalContent], ['show-modal', 'show-modal-content']);
  });

  window.onclick = function (event) {
    if (event.target === addGoodModal) {
      removeClasses([addGoodModal, addGoodModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {};
    } else if (event.target === editGoodModal) {
      removeClasses([editGoodModal, editGoodModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {};
    } else if (event.target === graphModal) {
      removeClasses([graphModal, graphModalContent, graphModalContent], ['show-modal', 'show-modal-content', 'show-graph-modal']);
    } else if (event.target === deleteGoodModal) {
      removeClasses([deleteGoodModal, deleteGoodModalContent, deleteGoodModalContent], ['show-modal', 'show-modal-content', 'delete-good']);
      selectedGood = {};
    } else if (event.target === incrementModal) {
      removeClasses([incrementModal, incrementModalContent], ['show-modal', 'show-modal-content']);
    } else if (event.target === decrementModal) {
      removeClasses([decrementModal, decrementModalContent], ['show-modal', 'show-modal-content']);
    }
  };

  Array.from(editGoodBtns).map(function (element) {
    element.addEventListener('click', function (event) {
      addClasses([editGoodModal, editGoodModalContent], ['show-modal', 'show-modal-content']);
      // get good data from event object
      selectedGood = {
        id: event.target.parentNode.parentNode.children[2].children[0].id,
        name: event.target.parentNode.parentNode.children[2].children[1].children[0].textContent,
        type: event.target.parentNode.parentNode.children[2].children[2].children[0].textContent,
        expiryDate: shortDateFormat(event.target.parentNode.parentNode.children[2].children[3].children[0].textContent),
        image: event.target.parentNode.parentNode.children[2].children[1].children[0].files[0].filename
      };
      document.querySelector('#edit-good-name').value = selectedGood.name;
      document.querySelector('#edit-good-type').value = selectedGood.type;
      document.querySelector('#edit-good-expiryDate').value = selectedGood.expiryDate;
      document.querySelector('#edit-good-id').value = selectedGood.id;
    });
  });

  Array.from(editGoodCloseBtns).map(function (element) {
    element.addEventListener('click', function () {
      removeClasses([editGoodModal, editGoodModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {};
    });
  });

  Array.from(good).map(function (element) {
    element.addEventListener('mouseover', function (event) {
      addClasses([this], ['add-background']);
    });

    element.addEventListener('mouseleave', function (event) {
      removeClasses([this], ['add-background']);
    });
  });

  function removeClasses (modals, classNames) {
    modals.map(function (modal, index) { modal.classList.remove(classNames[index]); });
  }

  function addClasses (modals, classNames) {
    modals.map(function (modal, index) { modal.classList.add(classNames[index]); });
  }

  function xhrRequest (method, url, data) {
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = function () {
      window.location.href = '/home';
    };
    xhr.open(method, url, true);
    if (!data) data = {};
    xhr.send(data);
  }

  function shortDateFormat (longDate) {
    var date = new Date(longDate);
    var day = date.getDate();
    var month = date.getMonth();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    return date.getFullYear() + '-' + month + '-' + day;
  }
};
