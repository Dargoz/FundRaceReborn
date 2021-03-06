var currMenu = "home";
var currMenuGalery = "tentang";

var names = [];
var items = [];

var swappable = [];
var bypass = 'login';

var galleryLinks = [];
var galleryLinkNames = [];

function changeVal(byVal) {
  bypass = byVal;
  changeMenu(bypass);
  for (var i = 0; i < swappable.length; i++) {
    swappable[i].classList.add('hide');
    if (swappable[i].name == bypass) {
      swappable[i].classList.remove('hide');
    }
  }
}

function init() {
  window.friendlyChat = new FriendlyChat();
  swappable.push(document.getElementById('login'));
  swappable.push(document.getElementById('reg'));
  swappable.push(document.getElementById('profile'));

  items = document.getElementsByClassName('nav-link');
  galleryLinks = document.getElementsByClassName('galery-link');

  for (var i = 0; i < items.length; i++) {
    names[i] = items[i].name;
  }

  for (var i = 0; i < galleryLinks.length; i++) {
    galleryLinkNames[i] = galleryLinks[i].name;
  }

  // Leave out Storagef
  //require("firebase/storage");

  items[0].addEventListener('click', function (event) {
    changeMenu(names[0]);
  });
  items[1].addEventListener('click', function (event) {
    changeMenu(names[1]);
  });
  items[2].addEventListener('click', function (event) {
    changeMenu(names[2]);
  });
  items[3].addEventListener('click', function (event) {
    changeMenu(names[3]);
  });
  items[4].addEventListener('click', function (event) {
    changeMenu(names[4]);
  });
  items[5].addEventListener('click', function (event) {
    changeMenu(names[5]);
  });

  galleryLinks[0].addEventListener('click', function (event) {
    changeMenuGalery(galleryLinkNames[0]);
  });
  galleryLinks[1].addEventListener('click', function (event) {
    changeMenuGalery(galleryLinkNames[1]);
  });
  galleryLinks[2].addEventListener('click', function (event) {
    changeMenuGalery(galleryLinkNames[2]);
  });
  galleryLinks[3].addEventListener('click', function (event) {
    changeMenuGalery(galleryLinkNames[3]);
  });
  galleryLinks[4].addEventListener('click', function (event) {
    changeMenuGalery(galleryLinkNames[4]);
  });


  document.getElementById("headerNotLogin").style.display = "";
  document.getElementById("headerDontHaveTeam").style.display = "none";
  document.getElementById("headerNotQualified").style.display = "none";
  document.getElementById("headerHaveTeam").style.display = "none";

  document.getElementById("bg-loading").style.visibility = "hidden";
}

function nextPage() {
  var NxtIndex = 0;
  var CurrIndex = 0;

  console.log(bypass);

  if (currMenu == 'home') {
    changeMenu(bypass);
    return;
  } else if (currMenu == bypass || currMenu == 'prize-page') {
    changeMenu('campaign');
    return;
  }

  for (var i = 0; i < names.length; i++) {
    if (currMenu == names[i]) {
      CurrIndex = i;
    }
  }

  NxtIndex = CurrIndex + 1;
  NxtIndex %= items.length;

  var curr = document.getElementsByClassName(currMenu)[0];
  var nxt = document.getElementsByClassName(names[NxtIndex])[0];

  doChange(curr, nxt, CurrIndex, NxtIndex, names[NxtIndex], 'next');
}

function prevPage() {
  var NxtIndex = 0;
  var CurrIndex = 0;

  if (currMenu == 'campaign') {
    changeMenuDir(bypass, 'prev');
    return;
  } else if (currMenu == bypass || currMenu == 'prize-page') {
    changeMenuDir('home', 'prev');
    return;
  }

  for (var i = 0; i < names.length; i++) {
    if (currMenu == names[i]) {
      CurrIndex = i;
    }
  }
  NxtIndex = CurrIndex - 1;
  if (NxtIndex < 0) NxtIndex += items.length;

  var curr = document.getElementsByClassName(currMenu)[0];
  var nxt = document.getElementsByClassName(names[NxtIndex])[0];

  doChange(curr, nxt, CurrIndex, NxtIndex, names[NxtIndex], 'prev');
}

