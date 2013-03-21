		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '22.jpg" /><img src="' + imagePath + '23.jpg" /><img src="' + imagePath + '24.jpg" /><img src="' + imagePath + '25.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
