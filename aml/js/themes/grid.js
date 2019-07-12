/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ['#ff0f00', '#ff6600', '#0dbecf', '#b0de09', '#f8ff01', '#2a0cd0', '#cd0d74', '#8a0ccf', '#0d52d1', '#2a0cd0', '#fcd202'],
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, 'rgb(255, 255, 255)'],
				[1, 'rgb(240, 240, 255)']
			]
		},
		borderWidth: null,
		borderRadius: 6,
		plotBackgroundColor: null,
		plotShadow: true,
		plotBorderWidth: 1
	},
	title: {
		style: {
			color: '#000',
			font: 'bold 16px 微軟正黑體'
		}
	},
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 14px 微軟正黑體'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		lineColor: '#000',
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '13px 微軟正黑體'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '14px',
				fontFamily: '微軟正黑體'

			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		lineColor: '#000',
		lineWidth: 1,
		tickWidth: 1,
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '13px 微軟正黑體'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '14px',
				fontFamily: '微軟正黑體'
			}
		}
	},
	legend: {
		itemStyle: {
			font: '10pt 微軟正黑體',
			color: 'black'

		},
		itemHoverStyle: {
			color: '#039'
		},
		itemHiddenStyle: {
			color: 'gray'
		}
	},
	labels: {
		style: {
			color: '#99b'
		}
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
