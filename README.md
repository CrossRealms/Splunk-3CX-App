# Splunk App for 3CX Phone System

### Download from Splunkbase
https://splunkbase.splunk.com/app/5155/


OVERVIEW
--------
The Splunk app for 3CX Phone Systems is the reporting App for 3CX calls, queues, agent logins, etc.
The reporting on 3CX is not really good so managers and directors need a better reporting tool for 3CX. This Splunk App provides exactly that. The App contains information around call details, queue summary, agent logins, queue extension details, etc.
Some example reports are:
* All calls details (Call logs)
* No. of answered calls vs unanswered calls
* No. of answered calls vs unanswered on calls on selected queue
* Hourly heat map of calls to identify which time of a day requires more attention
* Call distribution for each queue
* SLA breach on queues
* Daily Call Expectancy vs Agent Logins
* Agent average time spent logged in per Queue
* Agent Login Summary
* Timeline of Agent logins
* Full details on Queue Extension activities


## App Info
* Author - CrossRealms International Inc.
* Version - 2.0.1
* Build - 1
* Creates Index - False
* Compatible with:
   * Splunk Enterprise version: 8.0, 7.3, 7.2 and 7.1
   * OS: Platform independent
   * Browser: Google Chrome, Mozilla Firefox, Safari


## What's inside the App

* No of XML Dashboards: **5**
* Approx Total Viz(Charts/Tables/Map) in XML dashboards: **45**
* No of Static CSV Lookup Files: **1**



TOPOLOGY AND SETTING UP SPLUNK ENVIRONMENT
------------------------------------------
This app can be set up in two ways: 
  1. Standalone Mode: 
     * Install the `Splunk App for 3CX`.
  2. Distributed Mode: 
     * Install the `Splunk App for 3CX` on the search head. (Required for dashboards.)
     * App setup is not required on the forwarder.
     * Note: Universal forwarder is not supported.
  Create Index named 3cx to store and search the data collected by forwarder.



INSTALLATION
------------
Follow the below-listed steps to install an App from the bundle:

* Download the App package.
* From the UI navigate to `Apps > Manage Apps`.
* In the top right corner select `Install app from file`.
* Select `Choose File` and select the App package.
* Select `Upload` and follow the prompts.



CONFIGURATION
-------------

### Data Collection ###
For data collection we need to setup Splunk DB Connect on Heavy Forwarder. 
* Deploy Heavy Forwarder by following instructions https://docs.splunk.com/Documentation/Splunk/8.0.5/Forwarding/Deployaheavyforwarder
* Install Splunk DB Connect app on forwarder.
* In Splunk DB Connect, access the Configuration > Databases > Identities tab and click New Identity.
* Complete the fields as mentioned below.
  * Identity Name : 3CX
  * username: `phonesystem`
  * Password needs to be fetched from the 3CX ini file.</br>
  Location of the file in various platform is as below.</br></br>
  For Windows : `C:\Program Files\3CX Phone System\Bin\3CXPhoneSystem.ini`</br>
  For Linux: `/var/lib/3cxpbx/Bin/3CXPhoneSystem.ini`
  * From this file look for the stanza name `DbAdminREADONLY`. Fetch the password from the stanza and fill it in the password field of Identity Wizard.
* After Creating Identity Create DB Connections with 3CX PostgresQL.
* In Splunk DB Connect, click the Configuration > Databases > Connections tab.
* Click New Connection.
* On the New Connection page, complete the following fields:
  * Connection Name: 3CX
  * Identity: Choose the identity 3CX Created in first step.
  * Connection Type: Postgres
  * Timezone: Select Timezone if required.
  * Host: Host of 3CX
  * Port: Port of postgres database from 3CX system. (Defaults to `5432` or try 5480)
  * Default Database: database_single (Default database for 3CX system)
  * Click on Save.

* Download the Splunk App For 3CX and extract the archive. 
* From `default` directory of this App (splunk_app_3cx), copy the `db_inputs.conf.template` file to $SPLUNK_HOME/etc/apps/splunk_app_db_connect/local/db_inputs.conf
* Open the file in editor, in the `[default]` stanza replace the host value with the hostname you want to add for your forwarder.
* Also, update the date and time for tail_rising_column_init_ckpt_value parameter in all the input stanzas based on how long in the past you want to backfill the data.
  * Please use `YYYY-mm-dd HH:MM:SS.000` date-time format.
  * Example: `tail_rising_column_init_ckpt_value = {"value":"2021-09-21 00:00:00.000","columnType":93}`
  * Please do not go long in the past as all queries will timed-out and you will never be able to collect the data.
* Restart the Splunk.




### Macro Definition Change ###
Macro definition change is required to improve the dashboard performance. Follow below steps to change the macro definition.
* Go to `Settings > Advanced search > Search macros`.
* Change `App` to `Splunk App for 3CX`.
* Search for `default_index` and click on it.
* Change value in the definition section from `index=*` to `index=<custom-index>`. The `custom-index` is the index which you have selected in `Data Collection` section while creating DB Connect inputs.
* Final value should look something like: `index=main`.


UNINSTALL APP
-------------
To uninstall app, user can follow below steps:
* SSH to the Splunk instance
* Go to folder apps($SPLUNK_HOME/etc/apps)
* Remove the `splunk_app_3cx` folder from apps directory
* Restart Splunk

KNOWN LIMITATION
----------------
* NA

