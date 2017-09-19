window.onload = function () {
  var signInModal = document.querySelector('.signin-modal');
  var signInModalContent = document.querySelector('.signin-modal-content');
  var signInBtn = document.querySelector('.signin-btn');
  var signUpBtn = document.querySelector('.signup-btn');
  var signInCloseBtn = document.querySelector('.signin-close');
  var signUpModal = document.querySelector('.signup-modal');
  var signUpModalContent = document.querySelector('.signup-modal-content');
  var signUpCloseBtn = document.querySelector('.signup-close');

  signInBtn.addEventListener('click', function () {
    signInModal.classList.add('show-modal');
    signInModalContent.classList.add('show-modal-content');
  });

  signInCloseBtn.addEventListener('click', function () {
    signInModal.classList.remove('show-modal');
    signInModalContent.classList.remove('show-modal-content');
  });

  signUpBtn.addEventListener('click', function () {
    signUpModal.classList.add('show-modal');
    signUpModalContent.classList.add('show-modal-content');
  });

  signUpCloseBtn.addEventListener('click', function () {
    signUpModal.classList.remove('show-modal');
    signUpModalContent.classList.remove('show-modal-content');
  });

  window.onclick = function (event) {
    if (event.target === signInModal) {
      signInModal.classList.remove('show-modal');
      signInModalContent.classList.remove('show-modal-content');
    } else if (event.target === signUpModal) {
      signUpModal.classList.remove('show-modal');
      signUpModalContent.classList.remove('show-modal-content');
    }
  };
};
