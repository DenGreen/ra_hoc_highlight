import React from "react";

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children(props.props)}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children(props.props)}
    </div>
  );
}

function WithBlock(Component) {
  function Wrapper(props) {
    if (props.views >= 1000) {
      return <Popular props={props} children={Component} />;
    } else if (props.views <= 100) {
      return <New props={props} children={Component} />;
    }
    return <Component {...props} />;
  }
  return Wrapper;
}

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#0">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        allow="autoplay; encrypted-media"
        title="1"
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

const WithVideo = WithBlock(Video);
const WithArticle = WithBlock(Article);

function List(props) {
  return props.list.map((item) => {
    let value = null;
    switch (item.type) {
      case "video":
        value = <WithVideo {...item} key={item.id} />;
        break;
      case "article":
        value = <WithArticle {...item} key={item.id} />;
        break;
        default: console.log('error')
    }
    return value;
  });
}

export default function App() {
  const list = [
    {
      id: "1",
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      id: "2",
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      id: "3",
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      id: "4",
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      id: "5",
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      id: "6",
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ];

  return <List list={list} />;
}
