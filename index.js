/* eslint-disable capitalized-comments */
let gController = null;
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', () => {
		const ClassController = function (theNow) {
			const self = this;
			self.util = {
				createElement(arg) {
					const ret = document.createElement(arg[0]);
					if ((typeof undefined !== typeof arg[1]) && (arg[1] !== null)) {
						Object.keys(arg[1]).forEach(theProperty => {
							ret[theProperty] = arg[1][theProperty];
						});
					}
					if ((typeof undefined !== typeof arg[2]) && (arg[2] !== null)) {
						arg[2].forEach(theClass => ret.classList.add(theClass));
					}
					return ret;
				}
			};
			self.model = {
				title: '#picco12',
				subTitle: '(#picco2020)',
				satoshiPerBitcoin: 100000000,
				// minValue: 12540,
				// minValue: 11749.5, // 29 jan 2020
				// minValue: 9933.44, // 1 aug 2020
				// minValue: 8600.397166341141, // 27 oct 2020
				// minValue: 8486.522129879433, // 28 oct 2020
				// minValue: 6949.888523788079, // 17 nov 2020
				// minValue: 6652.284427733905, // 17 nov 2020
				// minValue: 6476.608433321373, // 18 nov 2020
				// minValue: 6306.927908029855, // 20 nov 2020
				// minValue: 6149.369412913553, // 24 nov 2020
				// minValue: 5473.573586723301, // 17 dec 2020
				// minValue: 5351.823526830297, // 17 dec 2020
				minValue: 4943.938212637793, // 25 dec 2020
				columnSatoshiPerBitcoinIndex: 2
			};
			self.jsonToMatrix = json => json.map(element => Object.keys(element).map(key => element[key]));
			self.matrixToTable = (header, matrix, applyOnElement) => {
				const domTable = self.util.createElement(['table']);
				const domHeader = self.util.createElement(['tr']);
				header.forEach(value => domHeader.append(self.util.createElement(['th', {textContent: value}])));
				domTable.append(domHeader);
				matrix.forEach(row => {
					const domRow = self.util.createElement(['tr']);
					row.forEach((value, i) => domRow.append(applyOnElement(row, self.util.createElement(['td', {textContent: value}, ['col_' + i]]), i)));
					domTable.append(domRow);
					if (typeof (row[5]) !== 'undefined') {
						domRow.classList.add('penalita');
					}
				});
				return domTable;
			};
			self.convert = value => self.model.satoshiPerBitcoin / value;
			self.showFloat = value => parseFloat(value).toFixed(2);
			self.show = () => {
				const domHeader = self.util.createElement(['div', null, ['header']]);
				[['h1', {id: 'title', textContent: self.model.title}],
				['h2', {id: 'sub-title', textContent: self.model.subTitle}]].forEach(dom => domHeader.append(self.util.createElement(dom)));
				document.title = self.model.title;
				gData.sort((a, b) => b['satoshi/€'] - a['satoshi/€']); // eslint-disable-line no-undef
				const domMatrix = self.matrixToTable(
					['indice', 'nome', 'satoshi/€', 'telegram-id', '€/₿', 'penalità'],
					self.jsonToMatrix(gData).map((row, i) => [(i + 1), row[0], self.showFloat(row[1]), row[2], self.showFloat(self.convert(row[1])), row[3]]), // eslint-disable-line no-undef
					(row, domElement, i) => {
						if (row[self.model.columnSatoshiPerBitcoinIndex] > self.model.minValue) {
							const classes = ['lost', 'lost-element'];
							domElement.classList.add(classes[Number(i === self.model.columnSatoshiPerBitcoinIndex)]);
						}
						return domElement;
					}
				);
				const domFooter = self.util.createElement(['div', null, ['footer']]);
				[['div', {textContent: 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'}, ['genesis']],
				['div', {textContent: theNow}],
				['a', {href: 'https://github.com/isghe/picco-bitcoin', textContent: 'GitHub: picco-bitcoin'}],
				['div', {textContent: '1p12pYog8jxVL3QaqevM4Gp32MZUoutck'}]].forEach(dom => domFooter.append(self.util.createElement(dom)));
				const domContainer = self.util.createElement(['div', null, ['container']]);
				[domHeader, domMatrix, domFooter].forEach(dom => domContainer.append(dom));
				document.body.append(domContainer);
			};
		};
		gController = new ClassController(new Date());
		gController.show();
	});
})();
