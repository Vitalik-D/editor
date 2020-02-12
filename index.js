function forAllWord(elements, str, value) {
    for (let i = 0, len = elements.length; i < len; i++) {
        if (elements[i].tagName === 'SPAN') {
            if (elements[i].parentNode.className !== 'relative-position cursor_normal none_outline') {
                if (str === 'bg') {
                    elements[i].parentNode.style.backgroundColor = value;
                    elements[i].parentNode.style.borderRadius = '4px';
                    elements[i].parentNode.style.paddingLeft = '4px';
                    elements[i].parentNode.style.paddingRight = '4px';
                    break
                }
                if (str === 'color') {
                    elements[i].style.color = value;
                }
                if (str === 'fs') {
                    elements[i].style.fontSize = value;
                }
            }
        }
    }
}

function globalEditFunc(value, str) {
    const element = window.getSelection().focusNode;
    if (element) {
        if (str === 'br'){
            element.parentNode.append(document.createElement('br'))
        }
        const selectedNodes = window.getSelection()
            .getRangeAt(0)
            .commonAncestorContainer
            .children;
        if (selectedNodes) {
            if (str === 'fs') {
                forAllWord(selectedNodes, 'fs', value);
            } else if (str === 'bg') {
                forAllWord(selectedNodes, 'bg', value);
            } else if (str === 'color'){
                forAllWord(selectedNodes, 'color', value);
            }

        }else {
            if (str === 'fs') {
                element.parentNode.style.fontSize = value;
            } else if (str === 'color') {
                element.parentNode.style.color = value;
            } else if (str === 'bg'){
                element.parentNode.style.backgroundColor = value;
                element.parentNode.style.borderRadius = '4px';
                element.parentNode.style.paddingLeft = '4px';
                element.parentNode.style.paddingRight = '4px';
            }
        }
    }
}

function addBr() {
    globalEditFunc(null, 'br')
}

function editFontSize(value) {
    value = value + 'px';
    globalEditFunc(value, 'fs')
}

function editTextColor(value) {
    globalEditFunc(value, 'color')
}

function editBackground(value) {
    globalEditFunc(value, 'bg')
}

function getJson() {
    const tmp = [];
    const baseEl = window.document.getElementById('base');
    const getChildren = el => [...el.children].filter(i => i.tagName === 'SPAN');
    const baseChildren = getChildren(baseEl);
    const baseStyles = {
        color: baseEl.style.color,
        fontSize: baseEl.style.fontSize,
        backgroundColor: baseEl.style.backgroundColor
    };

    baseChildren.forEach(i => {
        getChildren(i).forEach(el => {
            const getStyle = key => el.style[key] || i.style[key] || baseStyles[key];
            tmp.push({
                text: el.innerText,
                color: getStyle('color'),
                fontSize: getStyle('fontSize'),
                backgroundColor: getStyle('backgroundColor')
            });
        });
    });

    const res = tmp.reduce((acc, current) => {
        const last = acc[acc.length - 1];

        if (last) {
            const {text: lastText, ...lastRest} = last;
            const {text: currentText, ...currentRest} = current;

            if (JSON.stringify(lastRest) === JSON.stringify(currentRest)){
                acc.pop();
                acc.push({text: [lastText, currentText].join(' '), ...lastRest});
            } else {
                acc.push(current);
            };
        } else {
            acc.push(current);
        }

        return acc;
    }, []);
    console.log(res);
}
