<?php
	// Start session.
	session_start();
	
	// Set a key, checked in mailer, prevents against spammers trying to hijack the mailer.
	$security_token = $_SESSION['security_token'] = uniqid(rand());
	
	if ( ! isset($_SESSION['formMessage'])) {
		$_SESSION['formMessage'] = 'Fill in the form below to send me an email.';	
	}
	
	if ( ! isset($_SESSION['formFooter'])) {
		$_SESSION['formFooter'] = '';
	}
	
	if ( ! isset($_SESSION['form'])) {
		$_SESSION['form'] = array();
	}
	
	function check($field, $type = '', $value = '') {
		$string = "";
		if (isset($_SESSION['form'][$field])) {
			switch($type) {
				case 'checkbox':
					$string = 'checked="checked"';
					break;
				case 'radio':
					if($_SESSION['form'][$field] === $value) {
						$string = 'checked="checked"';
					}
					break;
				case 'select':
					if($_SESSION['form'][$field] === $value) {
						$string = 'selected="selected"';
					}
					break;
				default:
					$string = $_SESSION['form'][$field];
			}
		}
		return $string;
	}
?><!DOCTYPE HTML>
<html class="no-js">
	<head>
	
		<meta charset="utf-8"/>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="generator" content="RapidWeaver" />
		<link rel="icon" href="http://newmobi.com.au/favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="http://newmobi.com.au/favicon.ico" type="image/x-icon" />
		
		

		<title>Contact Us</title>  <!-- Browser Title -->
		
		<meta name="viewport" content="width=1040" /> <!-- Sets iOS viewport so that entire site is visible upon loading and graphics are optimized -->

    
       	<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/styles.css"  />  <!-- Main Stylesheet -->
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/colors-theme-default.css"  />  <!-- Color Picker Stylesheet -->

		<script type="text/javascript" src="../rw_common/themes/Crisp/javascript.js"></script> <!-- Standard RapidWeaver javascript file -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script> <!-- jQuery 1.5.2 is included in this theme via Google. -->
		<script type="text/javascript" charset="utf-8">
			RwSet = {
				pathto: "../rw_common/themes/Crisp/javascript.js",
				baseurl: "http://newmobi.com.au/"
			};
		</script>
		
        <script type="text/javascript" src="../rw_common/themes/Crisp/js/elixir.js"></script>  <!-- Theme specific javascript -->
        

		<!-- Conditional Stylesheets for Internet Explorer 7, 8 and 9 -->
		<!-- Internet Explorer 6 is not supported -->
		
        <!--[if IE 9]>
        	<link rel="stylesheet" href="../rw_common/themes/Crisp/css/ie9.css" media="all"/>
        <![endif]-->

        <!--[if IE 8]>
        	<link rel="stylesheet" href="../rw_common/themes/Crisp/css/ie8.css" media="all"/>
        <![endif]-->

        <!--[if IE 7]>
        	<link rel="stylesheet" href="../rw_common/themes/Crisp/css/ie7.css" media="all"/>
        <![endif]-->

		<script type="text/javascript" src="../rw_common/themes/Crisp/js/scrolltop/scrolltop_footer.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/banner/banner_hidden.css" />
		<script type="text/javascript" src="../rw_common/themes/Crisp/js/banner/anim_boxrandom.js"></script>
		<script type="text/javascript" src="../rw_common/themes/Crisp/js/banner/anim_8seconds.js"></script>
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/accent/accent_wood1.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/sidebar/sidebar_hidden.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/width/width_990.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/title/title_museoslab.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/slogan/slogan_hidden.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/slogan/slogan_museosans.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/logo/logo_visible.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/body/body_helvetica.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/nav/nav_helvetica.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="../rw_common/themes/Crisp/css/extracontent/ec_bkg_hatch.css" />
				
		
		
		
		
	</head>

	<body>
	
		<!-- This is is built using the Crisp theme for RapidWeaver, by Elixir (http://elixirgraphics.com) -->	
	
		<!-- Site Title, social badges and background accent -->
		<header>
			<div class="innerWidth">
				<h1 class="siteTitle">NewMobi</h1>  <!-- Site title -->
				<div id="socialBadges"></div>
			</div>
		</header>
		
		<div id="bannerContainer">
			<nav>
				<ul><li><a href="../index.html" rel="self">Home</a></li><li><a href="index.php" rel="self" class="current">Contact Us</a></li></ul> <!-- Site Navigation -->
			</nav>
			<div id="banner">
				<div id="bannerImage"></div>  <!-- Banner image or slideshow -->
				<div id="extraContainer1"></div>   <!-- ExtraContent area number 1 -->
				<div class="clearer"></div>
			</div>
		</div>
		
		<div id="container">
			<div id="siteSlogan">Web Design, Content Management, and Online Services</div>   <!-- Site slogan -->

			<section id="extraContent2">
				<div id="extraContainer2"></div>   <!-- ExtraContent area number 2 -->
				<div class="clearer"></div>
			</section>
			
			
			<!-- Sidebar -->
			<aside>
				<div id="logo">
					<img src="../rw_common/images/FACEBOOK_LOGO.png" width="50" height="50" alt="Site logo"/>   <!-- Site logo -->
				</div>

				<!-- Sidebar content -->
				<h3 class="sidebarTitle"></h3>
				
				
				<!-- Blog archives content -->
				<div id="archive">
					
				</div>
			</aside>
			
			
			<!-- Main content area -->
			<section class="content">
				<div class="innerSpacer">
					
<div class="message-text"><?php echo $_SESSION['formMessage']; unset($_SESSION['formMessage']); ?></div><br />

<form action="./files/mailer.php" method="post" enctype="multipart/form-data">
	 <div>
		<label>Your Name:</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element0'); ?>" name="form[element0]" size="40"/><br /><br />

		<label>Your Email:</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element1'); ?>" name="form[element1]" size="40"/><br /><br />

		<label>Subject:</label> *<br />
		<input class="form-input-field" type="text" value="<?php echo check('element2'); ?>" name="form[element2]" size="40"/><br /><br />

		<label>Message:</label> *<br />
		<textarea class="form-input-field" name="form[element3]" rows="8" cols="38"><?php echo check('element3'); ?></textarea><br /><br />

		<div style="display: none;">
			<label>Spam Protection: Please don't fill this in:</label>
			<textarea name="comment" rows="1" cols="1"></textarea>
		</div>
		<input type="hidden" name="form_token" value="<?php echo $security_token; ?>" />
		<input class="form-input-button" type="reset" name="resetButton" value="Reset" />
		<input class="form-input-button" type="submit" name="submitButton" value="Submit" />
	</div>
</form>

<br />
<div class="form-footer"><?php echo $_SESSION['formFooter']; unset($_SESSION['formFooter']); ?></div><br />

<?php unset($_SESSION['form']); ?>
					<div class="clearer"></div>
				</div>
			</section>
		</div>

		
		<!-- Site breadcrumb trail -->
		<div id="breadcrumb">
			<div class="innerWidth">
				
			</div>
		</div>
		
		<section id="extraContent3">
			<div class="topInsetShadow"></div>
			<div class="innerWidth">
				<div id="extraContainer3"></div>  <!-- ExtraContent area number 3 -->
				<div class="clearer"></div>
			</div>
			<div class="bottomInsetShadow"></div>
		</section>

		<!-- Site footer -->
		<footer>
			&copy; 2011-2013 NewMobi <a href="#" id="rw_email_contact">Contact Me</a><script type="text/javascript">var _rwObsfuscatedHref0 = "mai";var _rwObsfuscatedHref1 = "lto";var _rwObsfuscatedHref2 = ":in";var _rwObsfuscatedHref3 = "fo@";var _rwObsfuscatedHref4 = "new";var _rwObsfuscatedHref5 = "mob";var _rwObsfuscatedHref6 = "i.c";var _rwObsfuscatedHref7 = "om.";var _rwObsfuscatedHref8 = "au";var _rwObsfuscatedHref = _rwObsfuscatedHref0+_rwObsfuscatedHref1+_rwObsfuscatedHref2+_rwObsfuscatedHref3+_rwObsfuscatedHref4+_rwObsfuscatedHref5+_rwObsfuscatedHref6+_rwObsfuscatedHref7+_rwObsfuscatedHref8; document.getElementById('rw_email_contact').href = _rwObsfuscatedHref;</script>
		</footer>

		

	</body>

</html>