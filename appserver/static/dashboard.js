require([
    '../app/splunk_app_3cx/splunk_common_js_v_utilities',
    'splunkjs/mvc/simplexml/ready!'
], function (SplunkCommonUtilities) {

    // Handles the multi-select option properly
    SplunkCommonUtilities.vSetupMultiSelectHandlerOnAll();
    // When user selects any item, it will automatically unselect "All" option. And when user selects "All" option then it will automatically unselect all other.
});
