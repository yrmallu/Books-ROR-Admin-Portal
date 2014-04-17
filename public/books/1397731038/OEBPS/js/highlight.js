/*
highlight v3  !! Modified by Jon Raasch (http://jonraasch.com) to fix IE6 bug !!
Highlights arbitrary terms.
<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
*/
var intPosCnt = 0; var objTempClass = ""; 
jQuery.fn.highlight = function(pat,toIndex,notetext_all) {
 function innerHighlight(node, pat,index) {
   
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0 && _stopfurther == 0) {
	   intPosCnt++;
	
    var spannode = document.createElement('font');
	objTempClass = (typeof GLOB_HIGHLITE_CLAS == 'undefined' || GLOB_HIGHLITE_CLAS == '') ? 'highlight' : GLOB_HIGHLITE_CLAS;
	if(intPosCnt == toIndex) {objTempClass = "ithas_note";
		//alert(intPosCnt+"|"+toIndex+"|"+pat)  ;
		_stopfurther = 1;
	}
	spannode.className = objTempClass;
	
	if(objTempClass == "ithas_note") {
		uniq_timstamp	= parseInt(Math.round(+new Date()/1000)) + parseInt(Math.random()*100);
		spannode.setAttribute("id", uniq_timstamp);
		spannode.setAttribute("class", "ithas_note");
		spannode.setAttribute("myIndex", toIndex);
        spannode.setAttribute("dyn_title", notetext_all['noteTXT']);
		spannode.setAttribute("note_dbid", notetext_all['noteID']);	
		intPosCnt = 0;
		//_appendnote_icon(notetext_all['noteTXT'],uniq_timstamp,0); 
	}
	
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
	
	if(objTempClass == "ithas_note") {
	_appendnote_icon(notetext_all['noteTXT'],uniq_timstamp,0); 
	}
	objTempClass = '';
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat,i);
   }
  }
  return skip;
 }
 return this.each(function(index, element) {
  innerHighlight(this, pat.toUpperCase(),index);
 });
};

jQuery.fn.removeHighlight = function() {
 function newNormalize(node) {
    for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
        var child = children[i];
        if (child.nodeType == 1) {
            newNormalize(child);
            continue;
        }
        if (child.nodeType != 3) { continue; }
        var next = child.nextSibling;
        if (next == null || next.nodeType != 3) { continue; }
        var combined_text = child.nodeValue + next.nodeValue;
        new_node = node.ownerDocument.createTextNode(combined_text);
        node.insertBefore(new_node, child);
        node.removeChild(child);
        node.removeChild(next);
        i--;
        nodeCount--;
    }
 }

 return this.find("span.highlight").each(function() {
    var thisParent = this.parentNode;
    thisParent.replaceChild(this.firstChild, this);
    newNormalize(thisParent);
 }).end();
};