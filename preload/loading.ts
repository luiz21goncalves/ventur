export function loading() {
  const wrapperElement = document.createElement('div');
  const loadingElement = document.createElement('div');
  const styles = document.createElement('style');

  loadingElement.className = 'loading';

  wrapperElement.appendChild(loadingElement);
  wrapperElement.className = 'wrapper';

  styles.innerHTML = `
    @keyframes spinner {
      to {
        transform: rotate(1turn);
      }
    }
    * {
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loading {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 8px solid #eef1efef;
      border-top-color: #A9B4C2;
      animation: spinner 1s ease infinite;
    }
  `;

  return {
    appendLoading() {
      document.head.appendChild(styles);
      document.body.appendChild(wrapperElement);
    },
    removeLoading() {
      document.head.removeChild(styles);
      document.body.removeChild(wrapperElement);
    },
  };
}
