import React from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import { SingleDatePicker } from 'react-dates';

import classes from './Input.css';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';


const input = ( props ) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch ( props.elementType ) {
    case ( 'input' ):
      inputElement = <Input    {...props.elementConfig}
                               value={props.value}
                               onChange={props.changed} />
      break;

    case ( 'number' ):
      inputElement = <Input    {...props.elementConfig}
                               value={props.value}
                               onChange={props.changed} />
      break;

    case ( 'radio' ):
      inputElement = props.elementConfig.elementCategory.map(function (formElement,i){
          return (
            <FormGroup key={formElement.key} check inline>
              {formElement.checked ? <Input
                  id={formElement.key}
                  value={formElement.value}
                  name={props.elementConfig.name}
                  onChange={props.changed}
                  type={props.elementConfig.type}
                  defaultChecked
                  className="form-check-input"
                />
                :
                <Input
                  id={formElement.key}
                  value={formElement.value}
                  name={props.elementConfig.name}
                  onChange={props.changed}
                  type={props.elementConfig.type}
                  className="form-check-input"
                />}

              <Label className="form-check-label" check htmlFor="inline-radio1">{formElement.key}</Label>
            </FormGroup>
          )
        }
      )
      break;
    case ( 'textarea' ):
      inputElement = <Input
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ( 'select' ):
      if(props.elementConfig.options.length > 0) {
        inputElement =
          <Select
            name="form-field-name2"
            onChange={props.changed}
            value={props.value}
            options={props.elementConfig.options}
          />
      }

      /*(
        <Input
          value={props.value}
          type={props.elementConfig.type}
          col='3'
          style={{Resize: 'none'}}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Input>
      );*/
      break;

    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }
  return (

    <div>
      <FormGroup row>
        <Col md="3" className='text-right'>
          {props.shouldValidate.required ?
            <Label htmlFor={props.label}>{props.label}<span className='RedColor MarginLeft5'>*</span></Label>
            : <Label htmlFor={props.label}>{props.label}<span className='MarginLeft5'>*</span></Label>}
        </Col>
        <Col xs="12" md="9">
          {inputElement}
        </Col>
      </FormGroup>
    </div>
  );

};

export default input;
