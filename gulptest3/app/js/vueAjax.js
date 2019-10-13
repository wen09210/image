	var vm = new Vue({
		el: '#app',
		data: {
			sidebar: [],
			icon: [],
			isActive:false
		},
		created: function () {
			this.fetchData()

		},

		methods: {
			fetchData: function () {
				var xhr = new XMLHttpRequest()
				var self = this
				xhr.open('GET', 'json/icon.json')
				xhr.onload = function () {
					self.icon = JSON.parse(xhr.responseText)
				}
				xhr.send()
				// 第2支json
				var xhr1 = new XMLHttpRequest()
				xhr1.open('GET', 'json/sidebar.json')
				xhr1.onload = function () {
					self.sidebar = JSON.parse(xhr1.responseText)

				}
				xhr1.send()
			}
		}

	});