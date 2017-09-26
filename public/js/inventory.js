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
  var inventoryStateEditBtn = document.querySelector('.inventory-state');
  var inventoryStateSaveBtn = document.querySelector('.inventory-state-btn');
  var inventoryStateContainer = document.querySelector('.inventory-state-container');
  var selectedGood = {};

  var textSpans = document.querySelectorAll('.text');

  var imagShow = document.querySelector('.image-place-holder');

  Array.from(textSpans).map(function (textSpan, index) {
    textSpan.addEventListener('mouseover', function (event) {
      textSpan.style.textIndent = '-110em';
      var imgSrc = event.target.parentNode.children[6];
      if (imgSrc && imgSrc.value) {
        good[index].style.backgroundImage = 'url(' + imgSrc.value + ')';
      }
    });

    textSpan.addEventListener('mouseleave', function (event) {
      textSpan.style.textIndent = '0em';
      good[index].style.backgroundImage = 'none';
    });
  });

  Array.from(decrementBtns).map(function (btn) {
    btn.addEventListener('click', function (event) {
      addClasses([decrementModal, decrementModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {
        id: event.target.parentNode.children[2].children[0].id,
        name: event.target.parentNode.children[2].children[1].children[0].textContent,
        type: event.target.parentNode.children[2].children[2].children[0].textContent
      };
      document.querySelector('#decrement-transaction-id').value = selectedGood.id;
      document.querySelector('#transaction-good-name-decrement').value = selectedGood.name;
      document.querySelector('#transaction-good-type-decrement').value = selectedGood.type;
    });
  });

  Array.from(incrementBtns).map(function (btn) {
    btn.addEventListener('click', function (event) {
      addClasses([incrementModal, incrementModalContent], ['show-modal', 'show-modal-content']);
      selectedGood = {
        id: event.target.parentNode.children[2].children[0].id,
        name: event.target.parentNode.children[2].children[1].children[0].textContent,
        type: event.target.parentNode.children[2].children[2].children[0].textContent
      };
      document.querySelector('#increment-transaction-id').value = selectedGood.id;
      document.querySelector('#transaction-good-name').value = selectedGood.name;
      document.querySelector('#transaction-good-type').value = selectedGood.type;
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
      xhrRequest('POST', '/goods/' + selectedGood.id, null, function (err, result) {
        if (err) {
          console.log(err);
          window.location.href = '/500';
        } else {
          window.location.href = '/home';
        }
      });
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
    // createGraph();
    // /////////////////////////////////////////////////////////////////
    getGraphData(function (data) {
      createGraph(data.labels, data.data);
    });
  });

  graphCloseBtn.addEventListener('click', function () {
    removeClasses([graphModal, graphModalContent, graphModalContent], ['show-modal', 'show-modal-content', 'show-graph-modal']);
    window.location.href = '/home';
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
      window.location.href = '/home';
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
      // console.log();
      selectedGood = {
        id: event.target.parentNode.parentNode.children[2].children[0].id,
        name: event.target.parentNode.parentNode.children[2].children[1].children[0].textContent,
        type: event.target.parentNode.parentNode.children[2].children[2].children[0].textContent,
        expiryDate: shortDateFormat(event.target.parentNode.parentNode.children[2].children[3].children[0].textContent),
        image: event.target.parentNode.parentNode.children[2].children[6].value
      };
      console.log(selectedGood);
      imagShow.src = selectedGood.image;
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

  inventoryStateEditBtn.addEventListener('click', function () {
    inventoryStateContainer.classList.toggle('hidden');
  });

  inventoryStateSaveBtn.addEventListener('click', function () {
    inventoryStateContainer.classList.add('hidden');
  });

  // getGraphData(function (data) {
  //   console.log(data);
  // });

  // helper functions
  function getGraphData (cb) {
    xhrRequest('GET', '/goods/graph', null, function (err, data) {
      if (err) cb(err);
      else cb(JSON.parse(data));
    });
  }

  function removeClasses (modals, classNames) {
    modals.map(function (modal, index) { modal.classList.remove(classNames[index]); });
  }

  function addClasses (modals, classNames) {
    modals.map(function (modal, index) { modal.classList.add(classNames[index]); });
  }

  function xhrRequest (method, url, data, cb) {
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        cb(null, this.responseText);
      }
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

  function createGraph (myLabels, myData) {
    var CHART = document.getElementById('myChart');
    console.log('CHART', CHART);
    var barChart = new Chart(CHART, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: 'Numbers Per Month',
          data: myData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],

          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              scaleSteps: 50,
              max: 500
            }
          }]
        }
      }
    });
  }
};