function changeMenu(menuName) {
  console.log(menuName);
  if (currMenu == menuName) return;


  var NxtIndex = 0;
  var CurrIndex = 0;

  for (var i = 0; i < names.length; i++) {
    if (menuName == names[i]) {
      NxtIndex = i;
    }
    if (currMenu == names[i]) {
      CurrIndex = i;
    }
  }

  var curr = document.getElementsByClassName(currMenu)[0];
  var nxt = document.getElementsByClassName(menuName)[0];

  doChange(curr, nxt, CurrIndex, NxtIndex, menuName, 'next');
}

function changeMenuGalery(menuName) {
  console.log(menuName);
  if (currMenuGalery == menuName) return;

  var NxtIndex = 0;
  var CurrIndex = 0;

  for (var i = 0; i < names.length; i++) {
    if (menuName == galleryLinkNames[i]) {
      NxtIndex = i;
    }
    if (currMenuGalery == galleryLinkNames[i]) {
      CurrIndex = i;
    }
  }

  var curr = document.getElementsByClassName(currMenuGalery)[0];
  var nxt = document.getElementsByClassName(menuName)[0];

  doChangeGalery(curr, nxt, CurrIndex, NxtIndex, menuName, 'next');
}

function changeMenuDir(menuName, dir) {
  console.log(menuName);
  if (currMenu == menuName) return;

  var NxtIndex = -1;
  var CurrIndex = -1;

  for (var i = 0; i < names.length; i++) {
    if (menuName == names[i]) {
      NxtIndex = i;
    }
    if (currMenu == names[i]) {
      CurrIndex = i;
    }
  }

  if (NxtIndex == -1) {
    NxtIndex = 3;
  }

  var curr = document.getElementsByClassName(currMenu)[0];
  var nxt = document.getElementsByClassName(menuName)[0];

  doChange(curr, nxt, CurrIndex, NxtIndex, menuName, dir);
}

function doChange(curr, nxt, CurrIndex, NxtIndex, menuName, to) {
  nxt.classList.toggle('ready--' + to);
  curr.classList.toggle('menu--off--' + to);
  window.setTimeout(function () {
    nxt.classList.toggle('ready--' + to);
    nxt.classList.toggle('menu--on');
  }, 100);
  curr.classList.toggle('menu--on');

  console.log("Curr Class: " + CurrIndex);

  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
  }
  items[NxtIndex].classList.add('active');

  window.setTimeout(function () {
    curr.classList.toggle('menu--off--' + to);
  }, 500);

  currMenu = menuName;
}

function doChangeGalery(curr, nxt, CurrIndex, NxtIndex, menuName, to) {
  nxt.classList.toggle('ready--' + to);
  curr.classList.toggle('menu--off--' + to);
  window.setTimeout(function () {
    nxt.classList.toggle('ready--' + to);
    nxt.classList.toggle('menu--on');
  }, 100);
  curr.classList.toggle('menu--on');

  console.log("Curr Class: " + CurrIndex);

  for (var i = 0; i < galleryLinks.length; i++) {
    galleryLinks[i].classList.remove('active');
  }
  galleryLinks[NxtIndex].classList.add('active');

  window.setTimeout(function () {
    curr.classList.toggle('menu--off--' + to);
  }, 500);

  currMenuGalery = menuName;
}


'use strict';

