import store from "./store";
import axios from "axios";

function createEopParams(contents, action) {
  return {
    source: "web",
    service: store.state.service,
    page: store.state.eopPage,
    pagetype: store.state.pageType,
    contents: contents,
    user: store.getters.syscode,
    action: action
  };
}

async function sendEop(params) {
  await axios({
    method: "POST",
    url: store.state.eopServer,
    data: params
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function isEopClick(element) {
  return (
    element.parentElement.getAttribute("eop-action") === "click" ||
    element.getAttribute("eop-action") === "click"
  );
}

function isSpecifiedEvents(element) {
  return element.getAttribute("setEop") === "true";
}

function findTargetElements() {
  return [...document.getElementsByTagName("a")].filter(
    e => !isSpecifiedEvents(e) && isEopClick(e)
  );
}

export function setEopEvents() {
  for (let element of findTargetElements()) {
    element.addEventListener("click", e => {
      const eopContents =
        e.target.getAttribute("eop-contents") ||
        e.target.parentElement.getAttribute("eop-contents");
      sendEop(createEopParams(eopContents, "click"));
    });
    element.setAttribute("setEop", "true");
  }
}

export const eopFunctions = {
  methods: {
    sendEopPage: function(addParams) {
      let params = createEopParams("", "displayPage")
      Object.assign(params, addParams);
      sendEop(params);
    },
    sendEopClick: function(contents) {
      if (!contents) {
        return;
      }
      sendEop(createEopParams(contents, "click"));
    }
  }
};
