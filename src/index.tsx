import { Streamlit, RenderData } from "streamlit-component-lib"

const iframe = document.getElementById("wixIframe") as HTMLIFrameElement;

window.addEventListener('message', (event) => {
  // recieve postMessage from iframe
  try {
    const data = event.data;
    if (data && data.code && data.state) {
      Streamlit.setComponentValue(data.code);
    }
  } catch (error) {
    console.error("Error parsing message:", error);
  }
});


/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event: Event): void {
  // Get the RenderData from the event
  const data = (event as CustomEvent<RenderData>).detail

  // RenderData.args is the JSON dictionary of arguments sent from the
  // Python script.
  const url = data.args["url"]
  iframe.src = url

  Streamlit.setFrameHeight()
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight()
