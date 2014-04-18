/////////////////////////// LOAD JAVASCRIPT INSIDE JAVASCRIPT //////////////////////////////
/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2012, Tim Down
 Licensed under the MIT license.
 Version: 1.2.3
 Build date: 26 February 2012
*/

window.rangy=function(){function l(p,u){var w=typeof p[u];return w=="function"||!!(w=="object"&&p[u])||w=="unknown"}function K(p,u){return!!(typeof p[u]=="object"&&p[u])}function H(p,u){return typeof p[u]!="undefined"}function I(p){return function(u,w){for(var B=w.length;B--;)if(!p(u,w[B]))return false;return true}}function z(p){return p&&A(p,x)&&v(p,t)}function C(p){window.alert("Rangy not supported in your browser. Reason: "+p);c.initialized=true;c.supported=false}function N(){if(!c.initialized){var p,
u=false,w=false;if(l(document,"createRange")){p=document.createRange();if(A(p,n)&&v(p,i))u=true;p.detach()}if((p=K(document,"body")?document.body:document.getElementsByTagName("body")[0])&&l(p,"createTextRange")){p=p.createTextRange();if(z(p))w=true}!u&&!w&&C("Neither Range nor TextRange are implemented");c.initialized=true;c.features={implementsDomRange:u,implementsTextRange:w};u=k.concat(f);w=0;for(p=u.length;w<p;++w)try{u[w](c)}catch(B){K(window,"console")&&l(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
B)}}}function O(p){this.name=p;this.supported=this.initialized=false}var i=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],n=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
t=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],x=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint","getBoundingClientRect"],A=I(l),q=I(K),v=I(H),c={version:"1.2.3",initialized:false,supported:true,util:{isHostMethod:l,isHostObject:K,isHostProperty:H,areHostMethods:A,areHostObjects:q,areHostProperties:v,isTextRange:z},features:{},modules:{},config:{alertOnWarn:false,preferTextRange:false}};
c.fail=C;c.warn=function(p){p="Rangy warning: "+p;if(c.config.alertOnWarn)window.alert(p);else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(p)};if({}.hasOwnProperty)c.util.extend=function(p,u){for(var w in u)if(u.hasOwnProperty(w))p[w]=u[w]};else C("hasOwnProperty not supported");var f=[],k=[];c.init=N;c.addInitListener=function(p){c.initialized?p(c):f.push(p)};var r=[];c.addCreateMissingNativeApiListener=function(p){r.push(p)};c.createMissingNativeApi=
function(p){p=p||window;N();for(var u=0,w=r.length;u<w;++u)r[u](p)};O.prototype.fail=function(p){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+p);};O.prototype.warn=function(p){c.warn("Module "+this.name+": "+p)};O.prototype.createError=function(p){return Error("Error in Rangy "+this.name+" module: "+p)};c.createModule=function(p,u){var w=new O(p);c.modules[p]=w;k.push(function(B){u(B,w);w.initialized=true;w.supported=true})};c.requireModules=function(p){for(var u=
0,w=p.length,B,V;u<w;++u){V=p[u];B=c.modules[V];if(!B||!(B instanceof O))throw Error("Module '"+V+"' not found");if(!B.supported)throw Error("Module '"+V+"' not supported");}};var L=false;q=function(){if(!L){L=true;c.initialized||N()}};if(typeof window=="undefined")C("No window found");else if(typeof document=="undefined")C("No document found");else{l(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",q,false);if(l(window,"addEventListener"))window.addEventListener("load",
q,false);else l(window,"attachEvent")?window.attachEvent("onload",q):C("Window does not have required addEventListener or attachEvent method");return c}}();
rangy.createModule("DomUtil",function(l,K){function H(c){for(var f=0;c=c.previousSibling;)f++;return f}function I(c,f){var k=[],r;for(r=c;r;r=r.parentNode)k.push(r);for(r=f;r;r=r.parentNode)if(v(k,r))return r;return null}function z(c,f,k){for(k=k?c:c.parentNode;k;){c=k.parentNode;if(c===f)return k;k=c}return null}function C(c){c=c.nodeType;return c==3||c==4||c==8}function N(c,f){var k=f.nextSibling,r=f.parentNode;k?r.insertBefore(c,k):r.appendChild(c);return c}function O(c){if(c.nodeType==9)return c;
else if(typeof c.ownerDocument!="undefined")return c.ownerDocument;else if(typeof c.document!="undefined")return c.document;else if(c.parentNode)return O(c.parentNode);else throw Error("getDocument: no document found for node");}function i(c){if(!c)return"[No node]";return C(c)?'"'+c.data+'"':c.nodeType==1?"<"+c.nodeName+(c.id?' id="'+c.id+'"':"")+">["+c.childNodes.length+"]":c.nodeName}function n(c){this._next=this.root=c}function t(c,f){this.node=c;this.offset=f}function x(c){this.code=this[c];
this.codeName=c;this.message="DOMException: "+this.codeName}var A=l.util;A.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||K.fail("document missing a Node creation method");A.isHostMethod(document,"getElementsByTagName")||K.fail("document missing getElementsByTagName method");var q=document.createElement("div");A.areHostMethods(q,["insertBefore","appendChild","cloneNode"])||K.fail("Incomplete Element implementation");A.isHostProperty(q,"innerHTML")||K.fail("Element is missing innerHTML property");
q=document.createTextNode("test");A.areHostMethods(q,["splitText","deleteData","insertData","appendData","cloneNode"])||K.fail("Incomplete Text Node implementation");var v=function(c,f){for(var k=c.length;k--;)if(c[k]===f)return true;return false};n.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var c=this._current=this._next,f;if(this._current)if(f=c.firstChild)this._next=f;else{for(f=null;c!==this.root&&!(f=c.nextSibling);)c=c.parentNode;this._next=f}return this._current},
detach:function(){this._current=this._next=this.root=null}};t.prototype={equals:function(c){return this.node===c.node&this.offset==c.offset},inspect:function(){return"[DomPosition("+i(this.node)+":"+this.offset+")]"}};x.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};x.prototype.toString=function(){return this.message};l.dom={arrayContains:v,isHtmlNamespace:function(c){var f;return typeof c.namespaceURI==
"undefined"||(f=c.namespaceURI)===null||f=="http://www.w3.org/1999/xhtml"},parentElement:function(c){c=c.parentNode;return c.nodeType==1?c:null},getNodeIndex:H,getNodeLength:function(c){var f;return C(c)?c.length:(f=c.childNodes)?f.length:0},getCommonAncestor:I,isAncestorOf:function(c,f,k){for(f=k?f:f.parentNode;f;)if(f===c)return true;else f=f.parentNode;return false},getClosestAncestorIn:z,isCharacterDataNode:C,insertAfter:N,splitDataNode:function(c,f){var k=c.cloneNode(false);k.deleteData(0,f);
c.deleteData(f,c.length-f);N(k,c);return k},getDocument:O,getWindow:function(c){c=O(c);if(typeof c.defaultView!="undefined")return c.defaultView;else if(typeof c.parentWindow!="undefined")return c.parentWindow;else throw Error("Cannot get a window object for node");},getIframeWindow:function(c){if(typeof c.contentWindow!="undefined")return c.contentWindow;else if(typeof c.contentDocument!="undefined")return c.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");
},getIframeDocument:function(c){if(typeof c.contentDocument!="undefined")return c.contentDocument;else if(typeof c.contentWindow!="undefined")return c.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(c){return A.isHostObject(c,"body")?c.body:c.getElementsByTagName("body")[0]},getRootContainer:function(c){for(var f;f=c.parentNode;)c=f;return c},comparePoints:function(c,f,k,r){var L;if(c==k)return f===r?0:f<r?-1:1;else if(L=z(k,
c,true))return f<=H(L)?-1:1;else if(L=z(c,k,true))return H(L)<r?-1:1;else{f=I(c,k);c=c===f?f:z(c,f,true);k=k===f?f:z(k,f,true);if(c===k)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===c)return-1;else if(f===k)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:i,fragmentFromNodeChildren:function(c){for(var f=O(c).createDocumentFragment(),k;k=c.firstChild;)f.appendChild(k);return f},createIterator:function(c){return new n(c)},
DomPosition:t};l.DOMException=x});
rangy.createModule("DomRange",function(l){function K(a,e){return a.nodeType!=3&&(g.isAncestorOf(a,e.startContainer,true)||g.isAncestorOf(a,e.endContainer,true))}function H(a){return g.getDocument(a.startContainer)}function I(a,e,j){if(e=a._listeners[e])for(var o=0,E=e.length;o<E;++o)e[o].call(a,{target:a,args:j})}function z(a){return new Z(a.parentNode,g.getNodeIndex(a))}function C(a){return new Z(a.parentNode,g.getNodeIndex(a)+1)}function N(a,e,j){var o=a.nodeType==11?a.firstChild:a;if(g.isCharacterDataNode(e))j==
e.length?g.insertAfter(a,e):e.parentNode.insertBefore(a,j==0?e:g.splitDataNode(e,j));else j>=e.childNodes.length?e.appendChild(a):e.insertBefore(a,e.childNodes[j]);return o}function O(a){for(var e,j,o=H(a.range).createDocumentFragment();j=a.next();){e=a.isPartiallySelectedSubtree();j=j.cloneNode(!e);if(e){e=a.getSubtreeIterator();j.appendChild(O(e));e.detach(true)}if(j.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");o.appendChild(j)}return o}function i(a,e,j){var o,E;for(j=j||{stop:false};o=a.next();)if(a.isPartiallySelectedSubtree())if(e(o)===
false){j.stop=true;return}else{o=a.getSubtreeIterator();i(o,e,j);o.detach(true);if(j.stop)return}else for(o=g.createIterator(o);E=o.next();)if(e(E)===false){j.stop=true;return}}function n(a){for(var e;a.next();)if(a.isPartiallySelectedSubtree()){e=a.getSubtreeIterator();n(e);e.detach(true)}else a.remove()}function t(a){for(var e,j=H(a.range).createDocumentFragment(),o;e=a.next();){if(a.isPartiallySelectedSubtree()){e=e.cloneNode(false);o=a.getSubtreeIterator();e.appendChild(t(o));o.detach(true)}else a.remove();
if(e.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");j.appendChild(e)}return j}function x(a,e,j){var o=!!(e&&e.length),E,T=!!j;if(o)E=RegExp("^("+e.join("|")+")$");var m=[];i(new q(a,false),function(s){if((!o||E.test(s.nodeType))&&(!T||j(s)))m.push(s)});return m}function A(a){return"["+(typeof a.getName=="undefined"?"Range":a.getName())+"("+g.inspectNode(a.startContainer)+":"+a.startOffset+", "+g.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function q(a,e){this.range=a;this.clonePartiallySelectedTextNodes=
e;if(!a.collapsed){this.sc=a.startContainer;this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var j=a.commonAncestorContainer;if(this.sc===this.ec&&g.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===j&&!g.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:g.getClosestAncestorIn(this.sc,j,true);this._last=this.ec===j&&!g.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:g.getClosestAncestorIn(this.ec,
j,true)}}}function v(a){this.code=this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function c(a,e,j){this.nodes=x(a,e,j);this._next=this.nodes[0];this._position=0}function f(a){return function(e,j){for(var o,E=j?e:e.parentNode;E;){o=E.nodeType;if(g.arrayContains(a,o))return E;E=E.parentNode}return null}}function k(a,e){if(G(a,e))throw new v("INVALID_NODE_TYPE_ERR");}function r(a){if(!a.startContainer)throw new S("INVALID_STATE_ERR");}function L(a,e){if(!g.arrayContains(e,a.nodeType))throw new v("INVALID_NODE_TYPE_ERR");
}function p(a,e){if(e<0||e>(g.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new S("INDEX_SIZE_ERR");}function u(a,e){if(h(a,true)!==h(e,true))throw new S("WRONG_DOCUMENT_ERR");}function w(a){if(D(a,true))throw new S("NO_MODIFICATION_ALLOWED_ERR");}function B(a,e){if(!a)throw new S(e);}function V(a){return!!a.startContainer&&!!a.endContainer&&!(!g.arrayContains(ba,a.startContainer.nodeType)&&!h(a.startContainer,true))&&!(!g.arrayContains(ba,a.endContainer.nodeType)&&!h(a.endContainer,
true))&&a.startOffset<=(g.isCharacterDataNode(a.startContainer)?a.startContainer.length:a.startContainer.childNodes.length)&&a.endOffset<=(g.isCharacterDataNode(a.endContainer)?a.endContainer.length:a.endContainer.childNodes.length)}function J(a){r(a);if(!V(a))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")");}function ca(){}function Y(a){a.START_TO_START=ia;a.START_TO_END=la;a.END_TO_END=ra;a.END_TO_START=ma;a.NODE_BEFORE=na;a.NODE_AFTER=oa;a.NODE_BEFORE_AND_AFTER=
pa;a.NODE_INSIDE=ja}function W(a){Y(a);Y(a.prototype)}function da(a,e){return function(){J(this);var j=this.startContainer,o=this.startOffset,E=this.commonAncestorContainer,T=new q(this,true);if(j!==E){j=g.getClosestAncestorIn(j,E,true);o=C(j);j=o.node;o=o.offset}i(T,w);T.reset();E=a(T);T.detach();e(this,j,o,j,o);return E}}function fa(a,e,j){function o(m,s){return function(y){r(this);L(y,$);L(d(y),ba);y=(m?z:C)(y);(s?E:T)(this,y.node,y.offset)}}function E(m,s,y){var F=m.endContainer,Q=m.endOffset;
if(s!==m.startContainer||y!==m.startOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==1){F=s;Q=y}e(m,s,y,F,Q)}}function T(m,s,y){var F=m.startContainer,Q=m.startOffset;if(s!==m.endContainer||y!==m.endOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==-1){F=s;Q=y}e(m,F,Q,s,y)}}a.prototype=new ca;l.util.extend(a.prototype,{setStart:function(m,s){r(this);k(m,true);p(m,s);E(this,m,s)},setEnd:function(m,s){r(this);k(m,true);p(m,s);T(this,m,s)},setStartBefore:o(true,true),setStartAfter:o(false,true),setEndBefore:o(true,
false),setEndAfter:o(false,false),collapse:function(m){J(this);m?e(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):e(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(m){r(this);k(m,true);e(this,m,0,m,g.getNodeLength(m))},selectNode:function(m){r(this);k(m,false);L(m,$);var s=z(m);m=C(m);e(this,s.node,s.offset,m.node,m.offset)},extractContents:da(t,e),deleteContents:da(n,e),canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var m=new q(this,true),s=m._first&&K(m._first,this)||m._last&&K(m._last,this);m.detach();return!s},detach:function(){j(this)},splitBoundaries:function(){J(this);var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=m===y;g.isCharacterDataNode(y)&&F>0&&F<y.length&&g.splitDataNode(y,F);if(g.isCharacterDataNode(m)&&s>0&&s<m.length){m=g.splitDataNode(m,s);if(Q){F-=s;y=m}else y==m.parentNode&&F>=g.getNodeIndex(m)&&F++;s=0}e(this,m,s,y,F)},normalizeBoundaries:function(){J(this);
var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=function(U){var R=U.nextSibling;if(R&&R.nodeType==U.nodeType){y=U;F=U.length;U.appendData(R.data);R.parentNode.removeChild(R)}},qa=function(U){var R=U.previousSibling;if(R&&R.nodeType==U.nodeType){m=U;var sa=U.length;s=R.length;U.insertData(0,R.data);R.parentNode.removeChild(R);if(m==y){F+=s;y=m}else if(y==U.parentNode){R=g.getNodeIndex(U);if(F==R){y=U;F=sa}else F>R&&F--}}},ga=true;if(g.isCharacterDataNode(y))y.length==
F&&Q(y);else{if(F>0)(ga=y.childNodes[F-1])&&g.isCharacterDataNode(ga)&&Q(ga);ga=!this.collapsed}if(ga)if(g.isCharacterDataNode(m))s==0&&qa(m);else{if(s<m.childNodes.length)(Q=m.childNodes[s])&&g.isCharacterDataNode(Q)&&qa(Q)}else{m=y;s=F}e(this,m,s,y,F)},collapseToPoint:function(m,s){r(this);k(m,true);p(m,s);if(m!==this.startContainer||s!==this.startOffset||m!==this.endContainer||s!==this.endOffset)e(this,m,s,m,s)}});W(a)}function ea(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===
a.endOffset;a.commonAncestorContainer=a.collapsed?a.startContainer:g.getCommonAncestor(a.startContainer,a.endContainer)}function ha(a,e,j,o,E){var T=a.startContainer!==e||a.startOffset!==j,m=a.endContainer!==o||a.endOffset!==E;a.startContainer=e;a.startOffset=j;a.endContainer=o;a.endOffset=E;ea(a);I(a,"boundarychange",{startMoved:T,endMoved:m})}function M(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};ea(this)}l.requireModules(["DomUtil"]);
var g=l.dom,Z=g.DomPosition,S=l.DOMException;q.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;if(a){this._next=a!==this._last?a.nextSibling:null;if(g.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes){if(a===this.ec)(a=a.cloneNode(true)).deleteData(this.eo,a.length-this.eo);if(this._current===this.sc)(a=
a.cloneNode(true)).deleteData(0,this.so)}}return a},remove:function(){var a=this._current,e,j;if(g.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)){e=a===this.sc?this.so:0;j=a===this.ec?this.eo:a.length;e!=j&&a.deleteData(e,j-e)}else a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return K(this._current,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode){a=this.range.cloneRange();a.collapse()}else{a=new M(H(this.range));var e=this._current,
j=e,o=0,E=e,T=g.getNodeLength(e);if(g.isAncestorOf(e,this.sc,true)){j=this.sc;o=this.so}if(g.isAncestorOf(e,this.ec,true)){E=this.ec;T=this.eo}ha(a,j,o,E,T)}return new q(a,this.clonePartiallySelectedTextNodes)},detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};v.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};v.prototype.toString=function(){return this.message};c.prototype={_current:null,hasNext:function(){return!!this._next},
next:function(){this._current=this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var $=[1,3,4,5,7,8,10],ba=[2,9,11],aa=[1,3,4,5,7,8,10,11],b=[1,3,4,5,7,8],d=g.getRootContainer,h=f([9,11]),D=f([5,6,10,12]),G=f([6,10,12]),P=document.createElement("style"),X=false;try{P.innerHTML="<b>x</b>";X=P.firstChild.nodeType==3}catch(ta){}l.features.htmlParsingConforms=X;var ka=["startContainer","startOffset","endContainer","endOffset",
"collapsed","commonAncestorContainer"],ia=0,la=1,ra=2,ma=3,na=0,oa=1,pa=2,ja=3;ca.prototype={attachListener:function(a,e){this._listeners[a].push(e)},compareBoundaryPoints:function(a,e){J(this);u(this.startContainer,e.startContainer);var j=a==ma||a==ia?"start":"end",o=a==la||a==ia?"start":"end";return g.comparePoints(this[j+"Container"],this[j+"Offset"],e[o+"Container"],e[o+"Offset"])},insertNode:function(a){J(this);L(a,aa);w(this.startContainer);if(g.isAncestorOf(a,this.startContainer,true))throw new S("HIERARCHY_REQUEST_ERR");
this.setStartBefore(N(a,this.startContainer,this.startOffset))},cloneContents:function(){J(this);var a,e;if(this.collapsed)return H(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&g.isCharacterDataNode(this.startContainer)){a=this.startContainer.cloneNode(true);a.data=a.data.slice(this.startOffset,this.endOffset);e=H(this).createDocumentFragment();e.appendChild(a);return e}else{e=new q(this,true);a=O(e);e.detach()}return a}},canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var a=new q(this,true),e=a._first&&K(a._first,this)||a._last&&K(a._last,this);a.detach();return!e},surroundContents:function(a){L(a,b);if(!this.canSurroundContents())throw new v("BAD_BOUNDARYPOINTS_ERR");var e=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);N(a,this.startContainer,this.startOffset);a.appendChild(e);this.selectNode(a)},cloneRange:function(){J(this);for(var a=new M(H(this)),e=ka.length,j;e--;){j=ka[e];a[j]=this[j]}return a},
toString:function(){J(this);var a=this.startContainer;if(a===this.endContainer&&g.isCharacterDataNode(a))return a.nodeType==3||a.nodeType==4?a.data.slice(this.startOffset,this.endOffset):"";else{var e=[];a=new q(this,true);i(a,function(j){if(j.nodeType==3||j.nodeType==4)e.push(j.data)});a.detach();return e.join("")}},compareNode:function(a){J(this);var e=a.parentNode,j=g.getNodeIndex(a);if(!e)throw new S("NOT_FOUND_ERR");a=this.comparePoint(e,j);e=this.comparePoint(e,j+1);return a<0?e>0?pa:na:e>0?
oa:ja},comparePoint:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);if(g.comparePoints(a,e,this.startContainer,this.startOffset)<0)return-1;else if(g.comparePoints(a,e,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:X?function(a){var e=this.startContainer,j=g.getDocument(e);if(!e)throw new S("INVALID_STATE_ERR");var o=null;if(e.nodeType==1)o=e;else if(g.isCharacterDataNode(e))o=g.parentElement(e);o=o===null||o.nodeName=="HTML"&&g.isHtmlNamespace(g.getDocument(o).documentElement)&&
g.isHtmlNamespace(o)?j.createElement("body"):o.cloneNode(false);o.innerHTML=a;return g.fragmentFromNodeChildren(o)}:function(a){r(this);var e=H(this).createElement("body");e.innerHTML=a;return g.fragmentFromNodeChildren(e)},toHtml:function(){J(this);var a=H(this).createElement("div");a.appendChild(this.cloneContents());return a.innerHTML},intersectsNode:function(a,e){J(this);B(a,"NOT_FOUND_ERR");if(g.getDocument(a)!==H(this))return false;var j=a.parentNode,o=g.getNodeIndex(a);B(j,"NOT_FOUND_ERR");
var E=g.comparePoints(j,o,this.endContainer,this.endOffset);j=g.comparePoints(j,o+1,this.startContainer,this.startOffset);return e?E<=0&&j>=0:E<0&&j>0},isPointInRange:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);return g.comparePoints(a,e,this.startContainer,this.startOffset)>=0&&g.comparePoints(a,e,this.endContainer,this.endOffset)<=0},intersectsRange:function(a,e){J(this);if(H(a)!=H(this))throw new S("WRONG_DOCUMENT_ERR");var j=g.comparePoints(this.startContainer,
this.startOffset,a.endContainer,a.endOffset),o=g.comparePoints(this.endContainer,this.endOffset,a.startContainer,a.startOffset);return e?j<=0&&o>=0:j<0&&o>0},intersection:function(a){if(this.intersectsRange(a)){var e=g.comparePoints(this.startContainer,this.startOffset,a.startContainer,a.startOffset),j=g.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),o=this.cloneRange();e==-1&&o.setStart(a.startContainer,a.startOffset);j==1&&o.setEnd(a.endContainer,a.endOffset);return o}return null},
union:function(a){if(this.intersectsRange(a,true)){var e=this.cloneRange();g.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)==-1&&e.setStart(a.startContainer,a.startOffset);g.comparePoints(a.endContainer,a.endOffset,this.endContainer,this.endOffset)==1&&e.setEnd(a.endContainer,a.endOffset);return e}else throw new v("Ranges do not intersect");},containsNode:function(a,e){return e?this.intersectsNode(a,false):this.compareNode(a)==ja},containsNodeContents:function(a){return this.comparePoint(a,
0)>=0&&this.comparePoint(a,g.getNodeLength(a))<=0},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var e=this.cloneRange();e.selectNode(a);var j=e.getNodes([3]);if(j.length>0){e.setStart(j[0],0);a=j.pop();e.setEnd(a,a.length);a=this.containsRange(e);e.detach();return a}else return this.containsNodeContents(a)},createNodeIterator:function(a,e){J(this);return new c(this,a,e)},getNodes:function(a,e){J(this);return x(this,a,e)},getDocument:function(){return H(this)},
collapseBefore:function(a){r(this);this.setEndBefore(a);this.collapse(false)},collapseAfter:function(a){r(this);this.setStartAfter(a);this.collapse(true)},getName:function(){return"DomRange"},equals:function(a){return M.rangesEqual(this,a)},isValid:function(){return V(this)},inspect:function(){return A(this)}};fa(M,ha,function(a){r(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;I(a,"detach",null);a._listeners=null});l.rangePrototype=ca.prototype;
M.rangeProperties=ka;M.RangeIterator=q;M.copyComparisonConstants=W;M.createPrototypeRange=fa;M.inspect=A;M.getRangeDocument=H;M.rangesEqual=function(a,e){return a.startContainer===e.startContainer&&a.startOffset===e.startOffset&&a.endContainer===e.endContainer&&a.endOffset===e.endOffset};l.DomRange=M;l.RangeException=v});
rangy.createModule("WrappedRange",function(l){function K(i,n,t,x){var A=i.duplicate();A.collapse(t);var q=A.parentElement();z.isAncestorOf(n,q,true)||(q=n);if(!q.canHaveHTML)return new C(q.parentNode,z.getNodeIndex(q));n=z.getDocument(q).createElement("span");var v,c=t?"StartToStart":"StartToEnd";do{q.insertBefore(n,n.previousSibling);A.moveToElementText(n)}while((v=A.compareEndPoints(c,i))>0&&n.previousSibling);c=n.nextSibling;if(v==-1&&c&&z.isCharacterDataNode(c)){A.setEndPoint(t?"EndToStart":"EndToEnd",
i);if(/[\r\n]/.test(c.data)){q=A.duplicate();t=q.text.replace(/\r\n/g,"\r").length;for(t=q.moveStart("character",t);q.compareEndPoints("StartToEnd",q)==-1;){t++;q.moveStart("character",1)}}else t=A.text.length;q=new C(c,t)}else{c=(x||!t)&&n.previousSibling;q=(t=(x||t)&&n.nextSibling)&&z.isCharacterDataNode(t)?new C(t,0):c&&z.isCharacterDataNode(c)?new C(c,c.length):new C(q,z.getNodeIndex(n))}n.parentNode.removeChild(n);return q}function H(i,n){var t,x,A=i.offset,q=z.getDocument(i.node),v=q.body.createTextRange(),
c=z.isCharacterDataNode(i.node);if(c){t=i.node;x=t.parentNode}else{t=i.node.childNodes;t=A<t.length?t[A]:null;x=i.node}q=q.createElement("span");q.innerHTML="&#feff;";t?x.insertBefore(q,t):x.appendChild(q);v.moveToElementText(q);v.collapse(!n);x.removeChild(q);if(c)v[n?"moveStart":"moveEnd"]("character",A);return v}l.requireModules(["DomUtil","DomRange"]);var I,z=l.dom,C=z.DomPosition,N=l.DomRange;if(l.features.implementsDomRange&&(!l.features.implementsTextRange||!l.config.preferTextRange)){(function(){function i(f){for(var k=
t.length,r;k--;){r=t[k];f[r]=f.nativeRange[r]}}var n,t=N.rangeProperties,x,A;I=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;i(this)};N.createPrototypeRange(I,function(f,k,r,L,p){var u=f.endContainer!==L||f.endOffset!=p;if(f.startContainer!==k||f.startOffset!=r||u){f.setEnd(L,p);f.setStart(k,r)}},function(f){f.nativeRange.detach();f.detached=true;for(var k=t.length,r;k--;){r=t[k];f[r]=null}});n=I.prototype;n.selectNode=function(f){this.nativeRange.selectNode(f);i(this)};
n.deleteContents=function(){this.nativeRange.deleteContents();i(this)};n.extractContents=function(){var f=this.nativeRange.extractContents();i(this);return f};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(f){this.nativeRange.surroundContents(f);i(this)};n.collapse=function(f){this.nativeRange.collapse(f);i(this)};n.cloneRange=function(){return new I(this.nativeRange.cloneRange())};n.refresh=function(){i(this)};n.toString=function(){return this.nativeRange.toString()};
var q=document.createTextNode("test");z.getBody(document).appendChild(q);var v=document.createRange();v.setStart(q,0);v.setEnd(q,0);try{v.setStart(q,1);x=true;n.setStart=function(f,k){this.nativeRange.setStart(f,k);i(this)};n.setEnd=function(f,k){this.nativeRange.setEnd(f,k);i(this)};A=function(f){return function(k){this.nativeRange[f](k);i(this)}}}catch(c){x=false;n.setStart=function(f,k){try{this.nativeRange.setStart(f,k)}catch(r){this.nativeRange.setEnd(f,k);this.nativeRange.setStart(f,k)}i(this)};
n.setEnd=function(f,k){try{this.nativeRange.setEnd(f,k)}catch(r){this.nativeRange.setStart(f,k);this.nativeRange.setEnd(f,k)}i(this)};A=function(f,k){return function(r){try{this.nativeRange[f](r)}catch(L){this.nativeRange[k](r);this.nativeRange[f](r)}i(this)}}}n.setStartBefore=A("setStartBefore","setEndBefore");n.setStartAfter=A("setStartAfter","setEndAfter");n.setEndBefore=A("setEndBefore","setStartBefore");n.setEndAfter=A("setEndAfter","setStartAfter");v.selectNodeContents(q);n.selectNodeContents=
v.startContainer==q&&v.endContainer==q&&v.startOffset==0&&v.endOffset==q.length?function(f){this.nativeRange.selectNodeContents(f);i(this)}:function(f){this.setStart(f,0);this.setEnd(f,N.getEndOffset(f))};v.selectNodeContents(q);v.setEnd(q,3);x=document.createRange();x.selectNodeContents(q);x.setEnd(q,4);x.setStart(q,2);n.compareBoundaryPoints=v.compareBoundaryPoints(v.START_TO_END,x)==-1&v.compareBoundaryPoints(v.END_TO_START,x)==1?function(f,k){k=k.nativeRange||k;if(f==k.START_TO_END)f=k.END_TO_START;
else if(f==k.END_TO_START)f=k.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,k)}:function(f,k){return this.nativeRange.compareBoundaryPoints(f,k.nativeRange||k)};if(l.util.isHostMethod(v,"createContextualFragment"))n.createContextualFragment=function(f){return this.nativeRange.createContextualFragment(f)};z.getBody(document).removeChild(q);v.detach();x.detach()})();l.createNativeRange=function(i){i=i||document;return i.createRange()}}else if(l.features.implementsTextRange){I=function(i){this.textRange=
i;this.refresh()};I.prototype=new N(document);I.prototype.refresh=function(){var i,n,t=this.textRange;i=t.parentElement();var x=t.duplicate();x.collapse(true);n=x.parentElement();x=t.duplicate();x.collapse(false);t=x.parentElement();n=n==t?n:z.getCommonAncestor(n,t);n=n==i?n:z.getCommonAncestor(i,n);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==0)n=i=K(this.textRange,n,true,true);else{i=K(this.textRange,n,true,false);n=K(this.textRange,n,false,false)}this.setStart(i.node,i.offset);
this.setEnd(n.node,n.offset)};N.copyComparisonConstants(I);var O=function(){return this}();if(typeof O.Range=="undefined")O.Range=I;l.createNativeRange=function(i){i=i||document;return i.body.createTextRange()}}if(l.features.implementsTextRange)I.rangeToTextRange=function(i){if(i.collapsed)return H(new C(i.startContainer,i.startOffset),true);else{var n=H(new C(i.startContainer,i.startOffset),true),t=H(new C(i.endContainer,i.endOffset),false);i=z.getDocument(i.startContainer).body.createTextRange();
i.setEndPoint("StartToStart",n);i.setEndPoint("EndToEnd",t);return i}};I.prototype.getName=function(){return"WrappedRange"};l.WrappedRange=I;l.createRange=function(i){i=i||document;return new I(l.createNativeRange(i))};l.createRangyRange=function(i){i=i||document;return new N(i)};l.createIframeRange=function(i){return l.createRange(z.getIframeDocument(i))};l.createIframeRangyRange=function(i){return l.createRangyRange(z.getIframeDocument(i))};l.addCreateMissingNativeApiListener(function(i){i=i.document;
if(typeof i.createRange=="undefined")i.createRange=function(){return l.createRange(this)};i=i=null})});
rangy.createModule("WrappedSelection",function(l,K){function H(b){return(b||window).getSelection()}function I(b){return(b||window).document.selection}function z(b,d,h){var D=h?"end":"start";h=h?"start":"end";b.anchorNode=d[D+"Container"];b.anchorOffset=d[D+"Offset"];b.focusNode=d[h+"Container"];b.focusOffset=d[h+"Offset"]}function C(b){b.anchorNode=b.focusNode=null;b.anchorOffset=b.focusOffset=0;b.rangeCount=0;b.isCollapsed=true;b._ranges.length=0}function N(b){var d;if(b instanceof k){d=b._selectionNativeRange;
if(!d){d=l.createNativeRange(c.getDocument(b.startContainer));d.setEnd(b.endContainer,b.endOffset);d.setStart(b.startContainer,b.startOffset);b._selectionNativeRange=d;b.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(b instanceof r)d=b.nativeRange;else if(l.features.implementsDomRange&&b instanceof c.getWindow(b.startContainer).Range)d=b;return d}function O(b){var d=b.getNodes(),h;a:if(!d.length||d[0].nodeType!=1)h=false;else{h=1;for(var D=d.length;h<D;++h)if(!c.isAncestorOf(d[0],
d[h])){h=false;break a}h=true}if(!h)throw Error("getSingleElementFromRange: range "+b.inspect()+" did not consist of a single element");return d[0]}function i(b,d){var h=new r(d);b._ranges=[h];z(b,h,false);b.rangeCount=1;b.isCollapsed=h.collapsed}function n(b){b._ranges.length=0;if(b.docSelection.type=="None")C(b);else{var d=b.docSelection.createRange();if(d&&typeof d.text!="undefined")i(b,d);else{b.rangeCount=d.length;for(var h,D=c.getDocument(d.item(0)),G=0;G<b.rangeCount;++G){h=l.createRange(D);
h.selectNode(d.item(G));b._ranges.push(h)}b.isCollapsed=b.rangeCount==1&&b._ranges[0].collapsed;z(b,b._ranges[b.rangeCount-1],false)}}}function t(b,d){var h=b.docSelection.createRange(),D=O(d),G=c.getDocument(h.item(0));G=c.getBody(G).createControlRange();for(var P=0,X=h.length;P<X;++P)G.add(h.item(P));try{G.add(D)}catch(ta){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}G.select();n(b)}function x(b,d,h){this.nativeSelection=
b;this.docSelection=d;this._ranges=[];this.win=h;this.refresh()}function A(b,d){var h=c.getDocument(d[0].startContainer);h=c.getBody(h).createControlRange();for(var D=0,G;D<rangeCount;++D){G=O(d[D]);try{h.add(G)}catch(P){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}h.select();n(b)}function q(b,d){if(b.anchorNode&&c.getDocument(b.anchorNode)!==c.getDocument(d))throw new L("WRONG_DOCUMENT_ERR");}function v(b){var d=
[],h=new p(b.anchorNode,b.anchorOffset),D=new p(b.focusNode,b.focusOffset),G=typeof b.getName=="function"?b.getName():"Selection";if(typeof b.rangeCount!="undefined")for(var P=0,X=b.rangeCount;P<X;++P)d[P]=k.inspect(b.getRangeAt(P));return"["+G+"(Ranges: "+d.join(", ")+")(anchor: "+h.inspect()+", focus: "+D.inspect()+"]"}l.requireModules(["DomUtil","DomRange","WrappedRange"]);l.config.checkSelectionRanges=true;var c=l.dom,f=l.util,k=l.DomRange,r=l.WrappedRange,L=l.DOMException,p=c.DomPosition,u,w,
B=l.util.isHostMethod(window,"getSelection"),V=l.util.isHostObject(document,"selection"),J=V&&(!B||l.config.preferTextRange);if(J){u=I;l.isSelectionValid=function(b){b=(b||window).document;var d=b.selection;return d.type!="None"||c.getDocument(d.createRange().parentElement())==b}}else if(B){u=H;l.isSelectionValid=function(){return true}}else K.fail("Neither document.selection or window.getSelection() detected.");l.getNativeSelection=u;B=u();var ca=l.createNativeRange(document),Y=c.getBody(document),
W=f.areHostObjects(B,f.areHostProperties(B,["anchorOffset","focusOffset"]));l.features.selectionHasAnchorAndFocus=W;var da=f.isHostMethod(B,"extend");l.features.selectionHasExtend=da;var fa=typeof B.rangeCount=="number";l.features.selectionHasRangeCount=fa;var ea=false,ha=true;f.areHostMethods(B,["addRange","getRangeAt","removeAllRanges"])&&typeof B.rangeCount=="number"&&l.features.implementsDomRange&&function(){var b=document.createElement("iframe");b.frameBorder=0;b.style.position="absolute";b.style.left=
"-10000px";Y.appendChild(b);var d=c.getIframeDocument(b);d.open();d.write("<html><head></head><body>12</body></html>");d.close();var h=c.getIframeWindow(b).getSelection(),D=d.documentElement.lastChild.firstChild;d=d.createRange();d.setStart(D,1);d.collapse(true);h.addRange(d);ha=h.rangeCount==1;h.removeAllRanges();var G=d.cloneRange();d.setStart(D,0);G.setEnd(D,2);h.addRange(d);h.addRange(G);ea=h.rangeCount==2;d.detach();G.detach();Y.removeChild(b)}();l.features.selectionSupportsMultipleRanges=ea;
l.features.collapsedNonEditableSelectionsSupported=ha;var M=false,g;if(Y&&f.isHostMethod(Y,"createControlRange")){g=Y.createControlRange();if(f.areHostProperties(g,["item","add"]))M=true}l.features.implementsControlRange=M;w=W?function(b){return b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset}:function(b){return b.rangeCount?b.getRangeAt(b.rangeCount-1).collapsed:false};var Z;if(f.isHostMethod(B,"getRangeAt"))Z=function(b,d){try{return b.getRangeAt(d)}catch(h){return null}};else if(W)Z=
function(b){var d=c.getDocument(b.anchorNode);d=l.createRange(d);d.setStart(b.anchorNode,b.anchorOffset);d.setEnd(b.focusNode,b.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(b.focusNode,b.focusOffset);d.setEnd(b.anchorNode,b.anchorOffset)}return d};l.getSelection=function(b){b=b||window;var d=b._rangySelection,h=u(b),D=V?I(b):null;if(d){d.nativeSelection=h;d.docSelection=D;d.refresh(b)}else{d=new x(h,D,b);b._rangySelection=d}return d};l.getIframeSelection=function(b){return l.getSelection(c.getIframeWindow(b))};
g=x.prototype;if(!J&&W&&f.areHostMethods(B,["removeAllRanges","addRange"])){g.removeAllRanges=function(){this.nativeSelection.removeAllRanges();C(this)};var S=function(b,d){var h=k.getRangeDocument(d);h=l.createRange(h);h.collapseToPoint(d.endContainer,d.endOffset);b.nativeSelection.addRange(N(h));b.nativeSelection.extend(d.startContainer,d.startOffset);b.refresh()};g.addRange=fa?function(b,d){if(M&&V&&this.docSelection.type=="Control")t(this,b);else if(d&&da)S(this,b);else{var h;if(ea)h=this.rangeCount;
else{this.removeAllRanges();h=0}this.nativeSelection.addRange(N(b));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==h+1){if(l.config.checkSelectionRanges)if((h=Z(this.nativeSelection,this.rangeCount-1))&&!k.rangesEqual(h,b))b=new r(h);this._ranges[this.rangeCount-1]=b;z(this,b,aa(this.nativeSelection));this.isCollapsed=w(this)}else this.refresh()}}:function(b,d){if(d&&da)S(this,b);else{this.nativeSelection.addRange(N(b));this.refresh()}};g.setRanges=function(b){if(M&&b.length>
1)A(this,b);else{this.removeAllRanges();for(var d=0,h=b.length;d<h;++d)this.addRange(b[d])}}}else if(f.isHostMethod(B,"empty")&&f.isHostMethod(ca,"select")&&M&&J){g.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var b;if(this.anchorNode)b=c.getDocument(this.anchorNode);else if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();if(d.length)b=c.getDocument(d.item(0)).body.createTextRange()}if(b){b.body.createTextRange().select();this.docSelection.empty()}}}catch(h){}C(this)};
g.addRange=function(b){if(this.docSelection.type=="Control")t(this,b);else{r.rangeToTextRange(b).select();this._ranges[0]=b;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;z(this,b,false)}};g.setRanges=function(b){this.removeAllRanges();var d=b.length;if(d>1)A(this,b);else d&&this.addRange(b[0])}}else{K.fail("No means of selecting a Range or TextRange was found");return false}g.getRangeAt=function(b){if(b<0||b>=this.rangeCount)throw new L("INDEX_SIZE_ERR");else return this._ranges[b]};
var $;if(J)$=function(b){var d;if(l.isSelectionValid(b.win))d=b.docSelection.createRange();else{d=c.getBody(b.win.document).createTextRange();d.collapse(true)}if(b.docSelection.type=="Control")n(b);else d&&typeof d.text!="undefined"?i(b,d):C(b)};else if(f.isHostMethod(B,"getRangeAt")&&typeof B.rangeCount=="number")$=function(b){if(M&&V&&b.docSelection.type=="Control")n(b);else{b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount;if(b.rangeCount){for(var d=0,h=b.rangeCount;d<h;++d)b._ranges[d]=
new l.WrappedRange(b.nativeSelection.getRangeAt(d));z(b,b._ranges[b.rangeCount-1],aa(b.nativeSelection));b.isCollapsed=w(b)}else C(b)}};else if(W&&typeof B.isCollapsed=="boolean"&&typeof ca.collapsed=="boolean"&&l.features.implementsDomRange)$=function(b){var d;d=b.nativeSelection;if(d.anchorNode){d=Z(d,0);b._ranges=[d];b.rangeCount=1;d=b.nativeSelection;b.anchorNode=d.anchorNode;b.anchorOffset=d.anchorOffset;b.focusNode=d.focusNode;b.focusOffset=d.focusOffset;b.isCollapsed=w(b)}else C(b)};else{K.fail("No means of obtaining a Range or TextRange from the user's selection was found");
return false}g.refresh=function(b){var d=b?this._ranges.slice(0):null;$(this);if(b){b=d.length;if(b!=this._ranges.length)return false;for(;b--;)if(!k.rangesEqual(d[b],this._ranges[b]))return false;return true}};var ba=function(b,d){var h=b.getAllRanges(),D=false;b.removeAllRanges();for(var G=0,P=h.length;G<P;++G)if(D||d!==h[G])b.addRange(h[G]);else D=true;b.rangeCount||C(b)};g.removeRange=M?function(b){if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();b=O(b);var h=c.getDocument(d.item(0));
h=c.getBody(h).createControlRange();for(var D,G=false,P=0,X=d.length;P<X;++P){D=d.item(P);if(D!==b||G)h.add(d.item(P));else G=true}h.select();n(this)}else ba(this,b)}:function(b){ba(this,b)};var aa;if(!J&&W&&l.features.implementsDomRange){aa=function(b){var d=false;if(b.anchorNode)d=c.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset)==1;return d};g.isBackwards=function(){return aa(this)}}else aa=g.isBackwards=function(){return false};g.toString=function(){for(var b=[],d=0,h=this.rangeCount;d<
h;++d)b[d]=""+this._ranges[d];return b.join("")};g.collapse=function(b,d){q(this,b);var h=l.createRange(c.getDocument(b));h.collapseToPoint(b,d);this.removeAllRanges();this.addRange(h);this.isCollapsed=true};g.collapseToStart=function(){if(this.rangeCount){var b=this._ranges[0];this.collapse(b.startContainer,b.startOffset)}else throw new L("INVALID_STATE_ERR");};g.collapseToEnd=function(){if(this.rangeCount){var b=this._ranges[this.rangeCount-1];this.collapse(b.endContainer,b.endOffset)}else throw new L("INVALID_STATE_ERR");
};g.selectAllChildren=function(b){q(this,b);var d=l.createRange(c.getDocument(b));d.selectNodeContents(b);this.removeAllRanges();this.addRange(d)};g.deleteFromDocument=function(){if(M&&V&&this.docSelection.type=="Control"){for(var b=this.docSelection.createRange(),d;b.length;){d=b.item(0);b.remove(d);d.parentNode.removeChild(d)}this.refresh()}else if(this.rangeCount){b=this.getAllRanges();this.removeAllRanges();d=0;for(var h=b.length;d<h;++d)b[d].deleteContents();this.addRange(b[h-1])}};g.getAllRanges=
function(){return this._ranges.slice(0)};g.setSingleRange=function(b){this.setRanges([b])};g.containsNode=function(b,d){for(var h=0,D=this._ranges.length;h<D;++h)if(this._ranges[h].containsNode(b,d))return true;return false};g.toHtml=function(){var b="";if(this.rangeCount){b=k.getRangeDocument(this._ranges[0]).createElement("div");for(var d=0,h=this._ranges.length;d<h;++d)b.appendChild(this._ranges[d].cloneContents());b=b.innerHTML}return b};g.getName=function(){return"WrappedSelection"};g.inspect=
function(){return v(this)};g.detach=function(){this.win=this.anchorNode=this.focusNode=this.win._rangySelection=null};x.inspect=v;l.Selection=x;l.selectionPrototype=g;l.addCreateMissingNativeApiListener(function(b){if(typeof b.getSelection=="undefined")b.getSelection=function(){return l.getSelection(this)};b=null})});

