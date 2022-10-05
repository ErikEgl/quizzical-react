const postUrl = encodeURI(document.location.href);
const postTitle = encodeURI("Hi everyone, check this awesome quiz: ")
export default {
    buttons: [
      {
        siteName: "facebook",
        baseUrl:   `https://www.facebook.com/share.php?u=${postUrl}`,
      },
      {
        siteName: "twitter",
        baseUrl: `https://twitter.com/share?url=${postUrl}&text=${postTitle}`,
      },
      {
        siteName: "linkedin",
        baseUrl: `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`,
      },
      {
        siteName: "whatsapp",
        baseUrl: `https://wa.me/?text=${postTitle} ${postUrl}`,
      }
    ],
  };
  