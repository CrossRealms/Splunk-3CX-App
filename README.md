# Splunk App for 3CX Phone System

### Download from Splunkbase
https://splunkbase.splunk.com/app/5155/


OVERVIEW
--------
The Splunk app for 3CX Phone Systems is used to present the 3CX Phone Systems information into Splunk. There are 5 dashboards named Overview and Queue Summary, Agent Logins, Queue Extensions and Call Logs. There are tabs for Reports and Alerts. User can schedule pre-defined report creation and can get it over email. Alerts are generated when there is no data ingested for particular sourcetype.


* Author - CrossRealms International Inc.
* Version - 1.0.0
* Build - 1
* Creates Index - False
* Compatible with:
   * Splunk Enterprise version: 8.0, 7.3, 7.2 and 7.1
   * OS: Platform independent
   * Browser: Google Chrome, Mozilla Firefox, Safari



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
  * username: phonesystem
  * Password needs to be fetched from the 3CX ini file.</br>
  Location of the file in various platform is as below.</br></br>
  For Windows : C:\Program Files\3CX Phone System\Bin\3CXPhoneSystem.ini</br>
  For Linux: /var/lib/3cxpbx/Bin/3CXPhoneSystem.ini
  * From this file look for the stanza name `DbAdminREADONLY`. Fetch the password from the stanza and fill it in the password field of Identity Wizard.
* After Creating Identity Create DB Connections with 3CX PostgresQL.
* In Splunk DB Connect, click the Configuration > Databases > Connections tab.
* Click New Connection.
* On the New Connection page, complete the following fields:
  * Connection Name: 3CX
  * Identity: Choose the identity 3CX Created in first step.
  * Connection Type: Postgress
  * Timezone: Select Timezone if required.
  * Host: Host of 3CX
  * Port: Port of postgress database from 3CX system. (Defaults to 5480)
  * Default Database: database_single (Default database for 3CX system)
  * Click on Save.

* Download the Splunk App For 3CX and extract the archive. 
* From `default` directory of this App, copy the `db_inputs.conf.template` file to $SPLUNK_HOME/etc/apps/splunk_app_db_connect/local/db_inputs.conf
* Open the file in editor, in the `default` stanza replace the host value with the hostname you want to add for your forwarder.
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


SUPPORT
-------
* Contact - CrossRealms International Inc.
  * US: +1-312-2784445
* License Agreement - https://d38o4gzaohghws.cloudfront.net/static/misc/eula.html
* Copyright - Copyright Crossrealms Internationals, 2020
