/**
 * Created with JetBrains PhpStorm.
 * User: alevashova
 * Date: 02.10.13
 * Time: 15:07
 * To change this template use File | Settings | File Templates.
 */
function typingEffect(currentPhrase, callback) {
	currentPhrase.show();
	if (!currentPhrase) {
		return;
	}
	var txt = currentPhrase.text();
	var timeOut;
	var txtLen = txt.length;
	var char = 0;
	currentPhrase.text('|');
	(function typeIt() {
		timeOut = setTimeout(function () {
			char++;
			var type = txt.substring(0, char);
			currentPhrase.text(type + '|');
			typeIt();

			if (char == txtLen) {
				currentPhrase.text(currentPhrase.text().slice(0, -1)); // remove the '|'
				clearTimeout(timeOut);
				if (callback) {
					callback();
				}
			}
		}, 3);
	}());
}

function validateName(name) {
	var pattern = /^([a-zа-я]){2,15}$/i;
	var isValid = pattern.test(name);
	if (!isValid) {
		alert('В имени ошибка. Попробуйте еще раз!');
	}
	return isValid;
}

function getCardValue(cardId) {
	var cardsValuesArray = {
		0: 'МАГ',
		1: 'ВЕРХОВНАЯ ЖРИЦА',
		2: 'ИМПЕРАТРИЦА',
		3: 'ИМПЕРАТОР',
		4: 'ИЕРОФАНТ',
		5: 'ВЛЮБЛЕННЫЕ',
		6: 'КОЛЕСНИЦА',
		7: 'СИЛА',
		8: 'ОТШЕЛЬНИК',
		9: 'КОЛЕСО ФОРТУНЫ',
		10: 'СПРАВЕДЛИВОСТЬ',
		11: 'ПОВЕШЕННЫЙ',
		12: 'СМЕРТЬ',
		13: 'УМЕРЕННОСТЬ',
		14: 'ДЬЯВОЛ',
		15: 'БАШНЯ',
		16: 'ЗВЕЗДА',
		17: 'ЛУНА',
		18: 'СОЛНЦЕ',
		19: 'СУД',
		20: 'МИР',
		21: 'ДУРАК'
	};
	if (cardsValuesArray.hasOwnProperty(cardId)) {
		return cardsValuesArray[cardId];
	}
	return '';
}

// specific function
function printDateForm() {
	for (var day = 1; day < 32; day++) {
		$('#taroUserDay').append('<option value="' + day + '">' + day + '</option>');
	}
	for (var month = 1; month < 13; month++) {
		$('#taroUserMonth').append('<option value="' + month + '">' + month + '</option>');
	}
	var today = new Date().getFullYear();
	var lastYear = today - 5;
	var firstYear = today - 120;
	var selectedDate = today - 40;
	var selected = '';
	for (var year = firstYear; year < lastYear; year ++) {
		if (year == selectedDate) {
			selected = ' selected ';
		} else {
			selected = '';
		}
		$('#taroUserYear').append('<option value="' + year + '" ' + selected + '>' + year + '</option>');
	}
}

function birthdayBlock() {
	$('#taroUserBirthdayBlock').show();
	typingEffect($('#taroUserBirthdayQuestion'), null);
	$('#taroUserBirthdayAnswer').show(300);
	$('#taroUserBirthday').show(300);
}


function printCards() {
	var i =0;
	while(i<22) {
		card = Math.floor(Math.random() * 22);
		if ($('#card_'+card).attr('id') != 'card_'+card) {
			i++;
			element = '<div class="tarotCardBack" id="card_'+card+'" style="display:none"></div>';
			$('#taroCards').append(element);
			$('#card_'+card).show(1000);
			if (i == 22) {
				$('#card_'+card).addClass('tarotCardBackLast');
				$('#afterCardsChoose').show();
			}
			$('#card_'+card).bind('click', function(e) {
				$(e.target).unbind();
				var $target = $(e.target);
				var id = $target.attr('id');
				var cardNumber = id.replace("card_","");
				$target.attr('class', 'tarotCardFace');
				$target.animate({
					opacity: 0.25,
					left: "+=50"
				}, 1000, function(){
					$target.append('<img class="tarotCardImage" style="" src="./img/cards/' + cardNumber + '.png" />');
					$target.animate({
						opacity: 1
					}, 1000);
				});
				if ($('.tarotCardFace').size() > 2) {
					//alert('sfsdfsf');
					$('.tarotCardBack').unbind();
					$('.tarotCardBack').each(function(){
						$(this).animate({opacity: 0.25}, 2000);
					});
				}
			});
		}
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function showQuestionAndAnswers(id) {
	typingEffect($('#'+id), function() {
		$('#'+id + 'Test').show(500);
	});
}


function undestandPhraseAndOutputCards() {
	typingEffect($('#taroUnderstanding'), function () {
		$('#taroFortunetellerName').hide(500);
		$('#taroWhatYouWant').hide(500);
		$('#taroExactWish').hide(500);
		$('#taroVeryExactWish').hide(500);
		$('#taroUnderstanding').hide(3000);
		$('#taroCards').show();
		typingEffect($('#taroSelectPlease'));
		printCards();
	});
}