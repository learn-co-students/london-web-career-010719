const myCreateElement = (type, props = {}, children) => {
  return {
    $$typeof: Symbol.for("react.element"),
    type: type,
    props: { children: children },
    ref: null
  };
};

// const Article = props => {
//   return myCreateElement("div", {}, [
//     myCreateElement("h1", {}, props.title),
//     myCreateElement("p", {}, props.text)
//   ]);
// };

const Article = props => {
  return <h1>{props.text}</h1>;
};

const articles = [
  Article({ title: "my react blog", text: "this is some info on react" }),
  Article({
    title: "dfsoj",
    text: "thisadsffadsfdopkkodsfaokdas info on react"
  }),
  Article({ title: "my reac", text: "3989813431" })
];

const allArticles = React.createElement("div", {}, articles);

ReactDOM.render(allArticles, document.querySelector("#main"));
