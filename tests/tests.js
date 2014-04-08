function generateEvent(char, expectResult, keyCode) {
    "use strict";
    keyCode = keyCode || char.toString().charCodeAt(0);
    return $.Event("keypress", { keyCode: keyCode, which: keyCode, expectResult: expectResult});
}
QUnit.config.testTimeout = 10000;
function testKeyPress(values, configNumberMask, nameTest) {
    "use strict";
    test(nameTest, function () {
        expect(values.length);
        var $input = $("<input/>").numberMask(configNumberMask);
        $.each(values, function (index, value) {
            $input.one("keypress", function (e) {
                var char = String.fromCharCode(e.which);
                if (e.expectResult && char) {
                    $input.val($input.val() + char);
                }
                equal(e.result, e.expectResult, char + ' ' + (e.expectResult ? 'allow' : 'disallow'));
            });
            value.beforeTrigger &&  value.beforeTrigger($input);
            $input.trigger(generateEvent(value.char, value.expectResult, value.keyCode));
        });
    });
}
var values = [
    {
        char: 'a',
        expectResult: false
    },
    {
        keyCode: 23,
        expectResult: true
    },
    {
        char: 1,
        expectResult: true
    },
    {
        char: 3,
        expectResult: true
    },
    {
        char: 4,
        expectResult: false
    }
];
testKeyPress(values, {beforePoint: 2}, "check integer mask");
values = [
    {
        char: 'a',
        expectResult: false
    },
    {
        keyCode: 23,
        expectResult: true
    },
    {
        char: 1,
        expectResult: true
    },
    {
        char: 3,
        expectResult: true
    },
    {
        char: 4,
        expectResult: true
    },
    {
        char: ',',
        expectResult: false
    },
    {
        char: '.',
        expectResult: true
    },
    {
        char: 4,
        expectResult: true
    },
    {
        char: 4,
        expectResult: true
    },
    {
        char: 5,
        expectResult: false
    }
];
testKeyPress(values, {beforePoint: 3, afterPoint: 2, decimalMark:'.', type: 'float'}, "check float mask");

values = [
    {
        char: 'a',
        expectResult: false
    },
    {
        keyCode: 'f',
        expectResult: false
    },
    {
        char: 'f',
        expectResult: true
    },
    {
        char: 3,
        expectResult: false
    },
    {
        char: 'f',
        expectResult: true
    },
    {
        char: ',',
        expectResult: false
    }
];
testKeyPress(values, {pattern:/^[f]{0,3}$/}, "check regExp pattern mask");
values = [
    {
        char: 1,
        expectResult: true
    },
    {
        char: 2,
        expectResult: true
    },
    {
        char: '.',
        expectResult: true
    },
    {
        char: ',',
        beforeTrigger:function($input){
            "use strict";
            var val = $input.val();
            $input.val(val.substr(0, val.length -1));
        },
        expectResult: true
    },
    {
        char: 4,
        expectResult: true
    },
    {
        char: ',',
        expectResult: false
    }
];
testKeyPress(values, {decimalMark:['.',','], type: 'float'}, "check decimal separator array  mask");