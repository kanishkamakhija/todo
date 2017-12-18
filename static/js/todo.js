var GoogleAuth;
  var SCOPE = 'profile email openid';
  function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyALl9CgIovQuLVSQnewpVJX8c5jm5DTZ3s',
        'clientId': '84706686409-jp1aaup95lfn0ed3eet8s87i344jg217.apps.googleusercontent.com',
        'scope': 'profile email openid',
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in').click(function() {
        handleAuthClick();
      });

    });
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
  }


  function setSigninStatus(isSignedIn) {

    const user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
     const profile = user.getBasicProfile();
      getAll(profile);
      create();
      $('#sign-in').hide();

    } else {
      $('#title').remove();
      $('#input').remove();
      $('#list').remove();
      $('#sign-out').remove();
      $('#sign-in').show();

    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
  }