RELEASE NOTES
-------------
Version 2.0.1
* Fixed the filter of SLA on the Overview dashboard.
* Fixed the filter of "Average Durations" on the Queue Summary dashboard.


Version 2.0.0
* Removed following inputs from the db_inputs.conf.template file.
  * calls_view, call_report, cl_party_info, queuecalls_view, agent_login_export
* Added below new inputs in the db_inputs.conf.template file.
  * 3cx_calls, 3cx_agent_login, 3cx_queuecalls
* Database SQL queries updated with the new inputs.
  * Issue resolved: Updated SQL queries to resolve calls missing issue and agents login missing issue.
  * Updated queries for data collection to enhanced for queries performance.

* Added proper field extraction in props.conf for search queries simplification.

* All Dashboards:
  * Issues Fixed: Calls count mismatch issue. Missing agent login data issue.
  * Through-out the app dedup with host along-side the call_id, so now that will not strip calls having same call_id from 2 different 3cx systems (to show accurate data).
  * All dashboard now uses the new data sourcetypes collected with the new DB Connect inputs added.
  * Filters re-ordered properly.
  * Used time-range picker to populate all input dropdown results. Improves performance and shows more accurate data.
  * Added base-search queries to load dashboard faster and to significantly reduce load-time when changing input filter in the dashboards.
  * Improved search queries performance.

* Agent Logins
  * Removed unused dashboard: "Agent Queue Logins" (3cx_queue_logins.xml). Please use "Agent Logins" dashboard instead.
  * Added appropriated filters on the dashboard.
  * Removed reports with incorrect information.
  * Added new reports.

* Call Logs Dashboard:
  * Added filter for answered call vs unanswered call.
  * Added a lot more important fields to look at for more insights.
  * Improved drilldown search on the table.

* Removed all reports. Use dashboards instead.
  * Log for all Calls, Agent Login Timeline, Data Not Being Received: Call Report, Data Not Being Received: Agent Logins, Data Not Being Received: Calls View, Data Not Being Received: Queue Calls View, Data Not Being Received: Cl Party Info, Top 10 Agents with Most Time Logged In, Calls Volume per Queue, Calls Summary for each Agent, Agent Logins Summary, Calls Summary for each Queue, Agent Logins Call Summary

* Removed unused lookups: nodata_agentlogins.csv, nodata_callreport.csv, nodata_callview.csv, no_data_clpartyinfo.csv, nodata_queuecallsview.csv


Upgrade guide from 1.2.x to 2.0.0
* Remove existing 3CX related data inputs on the DB connect.
  * calls_view, call_report, cl_party_info, queuecalls_view, agent_login_export
* Create following new inputs directly from db_inputs.conf file.
  * 3cx_calls, 3cx_agent_login, 3cx_queuecalls
  * Take reference from db_inputs.conf.template file. Follow the `CONFIGURATION` > `Data Collection` guide.
  * Please make sure to update the host name value and checkpoint values for all the data inputs as per the guidance in db_inputs.conf.template file.
* All dashboard has been updated, so if you have your own updated version of dashboard in local directory you would not see the new dashboard. Remove the local version to see the updated dashboards.
* FYI, Reports and Alerts have been removed, use dashboard instead.



Version 1.2.1
* Minor Changes
  * Changes to make compatible with Splunk AppInspect

Version 1.2.0
* Overview Dashboard:
  * Fixed a visualization issue with the Daily Call Expectancy vs Agent Logins dashboard panel.
* Queue Summary Dashboard:
  * Added breakdown for Inbound, Outbound and Internal calls for the Daily Call Expectancy vs Agent Logins chart.
  * Added a bar chart to the Queue Calls Distribution for Queue Agents and All Calls Distribution for Queue Agents dashboard panels.
  * Added a bar chart to the Call Sequences on the Queue Calls dashboard panel.
* Call Logs Dashboard:
  * Fixed the call direction logic for call_reports logs.
  * Fixed an issue with missing call sequences and calls.


Version 1.1.0
* Added Daily Call Expectancy vs Agents Login chart on Overview and Queue Summary dashboard.
* Fixed incorrect duration field on the Overview dashboard.
* Fixed the issue with Call Logs dashboard missing some calls and other minor issues with the dashboards.


Version 1.0.0
* Created App with two dashboards, Insights and Alerts.


OPEN SOURCE COMPONENTS AND LICENSES
------------------------------
* NA


TROUBLESHOOTING
---------------
* Data collection issue
  * Check `Data Collection` guide from `CONFIGURATION` section to make sure Database collection is all good.
  * Verify the data via searching the data with `index=<your-selected-index-during-configuration>`.

* Dashboards are not populating
  1. Look for the index in which we are indexing the data. If the data is not there in the index then check `Data collection issue` or else go through second point.
  2. Make sure the index is specified in the `default_index` macro. Check `Macro Definition Change` guide from `CONFIGURATION` section for more details.

* Dashboards are not working as expected.
  * Make sure Javascript is enabled in the browser. Otherwise the Dashboard will not work as expected.


CONTRIBUTORS
------------
* Usama Houlila
* Preston Carter
* Ahad Ghani
* Vatsal Jagani
* Mahir Chavda


SUPPORT
-------
* Contact - CrossRealms International Inc.
  * US: +1-312-2784445
* License Agreement - https://d38o4gzaohghws.cloudfront.net/static/misc/eula.html
* Copyright - Copyright CrossRealms Internationals, 2022
