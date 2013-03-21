		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '11.jpg" /><img src="' + imagePath + '12.jpg" /><img src="' + imagePath + '13.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
