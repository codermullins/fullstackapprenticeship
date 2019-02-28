import React from "react";

export default class Footer extends React.Component {
    render() {
        const footerStyle = {
            textAlign: 'center',
            bottom: 0,
            left: 0,
            right: 0,
          }
      return (
        <div style={footerStyle}>
            <h2><a href="https://fsa.community" target="_blank" rel="noopener noreferrer">What is the FSA?</a> - <a href="https://expo.io/@fullstackapprentice/thehub" target="_blank" rel="noopener noreferrer">View Mobile Application</a></h2>
            <h3>Full-Stack Apprenticeship 2019</h3>
        </div>
      );
    }
  }