import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';
import GatewayInput from '../../components/Forms/FormInline';
import GatewayTable from './GatewayTable';

const renderHelper = props => {
  /*  eslint-disable react/prop-types */
  const {
    inputData,
    editing,
    GatewayMethods: { onSubmit, onChange, cancelEdit, onClear }
  } = props;
  /* eslint-enable react/prop-types */

  if (editing) {
    return (
      <GatewayInput
        ncols={['col-md-8']}
        properties={[
          {
            inputData,
            onChange,
            // onSubmit,
            label: 'New Thing',
            type: 'text',
            placeholder: 'Enter some data....',
            buttons: [
              {
                onClick: onSubmit,
                type: 'button',
                bsStyle: 'warning',
                btnShape: 'fill',
                title: 'Save Edit'
              },
              {
                onClick: cancelEdit,
                type: 'button',
                bsStyle: 'warning',
                btnShape: '',
                title: 'Cancel'
              }
            ]
          }
        ]}
      />
    );
  }

  return (
    <GatewayInput
      ncols={['col-md-8']}
      properties={[
        {
          inputData,
          onChange,
          // onSubmit,
          label: 'New Thing',
          type: 'text',
          placeholder: 'Enter some data....',
          buttons: [
            {
              onClick: onSubmit,
              type: 'submit',
              bsStyle: 'primary',
              btnShape: 'fill',
              title: 'Save'
            },
            {
              onClick: onClear,
              type: 'button',
              bsStyle: 'primary',
              btnShape: '',
              title: 'Clear'
            }
          ]
        }
      ]}
    />
  );
};

const GatewayCard = props => {
  const {
    things,
    GatewayMethods: { onEdit, onRemove }
  } = props;

  return (
    <Card
      title="Gateway"
      category="Save & Retrieve Data from Mongo DB"
      content={
        <React.Fragment>
          {renderHelper(props)}
          <GatewayTable list={things} onEdit={onEdit} onRemove={onRemove} />
        </React.Fragment>
      }
    />
  );
};

const { func, bool, shape, string, arrayOf } = PropTypes;

GatewayCard.propTypes = {
  editing: bool,
  editId: string,
  inputData: string.isRequired,
  things: arrayOf(
    shape({
      _id: string,
      name: string
    })
  ),
  GatewayMethods: shape({
    onChange: func,
    onSubmit: func,
    onEdit: func,
    onRemove: func,
    cancelEdit: func
  }).isRequired
};

GatewayCard.defaultProps = {
  editing: false,
  editId: '',
  things: []
};

export default GatewayCard;
