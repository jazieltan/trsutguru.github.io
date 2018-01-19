(function ($) {
	'use strict';

	$.fn.hasAttr = function(t) {
        var e = this;
        return void 0 !== e.attr(t) ? !0 : !1
    };

    function toggleFullPage(vars) {
    	if ($(window).width() > 1050) {
			$.fn.fullpage.setAllowScrolling(vars);
			$.fn.fullpage.setKeyboardScrolling(vars);
		}
	}

	var TeslaThemes = {

		init: function () {
			this.onePageSettings();
			this.smallToggles();
			this.slickInit();
			this.instagramFeed();
			//this.isotopeInit();
		},

		onePageSettings: function () {
	        if ($(window).width() > 1050) {
	          $('#scroll-content').fullpage({
					scrollingSpeed: 1000,
					navigation: true,
					navigationPosition: 'left',
					scrollOverflow: true,
					navigationTooltips: ['home','our-team','services','portfolio','blog','contact','pricing','error-404'],

					onLeave: function(index, nextIndex, direction){

						console.log(index);

						if(direction == "down") {
							$('.section').removeClass('active-down').removeClass('active-up');
							$('.section').eq(index).addClass('active-down');
						} else {
							$('.section').removeClass('active-down').removeClass('active-up');
							$('.section').eq(index-2).addClass('active-up');
						}
					},

					afterLoad: function(anchorLink, index){
						$('.section').removeClass('up').removeClass('down');
						$('.section').eq(index-2).addClass('up');
						$('.section').eq(index).addClass('down');
					},
				});

				$('.slide-scroll').on('click', function(){
					$.fn.fullpage.moveTo($('.section.active').index() + 2);
				});

				$('.error-button').on('click', function(e){
					e.preventDefault();
					$.fn.fullpage.moveTo(1);
				});

				$('.slimScrollable').slimScroll({
				    height: 'auto',
				    size: '10px',
				    color: '#000000',
				    distance: '1px',
				});
	        }
		},

		smallToggles: function () {
			$('.main-nav .menu-item a').on('click', function() {
				$(this).parent().toggleClass("showsub");
			});

			$('.menu-trigger').on('click', function(){
				$('body').addClass('show-header');
				toggleFullPage(false);
			});

			$('header').find('.close').on('click', function(){
				$('body').removeClass('show-header');
				toggleFullPage(true);
			});

			var ttPopup = $('.tt-popup'),
				blogPostPopup = $('.blog-post-popup'),
				teamPopup = $('.team-popup'),
				pSteps = 120;

			ttPopup.each(function(){
				$(this).find('.close').on('click', function(){
					ttPopup.removeClass('open');
					$('body').removeClass('popup-visible');
					toggleFullPage(true);
				});
			});

			$('.team-members .team-member').on('click', function(e){
				e.preventDefault();
				teamPopup.addClass('open');
				$('body').addClass('popup-visible');
				toggleFullPage(false);
			});

			$('.blog-post .popup-readmore').on('click', function(e){
				e.preventDefault();
				blogPostPopup.addClass('open');
				$('body').addClass('popup-visible');
				toggleFullPage(false);
			});

			var zoomLink = $('.photozoom');

			if(zoomLink.length) {
				if(zoomLink.parents('.gallery-wrapper').length) {
					$('.gallery-wrapper').each(function () {
	                    $(this).magnificPopup({
	                        delegate: 'a',
	                        type: 'image',
	                        gallery: {
	                            enabled: true
	                        },
	                        iframe: {
	                            markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-counter"></div>' + '</div>'
	                        }
	                    });
	                });
				} else {
	                zoomLink.magnificPopup({
						type: 'image',
						closeOnContentClick: true,
						closeBtnInside: false,
						fixedContentPos: true,
						mainClass: 'mfp-no-margins mfp-with-zoom',
						image: {
							verticalFit: true
						},
						zoom: {
							enabled: true,
							duration: 300
						}
					});
	            }

	            zoomLink.on('click', function() {
	            	toggleFullPage(false);
	            });

	            $(document).on('click', '.mfp-close, .mfp-container, .mfp-content', function(){
	            	toggleFullPage(true);
	            });
	        }

			function initialize() {
				var mapCanvas = document.getElementsByClassName('map');
		        var maps = [];

		        jQuery(mapCanvas).each(function(i){

		            var lati = jQuery(this).data('lat');
		            var longi = jQuery(this).data('long');
		            var icon = jQuery(this).data('icon');

		            var mapOptions = {
		                center: new google.maps.LatLng(lati, longi),
		                zoom: 16,
		                styles: [{ stylers: [{saturation: -100}]}],
		                scrollwheel: false,
		                mapTypeId: google.maps.MapTypeId.ROADMAP
		            };
		            maps[i] = new google.maps.Map(mapCanvas[i], mapOptions);

		            var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lati, longi),
                        map: maps[i],
                        icon: icon,
                    });
		        });
		    }

            if(jQuery('.map').length) {
		        google.maps.event.addDomListener(window, 'load', initialize);
		    }
		},

		slickInit: function () {
			var i = $(".slick-carousel");

            i.each(function() {
                var e = $(this),
                    a = e.find(".carousel-items");
                a.slick({
                    focusOnSelect: !0,
                    speed: e.hasAttr("data-speed") ? e.data("speed") : 600,
                    slidesToShow: e.hasAttr("data-items-desktop") ? e.data("items-desktop") : 4,
                    arrows: e.hasAttr("data-arrows") ? e.data("arrows") : !0,
                    appendArrows: e,
                    dots: e.hasAttr("data-dots") ? e.data("dots") : !0,
                    infinite: e.hasAttr("data-infinite") ? e.data("infinite") : !1,
                    slidesToScroll: e.hasAttr("data-items-to-slide") ? e.data("items-to-slide") : 1,
                    initialSlide: e.hasAttr("data-start") ? e.data("start") : 0,
                    asNavFor: e.hasAttr("data-as-nav-for") ? e.data("as-nav-for") : "",
                    centerMode: e.hasAttr("data-center-mode") ? e.data("center-mode") : "",
                    fade: e.hasAttr("data-fade") ? e.data("fade") : false,
                    easing: e.hasAttr("data-easing") ? e.data("easing") : "linear",
                })
            })
		},

		instagramFeed: function () {
		    function themeInstagram(container, data) {
				var pattern, renderTemplate, url;
				url = 'https://api.instagram.com/v1';
				pattern = function(obj) {
					var item, k, len, template;
					if (obj.length) {
						template = '';
						for (k = 0, len = obj.length; k < len; k++) {
							item = obj[k];
							template += "<li><a href='" + item.link + "' title='" + item.title + "' target='_blank'><img src='" + item.image + "' alt='" + item.title + "'></a></li>";
						}
						return container.append(template);
					}
				};

				if (container.data('instagram-username')) {
					url += "/users/search?q=" + (container.data('instagram-username')) + "&client_id=" + data.clientID + "&callback=?";
					renderTemplate = this._template;

					$.ajax({
						dataType: "jsonp",
						url: url,
						data: data,
						success: function(response) {
						  	var urlUser;
						  	if (response.data.length) {
						    	urlUser = "https://api.instagram.com/v1/users/" + response.data[0].id + "/media/recent/?client_id=" + data.clientID + "&count=" + data.count + "&size=l&callback=?";
						    	return $.ajax({
						      		dataType: "jsonp",
						      		url: urlUser,
						      		data: data,
						      		success: function(response) {
						        		var instagramFeed;
						        		if (response.data.length) {
						          			instagramFeed = {};
						          			instagramFeed.data = renderTemplate(response);
						          			return pattern(instagramFeed.data);
						        		}
						      		}
						    	});
						  	}
						}
					});
				}
		    }

		    themeInstagram.prototype._template = function(obj) {
			  	var item, k, len, ref, results;
			  	if (obj.data) {
			    	ref = obj.data;
			    	results = [];
			    	for (k = 0, len = ref.length; k < len; k++) {
			      		item = ref[k];
			      		results.push({
			        	title: item.user.username,
			        	link: item.link,
			        	image: item.images.low_resolution.url
			     		});
			    	}
			    	return results;
			  	}
		    };

		  	if ($('[data-instagram]').length) {
		    	var iContainer = $('[data-instagram]');
		    	iContainer.each(function(){
		    		var whiteInstagram = new themeInstagram($(this), {
			      		clientID: '632fb01c8c0d43d7b63da809d0b6a662',
			      		count: $(this).data('instagram') || 6
			    	});
		    	});
		  	}
		},

		isotopeInit: function () {
			var sidebarWrapper = $('.sidebar .isotope-items'),
				isotopeContainer = $('.isotope-container'),
				defaultSelection = isotopeContainer.attr('data-default-selection');

			isotopeContainer.isotope({
				filter: defaultSelection,
				itemSelector: '.isotope-item'
			});


			$('.isotope-filters span').on('click', function () {
				$('.isotope-filters .current').removeClass('current');
				$(this).addClass('current');

				var selector = $(this).attr('data-filter');
					isotopeContainer.isotope({
						filter: selector,
					});

				$(window).trigger('resize');
				return false;
			});

			setTimeout(function () {
				sidebarWrapper.isotope({
					itemSelector: '.isotope-item'
				});
			}, 1500);

		},
	};

	$(document).ready(function(){
		TeslaThemes.init();

		setTimeout(function () {
			jQuery('body').addClass('dom-ready');
		}, 200);
	});
}(jQuery));