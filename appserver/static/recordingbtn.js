require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {

    var submittedTokens = mvc.Components.getInstance('submitted');

    function callIdDrilldown(callId){
        let earliestTime = submittedTokens.get('timeRange.earliest');
        let latestTime = submittedTokens.get('timeRange.latest');
        let link = `search?q=%60default_index%60%20sourcetype%3D%223cx%3Acalls%22%20call_id%3D${callId}&earliest=${earliestTime}&latest=${latestTime}`;
        window.open(link, '_blank');
    }
    window.callIdDrilldown = callIdDrilldown;
    function recordingButtonClick(link){
        window.open(link, '_blank');
    }
    window.recordingButtonClick = recordingButtonClick;

    var TBRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the range field
            return cell.field === 'call_id' || cell.field === 'Recording';
        },
        render: function($td, cell) {
            // Create the button with the URL to put in the cell
            if(cell.field === 'call_id'){
                $td.html('<a target="_blank" target="_blank" onClick="window.callIdDrilldown(\''+cell.value+'\')">'+cell.value+'</a>');
            }
            else if(cell.field === 'Recording'){
                if(cell.value === null) {
                    $td.html('');
                } else {
                    if(cell.value instanceof Array){
                        let inner_html = '';
                        for(let i=0; i<cell.value.length; i++){
                            inner_html += '<a target="_blank" class="btn btn-primary" onClick="window.recordingButtonClick(\''+cell.value[i]+'\')">Play Recording ' + (i+1) + '</a><br/>';
                        }
                        $td.html(inner_html);
                    }
                    else{
                        $td.html('<a target="_blank" class="btn btn-primary" onClick="window.recordingButtonClick(\''+cell.value+'\')">Play Recording</a>');
                    }
                }
            }
        }
    });

    let table = mvc.Components.get('callrep');
    table.getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new TBRenderer());
    });
});