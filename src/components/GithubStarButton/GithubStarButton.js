import React from "react";
import GitHubButton from 'react-github-btn'
function GithubStarButton(props) {

  return (
    <>
        <li>
            <GitHubButton href="https://github.com/ErikEgl/quizzical-react" data-icon="octicon-star" aria-label="Star ErikEgl/quizzical-react on GitHub">Star</GitHubButton>
        </li>
    </>
  );
}

export default GithubStarButton;



