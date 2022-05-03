MENU:
The menu inside #shrop-menu will only appear in a real web environment whose domain has been added to shropshire.gov.uk's Cross-Origin Resource Sharing(CORS) config. 
There's the hardcoded menu in the template div#navbar-wrapper above the #shrop-menu. You may use that as your menu template if the Shropshire Council menu items are not needed to be injected.
You can only use 1 or the other.

The menu.min.js reference injects the menu and subscribe button into where <div id="shrop-menu"></div> is placed. This js is dependant on jquery to run, which needs to be referenced before the menu js as seen in the template.html file.

Comments are reiterated in the HTML template.

VARIABLE REPLACEMENTS:
In the template such as the Contact div and the "Leave feedback" link in the footer have {{ }} in the html indicating where you'll need to input data such as current URL or the contact email/number of the service area you're working with