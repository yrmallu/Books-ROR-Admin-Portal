$.rails.allowAction = function(element) {
  var $link, $modal_html, message, modal_html;
  message = element.data('confirm');
  if (!message) {
    return true;
  }
  $link = element.clone().removeAttr('class').removeAttr('data-confirm').addClass('btn').addClass('btn-primary btn-xs').html("Yes");
  modal_html = "  <div id=\"myModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n   <div class=\"modal-dialog modal-dialog-width\">\n     <div class=\"modal-content\">                \n       <div class=\"modal-header\">\n      <a class=\"close\" data-dismiss=\"modal\">×</a>\n      <h4>" + message + "</h4>\n    </div>\n    <div class=\"modal-footer modal-footer-top\">\n      <button class=\"btn btn-default btn-xs\" data-dismiss=\"modal\" aria-hidden=\"true\">Cancel</button>\n    </div>\n  </div>\n </div>\n</div>  ";
  $modal_html = $(modal_html);
  $modal_html.find('.modal-footer').append($link);
  $modal_html.modal();
  return false;
};