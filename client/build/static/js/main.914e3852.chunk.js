(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/Loading.0d0345f6.gif"},function(e,t,a){e.exports=a.p+"static/media/League.059ada60.png"},function(e,t,a){e.exports=a.p+"static/media/Wolfram.f0499e49.png"},function(e,t,a){e.exports=a.p+"static/media/Weather.1e179f55.png"},function(e,t,a){e.exports=a.p+"static/media/Dictionary.48c2d1b5.png"},function(e,t,a){e.exports=a.p+"static/media/Translink.f0269dcc.png"},,,,,,,,,,,,function(e,t,a){e.exports=a(57)},,,,,,function(e,t,a){},function(e,t,a){},,,,,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(26),o=a.n(r),u=(a(33),a(3)),l=a(4),s=a(6),i=a(5),h=a(1),d=a(7),m=(a(34),a(8)),f=a.n(m),p=(a(52),a(8)),b=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={result:"test"},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.get("/randomfact").then(function(t){return e.setState({result:t.data})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this.state;return c.a.createElement("div",{className:"FactOfTheDay"},c.a.createElement("div",{className:"FactOfTheDay__title"},"Fact Of The Day"),c.a.createElement("div",{className:"FactOfTheDay__content"},e.result))}}]),t}(n.Component),g=(a(53),a(11)),v=a.n(g),y=a(12),O=a.n(y),j=a(13),k=a.n(j),E=a(14),C=a.n(E),S=a(15),I=a.n(S),q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={api:""},a.changeAPI=a.changeAPI.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"changeAPI",value:function(e){this.props.sendAPI(e),this.setState({api:e})}},{key:"render",value:function(){var e=this,t={League:"url( ".concat(v.a," )"),Wolfram:"url( ".concat(O.a," )"),Weather:"url( ".concat(k.a," )"),Dictionary:"url( ".concat(C.a," )"),Translink:"url( ".concat(I.a," )"),a:"url( ".concat(v.a," )"),b:"url( ".concat(O.a," )"),c:"url( ".concat(k.a," )"),d:"url( ".concat(C.a," )"),e:"url( ".concat(I.a," )"),g:"url( ".concat(v.a," )"),h:"url( ".concat(O.a," )"),i:"url( ".concat(k.a," )"),j:"url( ".concat(C.a," )"),k:"url( ".concat(I.a," )")},a=[],n=this.state;return Object.keys(t).map(function(r){return a.push(c.a.createElement("button",{key:r,className:n.api===r?"selected":"",type:"button",onClick:function(){return e.changeAPI(r)},onKeyUp:function(){return e.changeAPI(r)},style:{backgroundImage:t[r]}}))}),c.a.createElement("div",{className:"APISelect"},a)}}]),t}(n.Component),w=a(9),N=(a(54),a(10)),_=a.n(N),A=a(8),x=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={result:"",loaded:!1,fullResult:!1},a.handleInputChange=a.handleInputChange.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({loaded:!0})}},{key:"componentDidUpdate",value:function(e,t){var a=this,n=this.props,c=this.state;!n.query||e.query===n.query&&t.fullResult===c.fullResult||(this.setState({loaded:!1}),!0!==c.fullResult?A.get("/wolfram",{params:{q:n.query}}).then(function(e){a.setState({result:e.data,loaded:!0}),console.log(e)}).catch(function(e){console.log(e)}):A.get("/wolfram2",{params:{q:n.query}}).then(function(e){a.setState({result:e.data,loaded:!0}),console.log(e)}).catch(function(e){console.log(e)}))}},{key:"handleInputChange",value:function(e){var t,a=e.target,n="checkbox"===a.type?a.checked:a.value,c=a.name;this.setState((t={},Object(w.a)(t,c,n),Object(w.a)(t,"loaded",!1),t))}},{key:"render",value:function(){var e=this.state;return c.a.createElement("div",{className:"WolframComponent"},c.a.createElement("input",{name:"fullResult",type:"checkbox",checked:e.fullResult,onChange:this.handleInputChange}),"Show Full Result?",!0===e.loaded?function(){if(!0!==e.fullResult)return e.result;for(var t=[],a=0;a<e.result.length;a+=1){t.push(c.a.createElement("h2",null,e.result[a].title));for(var n=0;n<e.result[a].subpods.length;n+=1)t.push(c.a.createElement("img",{src:e.result[a].subpods[n].img.src,alt:""}))}return t}():c.a.createElement("img",{src:_.a,alt:""}))}}]),t}(n.Component),D=(a(55),a(8)),P=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={result:"",loaded:!1},a.handleInputChange=a.handleInputChange.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({loaded:!0})}},{key:"componentDidUpdate",value:function(e){var t=this,a=this.props;a.query&&e.query!==a.query&&(this.setState({loaded:!1}),D.get("/weather",{params:{q:a.query}}).then(function(e){t.setState({result:e.data,loaded:!0}),console.log(e)}).catch(function(e){console.log(e)}))}},{key:"handleInputChange",value:function(e){var t,a=e.target,n="checkbox"===a.type?a.checked:a.value,c=a.name;this.setState((t={},Object(w.a)(t,c,n),Object(w.a)(t,"loaded",!1),t))}},{key:"render",value:function(){var e=this.state;return c.a.createElement("div",{className:"WeatherComponent"},!0===e.loaded?function(){var t=[],a=e.result.list;if(a)for(var n=0;n<a.length;n+=1)t.push(c.a.createElement("h2",null,a[n].dt_txt)),t.push(c.a.createElement("h2",null,a[n].weather[0].description));return t}():c.a.createElement("img",{src:_.a,alt:""}))}}]),t}(n.Component),W=a(16),R=(a(56),a(8)),F=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={notes:[]},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;R.get("/notes").then(function(t){e.setState({notes:t.data});var a=e.state;e.tempNotes=Object(W.a)(a.notes),console.log(t.data)}).catch(function(e){console.log(e)})}},{key:"handleChange",value:function(e){var t=this.state,a=t.notes.findIndex(function(t){return t._id===e.target.getAttribute("myid")}),n=Object(W.a)(t.notes);n[a].content=e.target.value,this.setState({notes:n})}},{key:"render",value:function(){var e=this,t=this.state.notes.map(function(t){return c.a.createElement("textarea",{key:t._id,myid:t._id,value:t.content,onChange:e.handleChange})});return c.a.createElement("div",{className:"Notes"},c.a.createElement("div",{className:"Notes__content"},t))}}]),t}(n.Component);f.a.defaults.baseURL="192.168.0.45";var T=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={query:"",submittedQuery:"",api:"League"},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a.setAPI=a.setAPI.bind(Object(h.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"setAPI",value:function(e){this.setState({api:e}),this.setState({submittedQuery:""})}},{key:"handleChange",value:function(e){this.setState({query:e.target.value})}},{key:"handleSubmit",value:function(e){this.setState(function(e){return{submittedQuery:e.query}}),e.preventDefault()}},{key:"render",value:function(){var e,t=this.state,a=t.submittedQuery,n=t.query;switch(t.api){case"Wolfram":e=c.a.createElement(x,{query:a});break;case"Weather":e=c.a.createElement(P,{query:a});break;default:e=c.a.createElement(x,{query:a})}return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"App__left"},c.a.createElement(q,{sendAPI:this.setAPI})),c.a.createElement("div",{className:"App__right"},c.a.createElement("form",{className:"Form",onSubmit:this.handleSubmit},c.a.createElement("input",{className:"Form__Searchbar",type:"text",value:n,onChange:this.handleChange,placeholder:"Search anything..."}),c.a.createElement("input",{className:"Form__Submit",type:"submit",value:"\u2192"})),e,c.a.createElement(b,null),c.a.createElement(F,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[27,1,2]]]);
//# sourceMappingURL=main.914e3852.chunk.js.map