/////////////////////////// LOAD JAVASCRIPT INSIDE JAVASCRIPT //////////////////////////////

/*
 jQuery Text Highlighter
*/
(function($, window, document, undefined) {
    var nodeTypes = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3
    };

    var plugin = {
        name: 'textHighlighter'
    };

    function TextHighlighter(element, options) {
        this.context = element;
        this.$context = $(element);
        this.options = $.extend({}, $[plugin.name].defaults, options);

        this.init();
    }

    TextHighlighter.prototype = {
        init: function() {
            this.$context.addClass(this.options.contextClass);
            this.bindEvents();
        },

        destroy: function() {
            this.unbindEvents();
            this.$context.removeClass(this.options.contextClass);
            this.$context.removeData(plugin.name);
        },

        bindEvents: function () {
			if (appDevice == "webBrowser")
			{
	            this.$context.bind("mouseup", { self: this }, this.highlightHandler);
				$("#customhighlightv2").bind("touchend", { self: this }, this.highlightHandler)
			}
			else
			{
	            $("#customhighlightv2").bind("mouseup touchend", { self: this }, this.highlightHandler)
			}
        },

        unbindEvents: function() {
            this.$context.unbind('mouseup', this.highlightHandler);
        },

        highlightHandler: function(event) {
            var self = event.data.self;
            self.doHighlight();
        },

        /**
         * Highlights currently selected text.
         */
        doHighlight: function() {
            var range = this.getCurrentRange();
            if (!range || range.collapsed) return;
            var rangeText = range.toString();

            if (this.options.onBeforeHighlight(range) == true) {
                var $wrapper = $.textHighlighter.createWrapper(this.options);

                var createdHighlights = this.highlightRange(range, $wrapper);
                var normalizedHighlights = this.normalizeHighlights(createdHighlights);

                this.options.onAfterHighlight(normalizedHighlights, rangeText);
            }

            this.removeAllRanges();
        },

        /**
         * Returns first range of current selection object.
         */
        getCurrentRange: function() {
            var selection = this.getCurrentSelection();

            var range;
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            }
            return range;
        },

        removeAllRanges: function() {
            var selection = this.getCurrentSelection();
            selection.removeAllRanges();
        },

        /**
         * Returns current selection object.
         */
        getCurrentSelection: function() {
            var currentWindow = this.getCurrentWindow();
            var selection;

            if (currentWindow.getSelection) {
                selection = currentWindow.getSelection();
            } else if ($('iframe').length) {
                $('iframe', top.document).each(function() {
                    if (this.contentWindow === currentWindow) {
                        selection = rangy.getIframeSelection(this);
                        return false;
                    }
                });
            } else {
                selection = rangy.getSelection();
            }

            return selection;
        },

        /**
         * Returns owner window of this.context.
         */
        getCurrentWindow: function() {
            var currentDoc = this.getCurrentDocument();
            if (currentDoc.defaultView) {
                return currentDoc.defaultView; // Non-IE
            } else {
                return currentDoc.parentWindow; // IE
            }
        },

        /**
         * Returns owner document of this.context.
         */
        getCurrentDocument: function() {
            // if ownerDocument is null then context is document
            return this.context.ownerDocument ? this.context.ownerDocument : this.context;
        },

        /**
         * Wraps given range (highlights it) object in the given wrapper.
         */
        highlightRange: function(range, $wrapper) {
            if (range.collapsed) return;

            // Don't highlight content of these tags
            var ignoreTags = ['SCRIPT', 'STYLE', 'SELECT', 'BUTTON', 'OBJECT', 'APPLET', 'FONT'];
            var startContainer = range.startContainer;
            var endContainer = range.endContainer;
            var ancestor = range.commonAncestorContainer;
            var goDeeper = true;

            if (range.endOffset == 0) {
                while (!endContainer.previousSibling && endContainer.parentNode != ancestor) {
                    endContainer = endContainer.parentNode;
                }
                endContainer = endContainer.previousSibling;
            } else if (endContainer.nodeType == nodeTypes.TEXT_NODE) {
                if (range.endOffset < endContainer.nodeValue.length) {
                    endContainer.splitText(range.endOffset);
                }
            } else if (range.endOffset > 0) {
                endContainer = endContainer.childNodes.item(range.endOffset - 1);
            }

            if (startContainer.nodeType == nodeTypes.TEXT_NODE) {
                if (range.startOffset == startContainer.nodeValue.length) {
                    goDeeper = false;
                } else if (range.startOffset > 0) {
                    startContainer = startContainer.splitText(range.startOffset);
                    if (endContainer == startContainer.previousSibling) endContainer = startContainer;
                }
            } else if (range.startOffset < startContainer.childNodes.length) {
                startContainer = startContainer.childNodes.item(range.startOffset);
            } else {
                startContainer = startContainer.nextSibling;
            }

            var done = false;
            var node = startContainer;
            var highlights = [];

            do {
                if (goDeeper && node.nodeType == nodeTypes.TEXT_NODE) {
                    if (/\S/.test(node.nodeValue)) {
                        var wrapper = $wrapper.clone(true).get(0);
                        var nodeParent = node.parentNode;

                        // highlight if node is inside the context
                        if ($.contains(this.context, nodeParent) || nodeParent === this.context) {
                            var highlight = $(node).wrap(wrapper).parent().get(0);
                            highlights.push(highlight);
                        }
                    }

                    goDeeper = false;
                }
                if (node == endContainer && (!endContainer.hasChildNodes() || !goDeeper)) {
                    done = true;
                }

                if ($.inArray(node.tagName, ignoreTags) != -1) {
                	if (node.tagName == "FONT" && typeof $(node).attr("note") != "undefined")
                    	goDeeper = false;
                    else if (node.tagName != "FONT")
                    	goDeeper = false;
                }
                if (goDeeper && node.hasChildNodes()) {
                    node = node.firstChild;
                } else if (node.nextSibling != null) {
                    node = node.nextSibling;
                    goDeeper = true;
                } else {
                    node = node.parentNode;
                    goDeeper = false;
                }
            } while (!done);

            return highlights;
        },

        /**
         * Normalizes highlights - nested highlights are flattened and sibling higlights are merged.
         */
        normalizeHighlights: function(highlights) {
            this.flattenNestedHighlights(highlights);
            this.mergeSiblingHighlights(highlights);

            // omit removed nodes
            var normalizedHighlights = $.map(highlights, function(hl) {
                if (typeof hl.parentElement != 'undefined') { // IE
                    return hl.parentElement != null ? hl : null;
                } else {
                    return hl.parentNode != null ? hl : null;
                }
            });

            return normalizedHighlights;
        },

        flattenNestedHighlights: function(highlights) {
            var self = this;

            $.each(highlights, function(i) {
                var $highlight = $(this);
                var $parent = $highlight.parent();
                var $parentPrev = $parent.prev();
                var $parentNext = $parent.next();

                if (self.isHighlight($parent)) {
                    if ($parent.css('background-color') != $highlight.css('background-color')) {
                        if (self.isHighlight($parentPrev) && !$highlight.get(0).previousSibling
                            && $parentPrev.css('background-color') != $parent.css('background-color')
                            && $parentPrev.css('background-color') == $highlight.css('background-color')) {

                            $highlight.insertAfter($parentPrev);
                        }

                        if (self.isHighlight($parentNext) && !$highlight.get(0).nextSibling
                            && $parentNext.css('background-color') != $parent.css('background-color')
                            && $parentNext.css('background-color') == $highlight.css('background-color')) {

                            $highlight.insertBefore($parentNext);
                        }

                        if ($parent.is(':empty')) {
                            $parent.remove();
                        }
                    } else {
                        var newNode = document.createTextNode($parent.text());

                        $parent.empty();
                        $parent.append(newNode);
                        $(highlights[i]).remove();
                    }
                }
            });
        },

        mergeSiblingHighlights: function(highlights) {
            var self = this;

            function shouldMerge(current, node) {
                return node && node.nodeType == nodeTypes.ELEMENT_NODE
                    && $(current).css('background-color') == $(node).css('background-color')
                    && $(node).hasClass(self.options.highlightedClass)
                    ? true : false;
            }

            $.each(highlights, function() {
                var highlight = this;

                var prev = highlight.previousSibling;
                var next = highlight.nextSibling;
				var mergePrev = true;
				var mergeNext = true;

	            if (shouldMerge(highlight, prev)) {
	                var mergedTxt = $(prev).text() + $(highlight).text();
	                $(highlight).text(mergedTxt);
	                $(prev).remove();
	            }
	            if (shouldMerge(highlight, next)) {
	                var mergedTxt = $(highlight).text() + $(next).text();
	                $(highlight).text(mergedTxt);
	                $(next).remove();
	            }
            });
        },

        /**
         * Sets color of future highlights.
         */
        setColor: function(color) {
            this.options.color = color;
        },

        /**
         * Returns current highlights color.
         */
        getColor: function() {
            return this.options.color;
        },

        /**
         * Removes all highlights in given element or in context if no element given.
         */
        removeHighlights: function(element) {
            var container = (element !== undefined ? element : this.context);

            var unwrapHighlight = function(highlight) {
                return $(highlight).contents().unwrap().get(0);
            };

            var mergeSiblingTextNodes = function(textNode) {
                var prev = textNode.previousSibling;
                var next = textNode.nextSibling;

                if (prev && prev.nodeType == nodeTypes.TEXT_NODE) {
                    textNode.nodeValue = prev.nodeValue + textNode.nodeValue;
                    prev.parentNode.removeChild(prev);
                }
                if (next && next.nodeType == nodeTypes.TEXT_NODE) {
                    textNode.nodeValue = textNode.nodeValue + next.nodeValue;
                    next.parentNode.removeChild(next);
                }
            };

            var self = this;
            var $highlights = this.getAllHighlights(container, true);
            $highlights.each(function() {
                if (self.options.onRemoveHighlight(this) == true) {
                    var textNode = unwrapHighlight(this);
                    mergeSiblingTextNodes(textNode);
                }
            });
        },

        /**
         * Returns all highlights in given container. If container is a highlight itself and
         * andSelf is true, container will be also returned
         */
        getAllHighlights: function(container, andSelf) {
            var classSelectorStr = '.' + this.options.highlightedClass;
            var $highlights = $(container).find(classSelectorStr);
            if (andSelf == true && $(container).hasClass(this.options.highlightedClass)) {
                $highlights = $highlights.add(container);
            }
            return $highlights;
        },

        /**
         * Returns true if element is highlight, ie. has proper class.
         */
        isHighlight: function($el) {
            return $el.hasClass(this.options.highlightedClass);
        },

        /**
         * Serializes all highlights to stringified JSON object.
         */
        serializeHighlights: function() {
            var $highlights = this.getAllHighlights(this.context);
            var refEl = this.context;
            var hlDescriptors = [];
            var self = this;

            var getElementPath = function (el, refElement) {
                var path = [];

                do {
                    var elIndex = $.inArray(el, el.parentNode.childNodes);
                    path.unshift(elIndex);
                    el = el.parentNode;
                } while (el !== refElement);

                return path;
            };

            $highlights.each(function(i, highlight) {
                var offset = 0; // Hl offset from previous sibling within parent node.
                var length = highlight.firstChild.length;
                var hlPath = getElementPath(highlight, refEl);
                var wrapper = $(highlight).clone().empty().get(0).outerHTML;

                if (highlight.previousSibling && highlight.previousSibling.nodeType === nodeTypes.TEXT_NODE) {
                    offset = highlight.previousSibling.length;
                }

                hlDescriptors.push([
                    wrapper,
                    $(highlight).text(),
                    hlPath.join(':'),
                    offset,
                    length
                ]);
            });

            return JSON.stringify(hlDescriptors);
        },

        /**
         * Deserializes highlights from stringified JSON given as parameter.
         */
        deserializeHighlights: function(json) {
            try {
                var hlDescriptors = JSON.parse(json);
            } catch (e) {
                throw "Can't parse serialized highlights: " + e;
            }
            var highlights = [];
            var self = this;

            var deserializationFn = function (hlDescriptor) {
                var wrapper = hlDescriptor[0];
                var hlText = hlDescriptor[1];
                var hlPath = hlDescriptor[2].split(':');
                var elOffset = hlDescriptor[3];
                var hlLength = hlDescriptor[4];
                var elIndex = hlPath.pop();
                var idx = null;
                var node = self.context;

                while ((idx = hlPath.shift()) !== undefined) {
                    node = node.childNodes[idx];
                }

                if (node.childNodes[elIndex-1] && node.childNodes[elIndex-1].nodeType === nodeTypes.TEXT_NODE) {
                    elIndex -= 1;
                }

                var textNode = node.childNodes[elIndex];
                var hlNode = textNode.splitText(elOffset);
                hlNode.splitText(hlLength);

                if (hlNode.nextSibling && hlNode.nextSibling.nodeValue == '') {
                    hlNode.parentNode.removeChild(hlNode.nextSibling);
                }

                if (hlNode.previousSibling && hlNode.previousSibling.nodeValue == '') {
                    hlNode.parentNode.removeChild(hlNode.previousSibling);
                }

                var highlight = $(hlNode).wrap(wrapper).parent().get(0);
				var $highlightObj = $(highlight);
				

				if (typeof $highlightObj.attr("note") != "undefined")
				{
					timestamp = $.trim($highlightObj.attr("class").replace("highlighted","").replace("note",""));
					notePositionObject = $("."+timestamp).position();
					topPosition = notePositionObject.top;
					if (appDevice == 'webBrowser')
					{
						if (theOrientation == "portrait")
							leftPosition = (Math.ceil(notePositionObject.left/BOOK_WIDTH)*BOOK_WIDTH)-45;
						else
							leftPosition = Math.ceil(notePositionObject.left/(BOOK_WIDTH/2))*(BOOK_WIDTH/2)-35;
					}
					else
					{
						leftPosition = Math.ceil(notePositionObject.left/STORY_WIDTH)*STORY_WIDTH-45;
					}

					STORY_CONTENT.append( "<div class=\"icon_tinynote\" id=\""+timestamp+"\" style=\"top:"+topPosition+"px; left:"+leftPosition+"px; display:block;\"></div>" );
				}

				highlights.push(highlight);
            };

            $.each(hlDescriptors, function(i, hlDescriptor) {
                try {
                    deserializationFn(hlDescriptor);
                } catch (e) {
                    console && console.warn
                        && console.warn("Can't deserialize " + i + "-th descriptor. Cause: " + e);
                    return true;
                }
            });

            return highlights;
        }

    };

    /**
     * Returns TextHighlighter instance.
     */
    $.fn.getHighlighter = function() {
        return this.data(plugin.name);
    };

    $.fn[plugin.name] = function(options) {
        return this.each(function() {
            if (!$.data(this, plugin.name)) {
                $.data(this, plugin.name, new TextHighlighter(this, options));
            }
        });
    };

    $.textHighlighter = {
        /**
         * Returns HTML element to wrap selected text in.
         */
        createWrapper: function(options) {
            return $('<font></font>')
                .css('backgroundColor', options.color)
                .addClass(options.highlightedClass);
        },
        defaults: {
            color: '#ffff7b',
            highlightedClass: 'highlighted',
            contextClass: 'highlighter-context',
            onRemoveHighlight: function() { return true; },
            onBeforeHighlight: function() { return true; },
            onAfterHighlight: function() { }
        }
    };

})(jQuery, window, document);

