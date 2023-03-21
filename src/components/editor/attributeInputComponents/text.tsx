import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  value: string;
  onDataChanged: (type: string, value: any) => void;
  outerValueSource?: boolean;
};

export function TextInput(props: Props) {
  const { value, onDataChanged, name, outerValueSource } = props;
  const [_value, setValue] = useState(value);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const onChangeOuter = (event: any) => {
    onDataChanged(name, event.target.value);
  };

  const handleChange = () => {
    onDataChanged(name, outerValueSource ? value : _value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <TextField
        value={outerValueSource ? value : _value}
        onChange={outerValueSource ? onChangeOuter : onChange}
        onBlur={handleChange}
        label={name}
        size={'small'}
      ></TextField>
    </FormControl>
  );
}
