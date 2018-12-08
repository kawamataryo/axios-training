import store from "./store";
import axios from "axios";

function createEopParams(contents, action) {
  return [
    {
      source: "web",
      service: store.state.service,
      page: store.state.eopPage,
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

export const eopFunctions = {
  methods: {
    sendEopPage: function() {
      sendEopData(createEopParams("", "displayPage"));
    },
    sendEopClick: function(contents) {
      if (!contents) {
        return;
      }
      sendEopData(createEopParams(contents, "click"));
    }
  }
};

//TODO: クッキーへの値挿入
//TODO: 微妙に送信携帯が違う問題を対処（json={}）となっているもの