function fnSetViewPort() {

	$('.bookchapterholder').each(function(index, el) {

		$this   = $(this);
		strPageName        = $this.attr('id') + '_page';

		if ($('#' + strPageName).position() != null)
		{
			intCurrentPageLeft = $('#' + strPageName).position().left;
			intLeft = BOOK_WIDTH * currentPage;
			if (intCurrentPageLeft > intLeft && intCurrentPageLeft < intLeft + BOOK_WIDTH) {
				$this.addClass('CurrentPage');
				return false;
			}
		}
	});
}

function fnUpdateViewPort() {
	if ($('.CurrentPage').position() != null) {
		intPageLeft = $('.CurrentPage').position().left;
		if (intPageLeft !== undefined) {
			// Calculate page number
			strPageId = $('.CurrentPage').attr('id');
			$('.bookchapterholder').removeClass('CurrentPage');
			fnGotoPage(strPageId + '_page');
		}
	}
}

(function(e){e.fn.jfontsize=function(t){var n=e(this);var r={btnMinusClasseId:"#jfontsize-minus",btnDefaultClasseId:"#jfontsize-default",btnPlusClasseId:"#jfontsize-plus",btnMinusMaxHits:3,btnPlusMaxHits:7,sizeChange:3};if(t){t=e.extend(r,t)}var i=new Array;var s=new Array;e(this).each(function(e){i[e]=0;s[e]});e(t.btnMinusClasseId+", "+t.btnDefaultClasseId+", "+t.btnPlusClasseId).removeAttr("href");e(t.btnMinusClasseId+", "+t.btnDefaultClasseId+", "+t.btnPlusClasseId).css("cursor","pointer");e(t.btnMinusClasseId).click(function(){ fnSetViewPort(); e(t.btnPlusClasseId).removeClass("jfontsize-disabled");n.each(function(n){if(i[n]>-t.btnMinusMaxHits){s[n]=e(this).css("font-size");s[n]=s[n].replace("px","");fontsize=e(this).css("font-size");fontsize=parseInt(fontsize.replace("px",""));fontsize=fontsize-t.sizeChange;s[n]=s[n]-i[n]*t.sizeChange;i[n]--;e(this).css("font-size",fontsize+"px");if(i[n]==-t.btnMinusMaxHits){e(t.btnMinusClasseId).addClass("jfontsize-disabled")}}});calculateNumberOfPage(currentPage);noteIconReposition(); fnUpdateViewPort();});e(t.btnDefaultClasseId).click(function(){ fnSetViewPort(); e(t.btnMinusClasseId).removeClass("jfontsize-disabled");e(t.btnPlusClasseId).removeClass("jfontsize-disabled");n.each(function(t){i[t]=0;e(this).css("font-size",s[t]+"px");});calculateNumberOfPage(currentPage);noteIconReposition(); fnUpdateViewPort();});e(t.btnPlusClasseId).click(function(){ fnSetViewPort(); e(t.btnMinusClasseId).removeClass("jfontsize-disabled");n.each(function(n){if(i[n]<t.btnPlusMaxHits){s[n]=e(this).css("font-size");s[n]=s[n].replace("px","");fontsize=e(this).css("font-size");fontsize=parseInt(fontsize.replace("px",""));fontsize=fontsize+t.sizeChange;s[n]=s[n]-i[n]*t.sizeChange;i[n]++;e(this).css("font-size",fontsize+"px");if(i[n]==t.btnPlusMaxHits){e(t.btnPlusClasseId).addClass("jfontsize-disabled")}}});calculateNumberOfPage(currentPage);noteIconReposition(); fnUpdateViewPort(); })}})(jQuery);