// Initializes FriendlyChat.
function FriendlyChat() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages');
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.submitImageButton = document.getElementById('submitImage');
  this.imageForm = document.getElementById('image-form');
  this.mediaCapture = document.getElementById('mediaCapture');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  this.submitImageButton.addEventListener('click', function (e) {
    e.preventDefault();
    this.mediaCapture.click();
  }.bind(this));
  this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function () {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.loadMessages = function () {
  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('messages');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function (data) {
    var val = data.val();
    this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
FriendlyChat.prototype.saveMessage = function (e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (this.messageInput.value && this.checkSignedInWithMessage()) {

    var currentUser = this.auth.currentUser;
    // Add a new message entry to the Firebase Database.
    this.messagesRef.push({
      name: currentUser.displayName,
      text: this.messageInput.value,
      photoUrl: currentUser.photoURL || '/assets/profile_placeholder.png'
    }).then(function () {
      // Clear message text field and SEND button state.
      FriendlyChat.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function (error) {
      console.error('Error writing new message to Firebase Database', error);
    });

  }
};

// Sets the URL of the given img element with the URL of the image stored in Cloud Storage.
FriendlyChat.prototype.setImageUrl = function (imageUri, imgElement) {

  if (imageUri.startsWith('gs://')) {
    imgElement.src = FriendlyChat.LOADING_IMAGE_URL; // Display a loading image first.
    this.storage.refFromURL(imageUri).getMetadata().then(function (metadata) {
      imgElement.src = metadata.downloadURLs[0];
    });
  } else {
    imgElement.src = imageUri;
  }
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function (event) {
  if (this.checkSignedInWithMessage()) {

    // We add a message with a loading icon that will get updated with the shared image.
    var currentUser = this.auth.currentUser;
    this.messagesRef.push({
      name: currentUser.displayName,
      imageUrl: FriendlyChat.LOADING_IMAGE_URL,
      photoUrl: currentUser.photoURL || '/assets/profile_placeholder.png'
    }).then(function (data) {

      // Upload the image to Cloud Storage.
      var filePath = currentUser.uid + '/' + data.key + '/' + file.name;
      return this.storage.ref(filePath).put(file).then(function (snapshot) {

        // Get the file's Storage URI and update the chat message placeholder.
        var fullPath = snapshot.metadata.fullPath;
        return data.update({ imageUrl: this.storage.ref(fullPath).toString() });
      }.bind(this));
    }.bind(this)).catch(function (error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    });
  }
};



// Signs-in Friendly Chat.
FriendlyChat.prototype.signIn = function () {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
FriendlyChat.prototype.signOut = function () {
  // TODO(DEVELOPER): Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function (user) {
  if (user) {
    bypass = 'profile';
    changeMenu(bypass);
    for (var i = 0; i < swappable.length; i++) {
      swappable[i].classList.add('hide');
      if (swappable[i].name == bypass) {
        swappable[i].classList.remove('hide');
      }
    }

    // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL; // Only change these two lines!
    var userName = user.displayName;   // Only change these two lines!

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadMessages();

    // We save the Firebase Messaging Device token and enable notifications.
    this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    bypass = 'login';
    changeMenu('home');
    for (var i = 0; i < swappable.length; i++) {
      swappable[i].classList.add('hide');
      if (swappable[i].name == bypass) {
        swappable[i].classList.remove('hide');
      }
    }

    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FriendlyChat.prototype.checkSignedInWithMessage = function () {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  if (this.auth.currentUser) {
    return true;
  }
  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Saves the messaging device token to the datastore.
FriendlyChat.prototype.saveMessagingDeviceToken = function () {
  // TODO(DEVELOPER): Save the device token in the realtime datastore
};

// Requests permissions to show notifications.
FriendlyChat.prototype.requestNotificationsPermissions = function () {
  // TODO(DEVELOPER): Request permissions to send notifications.
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function (element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
  '<div class="message-container">' +
  '<div class="spacing"><div class="pic"></div></div>' +
  '<div class="message"></div>' +
  '<div class="name"></div>' +
  '</div>';

// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function (key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function () {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function () { div.classList.add('visible') }, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function () {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function () {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
};


