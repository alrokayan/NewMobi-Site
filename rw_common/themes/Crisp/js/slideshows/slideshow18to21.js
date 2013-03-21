		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '18.jpg" /><img src="' + imagePath + '19.jpg" /><img src="' + imagePath + '20.jpg" /><img src="' + imagePath + '21.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
