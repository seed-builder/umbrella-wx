var themes_dir = '';
var plugins = 'plugins/';
seajs.config({
  alias: {
	'swiper':plugins+'swiper.min',
	'validate':plugins+'jquery.validate',
	'submitForm':plugins+'jquery.form',	
	'highcharts':plugins+'highcharts/highcharts',
	'artEditor':plugins+'artEditor',
	'clipboard':plugins+'clipboard.min',
	'layer':themes_dir+'layer/layer',
	'm':themes_dir+'m'
  },
  preload:['layer']
});

