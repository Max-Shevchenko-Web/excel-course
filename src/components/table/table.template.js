const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_COLUMN_WIDTH = 120;
const DEFAULT_COLUMN_HEIGHT = 24;

function getWidth(colState, index) {
  return colState[index] || DEFAULT_COLUMN_WIDTH;
}

function getHeight(rowState, index) {
  return rowState[index] || DEFAULT_COLUMN_HEIGHT;
}

function toCell(colState, row) {
  return function(_, col) {
    const width = getWidth(colState, col);
    return `
        <div
          class="cell"
          contenteditable
          data-col="${col}"
          data-type="cell"
          data-id="${row}:${col}"
          style="width:${width}px"
        ></div>
    `;
  };
}

function toColumn(colState) {
  return function(col, index,) {
    const width = getWidth(colState, index);
    return `
    <div class="column" data-type="resizable" data-col="${index}" style="width:${width}px">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
  };
}

function createRow(index, content, rowState) {
  const resize = index ?'<div class="row-resize" data-resize="row"></div>' : '';
  let height;
  if (index !== null) {
    height = getHeight(rowState, index - 1);
  }
  return `
    <div class="row" data-type="resizable" data-row="${index-1}" style="height:${height}px">
      <div class="row-info" >
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const {colState, rowState} = state;

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(colState))
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(colState, row))
        .join('');

    rows.push(createRow(row + 1, cells, rowState));
  }

  return rows.join('');
}
