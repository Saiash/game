import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  type: string;
  list: string[] | boolean[];
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
          const value = typeof val === 'string' ? val : val + '';
          return (
            <MenuItem key={value} value={value}>
              {val}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
