import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Paper, Set, Rect } from 'react-raphael';

import Encoder, { BITS } from '../utils/encoder';

const HEIGHT = 350;
const COLUMN_WIDTH = 8;
const COLUMN_SPACING = 4;
const ROWS_PER_BIT = 10;
const ROWS_PER_SPROCKET = 1;
const FULL_COLUMNS = 34;
const NULL_COLUMNS = 10;

class PatternRenderer extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  renderColumn(index, bits, xOffset, fillSpace) {
    bits = bits
      .map(bit => Array(ROWS_PER_BIT).fill(bit))
      .reduce((a, b) => [...a, ...b], []);

    const spacerColour = fillSpace ? '#000' : '#fff';
    const colours = [
      ...bits.slice(0, 2 * ROWS_PER_BIT),
      ...Array(ROWS_PER_SPROCKET).fill(1),
      ...bits.slice(2 * ROWS_PER_BIT),
    ].map(bit => (bit ? '#000' : '#fff'));

    const rowHeight = Math.floor(HEIGHT / colours.length);

    return (
      <Set key={index}>
        {colours.map((colour, i) =>
          <Rect
            key={i}
            x={xOffset + index * (COLUMN_WIDTH + COLUMN_SPACING)}
            y={i * rowHeight}
            width={COLUMN_WIDTH}
            height={rowHeight}
            attr={{ fill: colour, stroke: colour }}
          />,
        )}
        <Rect
          x={xOffset + COLUMN_WIDTH + index * (COLUMN_WIDTH + COLUMN_SPACING)}
          y={0}
          width={COLUMN_SPACING}
          height={2 * ROWS_PER_BIT * rowHeight}
          attr={{ fill: spacerColour, stroke: spacerColour }}
        />
        <Rect
          x={xOffset + COLUMN_WIDTH + index * (COLUMN_WIDTH + COLUMN_SPACING)}
          y={2 * ROWS_PER_BIT * rowHeight}
          width={COLUMN_SPACING}
          height={ROWS_PER_SPROCKET * rowHeight}
          attr={{ fill: '#000', stroke: '#000' }}
        />
        <Rect
          x={xOffset + COLUMN_WIDTH + index * (COLUMN_WIDTH + COLUMN_SPACING)}
          y={(2 * ROWS_PER_BIT + ROWS_PER_SPROCKET) * rowHeight}
          width={COLUMN_SPACING}
          height={(bits.length - 2 * ROWS_PER_BIT) * rowHeight}
          attr={{ fill: spacerColour, stroke: spacerColour }}
        />
      </Set>
    );
  }

  render() {
    const { text } = this.props;

    // FIXME: Only do this when the text changes.
    const columns = Encoder.encode(text);

    return (
      <Paper
        className="PatternRenderer"
        width={
          (FULL_COLUMNS + columns.length + NULL_COLUMNS) *
          (COLUMN_WIDTH + COLUMN_SPACING)
        }
        height={HEIGHT}
      >
        <Set>
          {Array(FULL_COLUMNS)
            .fill(BITS.SHIFTS.LETTERS)
            .map((bits, index) => this.renderColumn(index, bits, 0, true))}
        </Set>
        <Set>
          {columns.map((bits, index) =>
            this.renderColumn(
              index,
              bits,
              FULL_COLUMNS * (COLUMN_WIDTH + COLUMN_SPACING),
            ),
          )}
        </Set>
        <Set>
          {Array(NULL_COLUMNS)
            .fill(BITS.NULL)
            .map((bits, index) =>
              this.renderColumn(
                index,
                bits,
                (FULL_COLUMNS + columns.length) *
                  (COLUMN_WIDTH + COLUMN_SPACING),
              ),
            )}
        </Set>
      </Paper>
    );
  }
}

export default PatternRenderer;
