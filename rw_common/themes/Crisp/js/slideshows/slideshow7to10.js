		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '7.jpg" /><img src="' + imagePath + '8.jpg" /><img src="' + imagePath + '9.jpg" /><img src="' + imagePath + '10.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
