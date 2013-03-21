		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '14.jpg" /><img src="' + imagePath + '15.jpg" /><img src="' + imagePath + '16.jpg" /><img src="' + imagePath + '17.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