function highlightText()
{
	$.textHighlighter.createWrapper = function(options) {
		uniq_timstamp = parseInt(Math.round(+new Date()/1000)) + parseInt(Math.random()*100);
		return $('<font></font>').addClass("highlighted "+uniq_timstamp);
	};
	$("#customhighlightv2").trigger( "touchend" );
	setTimeout(function(){submitNoteToServer()},1000);
}

function removeHighlightText()
{
	HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
	uniq_timstamp = 0;
	submitNoteToServer();
}

function highlightNoteText()
{
	$.textHighlighter.createWrapper = function(options) {
		uniq_timstamp = parseInt(Math.round(+new Date()/1000)) + parseInt(Math.random()*100);
		return $('<font></font>').addClass("highlighted note "+uniq_timstamp);
	};
	$("#customhighlightv2").trigger( "touchend" );
}

function addNote(noteText)
{
	$("."+uniq_timstamp).attr('note',noteText);
	insertNotePaperClip(uniq_timstamp);
	uniq_timstamp = 0;
}

function insertNotePaperClip(uniq_timstamp)
{
	notePositionObject = $("."+uniq_timstamp).position();
	topPosition = notePositionObject.top;
	if (appDevice == 'webBrowser')
	{
		if (theOrientation == "portrait")
			leftPosition = (Math.ceil(notePositionObject.left/BOOK_WIDTH)*BOOK_WIDTH)-45;
		else
			leftPosition = Math.ceil(notePositionObject.left/(BOOK_WIDTH/2))*(BOOK_WIDTH/2)-35;
	}
	else
	{
		leftPosition = Math.ceil(notePositionObject.left/STORY_WIDTH)*STORY_WIDTH-45;
	}
	STORY_CONTENT.append( "<div class=\"icon_tinynote\" id=\""+uniq_timstamp+"\" style=\"top:"+topPosition+"px; left:"+leftPosition+"px; display:block;\"></div>" );
	setTimeout(function(){submitNoteToServer()},1000);
}

