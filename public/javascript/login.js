

// Front-end for the login page.

//////////////////////////////////////////////////////////////////////////////////////////////
// Handle the 'sign-up' activity
async function signupFormHandler(event) {
    event.preventDefault();

    // Get the data from the form
    const username = document.querySelector('#username-signup').value.trim();
    const email    = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {  // Only do this if all data exists
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        //}).then((response) => { console.log(response) })   // don't need this with async/await
        })

        // Check the response status
        if( response.ok ) {
            console.log( 'Success' );
        }
        else {
            alert( response.statusText );
        }
    }

}


//////////////////////////////////////////////////////////////////////////////////////////////
// Handle the 'login' activity
async function loginFormHandler(event) {
    event.preventDefault();

    // Get the data from the form
    const email    = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {  // Only do this if all data exists
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        //}).then((response) => { console.log(response) })   // don't need this with async/await
        })

        // Check the response status
        if( response.ok ) {
            document.location.replace('/dashboard');
        }
        else {
            alert( response.statusText );
        }
    }

}
  

  // This 'listener' for the submit buttons on the form.
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  