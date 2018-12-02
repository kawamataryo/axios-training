import store from "./store";
import axios from "axios";

function createEopParams(page, contents, action) {
  return [
    {
      source: "web",
      service: store.getters.service,
      page: page,
      pagetype: store.state.pageType,
      contents: contents,
      user: store.getters.syscode,
      action: action
    }
  ];
}

async function sendEopData(params) {
  await axios({
    method: "POST",
    url: store.getters.eopServer,
    data: params
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function pushEopPage(to, from, next) {
  let params = createEopParams(to.meta.eopPage, "", "display");
  sendEopData(params);

  next();
}

export function setEopEvents(to) {
  let eopElements = document.getElementsByClassName("eop");

  for (let element of eopElements) {
    element.addEventListener("click", e => {
      let params = createEopParams(
        to.meta.eopPage,
        e.target.getAttribute("eop-contents"),
        e.target.getAttribute("eop-action")
      );
      sendEopData(params);
    });
  }
}