function editNote(noteText)
{
	$("."+uniq_timstamp).attr('note',noteText);
	uniq_timstamp = 0;
	submitNoteToServer();
}

function removeNote()
{
	HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
	$("#"+uniq_timstamp).remove();
	uniq_timstamp = 0;
	submitNoteToServer();
}

function cancelNote()
{
	HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
	uniq_timstamp = 0;
}

function submitNoteToServer()
{
	if (appDevice == 'webBrowser')
		strWSMETHOD = "book_reading_activity/addnote";
	else
		strWSMETHOD = "addnotes";
	WSMETHODTYPE = "PUT";

	noteData = HIGHLIGHTER.serializeHighlights();

	var jsonData = {
		"userid": intUserId,
		"tokenID": inttokenID,
		"book_unique_id": strBookUID,
		"device_id": strDeviceId,
		"note_data": noteData
	};
	fnSendUserRequest(jsonData);
}

function fnaddnote_action()
{

}

$('.highlighted').live(TWOEVENTEND+" click", function(event) {
	event.stopPropagation();
	var highlightedNode = $(this);
	uniq_timstamp = $.trim(highlightedNode.attr("class").replace("highlighted","").replace("note",""));
	
	if (typeof highlightedNode.attr("note") != "undefined")
	{
		if (appDevice == 'webBrowser')
		{
			openAddNoteBox();
		}
		else if (appDevice == 'iPad')
		{
			$("#jsonText_holder").val( JSON.stringify({"noteText":highlightedNode.attr("note")}) );
			window.location = 'inapp://showeditnote';
		}
	}
	else
	{
		if (appDevice == 'webBrowser')
		{
			if (confirm("Do you want to remove highlight?"))
				HIGHLIGHTER.removeHighlights($("."+uniq_timstamp));
		}
		else if (appDevice == 'iPad')
		{
			window.location = 'inapp://showHighlightAlert';
		}
	}
});

