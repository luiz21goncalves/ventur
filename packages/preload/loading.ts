export function useLoading() {
  const className = `loaders-css__spin`
  const styleContent = `
    @-webkit-keyframes load {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes load {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    .${className} {
      font-size: 10px;
      margin: 50px auto;
      text-indent: -9999em;
      width: 11em;
      height: 11em;
      border-radius: 50%;
      background: #ffffff;
      background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      position: relative;
      -webkit-animation: load 1.4s infinite linear;
      animation: load 1.4s infinite linear;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }

    .${className}:before {
      width: 50%;
      height: 50%;
      background: #ffffff;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
    }

    .${className}:after {
      background: #282c34;
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: '';
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .app-loading-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #282c34;
    }
  `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"></div>`

  return {
    appendLoading() {
      document.head.appendChild(oStyle)
      document.body.appendChild(oDiv)
    },
    removeLoading() {
      document.head.removeChild(oStyle)
      document.body.removeChild(oDiv)
    },
  }
}
