const table = document.querySelector('#table');

let selected;

table.onclick = function(event) {
    let td = event.target.closest('td');

    if (!td) return;

    if (!table.contains(td)) return;

    switch (event.target.tagName) {
        case 'BUTTON':
            let action = event.target.dataset.action;
            handleBtns(action, td);
            break;
        case 'TEXTAREA':
            break;
        default:
            highlight(td);
    }
};

function highlight(td) {
    if (selected) {
        selected.classList.remove('highlight');
        collapseCell( selected.querySelector('.main-text'), selected.querySelector('.selected-td') );
    }

    if(selected !== td) {
        selected = td;
        selected.classList.add('highlight');
        openCell( selected.querySelector('.main-text'), selected.querySelector('.selected-td') );
        selected.querySelector('.text-to-change').innerText = selected.querySelector('.main-text').innerText;
    } else
        selected = null;
}

function createTable(selector, rows, columns) {
    const table = document.querySelector(selector);
    for(let i = 0; i < rows; ++i) {

        const tr = document.createElement('tr');

        for(let j = 0; j < columns; ++j) {
            tr.innerHTML += `
            <td>
                <div class="main-text">Text text text</div>
                <div class="selected-td hide">
                    <textarea name="text" class="text-to-change" cols="30" rows="4"></textarea>
                    <div class="controls">
                        <button data-action="cancel">Cancel</button>
                        <button data-action="save">Save</button>
                    </div>
                </div>
            </td>`;
        }
        table.append(tr);
    }
}

createTable('#table', 5, 5);

function handleBtns(action, td) {
    const mainText = td.querySelector('.main-text');
    const selectedTd = td.querySelector('.selected-td');
    const textToChange = selectedTd.querySelector('.text-to-change');

    if (action === 'save')
        mainText.innerText = textToChange.value;
    else
        textToChange.innerText = mainText.innerText;

    collapseCell(mainText, selectedTd);
}

function collapseCell(mainText, selectedTd) {
    if (mainText.classList.contains('hide'))
        mainText.classList.remove('hide');
    if (!selectedTd.classList.contains('hide'))
        selectedTd.classList.add('hide');
}

function openCell(mainText, selectedTd) {
    if (!mainText.classList.contains('hide'))
        mainText.classList.add('hide');
    if (selectedTd.classList.contains('hide'))
        selectedTd.classList.remove('hide');
}