$('#content').on(TWOEVENTEND+" click", '.icon_tinynote', function(event) {
	/*event.stopPropagation();
	uniq_timstamp = $(this).attr("id");
	if (typeof uniq_timstamp != "undefined")
	{
		$("#jsonText_holder").val( JSON.stringify({"noteText":$("."+uniq_timstamp).attr("note")}) );
		window.location = 'inapp://showeditnote';
	}*/
	if (appDevice == 'webBrowser')
	{
		$("."+$(this).attr("id")).trigger( "click" );
	}
	else if (appDevice == 'iPad')
	{
		$("."+$(this).attr("id")).trigger( "touchend" );
	}
});

function fnLoadAssignedLevel()
{
	if (appDevice == 'webBrowser')
    	strWSMETHOD = "user/loadassignedlevel";
	else
		strWSMETHOD = "loadassignedlevel";
	WSMETHODTYPE = "GET";
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "device_id": strDeviceId
    };
    fnSendUserRequest(jsonData);
    return;
}

function fnloadassignedlevel_action()
{
	var objJson  = JSON_OPT;

	if (appDevice == 'webBrowser')
	{
		strUserLevel = objJson.response_data.userlevel;
		//intUserId    = objJson.response_data.userid;
	}
	else if(appDevice == 'iPad')
	{
		strJsonResponse = objJson.response_data.replace('\"', '"');
		objJson         = $.parseJSON(strJsonResponse);
		strUserLevel    = objJson['strUserLevel'];
		intUserId       = objJson.userid;
	}

	saveData("epub_myuserlevel", strUserLevel);

	fnChangeLevelContent();
	set_level_selected();
	calculateNumberOfPage(currentPage);
	fnLoadBookNotesBookmarks();
	if(intClearCookies == 1) {
		intStoryPageNo = Math.round($('#story1_page').position().left / BOOK_WIDTH);
		saveData('Restorepage' + strBookUID + intUserId, theOrientation + "||||" + intStoryPageNo + "||||" + intUserId);
	}
	fnRestorePage();
}

function fnLoadBookNotesBookmarks() {
	if (appDevice == 'webBrowser')
    	strWSMETHOD = "book_reading_activity/getnotebookmarks_all";
	else
		strWSMETHOD = "getnotebookmarks_allnew";
	WSMETHODTYPE = "GET";

    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "userlevel": strUserLevel,
        "orientation": theOrientation,
        "device_id": strDeviceId
    };

    fnSendUserRequest(jsonData);
    return;
}

function fngetnotebookmarks_all_action()
{
	$("#your_level_dd").val(strUserLevel);
	var notesData = JSON_OPT.response_data.note_data;
	if (typeof notesData == "string" && notesData != "" && appDevice == 'webBrowser') {
		HIGHLIGHTER.deserializeHighlights(notesData);
	}
	else if (typeof notesData != "undefined"){
		HIGHLIGHTER.deserializeHighlights(notesData);
	}
}

