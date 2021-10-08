require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    // Translations from rangemap results to CSS class
    var TBRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the range field
            return cell.field === 'Recording';
        },
        render: function($td, cell) {
            // Create the button with the URL to put in the cell
            if(cell.value === null) {
                $td.html('');
            } else {
                if(cell.value instanceof Array){
                    let inner_html = '<a target="_blank" class="btn btn-primary" href='+cell.value[0]+'>Play Recording 1</a><br/>';
                    for(let i=1; i<cell.value.length; i++){
                        inner_html += cell.value[i]+'<br/>';
                    }
                    $td.html(inner_html);
                }
                else{
                    $td.html('<a target="_blank" class="btn btn-primary" href='+cell.value+'>Play Recording</a>');
                }
            }
        }
    });
    mvc.Components.get('callrep').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new TBRenderer());
    });
});