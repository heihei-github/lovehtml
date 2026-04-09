// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
var offsetX, offsetY, heartScale = 1;

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	offsetX = $loveHeart.width() / 2;
	offsetY = $loveHeart.height() / 2 - 30;
    // 计算心形缩放比例，基于容器高度
    heartScale = $loveHeart.height() / 600 * 0.9;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();

    // 更新画布尺寸
    if ($loveHeart && $loveHeart.length) {
        gardenCanvas.width = $loveHeart.width();
        gardenCanvas.height = $loveHeart.height();

        // 更新偏移量
        offsetX = $loveHeart.width() / 2;
        offsetY = $loveHeart.height() / 2 - 30;
        // 更新心形缩放比例
        heartScale = $loveHeart.height() / 600 * 0.9;
    }

    // 更新客户端尺寸记录
    clientWidth = newWidth;
    clientHeight = newHeight;
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = heartScale * 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - heartScale * 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				// 显示文字，在末尾添加静态光标
				$ele.html(str.substring(0, progress) + '<span class="cursor">|</span>');
				if (progress >= str.length) {
					clearInterval(timer);
					// 完成后移除光标
					$ele.html(str);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(startDate){
	var now = new Date();
	var start = new Date(startDate);

	// 计算年份差
	var years = now.getFullYear() - start.getFullYear();

	// 计算月份差
	var months = now.getMonth() - start.getMonth();

	// 计算天数差
	var days = now.getDate() - start.getDate();

	// 如果天数差为负数，需要向前一个月借天数
	if (days < 0) {
		// 获取上个月的总天数
		var lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += lastMonth.getDate();
		months--;
	}

	// 如果月份差为负数，需要向前一年借月份
	if (months < 0) {
		months += 12;
		years--;
	}

	// 计算时分秒
	var totalSeconds = Math.floor((now - start) / 1000);
	var totalDays = Math.floor(totalSeconds / (3600 * 24));
	var remainingSeconds = totalSeconds % (3600 * 24);
	var hours = Math.floor(remainingSeconds / 3600);
	var minutes = Math.floor((remainingSeconds % 3600) / 60);
	var seconds = remainingSeconds % 60;

	// 格式化数字，确保两位数显示
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	// 格式化显示
	var result = '<div class="date-part">' +
	             '已经 <span class="digit">' + years + '</span> 年 ' +
	             '<span class="digit">' + months + '</span> 月 ' +
	             '<span class="digit">' + days + '</span> 日' +
	             '</div>' +
	             '<div class="time-part">' +
	             '<span class="time-digit">' + hours + '</span> 时 ' +
	             '<span class="time-digit">' + minutes + '</span> 分 ' +
	             '<span class="time-digit">' + seconds + '</span> 秒' +
	             '</div>';
	$("#elapseClock").html(result);
}

function showMessages() {
	// 调整文字位置（在新布局中可能不需要）
	adjustWordsPosition();

	// 显示祝福部分
	setTimeout(function() {
		showLoveU();
	}, 5000);
}

function adjustWordsPosition() {
	// 新布局中CSS已经处理了定位
	// 不需要额外的JavaScript定位
}

function adjustCodePosition() {
	// 新布局中不需要调整位置，CSS已经处理
	// 保持函数存在但不执行任何操作
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}