/****** Custom functions for set, get and remove [COOKIE] values********/

function saveData(fieldName, fieldValue) {
	try {
		localStorage.setItem(fieldName, fieldValue);
	} catch (e) {
		try {
			document.cookie = fieldName + "=" + fieldValue;
		} catch (e) {
			alert("Sorry! your application not support to local storage" + e);
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!');
			}
		}
	}
}

function fncleanArray(actual) {
	var newArray = new Array();
	for (var i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i]);
		}
	}
	return newArray;
}

function getData(fieldName) {
	var fieldValue = "";
	try {
		fieldValue = localStorage.getItem(fieldName);
	} catch (e) {
		try {
			fieldValue = getCookieData(fieldName);
		} catch (e) {
			alert("Sorry! your application not support to local storage" + e);
		}
	}
	return fieldValue;
}

function removeData(fieldName) {
	try {
		var val = localStorage.removeItem(fieldName);
	} catch (e) {
		try {
			deleteCookieData(fieldName);
		} catch (e) {
			alert("Sorry! Remove record error====>" + e);
		}
	}
	return;
}

function getCookieData(fieldName) {
	if (document.cookie.length > 0) {
		var fieldName_start = document.cookie.indexOf(fieldName + "=");
		if (fieldName_start != -1) {
			fieldName_start = fieldName_start + fieldName.length + 1;
			var fieldName_end = document.cookie.indexOf(";", fieldName_start);
			if (fieldName_end == -1) {
				fieldName_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(fieldName_start, fieldName_end));
		}
	}
	return "";
}

function deleteCookieData(fieldName) {
	document.cookie = fieldName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/****** End Custom functions for set, get and remove [COOKIE] values ********/

function choose_level(intLevel_) {
	$('.popup_wrapper').fadeOut("slow");
	strUserLevel = intLevel_;
	$(".level_chooser").removeClass("selected_lvl");
	$("#" + intLevel_).addClass("selected_lvl");
	$(".level_no").html(intLevel_);
	saveData("epub_myuserlevel", intLevel_);

	if( window.APP_MODE == 1) {
		fnUpdateBookReading();
		fnChangeLevelContent();
		set_level_selected();
		calculateNumberOfPage(currentPage);
		fnRestorePage();
		noteIconReposition();
	} else {
		// In offline mode change level html
		intSelectedLevel = parseInt(intLevel_);

		switch(intSelectedLevel) {
			case 1: strLevel = 'One'; break;
			case 2: strLevel = 'Two'; break;
			case 3: strLevel = 'Three'; break;
			default : strLevel = 'Two'; break;
		}

		$('#div_level' + strLevel+ '_' + intDefultBookId + '_1').show().siblings('div').hide();
		$('.inner_level_chooser').show();

		// Update the level selection dropdown
		$('#your_level_dd').val(intLevel_);
		calculateNumberOfPage(currentPage);
	}

	if (appDevice == 'Android') {
		fnLoadAssignedLevel();
	}

}

function fnGotoPage(topage) {
	if (0) { //appDevice == 'iPad'
		window.location = 'inapp://updateurlindex?newindex=' + topage;
	} else if (0) { //appDevice == 'Android'
		JsHandler.refreshWebView(topage);
	} else {
		if ( topage.indexOf('chapter_') > -1 ) {
			// Get selected level
			intSelectedLevel = $.trim( $('.selected_lvl').attr('id') );
			intSelectedLevel = intSelectedLevel ? intSelectedLevel : strUserLevel;
			intSelectedLevel = parseInt( intSelectedLevel );

			switch( intSelectedLevel ) {
				case 1: strLevel = 'One'; break;
				case 2: strLevel = 'Two'; break;
				case 3: strLevel = 'Three'; break;
				case 4: strLevel = 'Four'; break;
				default: strLevel = 'Two'; break;
			}

			// Get current page
			currentPage = parseInt( Math.round($('#div_level' + strLevel + '_' + intDefultBookId + '_1 .' + topage).position().left / BOOK_WIDTH ));
		} else {
			currentPage = parseInt(Math.round($("#" + topage).position().left / BOOK_WIDTH));
		}
		fnUpdateUserCookies();
		turnPage();
	}

	// After turning page reposition paperclip icons
	noteIconReposition();
}

/*********Using Cookies***********/
/*********Using Cookies***********/

function fnLoadLoader() {
	$(strLoaderId).html("<div class='loaderDiv'><img alt='Loading...' id='loaderimage' src='images/ajax-loader.gif?timestamp=" + new Date().getTime() + "' /></div>");
	fnOpenPopUp(strQuePopupId);
	return;
}

function fnLoadLoaderQ() {
	$(strLoaderId + ":visible").html("<div class='loaderDiv'><img alt='Loading...' id='loaderimage' src='images/ajax-loader.gif?timestamp=" + new Date().getTime() + "' /></div>");
	return;
}

function fnOpenPopUp(strPopupId) {
	$(strPopupId).show();
}

function fnClosePopUp(strPopupId) {
	$(strPopupId).hide();
	return;
}

function throw_error(e_msg) {
	console.log(e_msg);
}
/************************* Response Handler START *************************/
/************************* Response Handler START *************************/

function set_level_selected() {
	var epub_return_UL = getData("epub_myuserlevel");
	$("#2").addClass("selected_lvl");
	strUserLevel = getData("epub_" + intDefultBookId + "_intUserLevel");

	if (epub_return_UL != null) {
		$("#your_level_dd").val(epub_return_UL);
		$(".level_chooser").removeClass("selected_lvl");
		$("#" + epub_return_UL).addClass("selected_lvl");
		$(".level_no").html(epub_return_UL);
		strUserLevel = epub_return_UL;
	} else if (strUserLevel != null) {
		$("#your_level_dd").val(strUserLevel);
		$(".level_chooser").removeClass("selected_lvl");
		$("#" + strUserLevel).addClass("selected_lvl");
		$(".level_no").html(strUserLevel);
	}
}

function fngetquestion_action() {
	var objJson         = JSON_OPT;
	var arrResponse     = objJson.response_data;
	var intbookId       = intDefultBookId; //objJson.intBookId;
	var chapterid       = objJson.chapterid;
	var sectionid       = objJson.sectionid;
	var strType         = objJson.strType;
	var strUserAns      = arrResponse.useranswer;
	var questionType    = arrResponse.questiontype;
	var strSubmitButton = "";
	var strCanclButton  = "";

	if (strUserAns != "") {
		strCanclButton = "<span style=\"margin-left:60px\" class=\"BtnObject quiz_btn quiz_cancl_btn close\" onclick='fnBackToQuestionBox()'>Back</span>  ";
	} else {
		strCanclButton = "<span class=\"BtnObject quiz_btn quiz_cancl_btn close\" onclick='fnBackToQuestionBox()'>Back  </span> ";
		strSubmitButton = "<span id=\"log_in\" class=\"BtnObject quiz_btn quiz_submitbtn submit_" + arrResponse.questionid + "\" href=\"javascript:void(0);\" data-questionid='" + arrResponse.questionid + "'  data-questiontype='" + questionType + "' >Submit</span> <input type=\"hidden\" name=\"question_answer_" + arrResponse.questionid + "\" id=\"question_answer_" + arrResponse.questionid + "\" value=\"" + arrResponse.ans + "\" />";
	} //End Submit button

	if (questionType == "open") {
		var strOptions = "<textarea class='input-popup openanswer_'  id='opneans_" + arrResponse.questionid + "'>" + strUserAns + "</textarea>";

		$('#of_' + strUserLevel + '_' + belongto_global).find('.quize_load')
		// $(strLoaderId)
		.html("<div class='quiz_box'><p class='pop_question'>" + arrResponse.question + "</p>" + strOptions + " <div class=\"quiz_buttons_container\">" + strSubmitButton + strCanclButton + "</div></div>").show();
	} else {
		var intOptionLength = arrResponse.arroptions.length;
		var arroptionVal = arrResponse.arroptions;
		var strOptions = "";
		var strOptions_tmp = "";
		if (intOptionLength > 0) {
			strOptions = strOptions + "<table width=\"99%\">";
			$.each(arroptionVal, function(i, optionVal) {
				if (strUserAns == optionVal.optionid) {
					strOptions = strOptions + "<tr><td height=\"31px\" width=\"95%\" class='_theans'><label for='radio_" + optionVal.optionid + "'>" + optionVal.option + "</label></td><td><input type='radio' name='question_" + arrResponse.questionid + "' id='radio_" + optionVal.optionid + "' value='" + optionVal.optionid + "' checked='checked' /></td></tr>";
				} else {
					strOptions = strOptions + "<tr><td height=\"31px\" width=\"95%\" class='_theans'><label for='radio_" + optionVal.optionid + "'>" + optionVal.option + "</label></td><td><input type='radio' name='question_" + arrResponse.questionid + "' id='radio_" + optionVal.optionid + "' value='" + optionVal.optionid + "' /> </td></tr>";
				}
			});
			strOptions = strOptions + "</table>";
		}

		$('#of_' + strUserLevel + '_' + belongto_global).find('.quize_load')
		/*$(strLoaderId + ":visible")*/.html("<div class='quiz_box'><p class='pop_question'>" + arrResponse.question + "</p>" + strOptions + "</div> <div class=\"quiz_buttons_container\">" + strCanclButton + strSubmitButton + "</div>").show();

		if (appDevice == 'Android') {
			/*$(".quizcontainer:visible .quiz").show();
				$(".quizcontainer:visible .al_quiz").hide();	*/
			$("#of_" + strUserLevel + "_" + belongto_global + " .quiz").show();
			$("#of_" + strUserLevel + "_" + belongto_global + " .al_quiz").hide();
		}
		$(".quizcontainer:visible #radio_" + strUserAns).attr('checked', true);
	}
}


function fnsubmitanswer_action() {
	var objJson          = JSON_OPT;
	strpart              = belongto_global;
	var old_strUserLevel = strUserLevel;
	var arrResponse      = objJson.response_data;
	var strResponse      = arrResponse.msg;

	fnOpenPopUp(al_strQuePopupId);
	if (arrResponse.result != "error") {
		var intUserLevel = arrResponse.userLevel;

		if (intUserLevel != "") {
			saveData("epub_" + intDefultBookId + "_intUserLevel", intUserLevel);
			// strUserLevel = intUserLevel;
			saveData("epub_return_UL", strUserLevel);
		}

		$(".submit_" + arrResponse.questionid).hide();
		fnClosePopUp(strQuePopupId);

		if (strResponse == 'Congratulation!')
			fnAppNotify(1, "answer", "Congratulations, your answer is correct!");
		else
			fnAppNotify(0, "answer", strResponse);

		/*		change level content only if flag is set		*/
		var flag_cg = arrResponse.flag_change_grade;

		if (flag_cg == '0') {
			fnOpenPopUp(al_strQuePopupId); // open popup which has all ques
		} else {
			if (strpart == 1 || (strpart == 2 && (strUserLevel < old_strUserLevel))) {
				saveData("epub_myuserlevel", intUserLevel);
				set_level_selected();
				fnChangeLevelContent();

				fnUpdateBookReading(); // change level for reading stats
			}

			if (strUserLevel == 'true') {
				strUserLevel = 1;
			}

			if (strUserLevel < old_strUserLevel) {
				jump2page(strpart);
			}

			if (strUserLevel > old_strUserLevel) {
				if ((old_strUserLevel == 1 || old_strUserLevel == 2) && strpart == 1)
					jump2page(2);
			}
			if (strUserLevel == old_strUserLevel && strUserLevel == 1) {
				jump2page(strpart);
			}
		}
	}

	return false;
}


function fngetuseractivities_action() {
	var objJson = JSON_OPT;
	$("#loginLoader").hide();
	$("#flushData").show();
	$("#userActivity").show();

	var arrResponse = objJson.response_data;
	var strResponse = arrResponse.msg;
	if (arrResponse.return_code == 0) {
		fnAppNotify(0, "userActivity", strResponse);
	} else {
		var strPtag = "";
		try {
			var intLength = arrResponse.activity.length;
			var arrActivity = arrResponse.activity;
			if (intLength > 0) {
				$.each(arrActivity, function(i, optionVal) {
					strPtag = strPtag + "<div class='activitylist'><p>" + optionVal.message + "</p><span class='datesec'>" + optionVal.dateadded + "</span><div class='clr'></div></div>";
				});
			}
		} catch (e) {}
		if (strPtag != "") {
			$(".activitylist_scroll").html(strPtag);
			$("#divUserActivity").show();
		}
	}
	return;
}

/************************* Response Handler ENDS ***************************/


/************************* Build Request JSON START ************************/

function fnSendQuestionRequest(belongto, intQuestionId) {
	belongto_global = belongto;
	strWSMETHOD     = "getquestion";
	$("#of_" + strUserLevel + "_" + belongto_global + " " + al_strQuePopupId).hide();

	$(".quize_load").html("");
	$(".quiz .quiz_header").html(the_book_name + " Quiz");
	$("#of_" + strUserLevel + "_" + belongto_global + " " + strQuePopupId).show();

	var intBookId = intDefultBookId;
	var intChapterId = strChapterId;
	var intQuestionId = intQuestionId;
	current_ques = intQuestionId;

	var jsonData = {
		"userid"         : intUserId,
		"tokenID"        : inttokenID,
		"book_unique_id" : strBookUID,
		"questionid"     : intQuestionId,
		"userlevel"      : strUserLevel,
		"device_id"      : strDeviceId
	};

	var jsonText = JSON.stringify(jsonData);
	if (!jsonText) {
		throw_error("Input can not be empty");
		return;
	}

	try {
		send_request_2_server(jsonText);
	} catch (ex) {
		throw_error("in sendUserRequest catch" + ex);
	}

	return false;
}

function fnBackToQuestionBox() {
	$(".quiz").hide();
	fnOpenPopUp(al_strQuePopupId);
}

function fnSubmitAns(intQId, strQType) {
	strWSMETHOD = "submitanswer";
	var strType = "answer";
	var strUserAns = "";
	var strCorrectAns = $("#question_answer_" + intQId).val();
	var isError = false;
	if (strQType == 'mcq' || strQType == 'bool') {
		if ($('input:radio[name=question_"+intQId+"]').is(':checked')) {
			strUserAns = $("input:radio[name=question_" + intQId + "]:checked").val();
			if (strCorrectAns == strUserAns) {} else {
				intUserWrongCount = intUserWrongCount + 1;
				isError = false;
			}
		} else {
			fnAppNotify(0, "answer_validate", "Please select answer");
			isError = true;
		}
	} else {
		strUserAns = $(".openanswer_:visible").val(); //$("#opneans_39").val();
		if (strUserAns != "") {} else {
			isError = true;
			fnAppNotify(0, "answer_validate", "Please insert answer");
		}
	}

	if (isError == false) {
		var jsonData = {
			"userid": intUserId,
			"tokenID": inttokenID,
			"book_unique_id": strBookUID,
			"questionid": intQId,
			"userlevel": strUserLevel,
			"section": belongto_global,
			"useranswer": strUserAns,
			"questionType": strQType,
			"device_id": strDeviceId
		};
		fnSendUserRequest(jsonData);
	}
	return false;
}


/************************* Build Request JSON ENDS *************************/

function fnChangeLevelContent() {
	var steLevelOne   = $("#div_levelOne_" + intDefultBookId + "_" + strChapterId);
	var steLevelTwo   = $("#div_levelTwo_" + intDefultBookId + "_" + strChapterId);
	var steLevelThree = $("#div_levelThree_" + intDefultBookId + "_" + strChapterId);

	if (strUserLevel == '3') {
		steLevelOne.hide();
		steLevelTwo.hide();
		steLevelThree.show();
		VISIBLE_OBJ = steLevelThree;
	} else if (strUserLevel == '1') {
		steLevelTwo.hide();
		steLevelThree.hide();
		steLevelOne.show();
		VISIBLE_OBJ = steLevelOne;
	} else {
		strUserLevel = '2';
		steLevelOne.hide();
		steLevelThree.hide();
		steLevelTwo.show();
		VISIBLE_OBJ = steLevelTwo;
	}
	return;
}

/************************* FUnction > communicates with mobile APP**********/
/***************************************************************************/

function fnSendUserRequest(jsonData) {

	var jsonText = JSON.stringify(jsonData);

	if (!jsonText) {
		fnAppNotify(0, "json_validate", "Input can not be empty");
		return;
	}
	try {
		send_request_2_server(jsonText);
	} catch (ex) {}
	return false;
}

function send_request_2_server(jsonText) {

	// If offline mode then don't send request
	if (window.APP_MODE == 0)
	{
		return false;
	}

	if (appDevice == 'iPad')
	{
		$("#jsonText_holder").val(jsonText);
		$("#jsonMethod_holder").val(strWSMETHOD);
		window.location = 'inapp://capture?fil=val';
	}
	else if (appDevice == 'Android')
	{
		JsHandler.adaptiveFnCall(jsonText, strWSMETHOD);
	}
	else if (appDevice == 'webBrowser')
	{
		$.ajax({
		  type: WSMETHODTYPE,
		  url: "http://192.168.10.37:3001/1.0/"+strWSMETHOD,
		  timeout: 3000,
		  data: { "p": jsonText }
		}).done(function( msg ) {
			fnGetResponseAction(msg);
		}).fail(function() {
			alert("fail");
			objCallBack = strWSMETHOD.split("/");
			callBack = objCallBack[objCallBack.length - 1];
			if (callBack == "loadassignedlevel")
			{
				alert("Server is busy at the moment, application is not able to fetch or store any data.");
				calculateNumberOfPage();
				choose_level(strUserLevel);
			}
		});

	}
}

/*
 * Trigger Notification within App
 */

function fnAppNotify(flag, method_, msg_) {
	if($.trim(msg_) == '') {
		return false;
	}

	var jsonData = {
		"flag": flag,
		"method_": method_,
		"msg_": msg_
	};
	var jsonText = JSON.stringify(jsonData);

	if (appDevice == 'iPad') {
		window.location = "inapp://onJsNotification?data=" + jsonText;
	} else if (appDevice == 'Android') {
		JsHandler.onJsNotification(jsonText);
	} else {
		alert(msg_);
	}
}

function fnnumRestorePage(pagenum) {
	_restored = 1;
	var t_num = parseInt(pagenum);
	currentPage = (isNaN(t_num)) ? 0 : t_num;
	turnPage();
}

function fnRestorePage() {

    if (_restored == 1)
        return false;

    _restored = 1;
    var _cookie_name = "Restorepage" + strBookUID + intUserId;
	var readingDetails = getData(_cookie_name);

	if (typeof readingDetails != "undefined")
	{
		cookieData = getData(_cookie_name);
		if (cookieData != null)
		{
		    var jsonRestoreReading = getData(_cookie_name).split("||||");
		    if (jsonRestoreReading[2] != intUserId)
		        return false;
		    fnnumRestorePage(jsonRestoreReading[1]);
		}
	}

	// For hiding the cover-flip when redirecting to the last viewed page
	$('body').css('visibility', 'visible');
}

/*******************END FUnction > NOTES ***********************************/
/*
funtion fnUpdateBookReading : update reading percentage to database
*/

function fnUpdateBookReading() {
    if (appDevice == 'webBrowser')
    	strWSMETHOD = "book_reading_activity/updatebookreading";
	else
		strWSMETHOD = "updatebookreading";
	WSMETHODTYPE = "PUT";
    var page_reading = (currentPage == (numberOfPages - 1)) ? (currentPage + 1) : currentPage;
    var boolreading_per = parseInt((page_reading / numberOfPages) * 100);
    var jsonData = {
        "userid": intUserId,
        "tokenID": inttokenID,
        "book_unique_id": strBookUID,
        "orientation": theOrientation,
        "TotalPages": numberOfPages,
        "readingPercent": boolreading_per,
        "currentPage": page_reading,
        "userlevel": strUserLevel,
        "device_id": strDeviceId
    };

	//if (appDevice != 'webBrowser')
    fnSendUserRequest(jsonData);

    fnUpdateLastReadingPosition(); // temporary update while each page turn
}

function fnupdatebookreading_action() {
     //fnLoadAssignedLevel();
}

function fnUpdateLastReadingPosition() {
	fnUpdateUserCookies();
}
/////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	$(".quiz_cancl_btn").live(TWOEVENTSTART, function(e) {
		fnBackToQuestionBox();
	});

	$(".level_chooser").live(TWOEVENTSTART, function(e) {
		var userlevel = $(this).data("level");
		choose_level(userlevel);

	});

	$('.questionRow').die(TWOEVENTEND);
	$(".questionRow").live(TWOEVENTEND, function(event) {
		var intsecnum  = $(this).data("secnum");
		var questionid = $(this).data("questionid");
		fnSendQuestionRequest(intsecnum, questionid);
	});

	$('.quiz_submitbtn').die(TWOEVENTEND);
	$(".quiz_submitbtn").live(TWOEVENTEND, function(event) {
		var questionid   = $(this).data("questionid");
		var questiontype = $(this).data("questiontype");
		fnSubmitAns(questionid, questiontype);
	});
});

