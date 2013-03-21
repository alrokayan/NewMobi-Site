 
 
/*
 * jQuery Nivo Slider v2.5.1
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * March 2010
 */

(function($){var NivoSlider=function(element,options){var settings=$.extend({},$.fn.nivoSlider.defaults,options);var vars={currentSlide:0,currentImage:'',totalSlides:0,randAnim:'',running:false,paused:false,stop:false};var slider=$(element);slider.data('nivo:vars',vars);slider.css('position','relative');slider.addClass('nivoSlider');var kids=slider.children();kids.each(function(){var child=$(this);var link='';if(!child.is('img')){if(child.is('a')){child.addClass('nivo-imageLink');link=child;}
child=child.find('img:first');}
var childWidth=child.width();if(childWidth==0)childWidth=child.attr('width');var childHeight=child.height();if(childHeight==0)childHeight=child.attr('height');if(childWidth>slider.width()){slider.width(childWidth);}
if(childHeight>slider.height()){slider.height(childHeight);}
if(link!=''){link.css('display','none');}
child.css('display','none');vars.totalSlides++;});if(settings.startSlide>0){if(settings.startSlide>=vars.totalSlides)settings.startSlide=vars.totalSlides-1;vars.currentSlide=settings.startSlide;}
if($(kids[vars.currentSlide]).is('img')){vars.currentImage=$(kids[vars.currentSlide]);}else{vars.currentImage=$(kids[vars.currentSlide]).find('img:first');}
if($(kids[vars.currentSlide]).is('a')){$(kids[vars.currentSlide]).css('display','block');}
slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');slider.append($('<div class="nivo-caption"><p></p></div>').css({display:'none',opacity:settings.captionOpacity}));var processCaption=function(settings){var nivoCaption=$('.nivo-caption',slider);if(vars.currentImage.attr('title')!=''){var title=vars.currentImage.attr('title');if(title.substr(0,1)=='#')title=$(title).html();if(nivoCaption.css('display')=='block'){nivoCaption.find('p').fadeOut(settings.animSpeed,function(){$(this).html(title);$(this).fadeIn(settings.animSpeed);});}else{nivoCaption.find('p').html(title);}
nivoCaption.fadeIn(settings.animSpeed);}else{nivoCaption.fadeOut(settings.animSpeed);}}
processCaption(settings);var timer=0;if(!settings.manualAdvance&&kids.length>1){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}
if(settings.directionNav){slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+settings.prevText+'</a><a class="nivo-nextNav">'+settings.nextText+'</a></div>');if(settings.directionNavHide){$('.nivo-directionNav',slider).hide();slider.hover(function(){$('.nivo-directionNav',slider).show();},function(){$('.nivo-directionNav',slider).hide();});}
$('a.nivo-prevNav',slider).live('click',function(){if(vars.running)return false;clearInterval(timer);timer='';vars.currentSlide-=2;nivoRun(slider,kids,settings,'prev');});$('a.nivo-nextNav',slider).live('click',function(){if(vars.running)return false;clearInterval(timer);timer='';nivoRun(slider,kids,settings,'next');});}
if(settings.controlNav){var nivoControl=$('<div class="nivo-controlNav"></div>');slider.append(nivoControl);for(var i=0;i<kids.length;i++){if(settings.controlNavThumbs){var child=kids.eq(i);if(!child.is('img')){child=child.find('img:first');}
if(settings.controlNavThumbsFromRel){nivoControl.append('<a class="nivo-control" rel="'+i+'"><img src="'+child.attr('rel')+'" alt="" /></a>');}else{nivoControl.append('<a class="nivo-control" rel="'+i+'"><img src="'+child.attr('src').replace(settings.controlNavThumbsSearch,settings.controlNavThumbsReplace)+'" alt="" /></a>');}}else{nivoControl.append('<a class="nivo-control" rel="'+i+'">'+(i+1)+'</a>');}}
$('.nivo-controlNav a:eq('+vars.currentSlide+')',slider).addClass('active');$('.nivo-controlNav a',slider).live('click',function(){if(vars.running)return false;if($(this).hasClass('active'))return false;clearInterval(timer);timer='';slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');vars.currentSlide=$(this).attr('rel')-1;nivoRun(slider,kids,settings,'control');});}
if(settings.keyboardNav){$(window).keypress(function(event){if(event.keyCode=='37'){if(vars.running)return false;clearInterval(timer);timer='';vars.currentSlide-=2;nivoRun(slider,kids,settings,'prev');}
if(event.keyCode=='39'){if(vars.running)return false;clearInterval(timer);timer='';nivoRun(slider,kids,settings,'next');}});}
if(settings.pauseOnHover){slider.hover(function(){vars.paused=true;clearInterval(timer);timer='';},function(){vars.paused=false;if(timer==''&&!settings.manualAdvance){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}});}
slider.bind('nivo:animFinished',function(){vars.running=false;$(kids).each(function(){if($(this).is('a')){$(this).css('display','none');}});if($(kids[vars.currentSlide]).is('a')){$(kids[vars.currentSlide]).css('display','block');}
if(timer==''&&!vars.paused&&!settings.manualAdvance){timer=setInterval(function(){nivoRun(slider,kids,settings,false);},settings.pauseTime);}
settings.afterChange.call(this);});var createSlices=function(slider,settings,vars){for(var i=0;i<settings.slices;i++){var sliceWidth=Math.round(slider.width()/settings.slices);if(i==settings.slices-1){slider.append($('<div class="nivo-slice"></div>').css({left:(sliceWidth*i)+'px',width:(slider.width()-(sliceWidth*i))+'px',height:'0px',opacity:'0',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((sliceWidth+(i*sliceWidth))-sliceWidth)+'px 0%'}));}else{slider.append($('<div class="nivo-slice"></div>').css({left:(sliceWidth*i)+'px',width:sliceWidth+'px',height:'0px',opacity:'0',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((sliceWidth+(i*sliceWidth))-sliceWidth)+'px 0%'}));}}}
var createBoxes=function(slider,settings,vars){var boxWidth=Math.round(slider.width()/settings.boxCols);var boxHeight=Math.round(slider.height()/settings.boxRows);for(var rows=0;rows<settings.boxRows;rows++){for(var cols=0;cols<settings.boxCols;cols++){if(cols==settings.boxCols-1){slider.append($('<div class="nivo-box"></div>').css({opacity:0,left:(boxWidth*cols)+'px',top:(boxHeight*rows)+'px',width:(slider.width()-(boxWidth*cols))+'px',height:boxHeight+'px',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((boxWidth+(cols*boxWidth))-boxWidth)+'px -'+((boxHeight+(rows*boxHeight))-boxHeight)+'px'}));}else{slider.append($('<div class="nivo-box"></div>').css({opacity:0,left:(boxWidth*cols)+'px',top:(boxHeight*rows)+'px',width:boxWidth+'px',height:boxHeight+'px',background:'url("'+vars.currentImage.attr('src')+'") no-repeat -'+((boxWidth+(cols*boxWidth))-boxWidth)+'px -'+((boxHeight+(rows*boxHeight))-boxHeight)+'px'}));}}}}
var nivoRun=function(slider,kids,settings,nudge){var vars=slider.data('nivo:vars');if(vars&&(vars.currentSlide==vars.totalSlides-1)){settings.lastSlide.call(this);}
if((!vars||vars.stop)&&!nudge)return false;settings.beforeChange.call(this);if(!nudge){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}else{if(nudge=='prev'){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}
if(nudge=='next'){slider.css('background','url("'+vars.currentImage.attr('src')+'") no-repeat');}}
vars.currentSlide++;if(vars.currentSlide==vars.totalSlides){vars.currentSlide=0;settings.slideshowEnd.call(this);}
if(vars.currentSlide<0)vars.currentSlide=(vars.totalSlides-1);if($(kids[vars.currentSlide]).is('img')){vars.currentImage=$(kids[vars.currentSlide]);}else{vars.currentImage=$(kids[vars.currentSlide]).find('img:first');}
if(settings.controlNav){$('.nivo-controlNav a',slider).removeClass('active');$('.nivo-controlNav a:eq('+vars.currentSlide+')',slider).addClass('active');}
processCaption(settings);$('.nivo-slice',slider).remove();$('.nivo-box',slider).remove();if(settings.effect=='random'){var anims=new Array('sliceDownRight','sliceDownLeft','sliceUpRight','sliceUpLeft','sliceUpDown','sliceUpDownLeft','fold','fade','boxRandom','boxRain','boxRainReverse','boxRainGrow','boxRainGrowReverse');vars.randAnim=anims[Math.floor(Math.random()*(anims.length+1))];if(vars.randAnim==undefined)vars.randAnim='fade';}
if(settings.effect.indexOf(',')!=-1){var anims=settings.effect.split(',');vars.randAnim=anims[Math.floor(Math.random()*(anims.length))];if(vars.randAnim==undefined)vars.randAnim='fade';}
vars.running=true;if(settings.effect=='sliceDown'||settings.effect=='sliceDownRight'||vars.randAnim=='sliceDownRight'||settings.effect=='sliceDownLeft'||vars.randAnim=='sliceDownLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceDownLeft'||vars.randAnim=='sliceDownLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);slice.css({'top':'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='sliceUp'||settings.effect=='sliceUpRight'||vars.randAnim=='sliceUpRight'||settings.effect=='sliceUpLeft'||vars.randAnim=='sliceUpLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceUpLeft'||vars.randAnim=='sliceUpLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);slice.css({'bottom':'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='sliceUpDown'||settings.effect=='sliceUpDownRight'||vars.randAnim=='sliceUpDown'||settings.effect=='sliceUpDownLeft'||vars.randAnim=='sliceUpDownLeft'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;var v=0;var slices=$('.nivo-slice',slider);if(settings.effect=='sliceUpDownLeft'||vars.randAnim=='sliceUpDownLeft')slices=$('.nivo-slice',slider)._reverse();slices.each(function(){var slice=$(this);if(i==0){slice.css('top','0px');i++;}else{slice.css('bottom','0px');i=0;}
if(v==settings.slices-1){setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({height:'100%',opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;v++;});}
else if(settings.effect=='fold'||vars.randAnim=='fold'){createSlices(slider,settings,vars);var timeBuff=0;var i=0;$('.nivo-slice',slider).each(function(){var slice=$(this);var origWidth=slice.width();slice.css({top:'0px',height:'100%',width:'0px'});if(i==settings.slices-1){setTimeout(function(){slice.animate({width:origWidth,opacity:'1.0'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){slice.animate({width:origWidth,opacity:'1.0'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=50;i++;});}
else if(settings.effect=='fade'||vars.randAnim=='fade'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':slider.width()+'px'});firstSlice.animate({opacity:'1.0'},(settings.animSpeed*2),'',function(){slider.trigger('nivo:animFinished');});}
else if(settings.effect=='slideInRight'||vars.randAnim=='slideInRight'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':'0px','opacity':'1'});firstSlice.animate({width:slider.width()+'px'},(settings.animSpeed*2),'',function(){slider.trigger('nivo:animFinished');});}
else if(settings.effect=='slideInLeft'||vars.randAnim=='slideInLeft'){createSlices(slider,settings,vars);var firstSlice=$('.nivo-slice:first',slider);firstSlice.css({'height':'100%','width':'0px','opacity':'1','left':'','right':'0px'});firstSlice.animate({width:slider.width()+'px'},(settings.animSpeed*2),'',function(){firstSlice.css({'left':'0px','right':''});slider.trigger('nivo:animFinished');});}
else if(settings.effect=='boxRandom'||vars.randAnim=='boxRandom'){createBoxes(slider,settings,vars);var totalBoxes=settings.boxCols*settings.boxRows;var i=0;var timeBuff=0;var boxes=shuffle($('.nivo-box',slider));boxes.each(function(){var box=$(this);if(i==totalBoxes-1){setTimeout(function(){box.animate({opacity:'1'},settings.animSpeed,'',function(){slider.trigger('nivo:animFinished');});},(100+timeBuff));}else{setTimeout(function(){box.animate({opacity:'1'},settings.animSpeed);},(100+timeBuff));}
timeBuff+=20;i++;});}
else if(settings.effect=='boxRain'||vars.randAnim=='boxRain'||settings.effect=='boxRainReverse'||vars.randAnim=='boxRainReverse'||settings.effect=='boxRainGrow'||vars.randAnim=='boxRainGrow'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){createBoxes(slider,settings,vars);var totalBoxes=settings.boxCols*settings.boxRows;var i=0;var timeBuff=0;var rowIndex=0;var colIndex=0;var box2Darr=new Array();box2Darr[rowIndex]=new Array();var boxes=$('.nivo-box',slider);if(settings.effect=='boxRainReverse'||vars.randAnim=='boxRainReverse'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){boxes=$('.nivo-box',slider)._reverse();}
boxes.each(function(){box2Darr[rowIndex][colIndex]=$(this);colIndex++;if(colIndex==settings.boxCols){rowIndex++;colIndex=0;box2Darr[rowIndex]=new Array();}});for(var cols=0;cols<(settings.boxCols*2);cols++){var prevCol=cols;for(var rows=0;rows<settings.boxRows;rows++){if(prevCol>=0&&prevCol<settings.boxCols){(function(row,col,time,i,totalBoxes){var box=$(box2Darr[row][col]);var w=box.width();var h=box.height();if(settings.effect=='boxRainGrow'||vars.randAnim=='boxRainGrow'||settings.effect=='boxRainGrowReverse'||vars.randAnim=='boxRainGrowReverse'){box.width(0).height(0);}
if(i==totalBoxes-1){setTimeout(function(){box.animate({opacity:'1',width:w,height:h},settings.animSpeed/1.3,'',function(){slider.trigger('nivo:animFinished');});},(100+time));}else{setTimeout(function(){box.animate({opacity:'1',width:w,height:h},settings.animSpeed/1.3);},(100+time));}})(rows,prevCol,timeBuff,i,totalBoxes);i++;}
prevCol--;}
timeBuff+=100;}}}
var shuffle=function(arr){for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i),x=arr[--i],arr[i]=arr[j],arr[j]=x);return arr;}
var trace=function(msg){if(this.console&&typeof console.log!="undefined")
console.log(msg);}
this.stop=function(){if(!$(element).data('nivo:vars').stop){$(element).data('nivo:vars').stop=true;trace('Stop Slider');}}
this.start=function(){if($(element).data('nivo:vars').stop){$(element).data('nivo:vars').stop=false;trace('Start Slider');}}
settings.afterLoad.call(this);return this;};$.fn.nivoSlider=function(options){return this.each(function(key,value){var element=$(this);if(element.data('nivoslider'))return element.data('nivoslider');var nivoslider=new NivoSlider(this,options);element.data('nivoslider',nivoslider);});};$.fn.nivoSlider.defaults={effect:'random',slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3000,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:'.jpg',controlNavThumbsReplace:'_thumb.jpg',keyboardNav:true,pauseOnHover:true,manualAdvance:false,captionOpacity:0.8,prevText:'Prev',nextText:'Next',beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};$.fn._reverse=[].reverse;})(jQuery);



/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */


// Modernizr v1.7  www.modernizr.com
window.Modernizr=function(a,b,c){function G(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)t[a[b]]=!!(a[b]in l);return t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.flexbox=function(){function c(a,b,c,d){a.style.cssText=o.join(b+":"+c+";")+(d||"")}function a(a,b,c,d){b+=":",a.style.cssText=(b+o.join(c+";"+b)).slice(0,-b.length)+(d||"")}var d=b.createElement("div"),e=b.createElement("div");a(d,"display","box","width:42px;padding:0;"),c(e,"box-flex","1","width:10px;"),d.appendChild(e),g.appendChild(d);var f=e.offsetWidth===42;d.removeChild(e),g.removeChild(d);return f},r.canvas=function(){var a=b.createElement("canvas");return a.getContext&&a.getContext("2d")},r.canvastext=function(){return e.canvas&&C(b.createElement("canvas").getContext("2d").fillText,"function")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){return"ontouchstart"in a||w("@media ("+o.join("touch-enabled),(")+"modernizr)")},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){var b=!!a.openDatabase;return b},r.indexedDB=function(){for(var b=-1,c=p.length;++b<c;){var d=p[b].toLowerCase();if(a[d+"_indexedDB"]||a[d+"IndexedDB"])return!0}return!1},r.hashchange=function(){return x("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return !!(a.history&&history.pushState)},r.draganddrop=function(){return x("dragstart")&&x("drop")},r.websockets=function(){return"WebSocket"in a},r.rgba=function(){A("background-color:rgba(150,255,150,.5)");return D(k.backgroundColor,"rgba")},r.hsla=function(){A("background-color:hsla(120,40%,100%,.5)");return D(k.backgroundColor,"rgba")||D(k.backgroundColor,"hsla")},r.multiplebgs=function(){A("background:url(//:),url(//:),red url(//:)");return(new RegExp("(url\\s*\\(.*?){3}")).test(k.background)},r.backgroundsize=function(){return F("backgroundSize")},r.borderimage=function(){return F("borderImage")},r.borderradius=function(){return F("borderRadius","",function(a){return D(a,"orderRadius")})},r.boxshadow=function(){return F("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){B("opacity:.55");return/^0.55$/.test(k.opacity)},r.cssanimations=function(){return F("animationName")},r.csscolumns=function(){return F("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";A((a+o.join(b+a)+o.join(c+a)).slice(0,-a.length));return D(k.backgroundImage,"gradient")},r.cssreflections=function(){return F("boxReflect")},r.csstransforms=function(){return!!E(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},r.csstransforms3d=function(){var a=!!E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in g.style&&(a=w("@media ("+o.join("transform-3d),(")+"modernizr)"));return a},r.csstransitions=function(){return F("transitionProperty")},r.fontface=function(){var a,c,d=h||g,e=b.createElement("style"),f=b.implementation||{hasFeature:function(){return!1}};e.type="text/css",d.insertBefore(e,d.firstChild),a=e.sheet||e.styleSheet;var i=f.hasFeature("CSS2","")?function(b){if(!a||!b)return!1;var c=!1;try{a.insertRule(b,0),c=/src/i.test(a.cssRules[0].cssText),a.deleteRule(a.cssRules.length-1)}catch(d){}return c}:function(b){if(!a||!b)return!1;a.cssText=b;return a.cssText.length!==0&&/src/i.test(a.cssText)&&a.cssText.replace(/\r+|\n+/g,"").indexOf(b.split(" ")[0])===0};c=i('@font-face { font-family: "font"; src: url(data:,); }'),d.removeChild(e);return c},r.video=function(){var a=b.createElement("video"),c=!!a.canPlayType;if(c){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}return c},r.audio=function(){var a=b.createElement("audio"),c=!!a.canPlayType;c&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;"));return c},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},r.webWorkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.smil=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"animate")))},r.svgclippaths=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"clipPath")))};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,f&&a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function p(a,b){var c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+=" iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document)


/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */



var elixirQuery = jQuery.noConflict();

	elixirQuery(document).ready(function() { 
		// Hide some elements
		elixirQuery('#breadcrumb, aside h3.sidebarTitle, #slideshow img, #extraContainer1, #extraContent2, #extraContent3, #extraContainer3').hide();
		
		// Handles extraContent areas. If an extraContent area has content, then show it. If not it remains hidden.
		if (elixirQuery("#myExtraContent1").length > 0) {elixirQuery("#extraContainer1").show();} 
		if (elixirQuery("#myExtraContent2").length > 0) {elixirQuery("#extraContent2").show();} 
		if (elixirQuery("#myExtraContent3").length > 0) {elixirQuery("#extraContent3, #extraContainer3").show();} 
		
		/* Checks to see if both the banner image and EC area 1 are hidden. If so, get rid of all the banner area padding and margins */		
		if (elixirQuery("#bannerImage").is(':hidden') && elixirQuery("#extraContainer1").is(':hidden')) {
			elixirQuery("#banner").css({"margin" : "0" , "padding" : "0"});
		}
				
		/* Adds a class of .firstChild to first menu item in horizontal navigation */
		elixirQuery('nav>ul li:first-child').addClass('firstChild');

		/* Adds a class of .lastChild to last menu item in vertical navigation and a class of .firstChild to first item in vertical navigation */
		elixirQuery('nav ul ul li:last-child').addClass('lastChild');
		elixirQuery('nav ul ul li:first-child').addClass('firstChild');
		
		/* Adds .hasChild class to all nav items with child items */
		elixirQuery("nav li").has("ul").addClass("hasChild"); 
						
		/* Handles drop down sub navigation items on hover */
		elixirQuery("nav ul li").hover(function() { 
			elixirQuery(this).find(">ul").stop('true','true').animate({opacity: 'toggle', height: 'toggle'}, 300); 
		}); 

		elixirQuery('a.myBadge').appendTo('#socialBadges');

		if (elixirQuery('#breadcrumb ul').text()) {
			elixirQuery('#breadcrumb').show();
		}

		/*
		Determines if the page is a blog page or another page type
		If it is not a blog page then the content area gets its own separate background styling
		If it is a blog page, each entry gets its own background styling
		*/
		if (elixirQuery('.blog-entry', 'section.content').size() > 0) {
			elixirQuery('section.content').css({'padding' : '0px'});
		} else {
			elixirQuery('section.content').css({'padding' : '24px 0' , 'backgroundColor' : '#ffffff'}).addClass('otherPageType');
			elixirQuery('section .innerSpacer').css({'margin' : '0 24px'});
		}

		// If the sidebar title has content then it is shown automatically
		if (elixirQuery("aside h3.sidebarTitle").text()) {elixirQuery("aside h3.sidebarTitle").show();} 

		//Gets rid of trailing divider line on last file sharing item
		elixirQuery('.filesharing-item').last().css({'border-bottom':'none'});


		/* Scroll to top of page */
		elixirQuery(document).ready(function() {
			elixirQuery('.returnToTop').click(function () {
				elixirQuery.scrollTo(0 , 800);
			});
			
		});

	}); 

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */


	elixirQuery(document).ready(function() { 
		elixirQuery('.blog-entry img[alt^=blogEntryTopper]').hide();
	});
	elixirQuery(window).ready(function() { 

		/* 
		
		BLOG ENTRY TOPPER
		
		DESCRIPTION: 	Handles the blog entry topper images. Finds image in blog entries with an ALT tag
						of 'blogEntryTopper' and then moves image to the top of the entry, wraps it in a 
						link that matches that of the blog title, and autosizes the imageit to fit 
						the blog entry's width.
						
		AUTHOR: Adam Shiver
		VERSION: 1.0
		DATE: May 9, 2011
		
		*/
		
		elixirQuery('.blog-entry img[alt^=blogEntryTopper]').each(function() {
		
			/* Determines the URL of the blog entry */
			/* blogEntryURL = elixirQuery(elixirQuery(this).parent().parent()).find('h1 a').attr('href'); */

			/* Applies special class to the image */
			elixirQuery(this).addClass('blogEntryTopperImg');  /* .wrap('<a href="' + blogEntryURL + '" />'); */
			
			/* Determines if the image is wider or narrower than the blog entry
			   and sizes is, via CSS, automatically */			
			var blogEntryWidth = elixirQuery(elixirQuery(this).parent().parent()).outerWidth();


			if (elixirQuery(this).width() < blogEntryWidth || elixirQuery(this).width() > blogEntryWidth ) { 
				elixirQuery(this).css({'width' : blogEntryWidth , 'height' : 'auto' }); 
			}

			/* Moves topper image to the top of the blog entry */
			elixirQuery(this).prependTo(elixirQuery(this).parent().parent()).show();
			

		});
		
		
	}); 


/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */


/*
	# ExtraContent (jQuery) #
	
	AUTHOR:	Adam Merrifield <http://adam.merrifield.ca>
			Giuseppe Caruso <http://www.bonsai-studio.net/>
	VERSION: r1.4.2
	DATE: 12-16-10 09:40

	USAGE:
	- be sure to include a copy of the jQuery libraray in the <head>
		before the inclusion of this function
	- noConflict mode is optional but highly recommended
	- call this script in the <head>
	- change the value of ecValue to match the number of ExtraContent
		areas in your theme
*/
elixirQuery(document).ready(function($){
	var extraContent =  (function() {
		// change ecValue to suit your theme
		var ecValue = 5;
		for (i=1;i<=ecValue;i++)
		{
			$('#myExtraContent'+i+' script').remove();
			$('#myExtraContent'+i).appendTo('#extraContainer'+i).show();
		}
	})();
});


/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */


/* # RwGet # */
RwGet = {
    pathto: function(path, file) {
        var rtrim = function(str, list) {
            var charlist = !list ? 's\xA0': (list + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
            var re = new RegExp('[' + charlist + ']+$', 'g');
            return (str + '').replace(re, '');
        };
        var jspathto = rtrim(RwSet.pathto, "javascript.js");
        if ((path !== undefined) && (file !== undefined)) {
            jspathto = jspathto + path + file;
        } else if (path !== undefined) {
            jspathto = jspathto + path;
        }
        return jspathto;
    },
    baseurl: function(path, file) {
        var jsbaseurl = RwSet.baseurl;
        if ((path !== undefined) && (file !== undefined)) {
            jsbaseurl = jsbaseurl + path + file;
        } else if (path !== undefined) {
            jsbaseurl = jsbaseurl + path;
        }
        return jsbaseurl;
    }
};


/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

// Load and specify options for the slideshow header and its animations	
	
elixirQuery(window).load(function() {
		elixirQuery('#slideshow').nivoSlider({
	        effect: bannerAnimationStyle, 
	        slices: 9, 
	        animSpeed: 900, 
	        pauseTime: bannerPauseDuration, 
	        directionNav: true, 
	        controlNav: true, 
	        controlNavThumbs: false, 
	        pauseOnHover: true, 
	        captionOpacity: 0.7
	    });
});
