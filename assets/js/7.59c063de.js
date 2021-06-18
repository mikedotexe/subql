(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{381:function(e,r,t){"use strict";t.r(r);var o=t(44),a=Object(o.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"welcome-to-subquery"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#welcome-to-subquery"}},[e._v("#")]),e._v(" Welcome to SubQuery!")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://raw.githubusercontent.com/w3f/General-Grants-Program/master/src/badge_black.svg",alt:"open grant logo"}})]),e._v(" "),t("p",[t("strong",[e._v("SubQuery enables better dApps by making decentralised data more accessible")])]),e._v(" "),t("p",[e._v("SubQuery allows every Substrate/Polkadot team to process and query their data. The project is inspired by the growth of data protocols serving the application layer and its aim is to help Polkadot/Substrate projects build better dApps by allowing anyone to reliably find and consume data faster. Today, anyone can query and extract Polkadot network data in only minutes and at no cost.")]),e._v(" "),t("p",[t("strong",[e._v("In this Guide")])]),e._v(" "),t("ol",[t("li",[e._v("We're going to show you how to create your first SubQuery project from scratch using real world examples.")]),e._v(" "),t("li",[e._v("We'll cover how to run your own SubQuery local node that you can use to debug, test, and run you own GraphQL server")]),e._v(" "),t("li",[e._v("Lastly, we'll explain how to upload SubQuery projects to the hosted SubQuery console so you don't need to worry about running infrastructure.")])]),e._v(" "),t("h2",{attrs:{id:"create-a-subquery-project"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#create-a-subquery-project"}},[e._v("#")]),e._v(" Create a SubQuery project")]),e._v(" "),t("p",[e._v("You can follow our "),t("RouterLink",{attrs:{to:"/quickstart.html"}},[e._v("Quick Start Guide")]),e._v(" to learn how to create, initialize, build, and pack a new SubQuery Project using the "),t("a",{attrs:{href:"https://www.npmjs.com/package/@subql/cli",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("@subql/cli")]),t("OutboundLink")],1),e._v(" tool.")],1),e._v(" "),t("p",[e._v("You'll need "),t("a",{attrs:{href:"https://www.typescriptlang.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Typescript"),t("OutboundLink")],1),e._v(" and  "),t("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"start-using-your-project"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#start-using-your-project"}},[e._v("#")]),e._v(" Start using your project")]),e._v(" "),t("h4",{attrs:{id:"publish-project-to-the-subquery-explorer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#publish-project-to-the-subquery-explorer"}},[e._v("#")]),e._v(" Publish Project to the SubQuery Explorer")]),e._v(" "),t("p",[e._v("Don't want to worry about running your own SubQuery nodes? SubQuery provides a "),t("a",{attrs:{href:"https://explorer.subquery.network",target:"_blank",rel:"noopener noreferrer"}},[e._v("managed hosted service"),t("OutboundLink")],1),e._v(" to the community for free. "),t("RouterLink",{attrs:{to:"/publish/publish.html"}},[e._v("Follow our publishing guide")]),e._v(" to see how you can upload your project to "),t("a",{attrs:{href:"https://project.subquery.network",target:"_blank",rel:"noopener noreferrer"}},[e._v("SubQuery Projects"),t("OutboundLink")],1),e._v(".")],1),e._v(" "),t("h4",{attrs:{id:"run-your-own-local-indexer-and-query-service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#run-your-own-local-indexer-and-query-service"}},[e._v("#")]),e._v(" Run your own Local Indexer and Query Service")]),e._v(" "),t("p",[e._v("We'll cover how to run your own SubQuery local node that you can use to debug, test, and run you own GraphQL server")]),e._v(" "),t("p",[e._v("You're going to need to a Postgres database, a node to extract chain data, and a moderately powerful computer to run the indexer in the background.")]),e._v(" "),t("p",[e._v("You'll also use our custom-built GraphQL query service "),t("a",{attrs:{href:"https://www.npmjs.com/package/@subql/query",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("@subql/query")]),t("OutboundLink")],1),e._v(" to interact with your SubQuery project.")]),e._v(" "),t("h2",{attrs:{id:"terminology"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#terminology"}},[e._v("#")]),e._v(" Terminology")]),e._v(" "),t("ul",[t("li",[e._v("SubQuery Project ("),t("em",[e._v("where the magic happens")]),e._v("): A definition ("),t("a",{attrs:{href:"https://www.npmjs.com/package/@subql/cli",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("@subql/cli")]),t("OutboundLink")],1),e._v(") of how a SubQuery Node should traverse and aggregate a projects network and how the data should the transformed and stored to enable useful GraphQL queries")]),e._v(" "),t("li",[e._v("SubQuery Node ("),t("em",[e._v("where the work is done")]),e._v("): A package ("),t("a",{attrs:{href:"https://www.npmjs.com/package/@subql/node",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("@subql/node")]),t("OutboundLink")],1),e._v(") that will accept a SubQuery project definiton, and run a node that constantly indexes a connected network to a database")]),e._v(" "),t("li",[e._v("SubQuery Query Service ("),t("em",[e._v("where we get the data from")]),e._v("): A package ("),t("a",{attrs:{href:"https://www.npmjs.com/package/@subql/query",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("@subql/query")]),t("OutboundLink")],1),e._v(") that interacts with the GraphQL API of a deployed SubQuery node to query and view the indexed data")]),e._v(" "),t("li",[e._v("GraphQL ("),t("em",[e._v("how we query the data")]),e._v("): A query langage for APIs that is specifically suited for flexible graph based data - see "),t("a",{attrs:{href:"https://graphql.org/learn/",target:"_blank",rel:"noopener noreferrer"}},[e._v("graphql.org"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);r.default=a.exports}}]);