import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  value: string;
  onDataChanged: (type: string, value: any) => void;
};

export function TextAreaInput(props: Props) {
  const { value, onDataChanged, name } = props;
  const [_value, setValue] = useState(value);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleChange = () => {
    onDataChanged(name, _value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 550 }} size="small">
      <TextField
        value={_value}
        onChange={onChange}
        onBlur={handleChange}
        label={name}
        multiline
        minRows={4}
        maxRows={8}
        size={'small'}
      ></TextField>
    </FormControl>
  );
}
