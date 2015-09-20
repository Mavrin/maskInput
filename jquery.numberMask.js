$.fn.numberMask = function (options) {
    var settings = {
            type: 'int', beforePoint: 10, afterPoint: 2, defaultValueInput: 0,
            allowNegative: false, decimalMark: ['.'], pattern: ''
        },
        regExp,
        onKeyPress = function (e) {
            var k = e.which;

            if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
                return true;
            } else if (k) {
                var c = String.fromCharCode(k);
                var value = e.target.value;
                var selectionParam = getSelection(e.target);
                value = value.substring(0, selectionParam.start) + c + value.substring(selectionParam.end);
                return (settings.allowNegative && value === '-') || regExp.test(value);
            }
        },
        onInput = function (e) {
            var input = $(e.currentTarget);
            input.val(formattedNumber(input));
        },
        getSelection = function (el) {
            var start = 0, end = 0, normalizedValue, range,
                textInputRange, len, endRange, statusSelection = false;

            if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
                start = el.selectionStart;
                end = el.selectionEnd;
            } else {
                range = document.selection.createRange();

                if (range && range.parentElement() == el) {
                    len = el.value.length;
                    normalizedValue = el.value.replace(/\r\n/g, "\n");

                    // Create a working TextRange that lives only in the input
                    textInputRange = el.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());

                    // Check if the start and end of the selection are at the very end
                    // of the input, since moveStart/moveEnd doesn't return what we want
                    // in those cases
                    endRange = el.createTextRange();
                    endRange.collapse(false);

                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        start = end = len;
                    } else {
                        start = -textInputRange.moveStart("character", -len);
                        start += normalizedValue.slice(0, start).split("\n").length - 1;

                        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            end = len;
                        } else {
                            end = -textInputRange.moveEnd("character", -len);
                            end += normalizedValue.slice(0, end).split("\n").length - 1;
                        }
                    }
                }
            }
            if ((start - end) != 0) {
                statusSelection = true;
            }
            return {
                start: start,
                end: end,
                statusSelection: statusSelection
            };
        },
        formattedNumber = function ($input) {
            var val = $input.val();
            if (regExp.test(val)) {
                return val;
            } else {
                return settings.defaultValueInput;
            }
        },
        getDecimalMarksString = function () {
            var decimalMarksString = '(\\' + settings.decimalMark[0];
            for (var i = 1; i < settings.decimalMark.length; i++) {
                decimalMarksString += "|\\" + settings.decimalMark[i];
            }
            decimalMarksString += ')';
            return decimalMarksString;
        };

    this.bind('keypress', onKeyPress).bind('input', onInput);
    if (options) {
        if (options.decimalMark) {
            if ($.type(options.decimalMark) === "string")
                options.decimalMark = [options.decimalMark];
        }

        $.extend(settings, options);
    }
    if ((typeof settings.pattern == "object") && (settings.pattern instanceof RegExp)) {
        regExp = settings.pattern;
    } else {
        var negRegExpPart = settings.allowNegative ? "[-]?" : '',
            intRegExp = "^" + negRegExpPart + "\\d{1," + settings.beforePoint + "}$",
            decimalRegExp = "^" + negRegExpPart + "\\d{1," + settings.beforePoint + "}" + getDecimalMarksString() + "\\d{0," + settings.afterPoint + "}$";

        if (settings.type == 'int') {
            regExp = new RegExp(intRegExp);
        } else {
            regExp = new RegExp(intRegExp + "|" + decimalRegExp);
        }
    }

    return this;
};