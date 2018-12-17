/* global gapi */

import React, { Component } from 'react'

const CLIENT_ID = '85495359061-pdq7i9ec889ae0ua14qar71l4rhn795u.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly',           
                'https://www.googleapis.com/auth/analytics.edit'];
    
export default class Example extends Component {

    authorize(event) {
        // Handles the authorization flow.
        // `immediate` should be false when invoked from the button click.
        var useImmdiate = event ? false : true;
        var authData = {
          client_id: CLIENT_ID,
          scope: SCOPES,
          immediate: useImmdiate
        };
    
        gapi.auth.authorize(authData, function(response) {
          var authButton = document.getElementById('auth-button');
          if (response.error) {
            authButton.hidden = false;
            console.log("Error while logging in: "+response.error);
          }
          else {
            authButton.hidden = true;
            console.log('successfully logged in!');
            
            gapi.client.load('analytics', 'v3').then(function() {
                gapi.client.analytics.management.accountSummaries.list()
                .then(data=> {console.log(data)});
              });
          }
        });
      }
      
  render() {
    return (
      <div>
            <button id="auth-button" onClick={e => this.authorize(e)}>Authorize</button>
      </div>
    )
  }
}