function fnGetResponseAction(msg) {

    var objJson = "";
    if (appDevice == 'webBrowser') {
        objJson = msg;
    } else {
        objJson = msg;
    }

    var arrResponse = objJson;

	objCallBack = strWSMETHOD.split("/");
	callBack = objCallBack[objCallBack.length - 1];

    if (arrResponse.return_code == 0) {
        console.log("Something wrong in request. Please try later.");
		if (callBack == "loadassignedlevel")
		{
			calculateNumberOfPage();
			choose_level(strUserLevel);
		}
    } else {
        var strResponseAction = "fn" + callBack + "_action()";
        JSON_OPT = objJson;
        eval(strResponseAction);
    }
    return;
}

function noteIconReposition() {
	// Get the line height
	var intLineHeight = parseInt($('#story_content p').css('line-height'), 10);

	$('.icon_tinynote').each(function(index, el) {
		// Get current note id
		$this = $(this);
		var intNoteId = $.trim($this.attr('id'));
		intNoteTextHeight = $.trim($('font.' + intNoteId).height());

		if(intNoteTextHeight > intLineHeight)
		{
			// If more than 1 line is selected
			$('.' + intNoteId + ':first').prepend('<span id="marker" class="marker" sty le="display: inline-block; position: relative; left: inherit; top: inherit;">T</span>');
			objMarker = $('#marker');

			intTopPosition  = objMarker.offset().top;
			intPageNumber   = Math.ceil(objMarker.offset().left/BOOK_WIDTH);
			if (appDevice == 'webBrowser')
				intLeftPosition = Math.ceil(notePositionObject.left/(BOOK_WIDTH/2))*(BOOK_WIDTH/2)-35;
			else
				intLeftPosition = (currentPage + intPageNumber) * BOOK_WIDTH - 45;
			objMarker.remove();
		}
		else
		{
			intTopPosition  = $('.' + intNoteId).position().top;
			intLeftPosition = Math.ceil($('.' + intNoteId).position().left/BOOK_WIDTH)*BOOK_WIDTH-45;
		}
		// Adjusting paperclip icon
		$this.css({'top': intTopPosition + 'px', 'left': intLeftPosition + 'px'});
	});
}

/**
 * Called from app
 * @param json object of Mode - online/offline, delete book cookies
 */
function fnSetValuesFromApp(jsonOptions) {
	APP_MODE        = parseInt(jsonOptions.appmode);
	intClearCookies = parseInt(jsonOptions.clearbookcookies);
	initView();

	// If offline mode then select default level
	if( APP_MODE == 0 ) {
		choose_level(strUserLevel);
		// For hiding the cover-flip when redirecting to the last viewed page
		$('body').css('visibility', 'visible');
	}
}
