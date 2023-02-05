export default function bubbleIframeEvents(iframe, dispathTo, eventName) {
    const iframeWindow = iframe.contentWindow
    iframeWindow.addEventListener( eventName, (event) => {
        const fakeEvent = new CustomEvent(
          eventName,
          {
            bubbles    : true,
            cancelable : false,
          }
        )
        dispathTo.dispatchEvent(fakeEvent);
      }
    )
}