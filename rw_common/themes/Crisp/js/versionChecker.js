		// Settings for theme version checker 
		var jsonData = "http://elixirgraphics.com/theme_updates/Crisp/version_info.json";
		var themeName = "Crisp";
		var themeVersionTitle = "Version Checker";
		var themeURL = "http://elixirgraphics.com/themeview/Crisp";
		var themeVersion = "1.0";
		var themeUpdateURL = "http://elixir.cartloom.com/lookup";
		var themeUpdateMessage = "You can use your purchase information to retrieve the latest version of the theme from the following secure site:";

		elixirQuery(document).ready(function(){

			//Adds version checker wrapper to the body of the theme
			elixirQuery('<div/>', {'id': 'themeVersion'}).prependTo('body');
			
			//Adds close button to version checker.
			//Comment the following 6 lines of code out to disable this feature
			elixirQuery('<div/>', {'class': 'versionCheckerCloseButton'}).prependTo('#themeVersion');
			elixirQuery('.versionCheckerCloseButton').click(function() {
				elixirQuery('#themeVersion').animate({'opacity':'0' , 'top':'-10px'}, 800, function() {
					elixirQuery(this).remove();
				});
			});


			//Version Checker Box Title
			elixirQuery('<h2 class="themeVersionChecker">' + themeVersionTitle + '</h2>').appendTo('#themeVersion');

			//Lists information for user about their theme's version information.
			elixirQuery('<div class="userVersion">You are currently using version <strong>' + themeVersion + '</strong> of the <strong><a href="' + themeURL + '">' + themeName + '</a></strong> theme</div>').appendTo('#themeVersion');
			
			//Imports JSON information from server.
			elixirQuery.getJSON(jsonData, function(data) {
				var items = [];
				elixirQuery.each(data, function(key, val) {
				
					//Determines if the key value is the current version numner.
					if (key == 'versionCurrent') {
						//Compares JSON data to users theme version.
						if (val != themeVersion) {
							//Lets user know that there is a theme update available.
							elixirQuery('<div class="newVersionAvailable">There is a new version of the <strong><a href="' + themeURL + '">' + themeName + '</a></strong> theme available!</div>').appendTo('#themeVersion');
							val = 'Latest theme version is: <strong>' + val +'</strong>'; 
						} else {
							//Lets user know that their theme is up to date.
							elixirQuery('<div class="newVersionAvailable">You are using the most recent version of the ' + themeName + ' theme.</div>').appendTo('#themeVersion');
							matchingThemeVersions = true;
						}
					}
				
					//Creates an unordered list of the JSON data items.
					items.push('<li class="' + key + '">' + val + '</li>');
				});
					
				//Appends unordered list to theme version checker box.	
				elixirQuery('<ul/>', {'class': 'versionInfoWrapper', html: items.join('')}).appendTo('#themeVersion');
				
				//Appends theme update message
				elixirQuery('<div class="updateMessage">' + themeUpdateMessage + '</div>').appendTo('#themeVersion');
				
				//Appends URL where user can get the updated theme (ie: CartLoom)
				elixirQuery('<a class="updateMessageURL" href="' + themeUpdateURL + '">' + themeUpdateURL + '</a>').appendTo('#themeVersion');
				
				//Warns user to turn off variation before publishing the theme.
				elixirQuery('<div class="warningMessage">Be sure to turn off the theme Version Checker before publishing your site! Not doing so will publish this Version Checker information to your site.</div>').appendTo('#themeVersion');
			
			
				if (matchingThemeVersions == true) {
					elixirQuery('.versionInfoWrapper, .updateMessage, .updateMessageURL').hide();
				}
			
			});


		});
				
