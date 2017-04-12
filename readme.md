# Brief description
This is a date agnostic update to an existing Bootstrap project hoping that not too much has changed since 2014.


## Please visit
You can see [the project](https://donLucho.github.io/jumbotron_exercise_1 "the project at github") for yourself and decide whether it is really for you or not. 


## Returning to a previous experiment conducted in 2014
When I upgraded Bootstrap from version 3.2.x to version 3.7.7, and version 4&#45;alpha especially, the process was similar to trial and error. There were as a sign of slight off&#45;centered wonkiness involved in this document when handling TWBS version 4&#45;alpha. The basic template had changed only so slightly but enough to convince me to use the new shiny version of Twitter Bootstrap for rapid&#45;prototyping&hellip; 


## Bootstrap in a new Workflow
Apparently, the simple Bootstrap __*dst*__ package __does not__ include the css for the __template example__. Thus, in order to obtain the example css files such as the case with narrow jumbotron, I need to copy from the source repository. Once this adjustment is made, the rest falls into place. I have included a directive that will permit you to bring in the assets, too, without fuss. 


## Caveat about fetching version 3.7
I probably would&rsquo;ve preferred to be lazy about the whole thing and use version 3 to this day. But in the end, I opted to take for the path of least resistance. If you absolutely must use version 3, here are some pain points. First, given that you have __Bower__ installed at all, by simply running __*bower install bootstrap &#45;&#45;save&#45;dev*__ for the reasons mentioned earlier will not supply you with the __necessary template__ in order to have closure. You can visit the official Twitter Bootstrap [website](https://github.com/twbs/bootstrap/releases "TWBS on GitHub") and get version 3.7 in each the __*.zip*__ [format](https://github.com/twbs/bootstrap/archive/v3.3.7.zip "Version 3.7 in .zip format") or in the __*.tar.gz*__ [format](https://github.com/twbs/bootstrap/archive/v3.3.7.tar.gz "Version 3.7 in .tar format").


## Methodology
Here are some suggestions on how to create a local instance presuming that you have each __Node &amp; NPM__, __Git__ &amp; __Bower__ already installed. You will download my project, then, get familiarized with &laquo;npm run [custom_name]&raquo;, witness how TWBS v 3.7 __*dst*__ leaves a lot to be desired, before finally taking off for flight! 

Let&rsquo;s get started:
- Download the contents &amp; place them in your present working directory (or __*pwd*__ for short);
- There are four custom directives in the __*package.json*__ file under the __*scripts*__ subsection. In no particular order, you can fire off each command to produce a different result in each case:
	- &laquo; npm run test &raquo; This statement is a result of running __*npm init*__, then, answering the questionnaire that follows.
	- &laquo; npm run berzerker &raquo; A generic console statement to get pumped up!
	- &laquo; npm run bower_init &raquo; For any remaining &quot;doubting Toms&quot; out there &hellip;
	- &laquo; npm run twbs4 &raquo; This brings in the necessary Bootstrap assets, creates a *bower_components* directory if one does not exist, then, unload the assets required by __gulpfile.js__.
- If you wasted no time in utilizing &laquo; npm run twbs4 &raquo;, then, from your __*pwd*__ type __*npm install*__ and your dev files will be pulled in according to the contents of __package.json__.
- Finally, type __*gulp*__. This will compile the project and churn away making each previous *QWERT* count.

You can now open your default browser which should show off the fruits of your labor!

