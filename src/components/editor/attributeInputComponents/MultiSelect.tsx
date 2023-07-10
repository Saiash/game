import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  list: string[] | boolean[] | { key: string; value: string }[];
  value: string[];
  onDataChanged: (type: string, value: any) => void;
};

export function MultiSelectInput(props: Props) {
  const { value, onDataChanged, name, list } = props;

  const handleChange = (event: any) => {
    onDataChanged(name, event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{name}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        multiple={true}
        size={'small'}
        label={name}
      >
        {list.map(val => {
          let value: { key: string; value: string };
          if (typeof val === 'object') {
            value = val;
          } else {
            const _value = typeof val === 'string' ? val : val + '';
            value = { value: _value, key: _value };
          }
          return (
            <MenuItem key={value.key} value={value.value}>
              {value.key}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
