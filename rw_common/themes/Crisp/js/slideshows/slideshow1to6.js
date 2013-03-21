		elixirQuery(document).ready(function() {
			var imagePath = RwGet.pathto('images/editable_images/','banner_');
			
			elixirQuery('<div id="slideshow"><img src="' + imagePath + '1.jpg" /><img src="' + imagePath + '2.jpg" /><img src="' + imagePath + '3.jpg" /><img src="' + imagePath + '4.jpg" /><img src="' + imagePath + '5.jpg" /><img src="' + imagePath + '6.jpg" /></div>').appendTo('#bannerImage');
			elixirQuery('#bannerImage').css('padding-bottom', '20px');
				
		});
